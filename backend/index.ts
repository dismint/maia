import express from 'express'
import { prisma } from './prisma'
import cors from 'cors'

const app = express()
const port = 3000

// 👇 Middleware to parse JSON bodies
app.use(express.json())

app.use(cors())

// Health check
app.get('/', (_req, res) => {
  res.send('Hello, World!')
})

// 👇 Create User endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { email, name } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? null
      }
    })

    return res.status(201).json(user)
  } catch (error: any) {
    // Handle unique constraint error (email already exists)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' })
    }

    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
