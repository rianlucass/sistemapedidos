import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/restaurante')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype.starsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Arquivo Invalido! Envie uma imagem.'), false)
    }
}

const upload = multer({storage: fileFilter})

export default upload