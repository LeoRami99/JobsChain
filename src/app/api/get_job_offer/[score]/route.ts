import prisma from "@/app/model/prisma";

type Params = {
	score: number;
};

export async function GET(request: Request, context: { params: Params }) {
	const score = context.params.score;
	console.log(score);
	const getJobs = await prisma.jobOffer.findMany({
		where: {
			requiredScore: {
				lte: parseInt(score.toString()),
			},
		},
		include: {
			habilities: {
				select: {
					name: true,
				},
			},
			categories: {
				select: {
					name: true,
				},
			},
		},
	});

	if (getJobs) {
		return Response.json({ jobOffer: getJobs });
	} else {
		return Response.json({ message: "No hay ofertas disponibles por el momento." });
	}
}
