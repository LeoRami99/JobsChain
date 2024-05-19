/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		PROJECT_ID_WALLET_CONNECT: process.env.PROJECT_ID_WALLET_CONNECT,
		NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
	},
};

export default nextConfig;
