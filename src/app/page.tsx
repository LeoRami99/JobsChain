"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push("/candidate/home");
		}, 3000);
	}, []);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24" style={{ backgroundColor: "#1E1E1E" }}>
			<img src="../fondoJobs.png" alt="Fondo JobsChain" className="w-[700px]" />
			<span className="loading loading-infinity loading-lg text-white"></span>
			<h1 className="text-2xl font-bold text-white">Cargando...</h1>
		</main>
	);
}
