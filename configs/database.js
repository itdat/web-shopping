const { Pool } = require("pg");
require("dotenv").config();

// Get database configs matching with environment
let databaseConfig;
switch (process.env.NODE_ENV) {
  case "development":
    databaseConfig = {
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "ad",
      port: 5432,
      ssl: false
    };
    break;

  case "production":
    databaseConfig = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL
    };
    break;

  default:
    databaseConfig = {
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "ad",
      port: 5432,
      ssl: false
    };
    break;
}

// Create new pool from database config
const pool = new Pool(databaseConfig);

// Try connect with configs
pool
  .connect()
  .then(() => {
    console.log(
      `${
        process.env.NODE_ENV != null
          ? process.env.NODE_ENV.toLocaleUpperCase()
          : "DEVELOPMENT"
      } database connected successfully.`
    );
  })
  .catch(reason => {
    console.log(
      `Failed to connect to ${
        process.env.NODE_ENV != null
          ? process.env.NODE_ENV.toLocaleUpperCase()
          : "DEVELOPMENT"
      } database.`
    );
    console.log(`Error: ${reason.code}`);
  });

console.log("Connecting to database...");

module.exports = pool;
