import { z } from "zod"


export const createCategorySchema = z.object({
    body: z.object({
        name: z.string("Nome da categoria e obrigatório").min(4, "O nome precisa ser mais de  4 caracteres")
    })
})