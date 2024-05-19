  import prisma from "@/app/model/prisma"

export async function GET( ) {
    // Handle your logic here
    const habilities = await prisma.hability.findMany()
    return Response.json({habilities:habilities})
  }