exports.mockReply = async (role, message, data) => {
  if (data !== null) {
    return `Based on hospital records, the answer is: ${data}`;
  }

  return "How can I assist you today?";
};
