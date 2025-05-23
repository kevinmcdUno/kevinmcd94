const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTrip = async (req, res) => {
  const { name, description, startDate, endDate, userId } = req.body;
  const newTrip = await prisma.trips.create({
    data: {
      name: name,
      description: description,
      start_date: startDate, 
      end_date: endDate,
      users: { connect: { id: parseInt(userId) } }
    }
  });

  const response = {
    id: newTrip.id,
    name: newTrip.name,
    description: newTrip.description,
    startDate: newTrip.start_date,
    endDate: newTrip.end_date,
    userId: newTrip.users_id,
  }

  res.status(201).json(response);
};

const getAllTrips = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const trips = await prisma.trips.findMany({
    where: {
      users_id: parseInt(userId),
    },
    include: {
      trip_countries: {
        include: {
          countries: {
            select: { name: true },
          },
        },
      },
      trip_transports: {
        select: {
          cost: true,
          transport_mode_types: {
            select: { description: true },
          },
        },
      },
      trip_lodgings: {
        select: {
          cost: true,
          lodging_types: {
            select: { description: true },
          },
        },
      },
      users: {
        select: {
          id: true,
          email: true,
          first_name: true,
          second_name: true,
        },
      },
    },
  });

  const formattedTrips = trips.map(trip => ({
    tripId: trip.id,
    name: trip.name,
    startDate: trip.start_date,
    endDate: trip.end_date,
    countries: trip.trip_countries.map(tc => tc.countries.name),
    transports: trip.trip_transports.map(tt => ({ 
      description: tt.transport_mode_types.description,
      cost: tt.cost
                 })),
    lodgings: trip.trip_lodgings.map(tl =>({
      description: tl.lodging_types.description,
      cost: tl.cost
    })),
    user: {
      id: trip.users.id,
      email: trip.users.email,
      forename: trip.users.first_name,
      surname: trip.users.second_name
    }
  }));

  if (formattedTrips.length > 0) {
    return res.status(200).json(formattedTrips);
  }

  return res.sendStatus(204);
};


const getSingleTrip = async (req, res) => {
  const { tripId } = req.params;
  const trip = await prisma.trips.findUnique({
    where: {
      id: parseInt(tripId),
    },
    include: {
      trip_countries: {
        include: {
          countries: {
            select: {
              name: true
            }
          }
        }
      },
      trip_transports: {
        include: {
          transport_mode_types: {
            select: {
              description: true
            }
          }
        }
      },
      trip_lodgings: {
        include: {
          lodging_types: {
            select: {
              description: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          email: true,
          first_name: true,
          second_name: true,

        }
      }
    },
  });
  if (!trip) {
    return res.sendStatus(204);
  }

  const formattedTrip = {
    tripId: trip.id,
    name: trip.name,
    startDate: trip.start_date,
    endDate: trip.end_date,
    countries: trip.trip_countries.map(tc => tc.countries.name),
    transports: trip.trip_transports.map(tt => tt.transport_mode_types.description),
    lodgings: trip.trip_lodgings.map(tl => tl.lodging_types.description),
    user: {
      id: trip.users.id,
      email: trip.users.email,
      forename: trip.users.first_name,
      surname: trip.users.second_name
    }
  };


  return res.status(200).json(formattedTrip);

};

const updateTrip = async (req, res) => {
  const { name, startDate, endDate, userId } = req.body;
  const { tripId } = req.params;
  try {
 const updateTrip = await prisma.trips.update({
    where: {
      id: parseInt(tripId),
    },
    data: {
      name: name,
      start_date: startDate,
      end_date: endDate,
      description: "test",
      users_id: parseInt(userId),
    },
  });

  const formatTrip = {
    id: updateTrip.id,
    name: updateTrip.name,
    startDate: updateTrip.start_date,
    endDate: updateTrip.end_date,
    userId: updateTrip.users_id,
  };

  res.status(200).json(formatTrip);
} catch (error) {
  console.error("Error updating user:", error);
  res.status(500).json({ error: "Internal server error" });
}
};

const deleteTrip = async (req, res) => {
  const { tripId } = req.params;
  try {
    // Check if there are any trip countries associated with the trip
    const tripCountriesCount = await prisma.trip_countries.count({
      where: {
        trip_id: parseInt(tripId),
      },
    });
    if (tripCountriesCount > 0) {
      // Handle the case where trip countries exist (e.g., prompt the user)
      res.status(400).json({ error: "Trip cannot be deleted because trip countries exist" });
      return;
    }
    // If no trip countries exist, proceed with deleting the trip
    await prisma.trips.delete({
      where: {
        trip_id: parseInt(tripId),
      },
    });
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "An error occurred while deleting the trip" });
  }
};

module.exports = {
  getAllTrips,
  getSingleTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
