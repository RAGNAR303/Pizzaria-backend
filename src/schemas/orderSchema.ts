
import { z } from 'zod'


export const createOrderSchema = z.object({
    body: z.object({
        table: z.number("O campo mesa e obrigatório").min(1, "O campo mesa e obrigatório"),
        name: z.string().optional()
    })
})

export const listOrdersSchema = z.object({
    query: z.object({
        draft: z.string().optional()
    })
})


export const addOrdersSchema = z.object({
    body: z.object({
        amount: z.number().min(1, "O campo quantidade obrigatório"),
        product_id: z.string("O campo quantidade obrigatório").min(1, "O campo id do produto obrigatório"),
        order_id: z.string("O campo id do pedido obrigatório").min(1, "O campo id do pedido obrigatório")
    })
})