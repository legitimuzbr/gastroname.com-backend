import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

class UserController {
  
  constructor() {
    this.add = this.add.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = await db.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  isValidUsername(username) {
    const reservedWords = ['admin', 'support', 'edit', 'delete', 'user', 'profile'];
    const regex = /^[A-Za-z0-9_]{3,15}$/;
    return regex.test(username) && !reservedWords.includes(username.toLowerCase());
  }

  async add(req, res) {
    try {
      
      const user = req.body;

      if (!this.isValidUsername(user.id)) {
        return res.status(400).json({ message: 'Invalid username' });
      }

      const newUser = await db.user.create({
        data: {
          id: user.id,
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


