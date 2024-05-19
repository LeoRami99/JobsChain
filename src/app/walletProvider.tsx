"use client";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface propsProvider {
	children: React.ReactNode;
}

const ProviderWallet = ({ children }: propsProvider) => {
	const queryClient = new QueryClient();
	const config = getDefaultConfig({
		appName: "JobsChain",
		projectId: process.env.PROJECT_ID_WALLET_CONNECT as string,
		chains: [avalanche, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [avalancheFuji] : [])],
		ssr: true,
	});

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider coolMode>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default ProviderWallet;
