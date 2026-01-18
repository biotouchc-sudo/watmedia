'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { Badge } from '@/components/ui'

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">مركز البيانات الكمي</h1>
                    <p className="text-[var(--wat-text-muted)]">تحليل الأداء في الزمن الفعلي</p>
                </div>
                <Badge variant="supreme" className="animate-pulse">Live Data</Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'إجمالي الزيارات', value: '124.5K', change: '+12%', color: 'text-blue-400' },
                    { label: 'معدل التحويل', value: '3.2%', change: '+0.8%', color: 'text-green-400' },
                    { label: 'متوسط الجلسة', value: '4m 12s', change: '+15%', color: 'text-purple-400' },
                    { label: 'ارتداد', value: '24%', change: '-5%', color: 'text-orange-400' },
                ].map((stat, i) => (
                    <Card key={i} className="group hover:border-[var(--wat-primary)] transition-all duration-300">
                        <CardContent className="p-6">
                            <p className="text-sm text-[var(--wat-text-muted)] mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                                {stat.value}
                            </div>
                            <p className={`text-xs ${stat.color} font-mono`}>{stat.change} مقارنة بالشهر الماضي</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Placeholder (Visual only for now) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 h-[400px] flex flex-col relative overflow-hidden group">
                    <CardHeader>
                        <CardTitle className="text-white">نمو العملاء</CardTitle>
                    </CardHeader>
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4">
                        {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 80, 100].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="w-full bg-[var(--wat-primary)]/20 rounded-t-sm group-hover:bg-[var(--wat-primary)]/50 transition-all duration-500 hover:!bg-[var(--wat-primary)]"
                            >
                                <div className="w-full h-1 bg-[var(--wat-primary)] opacity-50" />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 h-[400px] flex flex-col relative overflow-hidden text-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_70%)] animate-pulse-slow" />
                    <div className="z-10">
                        <div className="text-6xl mb-4">🌍</div>
                        <h3 className="text-xl font-bold text-white mb-2">التوزيع الجغرافي</h3>
                        <p className="text-[var(--wat-text-muted)]">جاري تجميع البيانات من العقد العالمية...</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
