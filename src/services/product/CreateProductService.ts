import { Readable } from "node:stream";
import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";




interface ProductProps {
    name: string,
    price: number,
    description: string
    category_id: string
    imageBuffer: Buffer
    imageName: string

}


class CreateProductService {
    async execute({ name, price, description, category_id, imageBuffer, imageName }: ProductProps) {



        // Verificando se exite uam categoria com mesmo ID
        const existsCategory = await prismaClient.category.findFirst({
            where: {
                id: category_id
            },
            select: {
                name: true
            }
        })

        if (!existsCategory) {
            throw new Error("Categoria não existe")
        }

        // Enviar pro CLOUDINARY e salvar a IMAGEM e pegar a URL dela que foi criada
        let bannerURL = ""

        try {

            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: 'pizzaria/products',
                    resource_type: 'image',
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })

                // Criar o stream do  buffer e fazer o pipe para cloudinary

                const bufferStream = Readable.from(imageBuffer)
                bufferStream.pipe(uploadStream)

            })

            bannerURL = result.secure_url

        } catch (error) {
            console.log(error)
            throw new Error("Erro e fazer upload da imagem!")
        }

        // Salvar a URL da IMAGEM e os DADOS do produto no BANCO como um NOVO PRODUTO

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: Number(price),
                description: description,
                banner: bannerURL,
                category_id: category_id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category: true,
                disabled: true,
                createdAt: true

            }
        })


        return product
    }

}


export { CreateProductService }