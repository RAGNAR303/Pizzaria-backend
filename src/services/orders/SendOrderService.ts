import prismaClient from "../../prisma";




interface SendOrderProps {
    order_id: string,
    name: string
}


class SendOrderService {

    async execute({ name, order_id }: SendOrderProps) {


        try {

            const existOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if (!existOrder) {
                throw new Error("Pedido não existe no banco")
            }



            const updateOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    draft: false,
                    name: name,
                    updatedAt: new Date()
                },
                select: {
                    id: true,
                    name: true,
                    status: true,
                    draft: true,
                    table: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return updateOrder


        } catch (error) {
            console.log(error)
            throw new Error("Error em atualizar pedido")
        }

    }
}

export { SendOrderService }