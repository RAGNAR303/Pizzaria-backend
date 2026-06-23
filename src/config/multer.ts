import multer from "multer";

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024 // 4mb
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const alloewMimes = ['image/png', "image/jpeg", 'image/jpg']

        if (alloewMimes.includes(file.mimetype)) {
            cb(null, true)

        } else {
            cb(new Error("Formato inválido, so aceita arquivos PNG ,JPG E JPEG."))
        }
    }
}