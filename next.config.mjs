/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/analytics",
                permanent: true,
            },
            {
                source: "/dashboard/users/:uuid/manage",
                destination: "/dashboard/users/:uuid/manage/security",
                permanent: true,
            },
            {
                source: "/dashboard/users/:uuid/sessions/:session_id",
                destination:
                    "/dashboard/users/:uuid/sessions/:session_id/details",
                permanent: true,
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
