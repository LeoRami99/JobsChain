import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import ProviderWallet from "@/app/walletProvider";

const inter = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JobsChain",
	description: "JobsChain es una plataforma que te ayuda a encontrar el trabajo de tus sueños.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={inter.className} data-theme="light">
				<ProviderWallet>{children}</ProviderWallet>
			</body>
		</html>
	);
}
