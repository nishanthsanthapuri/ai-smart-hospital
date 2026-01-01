const forbiddenPatterns = [
  /suicide/i,
  /self harm/i,
  /illegal/i,
  /hack/i,
  /exploit/i,
];

const roleRules = {
  ADMIN: {
    allowed: /.*/,
  },
  DOCTOR: {
    allowed: /(patient|diagnosis|treatment|appointment|visit|opd|billing)/i,
  },
  PATIENT: {
    allowed: /(appointment|bill|opd|timing|status|doctor)/i,
  },
};

function validateAIQuestion(question, role) {
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(question)) {
      return { ok: false, reason: "This topic is restricted." };
    }
  }

  const rule = roleRules[role];
  if (rule && !rule.allowed.test(question)) {
    return { ok: false, reason: "Question not allowed for your role." };
  }

  return { ok: true };
}

module.exports = { validateAIQuestion };
