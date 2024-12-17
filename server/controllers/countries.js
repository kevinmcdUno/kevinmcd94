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
  const formattedCountries = countries.map(country => ({
    country_id: country.id,
    name: country.name,
    language: country.languages.name,
    currency: country.currencies.name
  }))

    if (formattedCountries && formattedCountries.length > 0) {
      return res.status(200).json(formattedCountries);
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
    const formattedCountry = {
      country_id: country.id,
      name: country.name,
      language: country.languages.name,
      currency: country.currencies.name
    }
  if (formattedCountry) {
    return res.status(200).json(formattedCountry);
  }
  return res.sendStatus(204);
}

module.exports = { getAllCountries, getSingleCountry };
