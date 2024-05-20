const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getEntryRequirements = async (req, res) => {
  try {
    const entryRequirements = await prisma.entry_requirements.findMany({
      include: {
        countries: {
          select: {
            name: true,
          },
        },
        border_fees: {
          select: {
            cost: true,
          },
        },
        visa_types: {
          select: {
            name: true,
          },
        },
      },
    });

    if (entryRequirements.length > 0) {
      return res.status(200).json(entryRequirements);
    } else {
      return res.status(404).json({ error: "No entry requirements found" });
    }
  } catch (error) {
    console.error("Error retrieving entry requirements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleEntryRequirements = async (req, res) => {     
  const { entryRequirementsId } = req.params
   const entryRequirement = await prisma.entry_requirements.findUnique({
      where: { 
        id: parseInt(entryRequirementsId),
      },
        include: {
          countries: {
            select: {
              name: true
            }
          }
        }
    },  
    );
  if (entryRequirement) {
    return res.status(200).json(entryRequirement);
  }
  return res.sendStatus(204);
}

module.exports = { getEntryRequirements, getSingleEntryRequirements };
