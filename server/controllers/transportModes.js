const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getTransportModes = async (req, res) => {
  try {
    const { sourceCountryId, destinationCountryId } = req.query;

    if (!sourceCountryId || !destinationCountryId) {
      return res.status(400).json({ error: 'Both sourceCountryId and destinationCountryId are required' });
    }

    const transportModes = await prisma.transport_modes.findMany({
      where: {
        source_country_id: parseInt(sourceCountryId),
        destination_country_id: parseInt(destinationCountryId),
      },
      select: {
        id: true,
        avg_cost: true,
        transport_mode_types: {
          select: {
            description: true,
          },
        },
        countries_transport_modes_source_country_idTocountries: {
          select: {
            name: true,
          },
        },
        countries_transport_modes_destination_country_idTocountries: {
          select: {
            name: true,
          },
        },
      },
    });

    if (transportModes.length === 0) {
      return res.status(404).json({ error: 'No transport modes found for the specified countries' });
    }

    const response = {
      sourceCountry:
        transportModes[0]?.countries_transport_modes_source_country_idTocountries.name,
      destinationCountry:
        transportModes[0]?.countries_transport_modes_destination_country_idTocountries.name,
      availableOptions: transportModes.map((transport) => ({
        mode: transport.transport_mode_types.description,
        averageCost: transport.avg_cost,
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error retrieving transport modes:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getTransportModes };
