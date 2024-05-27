import nextra from 'nextra'
import {withPlausibleProxy} from "next-plausible";

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    latex: true,
    defaultShowCopyCode: true
})

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; connect-src 'self' https://discord.com; font-src 'self'; frame-src 'self' https://www.youtube.com; img-src 'self' data: https://avatars.githubusercontent.com https://img.shields.io https://github.com; manifest-src 'self'; media-src 'self'; worker-src 'self';"
    }
]

export default withPlausibleProxy({
    customDomain: process.env.PLAUSIBLE_URL
})>(withNextra({
    reactStrictMode: true,
    cleanDistDir: true,
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    },
    redirects: async () => {
        return [
            {
                source: '/discord',
                destination: process.env.NEXT_PUBLIC_DISCORD_LINK,
                permanent: false,
            },
            {
                source: '/github',
                destination: process.env.NEXT_PUBLIC_GITHUB_LINK,
                permanent: false,
            },
            {
                source: '/spigot',
                destination: process.env.NEXT_PUBLIC_SPIGOT_LINK,
                permanent: false,
            },
            {
                source: '/donate',
                destination: process.env.NEXT_PUBLIC_DONATE_LINK,
                permanent: false,
            },
            {
                source: '/bstats',
                destination: process.env.NEXT_PUBLIC_BSTATS_LINK,
                permanent: false,
            },
            {
                source: '/perms',
                destination: "/docs/configuration/commands-permissions",
                permanent: false,
            },
            {
                source: '/skinurl',
                destination: "/docs/features/skin-url",
                permanent: false,
            },
            {
                source: '/unicode',
                destination: "https://www.mobilefish.com/services/unicode_escape_sequence_converter/unicode_escape_sequence_converter.php",
                permanent: false,
            },
            {
                source: '/firewall',
                destination: "/docs/troubleshooting",
                permanent: false,
            },
            {
                source: '/install',
                destination: "/docs/installation",
                permanent: false,
            },
            {
                source: '/contributors',
                destination: "https://github.com/SkinsRestorer/SkinsRestorer/graphs/contributors",
                permanent: false,
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders
            }
        ]
    },
    images: {
        unoptimized: true
    }
}))
