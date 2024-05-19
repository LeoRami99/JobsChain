import prisma from "@/app/model/prisma";

export async function POST(req: any) {
	var message_result = "Hability sussesfully created";
	const data = await req.json();
	const name = data.name;
	if (name.length > 0) {
		try {
			const user = await prisma.hability.create({
				data: {
					name: name,
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
