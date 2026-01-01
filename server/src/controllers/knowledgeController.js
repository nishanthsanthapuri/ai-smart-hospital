const Knowledge = require("../models/Knowledge");

exports.getAllKnowledge = async (req, res) => {
  const data = await Knowledge.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.createKnowledge = async (req, res) => {
  const knowledge = await Knowledge.create(req.body);
  res.status(201).json(knowledge);
};

exports.updateKnowledge = async (req, res) => {
  const updated = await Knowledge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteKnowledge = async (req, res) => {
  await Knowledge.findByIdAndDelete(req.params.id);
  res.json({ message: "Knowledge deleted" });
};
