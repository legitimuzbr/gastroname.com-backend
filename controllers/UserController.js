import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class UserController {
  
  constructor () {

  }

  async getAll(req, res) {
    const users = await db.user.findMany()
    return res.status(200).json(users)
  }

  async add(req, res) {


    const user = req.body;

    const newUser = await db.user.create({
      data: {
        email: user.email,
        name: user.name
      }
    })
    return res.json(newUser)
  }

}

export default UserController;

