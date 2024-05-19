import prisma from "@/app/model/prisma";

export async function POST(req: any) {
	var message_result = "User sussesfully created";
	const data = await req.json();
	const user_id = data.user_id;
	const jobOffer = data.jobOffer;

	if (user_id.length > 0 && jobOffer.length > 0) {
		try {
			const application = await prisma.application.create({
				data: {
					user: {
						connect: {
							wallet_id: user_id,
						},
					},
					jobOffer: {
						connect: {
							id: jobOffer,
						},
					},
				},
			});
			// Code that might throw an error
		} catch (error: unknown) {
			// Type annotation for the error variable
			message_result = "Error";
		} finally {
			// Optional block, always executes
			// Code that always executes, regardless of errors
			return Response.json({ message: message_result });
		}
	} else {
		return Response.json({ message: "Campos no validos..." });
	}
}
