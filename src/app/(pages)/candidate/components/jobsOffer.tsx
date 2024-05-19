import CardOfferJobs from "../components/cardJobsOffer";
import ModalOffer from "./modalOffer";
interface jobsOfferProps {
	offerJobs: any[];
	loading?: boolean;
	error?: string;
}
import { FaStar, FaBuilding, FaDollarSign, FaMapMarkerAlt, FaWrench } from "react-icons/fa";

const JobsOffer = ({ offerJobs }: jobsOfferProps) => {
	console.log(offerJobs);
	// const offerJobs = [
	// 	{
	// 		id: 1,
	// 		title: "Desarrollador Full Stack",
	// 		company: "Empresa 1",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "1000",
	// 		location: "CABA",
	// 		habilitys: ["React", "Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 4,
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Desarrollador Frontend",
	// 		company: "Empresa 2",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "800",
	// 		location: "CABA",
	// 		habilitys: ["React", "Redux"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 3,
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Desarrollador Backend",
	// 		company: "Empresa 3",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "900",
	// 		location: "CABA",
	// 		habilitys: ["Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 5,
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Desarrollador Full Stack",
	// 		company: "Empresa 4",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "1000",
	// 		location: "CABA",
	// 		habilitys: ["React", "Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 4,
	// 	},
	// 	{
	// 		id: 5,
	// 		title: "Desarrollador Frontend",
	// 		company: "Empresa 5",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "800",
	// 		location: "CABA",
	// 		habilitys: ["React", "Redux"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 3,
	// 	},
	// 	{
	// 		id: 6,
	// 		title: "Desarrollador Backend",
	// 		company: "Empresa 6",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "900",
	// 		location: "CABA",
	// 		habilitys: ["Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 5,
	// 	},
	// 	{
	// 		id: 7,
	// 		title: "Desarrollador Full Stack",
	// 		company: "Empresa 7",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "1000",
	// 		location: "CABA",
	// 		habilitys: ["React", "Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 4,
	// 	},
	// 	{
	// 		id: 7,
	// 		title: "Desarrollador Frontend",
	// 		company: "Empresa 8",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "800",
	// 		location: "CABA",
	// 		habilitys: ["React", "Redux"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 3,
	// 	},
	// 	{
	// 		id: 8,
	// 		title: "Desarrollador Backend",
	// 		company: "Empresa 9",
	// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.",
	// 		salary: "900",
	// 		location: "CABA",
	// 		habilitys: ["Node", "Mongo"],
	// 		categorys: ["Frontend", "Backend"],
	// 		score: 5,
	// 	},
	// ];
	return (
		<>
			<div className="h-screen">
				<div className="container mx-auto">
					<div className="flex justify-center items-center flex-col">
						{offerJobs.length === 0 && (
							<div className="flex justify-center items-center flex-col">
								<h2 className="text-2xl font-bold text_gradient">No hay ofertas disponibles</h2>
								<p className="text-lg text-gray-500">Por favor, intente más tarde</p>
							</div>
						)}
						{offerJobs.map((offer, index) => (
							<>
								<CardOfferJobs id={offer.id} title={offer.title} salary={offer.salary} location={offer.location} habilitys={offer.habilities} categorys={offer.categories} score={offer.requiredScore} description={offer.description} />
								<ModalOffer
									id={`modal-${offer.id}`}
									title={offer.title}
									body={
										<>
											<p>{offer.description}</p>
											<div className="flex flex-wrap gap-4 mb-2">
												<div className="flex items-center">
													<FaStar className="text-yellow-500 mr-1" />
													<span>Puntuación: </span>
													<span className="font-semibold ml-1">{offer.score}</span>
												</div>
												{/* <div className="flex items-center">
													<FaBuilding className="text-blue-500 mr-1" />
													<p>{offer.company}</p>
												</div> */}
												<div className="flex items-center">
													<FaDollarSign className="text-green-500 mr-1" />
													<p>{offer.salary}</p>
												</div>
												<div className="flex items-center">
													<FaMapMarkerAlt className="text-red-500 mr-1" />
													<p>{offer.location}</p>
												</div>
											</div>
											<h3 className="text-sm font-semibold mb-2 flex items-center">
												<FaWrench className="text-gray-700 mr-2" />
												Habilidades:
											</h3>
											<div className="flex flex-wrap gap-1 mb-4">
												{(offer.habilities as any[]).map((hability, index) => (
													<span key={index} className="badge badge-primary text-xs">
														{hability.name}
													</span>
												))}
											</div>

											<div className="flex justify-center items-center mt-2">
												<button className="btn btn-primary btn-sm rounded-badge w-full">Aplicar</button>
											</div>
										</>
									}
								/>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
export default JobsOffer;
