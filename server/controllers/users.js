const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { email, forename, surname, password, nationalityId } = req.body;

  // Parse and validate nationalityId
  const parsedNationalityId = parseInt(nationalityId, 10);
  if (isNaN(parsedNationalityId)) {
    return res.status(400).json({ error: "Invalid nationalityId" });
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.users.create({
      data: {
        email,
        first_name: forename,
        second_name: surname,
        password: hashedPassword,
        nationality_id: parsedNationalityId,
      },
    });

    const formattedNewUser = {
      id: newUser.id,
      email: newUser.email,
      forename: newUser.first_name,
      surname: newUser.second_name,
      password: newUser.password,
      nationalityId: newUser.nationality_id,
    };

    res.status(201).json(formattedNewUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      first_name: true,
      second_name: true,
      nationality_id: true,
      // Password excluded
    },
  });

  const formattedUsers = users.map((user) => ({
    id: user.id,
    email: user.email,
    forename: user.first_name,
    surname: user.second_name,
    nationalityId: user.nationality_id,
  }));

  if (formattedUsers && formattedUsers.length > 0) {
    return res.status(200).json(formattedUsers);
  }
  return res.sendStatus(204);
};

const getSingle = async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      second_name: true,
      nationality_id: true,
      // Password excluded
    },
  });

  const formattedUser = {
    id: user.id,
    email: user.email,
    forename: user.first_name,
    surname: user.second_name,
    nationalityId: user.nationality_id,
  };
  if (formattedUser) {
    return res.status(200).json(formattedUser);
  }
  return res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { email, forename, surname, nationalityId } = req.body;
  const { userId } = req.params;
  try {
 
      // Parse and validate nationalityId
  const parsedNationalityId = parseInt(nationalityId, 10);
  if (isNaN(parsedNationalityId)) {
    return res.status(400).json({ error: "Invalid nationalityId" });
  }

   const updateUser = await prisma.users.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        email,
        first_name: forename,
        second_name: surname,
        nationality_id: parsedNationalityId,
      },
    });

    const formattedNewUser = {
      id: updateUser.id,
      email: updateUser.email,
      forename: updateUser.first_name,
      surname: updateUser.second_name,
      nationalityId: updateUser.nationality_id,
    };

    res.status(200).json(formattedNewUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await prisma.users.delete({
    where: {
      id: parseInt(userId),
    },
  });

  res.sendStatus(204);
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
