const { v4: uuidv4 } = require("uuid");
const lendingSchema = require("../../schemas/lendingSchema");
const { createTable, insertRecord } = require("../../utils/sqlFunctions");

const lendGame = async (req, res) => {
  const { gameName, price, lendingPeriod } = req.body;
  const userId = req.user.userId;
  const image = req.file ? req.file.filename : null; // Get the uploaded image path

  // Check if all required fields are present
  if (!gameName || !price || !lendingPeriod || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await createTable(lendingSchema);

    const lending = {
      lendingId: uuidv4(),
      gameName,
      price,
      lendingPeriod,
      image, // Save the image path to the database
      userId,
    };

    await insertRecord("lendings", lending);

    return res.status(201).json({ message: "Game lent successfully", image }); // Return image path if needed
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {  
  lendGame,
};