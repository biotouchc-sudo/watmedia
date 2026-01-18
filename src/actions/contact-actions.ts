'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().optional(),
  service: z.enum(['architect-core', 'visual-pulse', 'growth-engine', 'other']),
  message: z.string().min(10, 'الرسالة يجب أن تكون على الأقل 10 أحرف'),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    service?: string[]
    message?: string[]
  }
}

import { contactRatelimit } from '@/lib/ratelimit'
import { headers } from 'next/headers'

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Rate Limiting Check
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for') || '127.0.0.1'
  
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { success } = await contactRatelimit.limit(ip)
    if (!success) {
      return {
        success: false,
        message: 'لقد تجاوزت الحد المسموح به من الرسائل. يرجى المحاولة لاحقاً.',
      }
    }
  }

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'يرجى تصحيح الأخطاء أدناه',
    }
  }

  // In production, integrate with Resend or another email service
  // For now, we'll simulate a successful submission
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the submission (in production, send email via Resend)
    console.log('Contact Form Submission:', validatedFields.data)

    return {
      success: true,
      message: 'شكراً لتواصلك! سنرد عليك في أقرب وقت ممكن.',
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    }
  }
}
