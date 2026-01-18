'use client'

import { useActionState } from 'react'
import { Input, Textarea } from '@/components/ui'
import { submitContactForm, type ContactFormState } from '@/actions/contact-actions'

const initialState: ContactFormState = {}

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

    if (state.success) {
        return (
            <div className="glass p-8 rounded-2xl text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-white mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-[var(--wat-text-muted)]">{state.message}</p>
            </div>
        )
    }

    return (
        <form action={formAction} className="glass p-8 rounded-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Input
                        name="name"
                        label="الاسم الكامل"
                        placeholder="أحمد محمد"
                        error={state.errors?.name?.[0]}
                        required
                    />
                </div>
                <div>
                    <Input
                        name="email"
                        type="email"
                        label="البريد الإلكتروني"
                        placeholder="ahmed@example.com"
                        error={state.errors?.email?.[0]}
                        required
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Input
                        name="phone"
                        type="tel"
                        label="رقم الهاتف (اختياري)"
                        placeholder="+966 5X XXX XXXX"
                        error={state.errors?.phone?.[0]}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[var(--wat-text)]">
                        الخدمة المطلوبة
                    </label>
                    <select
                        name="service"
                        className="flex h-12 w-full rounded-xl border bg-[var(--wat-surface)] px-4 py-2 text-base text-[var(--wat-text)] border-[var(--wat-glass-border)] focus:border-[var(--wat-primary)] focus:ring-2 focus:ring-[var(--wat-primary)]/20 focus:outline-none"
                        required
                    >
                        <option value="">اختر الخدمة</option>
                        <option value="architect-core">Architect Core - هندسة المواقع</option>
                        <option value="visual-pulse">Visual Pulse - التصميم البصري</option>
                        <option value="growth-engine">Growth Engine - التسويق الرقمي</option>
                        <option value="other">أخرى</option>
                    </select>
                    {state.errors?.service && (
                        <p className="text-sm text-red-500">{state.errors.service[0]}</p>
                    )}
                </div>
            </div>

            <Textarea
                name="message"
                label="رسالتك"
                placeholder="أخبرنا عن مشروعك أو استفسارك..."
                error={state.errors?.message?.[0]}
                required
            />

            {state.message && !state.success && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white py-4 rounded-full font-medium transition-all duration-300 glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </button>
        </form>
    )
}
