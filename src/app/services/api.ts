import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
});

export const getProfile = async (address: string) => {
	const { data } = await api.get(`/get_candidate_id/${address}`);
	return data;
};
interface Profile {
	wallet_id: string;
	email: string;
	name: string;
	last_name: string;
	phone: string;
}
export const createProfile = async (dataProfile: Profile) => {
	const { data } = await api.post(`/add_candidate`, {
		...dataProfile,
	});
	return data;
};

export const obtenerOfertasByPuntuacion = async (puntuacion: number) => {
	const { data } = await api.get(`/get_job_offer/${puntuacion}`);
	return data;
};
