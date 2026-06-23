import { z } from 'zod'


export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, { message: "O nome deve ter no minimo 3 letras" }),
        email: z.email({ message: "Precisa ser uma email válido" }),
        password: z.string({ message: "A senha e obrigatória" }).min(8, { message: "A senha deve ter no minimo 8 caracteres" })
    })
})

export const authUserSchema = z.object({
    body: z.object({
        email: z.email({ message: "Precisa ser uma email válido" }),
        password: z.string({ message: "A senha e obrigatória" }).min(1, { message: "A senha e obrigatória" })
    })
})