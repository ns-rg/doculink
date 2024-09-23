# Doculink
Doculink is a modern, responsive student registration form built with Next.js. It features a user-friendly interface for students to submit their personal information and required documents for educational institutions. The application integrates with Google Sheets and Google Drive APIs to securely store submitted data and documents.

It is currently used by **B.S Patel Polytechnic Institute of Technology, Ganpat Univeristy**. It can be modified for any institution and if you want to use it for your institution, please contact me on **nisjp.14@gmail.com**.

## Key Features

- **Responsive Design**: Adapts seamlessly to various screen sizes for optimal user experience on both desktop and mobile devices.
- **Document Upload**: Allows students to upload a single PDF containing all required documents.
- **Google Integration**: 
  - Utilizes Google Sheets API for data storage
  - Leverages Google Drive API for document management
- **Success/Error Messaging**: Displays clear feedback to users after form submission.

## Technologies Used

- **Frontend**: Next.js and Tailwind CSS.
- **UI Components**: UI components of ShadCN library.
- **Backend**: Next.js API Routes.
- **External APIs**: Google Sheets API, Google Drive API.
- **State Management**: React Hooks.
- **Form Handling**: Custom form handling with React state.

## Data Storage and Processing

When a student submits the registration form:

1. **Form Data Storage**: 
   - The student's information (name, contact details, selected category, branch, and institute) is appended as a new row to a designated Google Sheet.
   - This allows for easy access and management of student registration data.

2. **Document Storage**:
   - The uploaded PDF document is stored in Google Drive.
   - A new folder is created in Google Drive with the student's name (if it doesn't already exist).
   - The PDF is uploaded to this folder, ensuring organized storage of student documents.

3. **API Integration**:
   - The application uses server-side API routes to securely communicate with Google's APIs.
   - This approach keeps API credentials secure and manages token authentication server-side.

4. **Error Handling**:
   - The system includes robust error handling for both data submission to Google Sheets and file uploads to Google Drive.
   - Users receive clear feedback if there are any issues during the submission process.

## Setup and Deployment

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Google Cloud Project and obtain necessary credentials
4. Configure environment variables for Google API integration
5. Run the development server: `npm run dev`
6. Build for production: `npm run build`
7. Deploy to your preferred hosting platform (e.g., Vercel)
