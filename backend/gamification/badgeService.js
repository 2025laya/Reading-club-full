const assignBadges = (user) => {

  const badges = [];

  if (user.booksRead >= 5) {
    badges.push("القارئ النهم");
  }

  if (user.points >= 100) {
    badges.push("المثقف التفاعلي");
  }

  return badges;
};

module.exports = assignBadges;