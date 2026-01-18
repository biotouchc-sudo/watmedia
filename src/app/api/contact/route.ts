import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid inputs', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, service, budget, message } = result.data;

    // TODO: Integrate Resend or DB here
    // For now, we simulate a successful operation
    console.log('Received Contact Form:', { name, email, phone, service, budget, message });

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
