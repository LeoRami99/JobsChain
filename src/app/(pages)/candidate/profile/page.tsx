"use client";
import React, { useEffect, useState } from "react";
import LayoutCandidate from "../components/layout";
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import ranking from "../../../contracts/ranking.json";
import attestationSimulate from "../../../contracts/attestationSimulate.json";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const ProfilePage = () => {
	const { address } = useAccount();
	const [certificationName, setCertificationName] = useState("");
	const { writeContract, isPending, isError, isSuccess } = useWriteContract();

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
		if (profile) {
			console.log("Profile Data:", profile);
		}
		if (error) {
			console.error("Error fetching profile:", error);
		}
	}, [profile, error, attestations]);

	return (
		<LayoutCandidate>
			<div className="flex justify-center items-center flex-col h-screen">
				<div className="card w-[800px] bg-base-100 shadow-xl">
					<figure className="px-10 pt-10">
						<img src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${address}`} alt="Avatar" className="rounded-full size-[100px]" />
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">Perfil</h2>
						<p>Jhon Doe</p>
						<p>jhondoe@gmail.com</p>
						<p>06/08/2000</p>
						<p>3002100794</p>
						{isLoading ? <p>Loading...</p> : profile ? <p>Score: {(profile as { score: number }).score.toString()}</p> : null}
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
						<input type="text" placeholder="Añadir certificación" onChange={(e) => setCertificationName(e.target.value)} className="input input-bordered w-full" />
						<button onClick={addAttestation} className="btn btn-primary btn-sm rounded-box" disabled={isPending}>
							Añadir
						</button>
						<button onClick={updateScore} className="btn btn-secondary btn-sm rounded-box">
							Actualizar Score
						</button>
					</div>
				</div>
			</div>
		</LayoutCandidate>
	);
};

export default ProfilePage;
