"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Navbar = () => {
	const [stateButtonProfile, setStateButtonProfile] = useState(false);
	const account = useAccount();
	useEffect(() => {
		if (account) {
			if (account.address === undefined || account.address === null) {
				setStateButtonProfile(false);
			} else {
				setStateButtonProfile(true);
			}
		}
	}, [account]);
	return (
		<div className="navbar bg-[#ffffff] z-[100] shadow-lg top-0 sticky rounded-xl">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl">
					<img src="../JobsChain.png" alt="JobsChain Logo" className="rounded-xl w-[50px]" />
				</a>
			</div>
			<div className="flex-none gap-2">
				<ConnectButton />
				{stateButtonProfile ? (
					<div className="dropdown dropdown-end flex items-center">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src={`${"https://api.dicebear.com/8.x/thumbs/svg?seed="}JhonDoe`} alt="Avatar" className="rounded-full" />
							</div>
						</div>
						<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Navbar;
