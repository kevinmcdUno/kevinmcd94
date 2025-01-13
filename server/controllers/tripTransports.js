const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTripTransport = async (req, res) => {
  const { tripId, transportModeTypeId, cost } = req.body;
  try {
    const createdTripTransport = await prisma.trip_transports.create({
      data: {
        trip_id: tripId,
        transport_mode_type_id: transportModeTypeId,
        cost: cost,
      },
    });

    const formattedTransport = {
      id: createdTripTransport.id,
      cost: createdTripTransport.cost,
      tripId: createdTripTransport.trip_id,
      transportModeTypeId: createdTripTransport.transport_mode_type_id
    }
    res.status(201).json(formattedTransport);
  } catch (error) {
    console.error("Error creating trip transport:", error);
    res.status(500).send("An error occurred while creating the trip transport.");
  }
};

const getAllTripTransports = async (req, res) => {
  try {
    const tripTransports = await prisma.trip_transports.findMany();

    const formattedTripTransport = tripTransports.map(transport => ({
      id: transport.id,
      cost: transport.cost,
      tripId: transport.trip_id,
      transportModeTypeId: transport.transport_mode_type_id
    }))
    if (formattedTripTransport && formattedTripTransport.length > 0) {
      return res.status(200).json(formattedTripTransport);
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error fetching trip transports:", error);
    res.status(500).send("An error occurred while fetching trip transports.");
  }
};

const getSingleTripTransport = async (req, res) => {
  const { tripTransportId } = req.params;
  try {
    const tripTransport = await prisma.trip_transports.findUnique({
      where: {
        id: parseInt(tripTransportId),
      },
    });

    const formattedTripTransport = {
      id: tripTransport.id,
      cost: tripTransport.cost,
      tripId: tripTransport.trip_id,
      transportModeTypeId: tripTransport.transport_mode_type_id
    }
    if (formattedTripTransport) {
      return res.status(200).json(formattedTripTransport);
    }
    res.sendStatus(404);
  } catch (error) {
    console.error("Error fetching trip transport:", error);
    res.status(500).send("An error occurred while fetching the trip transport.");
  }
};

const updateSingleTripTransport = async (req, res) => {
  const { tripId, transportModeTypeId, cost } = req.body;
  const { tripTransportId } = req.params;
  try {
    await prisma.trip_transports.update({
      where: {
        id: parseInt(tripTransportId),
      },
      data: {
        trip_id: tripId,
        transport_mode_type_id: transportModeTypeId,
        cost: cost,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error updating trip transport:", error);
    res.status(500).send("An error occurred while updating the trip transport.");
  }
};

const deleteTripTransport = async (req, res) => {
  const { tripTransportId } = req.params;
  try {
    await prisma.trip_transports.delete({
      where: {
        id: parseInt(tripTransportId),
      },
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
  getSingleTripTransport,
  updateSingleTripTransport,
  deleteTripTransport,
};
