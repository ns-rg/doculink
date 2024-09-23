import { NextResponse } from 'next/server';
import { addToGoogleSheet, uploadToDrive } from '@/lib/google-api';

export async function POST(req) {
  const origin = req.headers.get('origin');
  const headers = new Headers({
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  try {
    const formData = await req.formData();
    
    const data = {
      fullName: formData.get('fullName'),
      studentMobile: formData.get('studentMobile'),
      parentMobile: formData.get('parentMobile'),
      email: formData.get('email'),
      category: formData.get('category'),
      branch: formData.get('branch'),
      institute: formData.get('institute'),
    };

    // Validate required fields
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${key}` },
          { status: 400, headers }
        );
      }
    }

    console.log('Adding to Google Sheet...');
    await addToGoogleSheet(data);
    console.log('Successfully added to Google Sheet');
    
    const file = formData.get('document');
    if (file) {
      console.log('Uploading to Google Drive...');
      console.log('File details:', file.name, file.type, file.size);
      try {
        const fileId = await uploadToDrive(file, data.fullName);
        console.log('Successfully uploaded to Google Drive. File ID:', fileId);
      } catch (uploadError) {
        console.error('Error during file upload:', uploadError);
        console.error('Error details:', uploadError.response?.data || uploadError.message);
        return NextResponse.json(
          { success: false, message: 'Error uploading file to Google Drive' },
          { status: 500, headers }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: 'Missing document file' },
        { status: 400, headers }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    console.error('Error stack:', error.stack);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Error submitting form' },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(req) {
  const origin = req.headers.get('origin');
  const headers = new Headers({
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  return new NextResponse(null, { status: 204, headers });
}