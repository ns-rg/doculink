import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Readable } from 'node:stream';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

async function getAuthClient() {
  console.log('Attempting to authenticate with Google');
  
  const base64Credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
  if (!base64Credentials) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS_BASE64 environment variable is not set');
  }

  // Decode the base64 string
  const decodedCredentials = JSON.parse(Buffer.from(base64Credentials, 'base64').toString('utf-8'));

  // Create a JWT client using the decoded credentials
  const client = new JWT({
    email: decodedCredentials.client_email,
    key: decodedCredentials.private_key,
    scopes: SCOPES,
  });

  // Ensure the client is authorized
  await client.authorize();

  return client;
}

export async function addToGoogleSheet(data) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = 'Sheet1!A:H'; // Adjust this range based on your sheet structure

  const values = [
    [
      data.fullName,
      data.studentMobile,
      data.parentMobile,
      data.email,
      data.category,
      data.branch,
      data.institute,
      new Date().toISOString() // Timestamp
    ]
  ];

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  };

  await sheets.spreadsheets.values.append(request);
}

export async function uploadToDrive(file, folderName) {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  
  let folderId = await getFolderId(drive, folderName);
  if (!folderId) {
    folderId = await createFolder(drive, folderName);
  }

  const fileMetadata = {
    name: `${folderName}.pdf`,
    parents: [folderId]
  };

  // Convert the file buffer to a readable stream
  const buffer = await file.arrayBuffer();
  const stream = new Readable();
  stream.push(Buffer.from(buffer));
  stream.push(null);

  const media = {
    mimeType: file.type,
    body: stream
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id'
    });
    console.log('File uploaded successfully. File ID:', response.data.id);
    return response.data.id;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
}

async function getFolderId(drive, folderName) {
  const response = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
    fields: 'files(id)',
    spaces: 'drive'
  });

  return response.data.files[0]?.id;
}

async function createFolder(drive, folderName) {
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID] // Parent folder where student folders will be created
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  });

  return response.data.id;
}