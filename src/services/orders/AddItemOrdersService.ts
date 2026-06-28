import prismaClient from "../../prisma"


interface AddItemOrdersProps {
    amount: number
    product_id: string
    order_id: string
}

class AddItemOrdersService {
    async execute({ amount, order_id, product_id }: AddItemOrdersProps) {



        try {
            const exitsOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })
            if (!exitsOrder) {
                throw new Error("Pedido não existe")
            }

            const exitsProduct = await prismaClient.product.findFirst({
                where: {
                    id: product_id,
                    disabled: false
                }
            })
            if (!exitsProduct) {
                throw new Error("Produto não existe ou desabilitado")
            }

            const addItem = await prismaClient.item.create({
                data: {
                    amount: amount,
                    product_id: product_id,
                    order_id: order_id
                },
                select: {
                    id: true,
                    amount: true,
                    order: {
                        select: {
                            id: true,
                            name: true,
                            table: true
                        }
                    },
                    product: {
                        select: {
                            id: true,
                            price: true,
                            name: true,
                            banner: true,
                            category: {
                                select: {
                                    name: true
                                }
                            },

                        },

                    }

                }
            })

            return addItem
        } catch (error) {
            console.log(error)
            throw new Error("Erro em adicionar item")
        }



    }
}

export { AddItemOrdersService }