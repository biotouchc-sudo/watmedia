"use client";
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const PHONE = '966500000000'; // Replace with actual number
const DEFAULT_MESSAGE = 'مرحباً، أريد الاستفسار عن خدمات WATMEDIA';

export function WhatsAppFloat() {
    const pathname = usePathname();

    const getMessage = () => {
        if (pathname.includes('/services')) return 'مرحباً، أريد الاستفسار عن خدماتكم المعروضة في الموقع';
        if (pathname.includes('/portfolio')) return 'مرحباً، أعجبتني أعمالكم وأريد مناقشة مشروع مشابه';
        if (pathname.includes('/contact')) return 'مرحباً، لدي استفسار عاجل';
        return DEFAULT_MESSAGE;
    };

    const handleClick = () => {
        const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(getMessage())}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-50 
                 bg-[#25D366] hover:bg-[#128C7E] 
                 text-white p-4 rounded-full 
                 shadow-lg hover:shadow-[#25D366]/50 
                 transition-all duration-300 
                 hover:scale-110 active:scale-95
                 group"
            aria-label="تواصل عبر واتساب"
        >
            <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20 group-hover:opacity-40" />
            <MessageCircle className="w-7 h-7 relative z-10" />

            {/* Tooltip */}
            <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
                تواصل معنا الآن
            </span>
        </button>
    );
}
