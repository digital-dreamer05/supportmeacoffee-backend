const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");

const swaggerYaml = fs.readFileSync(
  path.join(__dirname, "../swagger.yaml"),
  "utf8"
);
const swaggerDocument = YAML.parse(swaggerYaml);

const options = {
  definition: swaggerDocument,
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API Documentation",
    customfavIcon:
      "https://cdn.jsdelivr.net/gh/swagger-api/swagger-ui@v4.15.5/dist/favicon-32x32.png",
  }),
};
