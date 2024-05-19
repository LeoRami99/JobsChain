import prisma from "@/app/model/prisma"


export async function POST(req: { json: () => any; }) {
    var message_result='User sussesfully created'
    const data = await req.json();
    const wallet_id = data.wallet_id
    const email = data.email
    const name = data.name
    const last_name = data.last_name
    const phone = data.phone
    const company = data.company
    console.log(data)
    if (wallet_id.length>0 &&email.length>0&& name.length>0&&  last_name.length>0&&phone.length>0&&company.length>0) {
      try {
        const user = await prisma.user.create({
          data: {
            wallet_id: wallet_id,
            email: email,
            name : name,
            last_name: last_name,
            phone: phone,
            type: 'recruiter',
            company: company
          },
        })
        // Code that might throw an error
      } catch (error: unknown) { // Type annotation for the error variable
        message_result='Error'
      } finally {  // Optional block, always executes
        // Code that always executes, regardless of errors
        return Response.json({message:message_result})
      }
    }else{
        return Response.json({message:'Campos no validos...'})
    }
    
    
    
    
    
  }