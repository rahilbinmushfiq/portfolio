import { NextResponse } from "next/server";

export async function POST(request) {
  const template_params = await request.json();

  // Prepare the data required for EmailJS API request
  const emailJSData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
  };

  try {
    // Send a POST request to the EmailJS API endpoint
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailJSData),
    });

    // If response is successful, return a JSON response with success status code,
    // otherwise, throw an error containing the client error response status code
    if (response.ok) {
      return NextResponse.json({ status: response.status });
    } else {
      const error = new Error();
      error.status = response.status;
      throw error;
    }
  } catch (error) {
    // Based on the error, return a JSON response with the client or a default server error status code
    return NextResponse.json({ status: error.status || 500 });
  }
}
