const Knowledge = require("../models/Knowledge");

async function retrieveRelevantKnowledge(question) {
  return Knowledge.find({
    $or: [
      { title: { $regex: question, $options: "i" } },
      { tags: { $regex: question, $options: "i" } },
    ],
  }).limit(3);
}

module.exports = { retrieveRelevantKnowledge };
