const usersRouter = require('./routers/users');
const countriesRouters = require('./routers/countries');
const border_feesRouters = require('./routers/border_fees');



const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const express = require('express')
const app = express()



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
app.use("/countries", countriesRouters);
app.use("/border_fees", border_feesRouters);


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) =>
  res.json(openapiSpecification).status(200)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

