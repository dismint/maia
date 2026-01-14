import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(req: Request): Promise<Response> {
  try {
    const body = await req.json()
    const { email, name } = body

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email,
        name
      }
    })

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
}
