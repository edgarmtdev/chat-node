import busboy from 'busboy'
import { Router } from 'express'
import upload from '../middlewares/files/upload'
import Files from '../services/files'

function files(app) {
    const router = Router()
    app.use('/api/files', router)
    const filesService = new Files()

    router.get('/download/:fileName', async (req, res) => {
        const { fileName } = req.params
        const result = await filesService.download(fileName)

        if (result.success) {
            result.data.pipe(res)
        } else {
            return res.status(400).json(result)
        }

    })

    router.post('/upload', async (req, res) => {
        let filePromise
        const bb = busboy({ headers: req.headers })
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info
            filePromise = filesService.upload(filename, file)
        })

        bb.on('close', async () => {
            console.log('Done parsing form!');
            const result = await filePromise
            res.json(result)
        })
        req.pipe(bb)
    })

    router.delete('/delete/:fileName', upload.single('file'), async (req, res) => {
        const { fileName } = req.params
        const result = await filesService.delete(fileName)
        return res.json(result)
    })
}

export default files