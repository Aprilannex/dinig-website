import { type NextRequest, NextResponse } from "next/server"

const RESEND_API_KEY = "re_W2cHRUut_9dUA8RehQp4VXpcjvgQiem1o"
const RESEND_API_URL = "https://api.resend.com/emails"

export async function POST(request: NextRequest) {
  try {
    const { name, email, feedback } = await request.json()

    // Validate required fields
    if (!name || !email || !feedback) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Create HTML email body with DINIG branding
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f6f9fc;">
        <div style="background: linear-gradient(to bottom, #64b5f6, #1976d2); border-radius: 8px 8px 0 0; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">DINIG - New Feedback Received</h2>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 8px 8px;">
          <p style="color: #333333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
            From: <span style="font-weight: normal;">${name}</span>
          </p>
          <p style="color: #333333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
            Email: <span style="font-weight: normal;">${email}</span>
          </p>
          <p style="color: #333333; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
            Submitted: <span style="font-weight: normal;">${new Date().toLocaleString()}</span>
          </p>
          <hr style="border-color: #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #333333; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">Feedback:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #1976d2;">
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${feedback.replace(
              /\n/g,
              "<br>",
            )}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 5px;">
            <p style="color: #1976d2; font-size: 14px; margin: 0; font-weight: bold;">🌐 Sent from DINIG Web App</p>
            <p style="color: #666666; font-size: 12px; margin: 5px 0 0 0;">Translation app for seamless communication</p>
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center; background-color: #ff9800; padding: 15px; border-radius: 0 0 8px 8px;">
          <p style="color: #ffffff; font-size: 14px; margin: 0; font-weight: bold;">DINIG - Breaking Language Barriers</p>
          <p style="color: #ffffff; font-size: 12px; margin: 5px 0 0 0;"><a href="https://dinigv2.vercel.app/" style="color: #ffffff; text-decoration: none;">dinigv2.vercel.app</a></p>
        </div>
      </div>
    `

    // Prepare the email payload for Resend API
    const emailPayload = {
      from: "onboarding@resend.dev",
      to: "dinig2025@gmail.com",
      reply_to: email,
      subject: `DINIG App Feedback from ${name}`,
      html: adminEmailHtml,
    }

    console.log("Sending email payload:", JSON.stringify(emailPayload, null, 2))

    // Send email using Resend API
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const responseData = await response.json()
    console.log("Resend API response:", responseData)

    if (!response.ok) {
      console.error("Resend API error:", responseData)
      return NextResponse.json({ message: responseData.message || "Failed to send email" }, { status: response.status })
    }

    return NextResponse.json({ message: "Feedback sent successfully", id: responseData.id })
  } catch (error) {
    console.error("Error sending feedback:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
