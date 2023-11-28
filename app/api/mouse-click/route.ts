
import { auth } from "@clerk/nextjs";

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { NextResponse } from "next/server";
import { db } from "@/lib/db";


const prisma = new PrismaClient();

export async function GET(req: Request, {params} : {params: {testId:string}}) {
    try {
        const {userId, orgId} = auth()

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
          }

          const 
    }
    
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { timestamp, reason } = req.body;

    try {
      await prisma.mouseClick.create({
        data: {
          timestamp,
          reason,
        },
      });

      res.status(200).json({ success: true, message: 'Mouse click data saved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
