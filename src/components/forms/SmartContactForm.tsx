"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from '@/lib/validations/contact';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function SmartContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            service: undefined,
            budget: undefined,
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('فشل الإرسال');

            setIsSuccess(true);
            toast.success('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
            form.reset();
        } catch (error) {
            toast.error('حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 animate-in fade-in zoom-in duration-500 bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-2xl backdrop-blur-xl">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)]">
                    تم استلام طلبك!
                </h3>
                <p className="text-gray-400 max-w-md">
                    شكراً لتواصلك مع WATMEDIA. فريقنا سيقوم بدراسة طلبك والرد عليك خلال 24 ساعة عمل.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-6">
                    إرسال طلب آخر
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-1 relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)] opacity-10 blur-3xl rounded-full" />

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-2xl p-8 backdrop-blur-xl space-y-6 shadow-2xl"
            >
                <div className="space-y-2 text-center mb-8">
                    <h2 className="text-3xl font-bold">ابدأ رحلة التحول الرقمي</h2>
                    <p className="text-gray-400">أدخل تفاصيل مشروعك وسنتولى الباقي</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">الاسم الكامل</label>
                        <Input
                            {...form.register('name')}
                            placeholder="محمد الحربي"
                            className={cn(form.formState.errors.name && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.name && (
                            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">البريد الإلكتروني</label>
                        <Input
                            {...form.register('email')}
                            placeholder="name@company.com"
                            type="email"
                            className={cn(form.formState.errors.email && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">رقم الجوال</label>
                        <Input
                            {...form.register('phone')}
                            placeholder="0500000000"
                            type="tel"
                            className={cn(form.formState.errors.phone && "border-red-500 focus-visible:ring-red-500")}
                        />
                        {form.formState.errors.phone && (
                            <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">نوع الخدمة</label>
                        <Select onValueChange={(val: any) => form.setValue('service', val)}>
                            <SelectTrigger className={cn(form.formState.errors.service && "border-red-500")}>
                                <SelectValue placeholder="اختر الخدمة المطلوبة" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="web">تطوير ويب (Web Development)</SelectItem>
                                <SelectItem value="marketing">تسويق رقمي (Digital Marketing)</SelectItem>
                                <SelectItem value="design">تصميم وهوية (Branding & Design)</SelectItem>
                                <SelectItem value="other">أخرى (Other)</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.formState.errors.service && (
                            <p className="text-xs text-red-500">{form.formState.errors.service.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">الميزانية المتوقعة</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['<5k', '5k-15k', '15k-50k', '>50k'].map((budget) => (
                            <button
                                key={budget}
                                type="button"
                                onClick={() => form.setValue('budget', budget as any)}
                                className={cn(
                                    "px-4 py-2 rounded-lg border text-sm transition-all duration-300",
                                    form.watch('budget') === budget
                                        ? "border-[var(--wat-primary)] bg-[var(--wat-primary)]/10 text-[var(--wat-primary)] shadow-[0_0_10px_var(--wat-primary)]"
                                        : "border-white/10 hover:border-white/30 text-gray-400 hover:text-white"
                                )}
                            >
                                {budget}
                            </button>
                        ))}
                    </div>
                    {form.formState.errors.budget && (
                        <p className="text-xs text-red-500">{form.formState.errors.budget.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">تفاصيل المشروع</label>
                    <Textarea
                        {...form.register('message')}
                        placeholder="حدثنا أكثر عن فكرتك، أهدافك، وما تتطلع لتحقيقه..."
                        className={cn("min-h-[120px] resize-none", form.formState.errors.message && "border-red-500 focus-visible:ring-red-500")}
                    />
                    {form.formState.errors.message && (
                        <p className="text-xs text-red-500">{form.formState.errors.message.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)] hover:opacity-90 transition-all duration-300 relative overflow-hidden group"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-black" />
                    ) : (
                        <span className="flex items-center justify-center gap-2 text-black">
                            إرسال الطلب <Send className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                        </span>
                    )}
                </Button>
            </form>
        </div>
    );
}
