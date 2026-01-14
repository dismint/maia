import express from 'express'
import { prisma } from './prisma'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
