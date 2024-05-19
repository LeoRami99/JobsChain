"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
interface ModalOfferProps {
	id: string;
	title: string;
	body: React.ReactNode;
}
const ModalOffer = ({ id, title, body }: ModalOfferProps) => {
	return (
		<dialog id={id} className="modal backdrop-blur">
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">
					<FaTimes />
				</label>
				<div className="card">
					<div className="card-body">
						<h3 className="text-2xl font-bold mb-4 text-center pt-5">{title}</h3>
						<div className="pl-10 pr-10">{body}</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};
export default ModalOffer;
