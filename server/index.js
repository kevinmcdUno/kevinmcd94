const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const usersRouter = require('./routers/users');
const countriesRouter = require('./routers/countries');
const borderFeesRouter = require('./routers/borderFees');
const entryRequirementsRouter = require('./routers/entryRequirements');
const tripsRouter = require('./routers/trips');
const transportModesRouter = require('./routers/transportModes');
const transportModeTypesRouter = require('./routers/transportModeTypes');
const lodgingTypesRouter = require('./routers/lodgingTypes');
const authRouter = require("./routers/auth");
const tripTransportsRouter = require('./routers/tripTransports');
const tripLodgingsRouter = require('./routers/tripLodgings'); 




const app = express()

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  credentials: true // Include this if your frontend needs to send cookies or auth headers
}));


const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Travel API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server"
    }
  ],
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.js"]
});



app.use(express.json());

app.use("/users", usersRouter);
app.use("/countries", countriesRouter);
app.use("/borderFees", borderFeesRouter);
app.use("/entryRequirements", entryRequirementsRouter);
app.use("/trips", tripsRouter);
app.use('/transportmodes', transportModesRouter);
app.use('/transportModeTypes', transportModeTypesRouter);
app.use('/lodgingTypes', lodgingTypesRouter);
app.use("/auth", authRouter);
app.use("/trips/:tripId/transports", tripTransportsRouter);
app.use("/trips/:tripId/lodgings", tripLodgingsRouter);



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

