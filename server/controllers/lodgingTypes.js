const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllLodgingTypes = async (req, res) => {
  try {
    const lodgingTypes = await prisma.lodging_types.findMany({});
  
    if (lodgingTypes && lodgingTypes.length > 0) {
      return res.status(200).json(lodgingTypes);
    }
    return res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error fetching lodging types:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getSingleLodgingType = async (req, res) => {
  const { lodgingTypeId } = req.params; //it must matche the route parameter name

  try {
    const lodgingType = await prisma.lodging_types.findUnique({
      where: { 
        id: parseInt(lodgingTypeId), 
      },
    });

    if (lodgingType) {
      return res.status(200).json(lodgingType);
    }
    return res.sendStatus(404); // Not Found
  } catch (error) {
    console.error("Detailed Error:", error); // Log detailed error
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

module.exports = { getAllLodgingTypes, getSingleLodgingType };
