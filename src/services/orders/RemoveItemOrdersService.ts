import prismaClient from "../../prisma"



interface RemoveItemProps {
    item_id: string
}


class RemoveItemOrdersService {
    async execute({ item_id }: RemoveItemProps) {


        try {


            const exitiItem = await prismaClient.item.findFirst({
                where: {
                    id: item_id
                }
            })

            if (!exitiItem) {
                throw new Error("Item não existe no pedido")
            }


            const removeItem = await prismaClient.item.delete({
                where: {
                    id: exitiItem.id,

                }
            })
            return removeItem
        } catch (error) {
            console.log(error)
            throw new Error("Error em remover o item do pedido")
        }



    }
}

export { RemoveItemOrdersService }