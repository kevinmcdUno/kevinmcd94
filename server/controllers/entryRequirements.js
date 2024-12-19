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
    
    const formattedEntry = entryRequirements.map(entry => ({
      id: entry.id,
      cost: entry.cost,
      exceedsMaxDays: entry.exceeds_max_days,
      borderFeeId: entry.border_fee_id,
      country: entry.countries.name,
      borderFees: entry.border_fees.cost,
      visaType: entry.visa_types.name 
    }));

    if (formattedEntry.length > 0) {
      return res.status(200).json(formattedEntry);
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
        }  
    );

    const formattedEntry = {
     id: entryRequirement.id,
     cost: entryRequirement.cost,
     exceedsMaxDays: entryRequirement.exceeds_max_days,
     borderFeeId: entryRequirement.border_fee_id,
     visaTypeId: entryRequirement.visa_type_id,
     country: entryRequirement.countries.name,
     borderFee: entryRequirement.border_fees.cost,
     visaType: entryRequirement.visa_types.name
    }

  if (formattedEntry) {
    return res.status(200).json(formattedEntry);
  }
  return res.sendStatus(204);
}

module.exports = { getEntryRequirements, getSingleEntryRequirements };
