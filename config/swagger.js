const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");

// خواندن فایل swagger.yaml
const swaggerYaml = fs.readFileSync(
  path.join(__dirname, "../swagger.yaml"),
  "utf8"
);
const swaggerDocument = YAML.parse(swaggerYaml);

// تنظیمات Swagger
const options = {
  definition: swaggerDocument,
  apis: ["./routes/*.js"], // مسیر فایل‌های روت
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API Documentation",
    customfavIcon: "/favicon.ico",
  }),
};
