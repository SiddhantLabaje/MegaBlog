import { useEffect } from 'react'

const SITE_NAME = 'MegaBlog'
const SITE_URL  = 'https://megablog-1-ankx.onrender.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

/**
 * SEO — sets <title>, <meta> description, Open Graph, and Twitter tags
 * by directly mutating document.head.
 *
 * Usage:
 *   <SEO
 *     title="All Posts"
 *     description="Browse every article published on MegaBlog."
 *     path="/all-posts"
 *   />
 *
 * Props:
 *   title       — page title (appended with " | MegaBlog")
 *   description — meta description (max ~155 chars)
 *   image       — absolute URL for OG/Twitter image (optional)
 *   path        — URL path, e.g. "/all-posts" (optional, defaults to "/")
 *   type        — OG type: "website" | "article" (optional, defaults to "website")
 */
export default function SEO({
    title,
    description,
    image = DEFAULT_IMAGE,
    path  = '/',
    type  = 'website',
}) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Read, Write & Share Ideas`
    const url       = `${SITE_URL}${path}`

    useEffect(() => {
        // ── <title> ──────────────────────────────────────────────────────────
        document.title = fullTitle

        // ── Helper: upsert a <meta> tag ───────────────────────────────────────
        const setMeta = (selector, content) => {
            let el = document.querySelector(selector)
            if (!el) {
                el = document.createElement('meta')
                // derive attribute name from selector, e.g. [name="description"] → name
                const [attr, val] = selector.replace(/[\[\]"]/g, '').split('=')
                el.setAttribute(attr, val)
                document.head.appendChild(el)
            }
            el.setAttribute('content', content)
        }

        const setLink = (rel, href) => {
            let el = document.querySelector(`link[rel="${rel}"]`)
            if (!el) {
                el = document.createElement('link')
                el.setAttribute('rel', rel)
                document.head.appendChild(el)
            }
            el.setAttribute('href', href)
        }

        // ── Primary ───────────────────────────────────────────────────────────
        if (description) setMeta('[name="description"]', description)
        setLink('canonical', url)

        // ── Open Graph ────────────────────────────────────────────────────────
        setMeta('[property="og:title"]',       fullTitle)
        setMeta('[property="og:url"]',         url)
        setMeta('[property="og:type"]',        type)
        if (description) setMeta('[property="og:description"]', description)
        setMeta('[property="og:image"]',       image)

        // ── Twitter ───────────────────────────────────────────────────────────
        setMeta('[name="twitter:title"]',       fullTitle)
        setMeta('[name="twitter:image"]',       image)
        if (description) setMeta('[name="twitter:description"]', description)

    }, [fullTitle, description, image, url, type])

    // Renders nothing — side-effect only
    return null
}
