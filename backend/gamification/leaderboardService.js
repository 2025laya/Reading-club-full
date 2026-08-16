const User = require("../models/User");

const getLeaderboard = async () => {

  const users = await User.find()
    .sort({ points: -1 })
    .limit(10);

  return users;
};

module.exports = getLeaderboard;