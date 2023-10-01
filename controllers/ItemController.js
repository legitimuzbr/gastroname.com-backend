import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class ItemController {
  constructor() {

  }


  async getItemsByUserId(req, res) {

    const user = req.query

    const items = await db.item.findMany({
      where: {
        userId: {
          equals: parseInt(user.id)
        }
      }
    })
    

    return res.json(items)

  }

  async add(req, res) {
    
    const newItem = await db.item.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: "http://localhost:8800/files/" + req.file.filename,
        userId: parseInt(req.body.userId),
        price: parseFloat(req.body.price),
      }
    })

    return res.json(newItem)

  }


}

export default ItemController