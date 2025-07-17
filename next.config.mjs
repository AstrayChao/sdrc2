/** @type {import('next').NextConfig} */


const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_URL || "",
    output: "standalone",
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {key: 'Access-Control-Allow-Origin', value: '*'},
                    {key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS'},
                    {key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization'},
                ],
            },
        ]
    },
}

export default nextConfig
