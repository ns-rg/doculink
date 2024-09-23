"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Import Loader2 icon

export default function StudentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentMobile: "",
    parentMobile: "",
    email: "",
    category: "",
    branch: "",
    institute: "",
    document: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'studentMobile' || name === 'parentMobile') && value.length > 10) {
      return; // Don't update if mobile number is longer than 10 digits
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      studentMobile: "",
      parentMobile: "",
      email: "",
      category: "",
      branch: "",
      institute: "",
      document: null,
    });
    // Reset the file input
    const fileInput = document.getElementById('document');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    const form = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'document') {
        if (value) {
          form.append(key, value, value.name);
        } else {
          setIsLoading(false);
          setSubmitStatus({ success: false, message: 'Please select a document to upload.' });
          return;
        }
      } else {
        form.append(key, value);
      }
    }
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: form,
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ success: true, message: 'Form submitted successfully!' });
        resetForm(); // Reset the form on successful submission
      } else {
        setSubmitStatus({ success: false, message: `Error submitting form: ${data.message}` });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">Student Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                <Input className="mt-1" id="fullName" name="fullName" placeholder="Enter full name" onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="studentMobile" className="font-medium">Student's Mobile Number</Label>
                <Input className="mt-1" id="studentMobile" name="studentMobile" type="tel" placeholder="Enter student's mobile number" onChange={handleInputChange} maxLength={10} minLength={10} required />
              </div>
              <div>
                <Label htmlFor="parentMobile" className="font-medium">Parent's Mobile Number</Label>
                <Input className="mt-1" id="parentMobile" name="parentMobile" type="tel" placeholder="Enter parent's mobile number" onChange={handleInputChange} maxLength={10} minLength={10} required />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">Email</Label>
                <Input className="mt-1" id="email" name="email" type="email" placeholder="Enter student's email" onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="font-medium">Category</Label>
                <Select name="category" onValueChange={(value) => handleInputChange({ target: { name: "category", value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="SEBC">SEBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="EWS">EWS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch" className="font-medium">Branch Interested</Label>
                <Select name="branch" onValueChange={(value) => handleInputChange({ target: { name: "branch", value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Automobile">Automobile</SelectItem>
                    <SelectItem value="Biomedical">Biomedical</SelectItem>
                    <SelectItem value="Chemical">Chemical</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                    <SelectItem value="Computer">Computer</SelectItem>
                    <SelectItem value="EC">EC</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Mechatronics">Mechatronics</SelectItem>
                    <SelectItem value="Petrochemical">Petrochemical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institute" className="font-medium">Institute</Label>
                <Select name="institute" onValueChange={(value) => handleInputChange({ target: { name: "institute", value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BSPP">BSPP</SelectItem>
                    <SelectItem value="IOT">IOT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Document Upload</h3>
              <p className="text-sm text-gray-500">Please upload a single PDF file containing all required documents</p>
              <div className="space-y-2">
                <Label htmlFor="document" className="text-base font-medium">
                  All Documents (PDF)
                </Label>
                <Input
                  id="document"
                  name="document"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="file:hover:text-violet-700"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>

            {submitStatus && (
              <div className={`mt-4 p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
