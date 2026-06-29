import prismaClient from "../../prisma";




interface FinishOrderProps {
    order_id: string,

}


class FinishOrderService {

    async execute({ order_id }: FinishOrderProps) {


        try {

            const existOrder = await prismaClient.order.findFirst({
                where: {
                    id: order_id,
                    draft: false
                }
            })

            if (!existOrder) {
                throw new Error("Pedido não existe no banco")
            }



            const updateStatusOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    status: true,
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

            return updateStatusOrder


        } catch (error) {
            console.log(error)
            throw new Error("Error em atualizar pedido")
        }

    }
}

export { FinishOrderService }