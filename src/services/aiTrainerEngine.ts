import { AI_KNOWLEDGE_BASE, KBTopic, Formula, CommonMistake } from '../data/aiKnowledgeBase';

export type AIIntent =
  | 'GREETING'
  | 'EXPLAIN_CONCEPT'
  | 'ASK_FORMULA'
  | 'HELP_LAB'
  | 'ANALYZE_MISTAKE'
  | 'PRACTICE_QUESTION'
  | 'RECOMMEND_COURSE'
  | 'GENERAL';

export interface StudentContext {
  userId?: string;
  courseId?: string;
  lessonId?: string;
  labId?: string;
  lastQuizErrors?: { questionText: string; selectedAnswer: string; correctAnswer: string; explanation: string }[];
  lastSimulationErrors?: string[];
  preferredLanguage?: string; // e.g. "English", "Hindi", "Telugu", etc.
}

export interface TrainerResponse {
  intent: AIIntent;
  reply: string;
  suggestedTopicId?: string;
  practiceQuestions?: KBTopic['practiceQuestions'];
  formulas?: Formula[];
  mistakesAnalyzed?: boolean;
}

// Simple Indian and Global Languages translations map for headers or wrappers
const LANGUAGE_PROMPTS: Record<string, { greet: string; footer: string }> = {
  English: {
    greet: "Here is your AI Trainer Explanation:",
    footer: "Need more practice? Just ask me for a practice quiz!"
  },
  Hindi: {
    greet: "यहाँ आपका एआई ट्रेनर विवरण है (Translated to Hindi):",
    footer: "अधिक अभ्यास की आवश्यकता है? बस मुझसे एक प्रश्नोत्तरी पूछें!"
  },
  Telugu: {
    greet: "ఇక్కడ మీ AI ట్రైనర్ వివరణ ఉంది (Translated to Telugu):",
    footer: "మరింత ప్రాక్టీస్ కావాలా? నన్ను ఒక క్విజ్ అడగండి!"
  },
  Tamil: {
    greet: "உங்கள் AI பயிற்சியாளர் விளக்கம் இதோ (Translated to Tamil):",
    footer: "கூடுதல் பயிற்சி வேண்டுமா? என்னிடம் ஒரு வினாடி வினா கேளுங்கள்!"
  },
  Kannada: {
    greet: "ಇಲ್ಲಿ ನಿಮ್ಮ AI ತರಬೇತುದಾರರ ವಿವರಣೆ ಇದೆ (Translated to Kannada):",
    footer: "ಹೆಚ್ಚಿನ ಅಭ್ಯಾಸ ಬೇಕೇ? ನನ್ನನ್ನು ಒಂದು ರಸಪ್ರಶ್ನೆ ಕೇಳಿ!"
  },
  Malayalam: {
    greet: "ഇതാ നിങ്ങളുടെ AI ട്രെയിനർ വിവരണം (Translated to Malayalam):",
    footer: "കൂടുതൽ പരിശീലനം വേണോ? എന്നോട് ഒരു ക്വിസ് ചോദിക്കൂ!"
  },
  Bengali: {
    greet: "এখানে আপনার এআই ট্রেইনার ব্যাখ্যা রয়েছে (Translated to Bengali):",
    footer: "আরো অনুশীলনের প্রয়োজন? আমাকে একটি কুইজের কথা জিজ্ঞেস করুন!"
  },
  Marathi: {
    greet: "येथे तुमचे एआय ट्रेनर स्पष्टीकरण आहे (Translated to Marathi):",
    footer: "अधिक सरावाची गरज आहे? मला फक्त एक क्विझ विचारा!"
  },
  Gujarati: {
    greet: "અહીં તમારી એઆઈ ટ્રેનર સમજૂતી છે (Translated to Gujarati):",
    footer: "વધુ અભ્યાસની જરૂર છે? ફક્ત મને એક ક્વિઝ પૂછો!"
  },
  Punjabi: {
    greet: "ਇੱਥੇ ਤੁਹਾਡੀ ਏਆਈ ਟ੍ਰੇਨਰ ਵਿਆਖਿਆ ਹੈ (Translated to Punjabi):",
    footer: "ਹੋਰ ਅਭਿਆਸ ਦੀ ਲੋੜ ਹੈ? ਬਸ ਮੈਨੂੰ ਇੱਕ ਕੁਇਜ਼ ਪੁੱਛੋ!"
  },
  Urdu: {
    greet: "یہاں آپ کا اے آئی ٹرینر کا تفصیلی جواب ہے (Translated to Urdu):",
    footer: "مزید مشق کی ضرورت ہے؟ بس مجھ سے کوئز مانگیں!"
  },
  Spanish: {
    greet: "Aquí está la explicación de su entrenador de IA (Translated to Spanish):",
    footer: "¿Necesita más práctica? ¡Solo pídame un cuestionario!"
  },
  French: {
    greet: "Voici l'explication de votre entraîneur IA (Translated to French):",
    footer: "Besoin de plus de pratique? Demandez-moi simplement un quiz!"
  },
  German: {
    greet: "Hier ist die Erklärung Ihres KI-Trainers (Translated to German):",
    footer: "Benötigen Sie mehr Übung? Fragen Sie mich einfach nach einem Quiz!"
  },
  Japanese: {
    greet: "AIトレーナーの解説はこちらです (Translated to Japanese):",
    footer: "さらに練習が必要ですか？クイズを出題するように言ってください！"
  },
  Korean: {
    greet: "다음은 AI 트레이너의 설명입니다 (Translated to Korean):",
    footer: "연습이 더 필요하신가요? 퀴즈를 요청해 주세요!"
  },
  Chinese: {
    greet: "这是您的 AI 导师解释 (Translated to Chinese):",
    footer: "需要更多练习吗？尽管向我索取测试题！"
  }
};

/**
 * Normalizes input text for keyword matching.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Simple word tokenizer and stemmer/cleaner.
 */
function getWords(text: string): string[] {
  return normalizeText(text).split(' ').filter(w => w.length > 1);
}

/**
 * Evaluates overlapping keyword count between input words and target keywords.
 */
function matchScore(words: string[], target: string[]): number {
  let score = 0;
  for (const w of words) {
    if (target.includes(w)) {
      score += 1;
    }
  }
  return score;
}

/**
 * Detects the learner's intent.
 */
export function detectIntent(query: string, context?: StudentContext): AIIntent {
  const norm = normalizeText(query);
  const words = getWords(query);

  // GREETINGS
  const greetings = ['hello', 'hi', 'hey', 'greetings', 'yo', 'who are you', 'howdy', 'namaste', 'help'];
  if (greetings.some(g => norm.startsWith(g) || norm === g)) {
    return 'GREETING';
  }

  // MISTAKE ANALYSIS
  if (
    norm.includes('wrong') ||
    norm.includes('mistake') ||
    norm.includes('error') ||
    norm.includes('failed') ||
    norm.includes('fail') ||
    norm.includes('incorrect') ||
    norm.includes('diagnostic') ||
    norm.includes('why did i')
  ) {
    return 'ANALYZE_MISTAKE';
  }

  // PRACTICE QUESTIONS
  if (
    norm.includes('practice') ||
    norm.includes('quiz') ||
    norm.includes('question') ||
    norm.includes('test me') ||
    norm.includes('quiz me') ||
    norm.includes('exam')
  ) {
    return 'PRACTICE_QUESTION';
  }

  // FORMULAS
  if (
    norm.includes('formula') ||
    norm.includes('equation') ||
    norm.includes('derive') ||
    norm.includes('calculation') ||
    norm.includes('how to calculate') ||
    norm.includes('math')
  ) {
    return 'ASK_FORMULA';
  }

  // LAB HELP
  if (
    norm.includes('lab') ||
    norm.includes('simulation') ||
    norm.includes('ping') ||
    norm.includes('mismatch') ||
    norm.includes('router') ||
    norm.includes('gateway') ||
    norm.includes('troubleshoot') ||
    norm.includes('conflict')
  ) {
    return 'HELP_LAB';
  }

  // COURSE RECOMMENDATIONS
  if (
    norm.includes('recommend') ||
    norm.includes('next course') ||
    norm.includes('what should i study') ||
    norm.includes('learning path') ||
    norm.includes('study recommendation')
  ) {
    return 'RECOMMEND_COURSE';
  }

  // EXPLAIN CONCEPT
  if (
    norm.includes('explain') ||
    norm.includes('what is') ||
    norm.includes('define') ||
    norm.includes('concept') ||
    norm.includes('how does') ||
    norm.includes('tell me about') ||
    norm.includes('meaning of')
  ) {
    return 'EXPLAIN_CONCEPT';
  }

  // Default to general or context-aware intent
  if (context?.lastSimulationErrors && context.lastSimulationErrors.length > 0) {
    return 'HELP_LAB';
  }
  if (context?.lastQuizErrors && context.lastQuizErrors.length > 0) {
    return 'ANALYZE_MISTAKE';
  }

  return 'GENERAL';
}

/**
 * Searches the local knowledge base for relevant topics, QA pairs, or concepts.
 */
export function retrieveKnowledge(
  query: string,
  context?: StudentContext
): { topic?: KBTopic; qaAnswer?: string; score: number } {
  const norm = normalizeText(query);
  const words = getWords(query);

  let bestTopic: KBTopic | undefined = undefined;
  let bestScore = 0;
  let matchedQAAnswer: string | undefined = undefined;

  // 1. Direct Q&A Mapping checks
  for (const qa of AI_KNOWLEDGE_BASE.qas) {
    // Check direct match in qa questions
    if (qa.questions.some(q => normalizeText(q) === norm || norm.includes(normalizeText(q)))) {
      const topic = AI_KNOWLEDGE_BASE.topics.find(t => t.id === qa.topicId);
      return { topic, qaAnswer: qa.answer, score: 100 };
    }
    // Check keyword score
    const qaKwScore = matchScore(words, qa.keywords);
    if (qaKwScore > 0 && qaKwScore > bestScore) {
      bestScore = qaKwScore + 10; // high boost for exact QA keyword matching
      matchedQAAnswer = qa.answer;
      bestTopic = AI_KNOWLEDGE_BASE.topics.find(t => t.id === qa.topicId);
    }
  }

  // 2. Synonyms mapping expansion
  let expandedWords = [...words];
  Object.entries(AI_KNOWLEDGE_BASE.synonyms).forEach(([syn, topicId]) => {
    if (norm.includes(syn)) {
      const topic = AI_KNOWLEDGE_BASE.topics.find(t => t.id === topicId);
      if (topic) {
        bestTopic = topic;
        bestScore = Math.max(bestScore, 15); // automatic high score for explicit synonym matches
      }
    }
  });

  // 3. Topic, Concept and Formula score scanning
  for (const topic of AI_KNOWLEDGE_BASE.topics) {
    let topicScore = 0;

    // Title match
    if (norm.includes(normalizeText(topic.title))) {
      topicScore += 15;
    }

    // Category match
    if (norm.includes(normalizeText(topic.category))) {
      topicScore += 5;
    }

    // Concepts match
    for (const concept of topic.keyConcepts) {
      if (norm.includes(normalizeText(concept.name))) {
        topicScore += 8;
      }
      if (concept.synonyms?.some(s => norm.includes(normalizeText(s)))) {
        topicScore += 8;
      }
    }

    // Formulas match
    for (const f of topic.formulas) {
      if (norm.includes(normalizeText(f.name))) {
        topicScore += 6;
      }
    }

    // General keyword match overlap
    const wordOverlap = matchScore(words, getWords(topic.description + ' ' + topic.title));
    topicScore += wordOverlap;

    if (topicScore > bestScore) {
      bestScore = topicScore;
      bestTopic = topic;
      // clear QA answer if general topic matching is stronger
      if (topicScore > 10) {
        matchedQAAnswer = undefined;
      }
    }
  }

  // Fallback to active course/lesson context if score is 0
  if (bestScore === 0 && context?.courseId) {
    // try to match course mapping
    const matched = AI_KNOWLEDGE_BASE.topics.find(t => 
      t.id.includes(context.courseId!) || 
      context.courseId!.includes(t.id) ||
      (context.courseId === 'computer-networks' && t.id === 'subnetting-vlsm')
    );
    if (matched) {
      return { topic: matched, score: 2 };
    }
  }

  return { topic: bestTopic, qaAnswer: matchedQAAnswer, score: bestScore };
}

/**
 * Builds the educational feedback based on intent, retrieved facts, and student context.
 */
export function generateTrainerResponse(query: string, context?: StudentContext): TrainerResponse {
  const intent = detectIntent(query, context);
  const { topic, qaAnswer, score } = retrieveKnowledge(query, context);

  let reply = '';
  const lang = context?.preferredLanguage || 'English';
  const wrappers = LANGUAGE_PROMPTS[lang] || LANGUAGE_PROMPTS['English'];

  // GREETINGS Handler
  if (intent === 'GREETING') {
    // Custom greeting Q&A
    const generalQA = AI_KNOWLEDGE_BASE.qas.find(q => q.topicId === 'general');
    reply = generalQA?.answer || "Hello! I am your LearnerPedia AI Trainer. Ask me any question about subnetting, data structures, programming, or your recent mistakes, and I'll walk you through them!";
    return { intent, reply };
  }

  // PRACTICE QUESTIONS Request
  if (intent === 'PRACTICE_QUESTION') {
    if (topic && topic.practiceQuestions.length > 0) {
      reply = `### Let's practice **${topic.title}**!
Here is a high-yield question from our knowledge base:

**Question:** ${topic.practiceQuestions[0].question}
${topic.practiceQuestions[0].options.map((opt, i) => `- **${String.fromCharCode(65 + i)}**: ${opt}`).join('\n')}

*Think about the correct option, and type your answer (A, B, C, or D). I will explain the solution!*`;
      return {
        intent,
        reply: applyLanguageWrapper(reply, wrappers),
        suggestedTopicId: topic.id,
        practiceQuestions: topic.practiceQuestions
      };
    } else {
      reply = `I don't have explicit practice questions for that topic yet. However, you can head over to the **Quiz Section** or ask me to explain concepts like **Subnetting**, **OSI Model**, or **Data Structures**!`;
      return { intent, reply: applyLanguageWrapper(reply, wrappers) };
    }
  }

  // MISTAKE ANALYSIS Handler
  if (intent === 'ANALYZE_MISTAKE') {
    let mistakesText = '';

    // Check context for live mistakes
    if (context?.lastQuizErrors && context.lastQuizErrors.length > 0) {
      mistakesText += `#### 📝 Reviewing Your Practice Quiz Mistakes:\n`;
      context.lastQuizErrors.forEach((err, idx) => {
        mistakesText += `**${idx + 1}. Question:** "${err.questionText}"\n`;
        mistakesText += `- *Your Answer:* ${err.selectedAnswer}\n`;
        mistakesText += `- *Correct Answer:* ${err.correctAnswer}\n`;
        mistakesText += `- *Trainer Analysis:* ${err.explanation}\n\n`;
      });
    }

    if (context?.lastSimulationErrors && context.lastSimulationErrors.length > 0) {
      mistakesText += `#### 💻 Reviewing Your Simulation Diagnostic Failures:\n`;
      context.lastSimulationErrors.forEach((err, idx) => {
        mistakesText += `- **Error ${idx + 1}:** ${err}\n`;
      });
      mistakesText += `\n*Diagnostic Advice:* This failure is usually caused by a Default Gateway mismatch on your router ports or an IP range conflict. Verify your subnet limits!`;
    }

    if (mistakesText === '') {
      // General mistakes retrieved from topic
      if (topic && topic.commonMistakes.length > 0) {
        mistakesText += `### Common Mistakes in **${topic.title}** to watch out for:\n\n`;
        topic.commonMistakes.forEach((m, idx) => {
          mistakesText += `**${idx + 1}. Problem:** ${m.description}\n`;
          mistakesText += `- *Symptom:* ${m.symptom}\n`;
          mistakesText += `- *How to avoid:* ${m.correction}\n\n`;
        });
      } else {
        mistakesText = `You don't have any recorded mistakes in this session. Excellent work! If you have any questions about common pitfalls in **Subnetting** or **BST Trees**, just let me know.`;
      }
    }

    return {
      intent,
      reply: applyLanguageWrapper(mistakesText, wrappers),
      suggestedTopicId: topic?.id,
      mistakesAnalyzed: true
    };
  }

  // FORMULA ENGINE Handler
  if (intent === 'ASK_FORMULA') {
    if (topic && topic.formulas.length > 0) {
      let formulaText = `### 🧮 Mathematical Formulas for **${topic.title}**:\n\n`;
      topic.formulas.forEach((f, idx) => {
        formulaText += `#### **${f.name}**\n`;
        formulaText += `> \`\`\`\n> ${f.expression}\n> \`\`\`\n`;
        formulaText += `*   **Description:** ${f.description}\n`;
        formulaText += `*   **How it works:** ${f.derivation}\n`;
        formulaText += `*   **Example Calculations:**\n`;
        f.examples.forEach(ex => {
          formulaText += `    - ${ex}\n`;
        });
        formulaText += `\n`;
      });
      return {
        intent,
        reply: applyLanguageWrapper(formulaText, wrappers),
        suggestedTopicId: topic.id,
        formulas: topic.formulas
      };
    } else {
      reply = `I don't have specific mathematical formulas for that concept. For calculation-heavy topics, ask me about **Subnetting Usable Hosts** or **Binary Tree Max Nodes**!`;
      return { intent, reply: applyLanguageWrapper(reply, wrappers) };
    }
  }

  // LAB DIAGNOSTIC Handler
  if (intent === 'HELP_LAB') {
    if (topic && topic.troubleshooting && topic.troubleshooting.length > 0) {
      let troubleshootText = `### 🛠️ Troubleshooting & Diagnostic Advice for **${topic.title}**:\n\n`;
      topic.troubleshooting.forEach((item, idx) => {
        troubleshootText += `**Symptom:** *${item.symptom}*\n`;
        troubleshootText += `*   **Diagnosis:** ${item.diagnosis}\n`;
        troubleshootText += `*   **Solution:** ${item.solution}\n\n`;
      });
      return {
        intent,
        reply: applyLanguageWrapper(troubleshootText, wrappers),
        suggestedTopicId: topic.id
      };
    } else if (context?.labId) {
      reply = `You are currently working on Lab **"${context.labId}"**. If you are getting compiler syntax errors or ping delivery drops, check your parameter declarations. Let me know what specific error code or symptom you are seeing!`;
      return { intent, reply: applyLanguageWrapper(reply, wrappers) };
    } else {
      reply = `For lab diagnostics, make sure your device interfaces reside within the same IP subnet and default gateways match the router IP exactly. Let me know what specific networking or syntax error you are experiencing!`;
      return { intent, reply: applyLanguageWrapper(reply, wrappers) };
    }
  }

  // RECOMMEND COURSE Handler
  if (intent === 'RECOMMEND_COURSE') {
    reply = `### 🚀 Personalized Course Recommendations for You:

Based on your profile, here is your customized learning path:
1.  **Computer Networks (Subnetting Module)**: Master Variable Length Subnet Masking (VLSM) and Router Port forwarding.
2.  **Data Structures**: Complete stack, queue, and tree complexities to boost practice quiz accuracy.
3.  **Programming Fundamentals**: Deepen functional scopes and recursive debugging before entering competitive leagues.

*Would you like me to redirect you to the Course Catalog?*`;
    return { intent, reply: applyLanguageWrapper(reply, wrappers) };
  }

  // EXPLAIN CONCEPT or GENERAL lookup Handler
  if (qaAnswer) {
    return { intent, reply: applyLanguageWrapper(qaAnswer, wrappers), suggestedTopicId: topic?.id };
  }

  if (topic) {
    let conceptText = `### Exploring **${topic.title}** (${topic.category})\n\n`;
    conceptText += `*${topic.description}*\n\n`;

    conceptText += `#### 💡 Key Concepts Explained:\n`;
    topic.keyConcepts.forEach(c => {
      conceptText += `*   **${c.name}**: ${c.definition}\n`;
      conceptText += `    *Detail:* ${c.explanation}\n`;
    });

    if (topic.formulas.length > 0) {
      conceptText += `\n#### 🧮 Core Formula:\n`;
      conceptText += `*   **${topic.formulas[0].name}**: \`${topic.formulas[0].expression}\`\n`;
    }

    if (topic.commonMistakes.length > 0) {
      conceptText += `\n#### ⚠️ Common Pitfall:\n`;
      conceptText += `*   **${topic.commonMistakes[0].concept}**: ${topic.commonMistakes[0].description}\n`;
    }

    return {
      intent: 'EXPLAIN_CONCEPT',
      reply: applyLanguageWrapper(conceptText, wrappers),
      suggestedTopicId: topic.id
    };
  }

  // Generic fallback reply
  reply = `I understand you are asking about "${query}". I am a local intelligence trainer specializing in Computer Science curriculum. 

Try asking me questions like:
- *"Explain VLSM subnetting"*
- *"What is the formula for usable hosts?"*
- *"Why does my default gateway ping fail?"*
- *"What is the difference between stack and queue?"*
- *"Analyze my recent quiz mistakes"*

Let me know how I can guide your learning!`;
  return { intent: 'GENERAL', reply };
}

/**
 * Wraps replies in language headers and footers.
 */
function applyLanguageWrapper(reply: string, wrappers: { greet: string; footer: string }): string {
  return `**${wrappers.greet}**\n\n${reply}\n\n---\n*${wrappers.footer}*`;
}
