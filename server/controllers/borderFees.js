const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBorderFees = async (req, res) => {
  try {
    const borderFees = await prisma.border_fees.findMany({
      include: {
       countries: {
        select: {
          name: true
        }
       }
      },
    });

    const formattedBorderFees = borderFees.map(fee => ({
      id: fee.id,
      cost: fee.cost,
      country: fee.countries.name
    }))

    if (formattedBorderFees.length > 0) {
      return res.status(200).json(formattedBorderFees);
    } else {
      return res.status(404).json({ error: 'No border fees found' });
    }
  } catch (error) {
    console.error('Error retrieving border fees:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};


const getSingleBorderFees = async (req, res) => {     
  const { borderFeesId } = req.params
   const borderFee = await prisma.border_fees.findUnique({
      where: { 
        id: parseInt(borderFeesId),
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

    const formattedBorderFee = {
      id: borderFee.id,
      cost: borderFee.cost,
      country: borderFee.countries.name
    }

  if (formattedBorderFee) {
    return res.status(200).json(formattedBorderFee);
  }
  return res.sendStatus(204);
}

module.exports = { getBorderFees, getSingleBorderFees };