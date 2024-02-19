import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const { id } = params;
    
    // Get the book with the given ID from the database...
    const book = await prisma.book.findUnique({
        where: {
            id: id
        }
    });

    return NextResponse.json(book, { status: 200 });
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
   const {id}=params;
   const body=await request.json();
   const{title,date}=body;

   const updatedBook=await prisma.book.update({
         where:{
              id
         },
         data:{
             title,date
         }
    });

    return NextResponse.json(updatedBook,{status:200});

   }

   export async function DELETE(request: Request, {params}: {params: {id: string}}) {
   const {id}=params;
   const res=await prisma.book.delete({
    where:{
        id:id
    }
   })
   return NextResponse.json(res,{status:200});
}
    

