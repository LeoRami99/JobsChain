"use client";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { createProfile, getProfile } from "@/app/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Auth = () => {
	const router = useRouter();
	const { address, isConnected } = useAccount();
	const [stateForm, setStateForm] = useState("login");

	useEffect(() => {
		if (isConnected && address) {
			// esperar a que se consulte la api
			getProfile(address).then((data) => {
				console.log(data);
				if (data) {
					if (data.user) {
						router.push("/candidate/home");
					} else {
						return;
					}
				} else {
					return;
				}
			});
		}
	}, [address, isConnected, router]);

	const [dataProfile, setDataProfile] = useState({
		wallet_id: "",
		email: "",
		name: "",
		last_name: "",
		phone: "",
	});

	const createProfileFront = async (e: any) => {
		e.preventDefault();
		toast.promise(
			createProfile({
				wallet_id: address as string,
				email: dataProfile.email,
				name: dataProfile.name,
				last_name: dataProfile.last_name,
				phone: dataProfile.phone,
			}),
			{
				loading: "Creando perfil...",
				success: () => {
					router.push("/candidate/profile");
					setDataProfile({
						wallet_id: "",
						email: "",
						name: "",
						last_name: "",
						phone: "",
					});
					return "Perfil creado";
				},
				error: "Error al crear perfil",
			}
		);
	};

	function login() {
		return (
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure className="px-10 pt-10">
					<img src="../JobsChain.svg" alt="JobsChain Logo" className="rounded-xl w-[200px]" />
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
					<img src="../JobsChain.svg" alt="JobsChain Logo" className="rounded-xl w-[200px]" />
				</figure>
				<form className="card-body items-center text-center" onSubmit={createProfileFront}>
					<h2 className="card-title">Registro</h2>
					{/* registar con campos */}
					<input type="text" placeholder="Nombre" className="input input-bordered w-full" onChange={(e) => setDataProfile({ ...dataProfile, name: e.target.value })} value={dataProfile.name} />
					<input type="text" name="Apellidos" id="" className="input input-bordered w-full" placeholder="Apellidos" onChange={(e) => setDataProfile({ ...dataProfile, last_name: e.target.value })} value={dataProfile.last_name} />
					<input type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" className="input input-bordered w-full" onChange={(e) => setDataProfile({ ...dataProfile, email: e.target.value })} value={dataProfile.email} />
					<input type="tel" placeholder="Número de télefono" className="input input-bordered w-full" onChange={(e) => setDataProfile({ ...dataProfile, phone: e.target.value })} value={dataProfile.phone} />
					{/* button of connection of wallet to extract walllet addres*/}
					<ConnectButton accountStatus="address" />
					<div className="card-actions">
						<button className="btn btn-primary btn-sm rounded-box">Registrar</button>
					</div>
				</form>
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
