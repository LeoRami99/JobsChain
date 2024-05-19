  import prisma from "@/app/model/prisma"

export async function GET( ) {
    // Handle your logic here
    const categories = await prisma.category.findMany()
    return Response.json({categories:categories})
  }