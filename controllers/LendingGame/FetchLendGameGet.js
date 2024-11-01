const { fetchAllRecords } = require("../../utils/sqlFunctions");

const fetchAllLentGames = async (req, res) => {
  try {
    const games = await fetchAllRecords("lendings");
    games.forEach(game => {
      console.log("Uploaded image path:", game.image);
    });
    return res.status(200).json(games);
  } catch (error) { 
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllLentGames,
};
