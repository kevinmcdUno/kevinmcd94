const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createTripCountry = async (req, res) => {
    const { tripId, countryId } = req.body;

    try {
        const createdTripCountry = await prisma.trip_countries.create({
            data: {
                trip_id: tripId,
                country_id: countryId,
            },
        });

        res.status(201).json(createdTripCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllTripCountries = async (req, res) => {
    try {
        const tripCountries = await prisma.trip_countries.findMany();
        res.status(200).json(tripCountries);
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

        if (!tripCountry) {
            return res.status(404).json({ error: 'Trip Country Association not found' });
        }

        res.status(200).json(tripCountry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTripCountry = async (req, res) => {
    const { tripCountryId } = req.params;
    const { tripId, countryId } = req.body;

    try {
        const updatedTripCountry = await prisma.trip_countries.update({
            where: {
                id: parseInt(tripCountryId),
            },
            data: {
                trip_id: tripId,
                country_id: countryId,
            },
        });

        res.status(200).json(updatedTripCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTripCountry = async (req, res) => {
    const { tripCountryId } = req.params;

    try {
        await prisma.trip_countries.delete({
            where: {
                id: parseInt(tripCountryId),
            },
        });

        res.status(204).end();
    } catch (error) {
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


