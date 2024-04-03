const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await mongoose
      .connect(`${process.env.MONGO_DB}`)
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch((error) => {
        console.error("Error connect to the database! ", error);
        process.exit();
      });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connect to the database! ", error);
    process.exit();
  }
}

startServer();
