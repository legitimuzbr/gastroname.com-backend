import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class CategoryController {
  
  constructor() {}

  async add(req, res) {
    try {
      const newCategory = await db.category.create({
        data: {
          name: req.body.name,
          userId: parseInt(req.body.userId)
        }
      })
      return res.status(201).json({ message: 'Category added successfully', data: newCategory });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding category', error: error.message });
    }
  }

  async getCategoriesByUserId(req, res) {
    try {
      const user = req.query;
      const categories = await db.category.findMany({
        where: {
          userId: {
            equals: parseInt(user.id)
          }
        }
      })
      return res.status(200).json({ message: 'Categories fetched successfully', data: categories });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const category = req.params;
      await db.category.delete({
        where: {
          id: parseInt(category.id)
        }
      });
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  }
}

export default CategoryController;