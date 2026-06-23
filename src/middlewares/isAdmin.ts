
import prismaClient from "../prisma/index";
import { Request, Response, NextFunction } from 'express'


export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId = req.user_id

    if (!userId) {
        res.status(401).json({ error: "Usuario sem permissão" })
        return
    }

    const admin = await prismaClient.user.findFirst({
        where: {
            id: userId
        },
        select: {
            role: true
        }
    })


    if (!admin || admin?.role !== "ADMIN") {
        res.status(401).json({ error: "Usuario sem permissão" })
        return
    }



    next()
}