const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller function for user login
const login = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  try {
    // Find user by email using Prisma
    const user = await prisma.users.findUnique({
      where: { email }, // Make sure the field name matches exactly
    });

    // If no user is found or passwords do not match
    if (!user) {
      console.error('User not found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      console.error('Password mismatch for user with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

module.exports = {
  login,
};
