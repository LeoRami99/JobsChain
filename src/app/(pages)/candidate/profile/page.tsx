"use client";
import React, { useEffect, useState } from "react";
import LayoutCandidate from "../components/layout";
import { useReadContract, useAccount, useWriteContract, useDisconnect } from "wagmi";
import ranking from "../../../contracts/ranking.json";
import attestationSimulate from "../../../contracts/attestationSimulate.json";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getProfile } from "@/app/services/api";

const ProfilePage = () => {
	const router = useRouter();
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAccount();
	const [certificationName, setCertificationName] = useState("");
	const { writeContract, isPending, isError, isSuccess } = useWriteContract();
	const [profileData, setProfileData] = useState({
		wallet_id: "",
		email: "",
		name: "",
		last_name: "",
		phone: "",
	});

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
	function addAttestation() {
		writeContract({
			abi: attestationSimulate,
			address: "0xb3e798f02529f8329830d97590fc65224443f550",
			functionName: "issueCertification",
			args: [address, ethers.keccak256(ethers.toUtf8Bytes(certificationName))],
		});
	}
	const {
		data: attestations,
		error: errorAttestation,
		isLoading: isLoadingAttestation,
	} = useReadContract({
		abi: attestationSimulate,
		address: "0xb3e798f02529f8329830d97590fc65224443f550",
		functionName: "getCertificationsOf",
		args: [address],
	});
	const updateScore = () => {
		const newScore = (attestations as any[]).length * 5;
		if (newScore === 0) {
			toast.error("No se puede actualizar el score sin certificaciones");
			return;
		}
		console.log("New Score:", newScore);
		console.log("Old Score:", (profile as { score: number }).score);
		if (newScore === parseInt((profile as { score: number }).score.toString())) {
			toast.error("El score ya está actualizado");
			return;
		}
		writeContract({
			abi: ranking,
			address: "0x3a5a0bd73fe35aac99e6d41e6fbc4eadb7352afe",
			functionName: "updateScore",
			args: [address, newScore],
		});
	};

	useEffect(() => {
		getProfile(address as string).then((data) => {
			console.log("Data:", data);
			console.log(data.ok === false);
			if (data.ok === false) {
				toast.error("No se pudo obtener la información del usuario");
			} else {
				console.log("Data User:", data.user);
				setProfileData(data.user);
			}
		});
	}, [address]);

	return (
		<LayoutCandidate>
			<div className="flex justify-center items-center flex-col h-screen">
				<div className="card w-[800px] bg-base-100 shadow-xl">
					<figure className="px-10 pt-10">
						<img src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${address}`} alt="Avatar" className="rounded-full size-[100px]" />
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">Perfil</h2>
						<p>
							{profileData.name} {profileData.last_name}
						</p>
						<p>{profileData.email}</p>
						<p>{profileData.phone}</p>
						{isLoading ? <p>Loading...</p> : profile ? <p>Score: {(profile as { score: number }).score.toString()}</p> : null}
						{!errorAttestation ? (
							<>
								{isLoadingAttestation ? (
									<p>Loading Certifications...</p>
								) : (attestations as any[]).length > 0 || undefined ? (
									<div>
										<h3>Certificaciones:</h3>
										<ul>
											{(attestations as any[]).map((attest, index) => (
												<li key={index}>
													<p className="text-wrap text-ellipsis">
														{attest.certificationHash} Emitida el {new Date(parseInt(attest.dateIssued.toString()) * 1000).toLocaleDateString()}
													</p>
												</li>
											))}
										</ul>
									</div>
								) : (
									<p>No tiene certificaciones</p>
								)}
							</>
						) : null}
						<input type="text" placeholder="Añadir certificación" onChange={(e) => setCertificationName(e.target.value)} className="input input-bordered w-1/2" />
						<button onClick={addAttestation} className="btn btn-primary btn-sm rounded-box w-[200px]" disabled={isPending}>
							Añadir
						</button>
						<button onClick={updateScore} className="btn btn-secondary btn-sm rounded-box w-[200px]">
							Actualizar Score
						</button>
					</div>
				</div>
			</div>
		</LayoutCandidate>
	);
};

export default ProfilePage;
