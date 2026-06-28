
import prismaClient from "../../prisma"

interface ListDetailsProps {
    order_id: string
}

class ListOrdersDetailsService {
    async execute({ order_id }: ListDetailsProps) {


        try {
            const exitsOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                },
                select: {
                    table: true,
                    name: true,
                    draft: true,
                    status: true,
                    createdAt: true,
                    items: {

                        select: {
                            id: true,
                            amount: true,

                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    banner: true,
                                    category: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            })

            if (!exitsOrder) {
                throw new Error("Pedido não existe")
            }


            return exitsOrder
        } catch (error) {
            console.log(error)
            throw new Error("Error em exibir detalhes do pedido")
        }

    }
}
export { ListOrdersDetailsService }