import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.json({hola:'Mundo'})
})


export default app