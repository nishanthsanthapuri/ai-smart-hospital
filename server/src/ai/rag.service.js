const { ChatOpenAI } = require("@langchain/openai");
const { getVectorStore } = require("./vector/vector.store");

const llm = new ChatOpenAI({
  temperature: 0.2,
});

async function askHospitalAI(question) {
  const store = getVectorStore();
  const docs = await store.similaritySearch(question, 4);

  const context = docs.map((d) => d.pageContent).join("\n");

  const response = await llm.invoke(`
You are a hospital AI assistant.
Answer ONLY using the context below.

Context:
${context}

Question:
${question}
`);

  return response.content;
}

module.exports = { askHospitalAI };
