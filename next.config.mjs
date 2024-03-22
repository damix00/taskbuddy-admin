/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/analytics",
                permanent: true,
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
