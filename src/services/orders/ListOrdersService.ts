import prismaClient from "../../prisma";



interface ListOrderProps {
    draft?: string
}


class ListOrdersService {
    async execute({ draft }: ListOrderProps) {


        try {
            const orders = await prismaClient.order.findMany({
                where: {
                    draft: draft ? false : true
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    status: true,
                    draft: true,
                    createdAt: true,
                    items: {
                        select: {
                            id: true,
                            product: true,
                            amount: true
                            ,
                        }
                    }

                }
            })

            if (!orders) {
                throw new Error("Nenhum pedido foi criado")
            }

            return orders
        } catch (error) {
            throw new Error("Erro em exibir pedidos")
        }




    }
}

export { ListOrdersService }