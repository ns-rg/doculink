import "./globals.css";

export const metadata = {
  title: "Doculink",
  description: "Doculink is a modern, responsive student registration form built with Next.js. It features a user-friendly interface for students to submit their personal information and required documents for educational institutions. The application integrates with Google Sheets and Google Drive APIs to securely store submitted data and documents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
