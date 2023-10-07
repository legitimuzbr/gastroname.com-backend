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


  async getCategoriesByUserId(req, res) {

    const user = req.query

    const categories = await db.category.findMany({
      where: {
        userId: {
          equals: parseInt(user.id)
        }
      }
    })

    return res.json(categories)

  }

  async delete(req, res) {

    const category = req.params;

     await db.category.delete({
          where: {
            id: parseInt(category.id)
        }
      });

      return res.json({ message: 'Category deleted successfully' })

  }

}

export default CategoryController;