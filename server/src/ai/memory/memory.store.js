const MEMORY_LIMIT = 6;
const memory = new Map();

exports.getMemory = (userId) => {
  return memory.get(userId) || [];
};

exports.addToMemory = (userId, role, content) => {
  const history = memory.get(userId) || [];

  history.push({ role, content });

  if (history.length > MEMORY_LIMIT) {
    history.shift(); // remove oldest
  }

  memory.set(userId, history);
};

exports.clearMemory = (userId) => {
  memory.delete(userId);
};
