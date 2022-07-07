import { Router } from 'express' 
import upload from '../middlewares/upload' 
import Files from '../services/files' 

function files(app) {
    const router = Router()
    app.use('/api/files', router)
    const filesService = new Files()

    router.post('/upload', upload.single('file'), async (req, res) => {
        const { buffer, originalname } = req.file

        const result = await filesService.upload(originalname, buffer)
        return res.json(result)
    })
}

export default files