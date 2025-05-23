const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTransportModeTypes = async (req, res) => {
  try {
    const transportModeTypes = await prisma.transport_mode_types.findMany({});
  
    if (transportModeTypes && transportModeTypes.length > 0) {
      return res.status(200).json(transportModeTypes);
    }
    return res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error fetching transport mode types:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getSingleTransportModeType = async (req, res) => {
  const { transportModeTypesId } = req.params; // Use correct param name
  try {
    const transportModeType = await prisma.transport_mode_types.findUnique({
      where: { 
        id: parseInt(transportModeTypesId), // Use correct param
      },
    });
    
    if (transportModeType) {
      return res.status(200).json(transportModeType);
    }
    return res.sendStatus(404); // Not Found
  } catch (error) {
    console.error("Detailed Error:", error); // Log detailed error
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
}

module.exports = { getAllTransportModeTypes, getSingleTransportModeType };
