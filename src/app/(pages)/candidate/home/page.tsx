import JobsOffer from "../components/jobsOffer";
import LayoutCandidate from "../components/layout";
import HeroJobs from "../components/heroJobs";

const Home = () => {
	return (
		<LayoutCandidate>
			<div className="flex justify-center items-center flex-col">
				<HeroJobs />
				{/* <h1 className="text-2xl font-bold">Home</h1> */}
				<div className="card shadow-xl h-screen overflow-auto -top-[150px] bg-[#ffffff]">
					<div className="card-body">
						<input type="search" name="buscar_oferta" id="buscar_oferta" placeholder="Buscar oferta" className="input input-bordered w-full rounded-badge top-0 sticky" />
						<JobsOffer />
					</div>
				</div>
			</div>
		</LayoutCandidate>
	);
};

export default Home;
