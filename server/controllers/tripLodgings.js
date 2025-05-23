const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTripLodging = async (req, res) => {
  const { lodgingTypeId, cost } = req.body;
  const { tripId } = req.params;

  const createdTripLodging = await prisma.trip_lodgings.create({
    data: {
      trip_id: parseInt(tripId),
      lodging_type_id: lodgingTypeId,
      cost: cost,
    },
  });

  const formattedLodging = {
    id: createdTripLodging.id,
    cost: createdTripLodging.cost,
    tripId: createdTripLodging.trip_id,
    lodgingTypeId: createdTripLodging.lodging_type_id,
  };

  res.status(201).json(formattedLodging);
};

const getAllTripLodgings = async (req, res) => {
  const { tripId } = req.params;

  const tripLodgings = await prisma.trip_lodgings.findMany({
    where: {
      trip_id: parseInt(tripId),
    },
    include: {
      lodging_types: true,
    },
});

  const formattedLodgings = tripLodgings.map((tripLodge) => ({
    id: tripLodge.id,
    cost: tripLodge.cost,
    tripId: tripLodge.trip_id,
    lodgingTypeId: tripLodge.lodging_type_id,
    lodgingType: tripLodge.lodging_types?.name,
  }));

  if (formattedLodgings && formattedLodgings.length > 0) {
    return res.status(200).json(formattedLodgings);
  } else {
    res.sendStatus(204);
  }
};

const updateSingleTripLodging = async (req, res) => {
  const {  lodgingTypeId, cost } = req.body;
  const { tripId, tripLodgingId } = req.params;
  try {
    // Step 1: Ensure the loding exists and belongs to the correct trip
    const existingLodging = await prisma.trip_lodgings.findUnique({
      where: {
        id: parseInt(tripLodgingId),
      },
  });

      if ( !existingLodging || existingLodging.trip_id !== parseInt(tripId)) {
        return res.status(404).send("Trip lodging not found for the given trip.")
      }

     //Step 2: Update the lodging
   const updateLodging = await prisma.trip_lodgings.update({
      where: {
        id: parseInt(tripLodgingId),
      },
      data: {
        lodging_type_id: lodgingTypeId,
        cost: cost,
      },
    });

    const formattedTripLodging = {
      id: updateLodging.id,
      tripId: updateLodging.trip_id,
      lodgingTypeId: updateLodging.lodging_type_id,
      cost: updateLodging.cost,
    };

    res.status(200).json(formattedTripLodging);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTripLodging = async (req, res) => {
  const { tripId, tripLodgingId } = req.params;
  try {
    const existingLodging = await prisma.trip_lodgings.findUnique({
      where: { id: parseInt(tripLodgingId)},
    });

    if ( !existingLodging || existingLodging.trip_id !== parseInt (tripId) )
{
  return res.status(404).send("Trip lodging not found for the given trip.");
}
  await prisma.trip_lodgings.delete({
    where: {
      id: parseInt(tripLodgingId),
    },
  });

  res.sendStatus(204);

     }  catch (error) {
    console.error("Error deleting trip lodging:", error);
    res.status(500).send("An error occurred while deleting the trip lodging.");
  }
};

module.exports = {
  createTripLodging,
  getAllTripLodgings,
  updateSingleTripLodging,
  deleteTripLodging,
};
