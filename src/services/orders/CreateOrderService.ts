import prismaClient from "../../prisma"


interface CreateOrderProps {
    table: number
    name?: string
}


class CreateOrderService {
    async execute({ name, table }: CreateOrderProps) {

        try {
            const createOrder = await prismaClient.order.create({
                data: {
                    table: table,
                    name: name ?? `Cliente da mesa ${table}`
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    status: true,
                    draft: true,
                    createdAt: true,
                }
            })

            return createOrder
        } catch (error) {
            throw new Error("Erro e criar pedido")
        }
    }
}

export { CreateOrderService }