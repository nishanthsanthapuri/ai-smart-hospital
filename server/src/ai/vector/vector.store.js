const { OpenAIEmbeddings } = require("@langchain/openai");
const MOCK_MODE = process.env.MOCK_AI === "true";

/**
 * Simple in-memory vector store (NO LangChain vectorstore imports)
 */
let vectors = [];

async function buildVectorStore(docs) {
  if (!docs || docs.length === 0) {
    console.warn("⚠️ No docs for vector store");
    return;
  }

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  vectors = [];

  for (const doc of docs) {
    const embedding = MOCK_MODE
      ? Array(1536).fill(Math.random())
      : await embeddings.embedQuery(doc);

    vectors.push({ content: doc, embedding });
  }

  console.log("🧠 Vector store built:", vectors.length, "documents");
}

function similaritySearch(query, topK = 3) {
  if (!vectors.length) return [];

  const cosine = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);

  return vectors
    .map((v) => ({
      content: v.content,
      score: cosine(v.embedding, query),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
exports.searchVectorStore = async (query) => {
  return [
    "Hospital operates 24/7",
    "Doctors are assigned per department",
    "Appointments are role-based",
  ];
};

module.exports = {
  buildVectorStore,
  similaritySearch,
};
