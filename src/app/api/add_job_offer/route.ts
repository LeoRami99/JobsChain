import prisma from "@/app/model/prisma"
import { PrismaClient, Prisma } from '@prisma/client'

let message_result='Job offer sucessfully created'

export async function POST(req: { json: () => any; }) {
    const data = await req.json();
    const title = data.title
    const description = data.description
    const author = data.author
    const categories = data.categories
    const salary = data.salary
    const location = data.location
    const habilities = data.habilities
    const requiredScore = data.requiredScore

    console.log(data)
    if (validateFields(title,description,author,categories,salary,location,habilities)) {
      try {
        const user = await prisma.jobOffer.create({
          data: {
            title: title,
            description: description,
            salary: salary,
            location: location,
            author: {connect: {
              wallet_id: author,
            }},
            categories: {
              connect: categories},
            habilities: {
              connect: habilities},
            requiredScore: requiredScore
          },
          include: {
            categories: true,
            habilities:true // Include all posts in the returned object
          },
          
        })
        // Code that might throw an error
      } catch (e) { // Type annotation for the error variable
        console.log(e)
      } finally {  // Optional block, always executes
        // Code that always executes, regardless of errors
        return Response.json({message:message_result})
      }
    }else{
        return Response.json({message:'Campos no validos...'})
    }
    
    
    
    
    
  }

function validateFields(title: any,description: any,salary: any,location: any,author: any,categories: any,habilities: any){
  let validator = false
  if(title.length==0){
    message_result='Mensaje invalido'
  }else if(description.length==0){
    message_result='Descripcion invalida'
  }else if(salary.length==0){
    message_result='Salario invalido '
  }else if(location.length==0){
    message_result='Locacion  invalida'
  }else if(author.length==0){
    message_result='Autor invalido'
  }else if(categories.length==0){
    message_result='Categorias invalidas'
  }else if(habilities.length==0){
    message_result='Habilidades invalidas'
  }else{
    validator = true
  }
  return validator

}