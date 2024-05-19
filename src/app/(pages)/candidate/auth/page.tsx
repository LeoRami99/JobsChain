"use client";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
const Auth = () => {
	const account = useAccount();
	const [stateForm, setStateForm] = useState("login");
	useEffect(() => {
		if (account) {
			if (account.address === undefined || account.address === null) {
				console.log(account);
			}
		}
	}, [account]);
	function login() {
		return (
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure className="px-10 pt-10">
					<img src="../JobsChain.png" alt="JobsChain Logo" className="rounded-xl w-[200px]" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Login</h2>
					<p>Inicia Sesión con tu wallet</p>
					<div className="card-actions">
						<ConnectButton />
					</div>
				</div>
			</div>
		);
	}

	function register() {
		return (
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure className="px-10 pt-10">
					<img src="../JobsChain.png" alt="JobsChain Logo" className="rounded-xl w-[200px]" />
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Registro</h2>
					{/* registar con campos */}
					<input type="text" placeholder="Nombres completos" className="input input-bordered w-full" />
					<input type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" className="input input-bordered w-full" />
					<input type="date" placeholder="fecha de nacimiento" className="input input-bordered w-full" />
					<input type="tel" placeholder="Número de télefono" className="input input-bordered w-full" />
					{/* button of connection of wallet to extract walllet addres*/}
					<ConnectButton accountStatus="address" />
					<div className="card-actions">
						<button className="btn btn-primary btn-sm rounded-box">Registrar</button>
					</div>
				</div>
			</div>
		);
	}

	const handleForm = (form: string) => {
		setStateForm(form);
	};

	function handleFormButton() {
		return (
			<div className="flex mb-5 join">
				<button onClick={() => handleForm("login")} className="btn btn-sm btn-primary join-item rounded-badge" disabled={stateForm === "login"}>
					Login
				</button>
				<button onClick={() => handleForm("register")} className="btn btn-sm btn-primary join-item rounded-badge" disabled={stateForm === "register"}>
					Registrar
				</button>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center w-full flex-col h-screen">
			<div className="mt-5 flex justify-center items-center flex-col">
				{handleFormButton()}
				{stateForm === "login" ? login() : register()}
			</div>
		</div>
	);
};
export default Auth;
