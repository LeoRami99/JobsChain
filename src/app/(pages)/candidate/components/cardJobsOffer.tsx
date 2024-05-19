"use client";
interface cardOfferJobsProps {
	id: number;
	title: string;
	company?: string;
	description: string;
	salary: string;
	location: string;
	habilitys: any[];
	score?: number;
	categorys: any[];
}
const openModal = (id: string) => {
	const modal: any = document.getElementById(id);
	modal?.showModal();
};

import { FaBuilding, FaDollarSign, FaMapMarkerAlt, FaStar, FaWrench, FaTags } from "react-icons/fa";

const CardOfferJobs = ({ id, title, description, salary, location, habilitys, score, categorys }: cardOfferJobsProps) => {
	console.log({ id, title, description, salary, location, habilitys, score, categorys });
	return (
		<div className="w-[600px] bg-base-100 border p-10 m-4 rounded-3xl flex flex-col hover:shadow-2xl transition-shadow duration-300">
			<div className="flex flex-col mb-4">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-xl font-bold text_gradient">{title}</h2>
					<div className="flex items-center">
						<FaTags className="text-gray-700 mr-2" />
						<div className="flex flex-wrap gap-1">
							{categorys.map((category, index) => (
								<span key={index} className="badge badge-secondary text-xs">
									{category.name}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="">
					<p className="text-sm mb-2 text-ellipsis">{description}</p>
					<div className="flex flex-wrap gap-4 mb-2">
						<div className="flex items-center">
							<FaStar className="text-yellow-500 mr-1" />
							<span className="text-sm">Puntuación: </span>
							<span className="text-sm font-semibold ml-1">{score}</span>
						</div>
						{/* <div className="flex items-center">
							<FaBuilding className="text-blue-500 mr-1" />
							<p className="text-sm">{company}</p>
						</div> */}
						<div className="flex items-center">
							<FaDollarSign className="text-green-500 mr-1" />
							<p className="text-sm">{salary}</p>
						</div>
						<div className="flex items-center">
							<FaMapMarkerAlt className="text-red-500 mr-1" />
							<p className="text-sm">{location}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t-2 border-gray-200 pt-4">
				<h3 className="text-sm font-semibold mb-2 flex items-center">
					<FaWrench className="text-gray-700 mr-2" />
					Habilidades:
				</h3>
				<div className="flex flex-wrap gap-1 mb-4">
					{habilitys.map((hability, index) => (
						<span key={index} className="badge badge-primary text-xs">
							{hability.name}
						</span>
					))}
				</div>
				<div className="flex justify-end">
					<button className="btn btn-primary btn-sm  rounded-badge" onClick={() => openModal(`modal-${id}`)}>
						Ver más
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardOfferJobs;
