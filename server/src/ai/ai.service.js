const { askOpenAI } = require("./openai.client");

exports.generateAIAnswer = async ({ role, question }) => {
  try {
    const rolePrompt = buildRolePrompt(role, question);

    const answer = await askOpenAI(rolePrompt);

    return answer;
  } catch (err) {
    console.error("OPENAI FULL ERROR:", err);
    throw err;
  }
};

function buildRolePrompt(role, question) {
  if (role === "ADMIN") {
    return `You are a hospital admin assistant.
Question: ${question}`;
  }

  if (role === "DOCTOR") {
    return `You are a hospital doctor assistant.
Question: ${question}`;
  }

  if (role === "PATIENT") {
    return `You are a hospital patient assistant.
Question: ${question}`;
  }

  return question;
}
