const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCountries = async (req, res) => { 
    
    const countries = await prisma.countries.findMany({
    include: {
      languages: {
        select: {
          name: true
        }
      },
      currencies: {
        select:{
          name: true
        }
      }
    }
  });
  
    if (countries && countries.length > 0) {
      return res.status(200).json(countries);
    }
    return res.sendStatus(204);
}


const getSingleCountry = async (req, res) => {     
  const { countryId } = req.params
   const country = await prisma.countries.findUnique({
      where: { 
        id: parseInt(countryId)
      },
      include: {
        languages:{
          select:{
            name: true
          }
        },
        currencies: {
          select:{
            name: true
          }
        }
      }
    },  
    );
  if (country) {
    return res.status(200).json(country);
  }
  return res.sendStatus(204);
}

module.exports = { getAllCountries, getSingleCountry };
