import prisma from "@/app/model/prisma"

export async function GET( ) {
    // Handle your logic here
    const users = await prisma.user.findMany()
    return Response.json({users:users})
  }