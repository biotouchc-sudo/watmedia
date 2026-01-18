import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'التحليلات',
}

const metrics = [
    { label: 'زيارات الموقع', value: '12,543', change: '+12%', icon: '👁️' },
    { label: 'معدل التحويل', value: '3.2%', change: '+0.5%', icon: '🎯' },
    { label: 'الوقت على الموقع', value: '2:34', change: '+15s', icon: '⏱️' },
    { label: 'معدل الارتداد', value: '42%', change: '-5%', icon: '📉' },
]

const topPages = [
    { page: '/', views: 5243, percentage: 42 },
    { page: '/services', views: 2156, percentage: 17 },
    { page: '/contact', views: 1432, percentage: 11 },
    { page: '/about', views: 987, percentage: 8 },
    { page: '/portfolio', views: 725, percentage: 6 },
]

const trafficSources = [
    { source: 'بحث Google', value: 45, color: 'bg-blue-500' },
    { source: 'مباشر', value: 25, color: 'bg-green-500' },
    { source: 'تواصل اجتماعي', value: 20, color: 'bg-purple-500' },
    { source: 'إحالات', value: 10, color: 'bg-orange-500' },
]

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">التحليلات</h1>
                <p className="text-[var(--wat-text-muted)]">إحصائيات وتحليلات موقعك</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[var(--wat-text-muted)]">{metric.label}</p>
                                    <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
                                    <p className="text-xs text-green-400 mt-1">{metric.change}</p>
                                </div>
                                <span className="text-3xl">{metric.icon}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Pages */}
                <Card>
                    <CardHeader>
                        <CardTitle>أكثر الصفحات زيارة</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        {topPages.map((page, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-white font-mono text-sm">{page.page}</p>
                                    <div className="h-2 bg-[var(--wat-surface)] rounded-full mt-2">
                                        <div
                                            className="h-2 bg-[var(--wat-primary)] rounded-full"
                                            style={{ width: `${page.percentage}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--wat-text-muted)] w-16 text-left">
                                    {page.views.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Traffic Sources */}
                <Card>
                    <CardHeader>
                        <CardTitle>مصادر الزيارات</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                        {trafficSources.map((source, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${source.color}`} />
                                <div className="flex-1">
                                    <p className="text-white">{source.source}</p>
                                    <div className="h-2 bg-[var(--wat-surface)] rounded-full mt-2">
                                        <div
                                            className={`h-2 rounded-full ${source.color}`}
                                            style={{ width: `${source.value}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--wat-text-muted)] w-12 text-left">
                                    {source.value}%
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Note */}
            <Card className="p-6 border-[var(--wat-primary)]/30">
                <div className="flex items-start gap-4">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h3 className="text-white font-semibold mb-1">تحليلات متقدمة</h3>
                        <p className="text-sm text-[var(--wat-text-muted)]">
                            للحصول على تحليلات أكثر تفصيلاً، يمكنك طلب خدمة Growth Engine
                            التي تتضمن إعداد Google Analytics 4 و PostHog.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
