import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Welcome to Student Registration</h1>
      <p className="text-xl md:text-2xl text-center mb-8">Easy and secure way to register for your educational journey</p>
      <Link href="/form">
        <Button className="text-lg px-6 py-3">Start Registration</Button>
      </Link>
    </div>
  );
}
