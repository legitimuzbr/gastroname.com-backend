import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class CategoryController {
  
  constructor () {

  }


  async add(req, res) {
    const newCategory = await db.category.create({
      data: {
      name: req.body.name,
      userId: parseInt(req.body.userId)
      }
    })
    return res.json(newCategory)
  }

}

export default CategoryController;