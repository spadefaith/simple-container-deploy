const openapi = require("@wesleytodd/openapi");

const OpenApiService = openapi({
  openapi: "3.0.0",
  info: {
    title: "Application Deployer",
    description: "deploying application using docker compose",
    version: "1.0.0",
  },
});

export default OpenApiService;
