import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class UserController {
  
  constructor() {}

  async getAll(req, res) {
    try {
      const users = await db.user.findMany();
      return res.status(200).json({ message: 'Users fetched successfully', data: users });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  async add(req, res) {
    try {
      const user = req.body;
      const newUser = await db.user.create({
        data: {
          email: user.email,
          name: user.name
        }
      });
      return res.status(201).json({ message: 'User added successfully', data: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding user', error: error.message });
    }
  }

}

export default UserController;

