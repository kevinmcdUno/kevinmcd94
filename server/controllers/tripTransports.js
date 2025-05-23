const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTripTransport = async (req, res) => {
  const { transportModeTypeId, cost } = req.body;
  const { tripId } = req.params; 

  try {
    const createdTripTransport = await prisma.trip_transports.create({
      data: {
        trip_id: parseInt(tripId), 
        transport_mode_type_id: transportModeTypeId,
        cost: cost,
      },
    });

    const formattedTransport = {
      id: createdTripTransport.id,
      cost: createdTripTransport.cost,
      tripId: createdTripTransport.trip_id,
      transportModeTypeId: createdTripTransport.transport_mode_type_id,
    };

    res.status(201).json(formattedTransport);
  } catch (error) {
    console.error("Error creating trip transport:", error);
    res.status(500).send("An error occurred while creating the trip transport.");
  }
};

const getAllTripTransports = async (req, res) => {
  const { tripId } = req.params;

  try {
    const tripTransports = await prisma.trip_transports.findMany({
      where: {
        trip_id: parseInt(tripId),
      },
      include: {
        transport_mode_types: true, 
      },
    });

    if (!tripTransports.length) {
      return res.status(204).send(); 
    }

    const formatted = tripTransports.map(transport => ({
      id: transport.id,
      cost: transport.cost,
      tripId: transport.trip_id,
      transportModeTypeId: transport.transport_mode_type_id,
      transportModeType: transport.transport_mode_types?.name, 
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSingleTripTransport = async (req, res) => {
  const { tripId, tripTransportId } = req.params;
  const { transportModeTypeId, cost } = req.body;

  try {
    // Step 1: Ensure the transport exists and belongs to the correct trip
    const existingTransport = await prisma.trip_transports.findUnique({
      where: { id: parseInt(tripTransportId) },
    });

    if (!existingTransport || existingTransport.trip_id !== parseInt(tripId)) {
      return res.status(404).send("Trip transport not found for the given trip.");
    }

    // Step 2: Update the transport
   const updateTransport = await prisma.trip_transports.update({
      where: {
        id: parseInt(tripTransportId),
      },
      data: {
        transport_mode_type_id: transportModeTypeId,
        cost: cost,
      },
    });

    const formattedTransport = {
      id: updateTransport.id,
      tripId: updateTransport.trip_id,
      transportModeType: updateTransport.transport_mode_type_id,
      cost: updateTransport.cost
    }

   res.status(200).json(formattedTransport);
  } catch (error) {
    console.error("Error updating trip transport:", error);
    res.status(500).send("An error occurred while updating the trip transport.");
  }
};

const deleteTripTransport = async (req, res) => {
  const { tripId, tripTransportId } = req.params;

  try {
    // Step 1: Check if the transport exists and belongs to the given trip
    const tripTransport = await prisma.trip_transports.findUnique({
      where: { id: parseInt(tripTransportId) },
    });

    if (!tripTransport || tripTransport.trip_id !== parseInt(tripId)) {
      return res.status(404).send("Trip transport not found for the given trip.");
    }

    // Step 2: Delete the transport
    await prisma.trip_transports.delete({
      where: { id: parseInt(tripTransportId) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting trip transport:", error);
    res.status(500).send("An error occurred while deleting the trip transport.");
  }
};

module.exports = {
  createTripTransport,
  getAllTripTransports,
  updateSingleTripTransport,
  deleteTripTransport,
};
