
import { z } from 'zod'


export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, "O nome do produto e obrigatório"),
        price: z.string().min(1, "O preço do produto e obrigatório"),
        description: z.string().min(1, "O descrição do produto e obrigatório"),
        category_id: z.string("O categoria do produto e obrigatório")
    })
})


export const listProductSchema = z.object({
    query:
        z.object({
            disabled: z.string().optional()
        })

})

export const DeleteProductSchema = z.object({
    query: z.object({
        product_id: z.string("Obrigatório mandar o ID do produto para ser desabilitado")
    })
})

export const ListProductByCategoriaSchema = z.object({
    query: z.object({
        category_id: z.string("Obrigatório mandar o ID do categoria para buscar")
    })
})

