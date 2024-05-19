"use client";
import JobsOffer from "../components/jobsOffer";
import LayoutCandidate from "../components/layout";
import HeroJobs from "../components/heroJobs";
import { use, useEffect, useState } from "react";
import { obtenerOfertasByPuntuacion } from "@/app/services/api";
import ranking from "../../../contracts/ranking.json";
import { useReadContract, useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home = () => {
	const router = useRouter();
	const { address, isConnected } = useAccount();
	const [dataOfertas, setDataOfertas] = useState([]);
	const {
		data: profile,
		error,
		isLoading,
	} = useReadContract({
		abi: ranking,
		address: "0x3a5a0bd73fe35aac99e6d41e6fbc4eadb7352afe",
		functionName: "getCandidate",
		args: [address],
	});
	useEffect(() => {
		if (!isConnected) {
			router.push("/candidate/auth");
		}
		if (!profile) {
			return;
		}

		obtenerOfertasByPuntuacion(parseInt((profile as { score: number }).score.toString())).then((data) => {
			setDataOfertas(data.jobOffer);
		});
	}, [profile, address, router]);

	return (
		<LayoutCandidate>
			<div className="flex justify-center items-center flex-col">
				<HeroJobs />
				{/* <h1 className="text-2xl font-bold">Home</h1> */}
				<div className="card shadow-xl h-screen overflow-auto -top-[150px] bg-[#ffffff]">
					<div className="card-body">
						<input type="search" name="buscar_oferta" id="buscar_oferta" placeholder="Buscar oferta" className="input input-bordered w-full rounded-badge top-0 sticky" />
						<JobsOffer offerJobs={dataOfertas} />
					</div>
				</div>
			</div>
		</LayoutCandidate>
	);
};

export default Home;
