const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTrip = async (req, res) => {
  const { name, description, start_date, end_date, user_id } = req.body;
  const newTrip = await prisma.trips.create({
    data: {
      name: name,
      description: description,
      start_date: start_date, 
      end_date: end_date,
      users: { connect: { id: parseInt(user_id) } }
    }
  });

  res.status(201).json(newTrip);
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
  const formattedTrips = trips.map(trip => ({
    trip_id: trip.id,
    name: trip.name,
    start_date: trip.start_date,
    end_date: trip.end_date,
    countries: trip.trip_countries.map(tc => tc.countries.name),
    transports: trip.trip_transports.map(tt => tt.transport_mode_types.description),
    lodgings: trip.trip_lodgings.map(tl => tl.lodging_types.description),
    user: {
      id: trip.users.id,
      email: trip.users.email,
      first_name: trip.users.first_name,
      second_name: trip.users.second_name
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
    trip_id: trip.id,
    name: trip.name,
    start_date: trip.start_date,
    end_date: trip.end_date,
    countries: trip.trip_countries.map(tc => tc.countries.name),
    transports: trip.trip_transports.map(tt => tt.transport_mode_types.description),
    lodgings: trip.trip_lodgings.map(tl => tl.lodging_types.description),
    user: {
      id: trip.users.id,
      email: trip.users.email,
      first_name: trip.users.first_name,
      second_name: trip.users.second_name
    }
  };


  return res.status(200).json(formattedTrip);

};

const updateTrip = async (req, res) => {
  const { name, startDate, endDate, userId } = req.body;
  const { tripId } = req.params;
  await prisma.trips.update({
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

  res.sendStatus(204);
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
