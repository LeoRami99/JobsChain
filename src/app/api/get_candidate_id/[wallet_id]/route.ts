import prisma from "@/app/model/prisma"

type Params = {
  wallet_id: string
}
 
export async function GET(request: Request, context: { params: Params }) {
  const wallet_id = context.params.wallet_id
  const user = await prisma.user.findUnique({
    where: {
      wallet_id: wallet_id,
    },
    include: {
      offers: {
        select: {
          title: true,
        },
      },}
  })
  if(user){
    return Response.json({user:user})
  }else{
    return Response.json({message:'No existe un usuario con esa wallet'})
  }
}