import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'الاسم قصير جداً'),
  email: z.string().email('بريد إلكتروني غير صالح'),
  phone: z.string().regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, 'رقم جوال سعودي غير صالح مثال: 0500000000'),
  service: z.enum(['web', 'marketing', 'design', 'other'], {
    message: 'الرجاء اختيار نوع الخدمة'
  }),
  budget: z.enum(['<5k', '5k-15k', '15k-50k', '>50k'], {
    message: 'الرجاء اختيار الميزانية التقريبية'
  }),
  message: z.string().min(10, 'الرسالة قصيرة جداً (أقل شيء 10 أحرف)'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
