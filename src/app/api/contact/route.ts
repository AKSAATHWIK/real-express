import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData } from '@/types/property';

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    console.log('Contact form submission:', formData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for contacting us. We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' }, 
      { status: 500 }
    );
  }
}