import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class ItemController {
  
  constructor() {}

  async getItemsByUserId(req, res) {
    try {
      const user = req.query;
      const items = await db.item.findMany({
        where: {
          userId: {
            equals: parseInt(user.id)
          }
        }
      });
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
  }

  async add(req, res) {
    try {
      const newItem = await db.item.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          image: "https://api.gastroname.com/files/" + req.file.filename,
          userId: parseInt(req.body.userId),
          categoryId: parseInt(req.body.categoryId),
          price: parseFloat(req.body.price),
        }
      });
      return res.status(201).json({ message: 'Item added successfully', data: newItem });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding item', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const item = req.params;
      await db.item.delete({
        where: {
          id: parseInt(item.id)
        }
      });
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
  }

}

export default ItemController;
