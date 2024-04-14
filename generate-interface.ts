const { convertFromDirectory } = require("joi-to-typescript");

import Models from "./db/models";

convertFromDirectory({
  schemaDirectory: "./src/schemas",
  typeOutputDirectory: "./src/interfaces",
  debug: true,
});
