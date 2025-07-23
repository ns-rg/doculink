import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Welcome to Doculink</h1>
      <p className="text-xl md:text-2xl text-center mb-8">The site integrates with Google Sheets and Google Drive APIs to securely store submitted data and documents.</p>
      <div className="flex flex-col lg:flex-row md:flex-row justify-center items-center gap-5">
        <Link href="/form">
          <Button className="text-lg px-6 py-3">Start Registration</Button>
        </Link>
        <Link href="https://github.com/ns-rg/Doculink">
          <Button className="text-lg px-6 py-3">View on Github</Button>
        </Link>
      </div>
    </div>
  );
}
