import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://watmedia.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    { url: '', priority: 1, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services/architect-core', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services/visual-pulse', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services/growth-engine', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/sign-in', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/sign-up', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
