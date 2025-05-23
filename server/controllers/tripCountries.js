const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createTripCountry = async (req, res) => {
    const { tripId } = req.params;
    const { countryId } = req.body;

    try {
        const createdTripCountry = await prisma.trip_countries.create({
            data: {
                trip_id: parseInt(tripId),
                country_id: countryId,
            },
        });

        const formattedTripCountry = {
            id: createdTripCountry.id,
            tripId: createdTripCountry.trip_id,
            countryId: createdTripCountry.country_id
        }

        res.status(201).json(formattedTripCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllTripCountries = async (req, res) => {
    const { tripId } = req.params;
  
    try {
      const tripCountries = await prisma.trip_countries.findMany({
        where: { trip_id: parseInt(tripId) },
        include: {
          countries: true  
        }
      });
  
      const formatted = tripCountries.map((tc) => ({
        id: tc.id,
        tripId: tc.trip_id,
        countryId: tc.country_id,
        country: tc.countries?.name 
      }));
  
      res.status(200).json(formatted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


const getTripCountryById = async (req, res) => {
    const { tripCountryId } = req.params;

    try {
        const tripCountry = await prisma.trip_countries.findUnique({
            where: {
                id: parseInt(tripCountryId),
            },
        });

        const formattedTripCountry = {
            id: tripCountry.id,
            tripId: tripCountry.trip_id,
            countryId: tripCountry.country_id
        }

        if (!formattedTripCountry) {
            return res.status(404).json({ error: 'Trip Country Association not found' });
        }

        res.status(200).json(formattedTripCountry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTripCountry = async (req, res) => {
    const {  tripId, tripCountryId } = req.params;
    const { countryId } = req.body;

    try {
        const existingTripCountry = await prisma.trip_countries.findUnique({
            where: {
                id: parseInt(tripCountryId),
            },
        });

           if ( !existingTripCountry || existingTripCountry.trip_id !== parseInt(tripId)) {
        return res.status(404).send("Trip Country not found for the given trip.")
      }

      //Step 2 update the country
       const updatedTripCountry = await prisma.trip_countries.update({
            where: {
                id: parseInt(tripCountryId),
            },
            data: {
                country_id: countryId,
            },
        });

        const formattedTripCountry = {
            id: updatedTripCountry.id,
            tripId: updatedTripCountry.trip_id,
            countryId: updatedTripCountry.country_id
        }

        res.status(200).json(formattedTripCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTripCountry = async (req, res) => {
    const { tripId, tripCountryId } = req.params;

    try{
        const existingTripCountry = await prisma.trip_countries.findUnique({
                where: { id: parseInt(tripCountryId)},
        });
    if (!existingTripCountry || existingTripCountry.trip_id !== parseInt (tripId) )
          {
              return res.status(404).send("Trip Country not found for the given trip.")
        }

        await prisma.trip_countries.delete({
            where: {
                id: parseInt(tripCountryId),
            },
        });

        res.status(204).end();
    } catch (error) {
        console.error("Error deleting trip country: ", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTripCountry,
    getAllTripCountries,
    getTripCountryById,
    updateTripCountry,
    deleteTripCountry
};


