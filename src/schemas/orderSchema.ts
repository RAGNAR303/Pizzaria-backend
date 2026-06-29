
import { z } from 'zod'


export const createOrderSchema = z.object({
    body: z.object({
        table: z.number("O campo mesa e obrigatório")
            .int("Deve ser numero inteiro")
            .positive("Deve ser numero positivo"),
        name: z.string().optional()
    })
})


export const addOrdersSchema = z.object({
    body: z.object({
        amount: z.number("O campo quantidade obrigatório").int("Deve ser numero inteiro").positive("Deve ser numero positivo"),
        product_id: z.string("O campo quantidade obrigatório").min(1, "O campo id do produto obrigatório"),
        order_id: z.string("O campo id do pedido obrigatório").min(1, "O campo id do pedido obrigatório")
    })
})

export const removeOrdersSchema = z.object({
    query: z.object({
        item_id: z.string("ID do item obrigatorio").min(1, "Item do pedido e obrigatorio")
    })
})


export const detailsOrdersSchema = z.object({
    query: z.object({
        order_id: z.string("O campo id do pedido obrigatório").min(1, "O campo id do pedido obrigatório")
    })
})


export const sendDraftOrdersSchema = z.object({
    body: z.object({
        name: z.string("O campo quantidade obrigatório").optional(),
        order_id: z.string("O campo id do pedido obrigatório").min(1, "O campo id do pedido obrigatório")
    })
})


export const finishOrdersSchema = z.object({
    body: z.object({
        order_id: z.string("O campo id do pedido obrigatório").min(1, "O campo id do pedido obrigatório")
    })
})