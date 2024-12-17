const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (req, res) => { 
    
    const users = await prisma.users.findMany({});

    if (users && users.length > 0) {
      return res.status(200).json(users);
    }
    return res.sendStatus(204);
}


const getSingle = async (req, res) => { 
    
  const { userId } = req.params
   const user = await prisma.users.findUnique({
      where: { 
        id: parseInt(userId)
      }, 
    include: {
    nationalities: {
      select: {
        name: true,
      }
    }
  }
},  
);
  if (user) {
    return res.status(200).json(user);
  }
  return res.sendStatus(204);
}


const createUser = async(req, res) => {
  const { email, forename, surname, password, nationalityId } = req.body;

  // Validate and convert nationalityId
  const parsedNationalityId = parseInt(nationalityId, 10);
  if (isNaN(parsedNationalityId)) {
    return res.status(400).json({ error: "Invalid nationalityId" });
  }
  
  const newUser = await prisma.users.create({
    data: { 
      email: email,
      first_name: forename,
      second_name: surname,
      password: password,
      nationality_id: parsedNationalityId,
    } 
  });
  
  res.status(201).json(newUser);


}

const updateUser = async(req, res) => {
  const { email, forename, surname, password, nationalityId } = req.body
  const { userId } = req.params
    await prisma.users.update({
      where: { 
        id: parseInt(userId)
      },   
      data: { 
        email: email,
        first_name: forename,
        second_name: surname,
        nationality_id: parseInt(nationalityId),
        password: password
  
      } 
  
    })
  
  
    res.sendStatus(204)
  
  
  }

  const deleteUser = async(req, res) => {
    const { userId } = req.params
      await prisma.users.delete({
        where: { 
          id: parseInt(userId)
        },   
    
      })
    
    
      res.sendStatus(204)
    
    
    }
    
  

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser }