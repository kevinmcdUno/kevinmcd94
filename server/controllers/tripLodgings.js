const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTripLodging = async (req, res) => {
    const { tripId, lodgingTypeId, cost } = req.body;
    const createdTripLodging = await prisma.trip_lodgings.create({
      data: {
        trip_id: tripId,
        lodging_type_id: lodgingTypeId,
        cost: cost,
      },
    })

    res.status(201).json(createdTripLodging);

  }

  const getSingleTripLodging = async (req, res) => {
    const { tripLodgingId } = req.params;
  
    const tripLodging = await prisma.trip_lodgings.findUnique({
      where: {
        id: parseInt(tripLodgingId),
      },
    });
  
    if (tripLodging) {
      return res.status(200).json(tripLodging);
    }
  
    return res.sendStatus(404);
  };

const getAllTripLodgings = async (req, res) => {
    const tripLodgings = await prisma.trip_lodgings.findMany();
    
    if (tripLodgings && tripLodgings.length > 0) {
      res.status(200).json(tripLodgings);
    } 
      res.sendStatus(204);
    }

    const updateSingleTripLodging = async (req, res) => {
      const { tripId, lodgingTypeId, cost } = req.body;
      const { tripLodgingId } = req.params; 
      await prisma.trip_lodgings.update({
        where: {
          id: parseInt(tripLodgingId),
        },
        data: {
          trip_id: tripId,
          lodging_type_id: lodgingTypeId,
          cost: cost,
        },
      });
    
      res.sendStatus(204);
    };
    
    const deleteTripLodging = async (req, res) => {
      const { tripLodgingId } = req.params;
    
      await prisma.trip_lodgings.delete({
        where: {
          id: parseInt(tripLodgingId),
        },
      });
    
      res.sendStatus(204);
    };


module.exports = { createTripLodging, getSingleTripLodging, getAllTripLodgings, updateSingleTripLodging, deleteTripLodging };
