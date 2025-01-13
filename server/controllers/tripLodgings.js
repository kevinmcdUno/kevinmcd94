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

    const formattedLodging = {
      id : createdTripLodging.id,
      cost: createdTripLodging.cost,
      tripId: createdTripLodging.trip_id,
      lodgingTypeId: createdTripLodging.lodging_type_id
    }

    res.status(201).json(formattedLodging);

  }

  const getSingleTripLodging = async (req, res) => {
    const { lodgingTypesId } = req.params; // Use correct param name
    try {
      // Ensure that lodgingTypesId is parsed as an integer
      const lodgingType = await prisma.lodging_types.findUnique({
        where: { 
          id: parseInt(lodgingTypesId), // Parse the parameter to ensure it's an integer
        },
      });
  
      if (lodgingType) {
        return res.status(200).json(lodgingType);
      }
      return res.sendStatus(404); // Not Found
    } catch (error) {
      console.error("Error fetching single lodging type:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

const getAllTripLodgings = async (req, res) => {
    const tripLodgings = await prisma.trip_lodgings.findMany();
    
  const formattedLodgings = tripLodgings.map( tripLodge => ({
    id: tripLodge.id,
    cost: tripLodge.cost,
    tripId: tripLodge.trip_id,
    lodgingTypeId: tripLodge.lodging_type_id
  })
)

    if (formattedLodgings && formattedLodgings.length > 0) {
    return res.status(200).json(formattedLodgings);
    } else {
      res.sendStatus(204);
    }
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
