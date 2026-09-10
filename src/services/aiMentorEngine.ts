import { GoogleGenAI } from '@google/genai';
import { MentorMode, MentorStudentContext } from '../types/mentor';
import { AI_KNOWLEDGE_BASE } from '../data/aiKnowledgeBase';

// Lazy initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize Google GenAI SDK client:', e);
      aiClient = null;
    }
  }
  return aiClient;
}

export interface MentorEngineResult {
  reply: string;
  mentorState: 'speaking' | 'explaining' | 'encouraging' | 'challenging' | 'proud';
  emotionalTone: string;
  practiceCard?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    topic?: string;
  };
  formulaCard?: {
    title: string;
    formula: string;
    variables: { symbol: string; meaning: string }[];
    example: string;
    tip?: string;
  };
  diagnosticCard?: {
    issue: string;
    symptom: string;
    suggestedFix: string;
    relatedLabId?: string;
  };
  recommendedStep?: {
    title: string;
    type: 'course' | 'lesson' | 'lab' | 'quiz' | 'store';
    link: string;
    reason: string;
    xpReward?: number;
  };
  suggestedFollowUps: string[];
}

const SOCRATIC_SYSTEM_PROMPT = `
You are the AI Mentor for "LearnerPedia", an educational platform for Computer Science, Computer Networks, Cybersecurity, System Design, and Interactive Engineering Labs.

CRITICAL MENTOR DIRECTIVES:
1. You are a personal, caring, intelligent MENTOR and study companion — NOT a dry chatbot.
2. Adopt a conversational, supportive, yet intellectually challenging persona.
3. Use the SOCRATIC METHOD: Instead of immediately dumping a 10-paragraph lecture, guide the learner step-by-step. Ask thoughtful diagnostic questions to gauge their understanding and help them discover the answer.
4. Adapt to the learner's emotional and mastery state:
   - If they are struggling or failed a quiz/lab, offer warm encouragement, break the concept into smaller bite-sized steps, and praise their effort.
   - If they are confident or succeeding, challenge them with higher-order "what-if" scenarios, edge cases, and architectural trade-offs.
5. NEVER end messages with repetitive robotic clichés such as "Is there anything else I can help you with?", "How can I assist you further?", or "Feel free to ask more questions." Instead, end with an engaging learning prompt, a mini-question, or an action suggestion.
6. Provide clear, visually formatted Markdown with bold keywords, clean bullet points, and code/math blocks where helpful.
7. If the user selects a non-English language (e.g., Hindi, Telugu, Tamil, Spanish), speak and teach fluently in that language with cultural warmth while preserving technical terms clearly.

Return your response strictly in JSON format matching this schema:
{
  "reply": "Your mentor response in rich Markdown",
  "mentorState": "speaking" | "explaining" | "encouraging" | "challenging" | "proud",
  "emotionalTone": "supportive" | "enthusiastic" | "coaching" | "socratic",
  "practiceCard": null | {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctIndex": 0,
    "explanation": "string",
    "topic": "string"
  },
  "formulaCard": null | {
    "title": "string",
    "formula": "string",
    "variables": [{"symbol": "string", "meaning": "string"}],
    "example": "string",
    "tip": "string"
  },
  "diagnosticCard": null | {
    "issue": "string",
    "symptom": "string",
    "suggestedFix": "string",
    "relatedLabId": "string"
  },
  "recommendedStep": null | {
    "title": "string",
    "type": "course" | "lesson" | "lab" | "quiz" | "store",
    "link": "string",
    "reason": "string",
    "xpReward": 100
  },
  "suggestedFollowUps": ["Question 1", "Question 2", "Question 3"]
}
`;

/**
 * Local fallback pedagogical engine when Gemini API key is not present
 */
export function generateLocalMentorResponse(
  message: string,
  context: MentorStudentContext,
  mode: MentorMode = 'socratic',
  preferredLanguage: string = 'English'
): MentorEngineResult {
  const norm = message.toLowerCase().trim();
  const studentName = context.studentName || 'Learner';

  // Check for subnetting / VLSM
  if (norm.includes('subnet') || norm.includes('cidr') || norm.includes('host') || norm.includes('mask') || norm.includes('/24') || norm.includes('/26')) {
    return {
      reply: `Great question, **${studentName}**! Subnetting is all about partitioning a physical network into smaller logical segments to minimize broadcast noise and enforce security boundaries.\n\nLet's break it down using the **Magic Number method**:\n* **Formula**: $\\text{Step Size} = 256 - \\text{Interesting Octet}$\n* For example, in a **/26 subnet** (\`255.255.255.192\`), the Magic Number is $256 - 192 = 64$.\n* That means your subnets increment by 64: \`.0\`, \`.64\`, \`.128\`, and \`.192\`.\n\nHere is a quick question for you: How many usable host IP addresses exist in a **/27** subnet?`,
      mentorState: 'explaining',
      emotionalTone: 'socratic',
      formulaCard: {
        title: 'Usable Hosts & Subnet Formula',
        formula: 'Usable Hosts = 2^(32 - CIDR) - 2',
        variables: [
          { symbol: 'CIDR', meaning: 'Prefix length in slash notation (e.g. 24, 26, 27)' },
          { symbol: 'h', meaning: 'Remaining host bits (32 - CIDR)' },
          { symbol: '-2', meaning: 'Subtract Network ID (first) and Broadcast ID (last)' }
        ],
        example: 'For /26: h = 32 - 26 = 6 host bits. Usable = 2^6 - 2 = 64 - 2 = 62 hosts.',
        tip: 'Remember that the first and last IP of any subnet block cannot be assigned to individual machines!'
      },
      practiceCard: {
        question: 'How many usable host IP addresses are available in a /28 subnet?',
        options: ['14 usable hosts', '16 usable hosts', '30 usable hosts', '6 usable hosts'],
        correctIndex: 0,
        explanation: 'In /28, remaining host bits h = 32 - 28 = 4. Usable hosts = 2^4 - 2 = 16 - 2 = 14.',
        topic: 'Subnetting & CIDR'
      },
      recommendedStep: {
        title: 'Interactive Network Router Lab',
        type: 'lab',
        link: '/labs',
        reason: 'Apply this CIDR stepping logic directly on virtual routers and switches.',
        xpReward: 150
      },
      suggestedFollowUps: [
        "How do I find the broadcast address?",
        "Why do we subtract 2 from total IPs?",
        "Give me another practice calculation",
        "Explain Variable Length Subnet Masking (VLSM)"
      ]
    };
  }

  // Check for OSI layers
  if (norm.includes('osi') || norm.includes('layer') || norm.includes('transport') || norm.includes('packet')) {
    return {
      reply: `Let's visualize the **7-Layer OSI Model**, **${studentName}**!\n\nA helpful mnemonic to remember from Layer 7 down to Layer 1 is:\n> *"All People Seem To Need Data Processing"*\n\n1. **Layer 7 - Application**: HTTP, DNS, SSH, FTP\n2. **Layer 6 - Presentation**: TLS encryption, formatting, compression\n3. **Layer 5 - Session**: Manages persistent connections\n4. **Layer 4 - Transport**: TCP (reliable), UDP (fast), Port numbers\n5. **Layer 3 - Network**: IP Addressing, Routers, Packets\n6. **Layer 2 - Data Link**: MAC Addresses, Switches, Frames\n7. **Layer 1 - Physical**: Cables, Fiber optics, Binary bits\n\nWhich layer do you think handles packet routing between different subnets?`,
      mentorState: 'explaining',
      emotionalTone: 'supportive',
      practiceCard: {
        question: 'At which OSI layer do Routers operate and make forwarding decisions based on IP addresses?',
        options: ['Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)', 'Layer 7 (Application)'],
        correctIndex: 1,
        explanation: 'Routers operate at Layer 3 (Network Layer) where IP packet routing and logical addressing take place.',
        topic: 'OSI Reference Model'
      },
      recommendedStep: {
        title: 'OSI Architecture & Protocol Suite',
        type: 'course',
        link: '/learn-store',
        reason: 'Master protocol encapsulation from application data down to physical bits.',
        xpReward: 100
      },
      suggestedFollowUps: [
        "What is the difference between TCP and UDP?",
        "How does MAC address differ from IP address?",
        "Explain packet encapsulation with headers"
      ]
    };
  }

  // Check for Circuit / Labs / Diagnostics
  if (norm.includes('lab') || norm.includes('circuit') || norm.includes('voltage') || norm.includes('ping') || norm.includes('gateway') || norm.includes('broken')) {
    return {
      reply: `I'm on it! Let's troubleshoot your lab setup step-by-step.\n\nWhen troubleshooting connectivity or circuit power, always follow a structured diagnostic workflow:\n1. **Verify Complete Circuit Loop**: Ensure wires connect in a continuous loop from Power(+) $\\to$ Switch $\\to$ Load $\\to$ Ground(-).\n2. **Check Gateway IP**: In networking simulations, ensure the PC's default gateway matches the router interface IP on the same subnet.\n3. **Test with Step-by-Step Isolation**: Isolate components one at a time to identify the failure point.\n\nTell me: What error message or symptom are you currently seeing in the lab?`,
      mentorState: 'encouraging',
      emotionalTone: 'coaching',
      diagnosticCard: {
        issue: 'Packet dropped or circuit unpowered',
        symptom: 'Switch open, mismatched subnet mask, or unconnected ground wire',
        suggestedFix: '1. Close the toggle switch in the circuit viewer. 2. Verify both endpoints share the exact same subnet mask.',
        relatedLabId: 'subnetting-router-lab'
      },
      suggestedFollowUps: [
        "Why is my ping returning Destination Host Unreachable?",
        "How do I verify the default gateway?",
        "Check my current lab state"
      ]
    };
  }

  // Check for progress, streak, or analysis
  if (norm.includes('streak') || norm.includes('progress') || norm.includes('score') || norm.includes('mistake') || norm.includes('weak') || norm.includes('points')) {
    const streak = context.streak || 3;
    const xp = context.xp || 250;
    return {
      reply: `Here is your current learning pulse, **${studentName}**!\n\n🔥 **Active Streak**: ${streak} Days in a row\n⚡ **Total XP Earned**: ${xp} XP\n🎯 **Primary Goal**: Solidify network routing and CIDR bitmask calculations.\n\nYou've been building solid momentum! Consistency is what turns complex technical concepts into second nature.\n\nWould you like a 3-minute quiz sprint to level up your XP and boost your league rank?`,
      mentorState: 'proud',
      emotionalTone: 'enthusiastic',
      recommendedStep: {
        title: 'Weekly Subnetting Championship',
        type: 'quiz',
        link: '/competition',
        reason: 'Climb the global student leaderboard with a timed sprint.',
        xpReward: 200
      },
      suggestedFollowUps: [
        "Give me a 3-question quick drill",
        "What are my top recommended courses?",
        "How can I earn more SkillPoints?"
      ]
    };
  }

  // General Socratic response
  return {
    reply: `Hello **${studentName}**! I'm your LearnerPedia AI Mentor. Whether you want to master **Computer Networks**, analyze **OSI protocols**, conquer **3D interactive labs**, or prepare for technical interviews, I'm right here with you.\n\nWhat topic are you diving into right now? Let's take it step by step!`,
    mentorState: 'speaking',
    emotionalTone: 'supportive',
    practiceCard: {
      question: 'Which protocol is responsible for translating human-readable domain names (like google.com) into IP addresses?',
      options: ['DNS (Domain Name System)', 'DHCP (Dynamic Host Config)', 'ARP (Address Resolution Protocol)', 'HTTP (Hypertext Transfer)'],
      correctIndex: 0,
      explanation: 'DNS translates domain names into numerical IP addresses so network devices can route traffic.',
      topic: 'Core Internet Protocols'
    },
    suggestedFollowUps: [
      "Explain subnetting with the Magic Number method",
      "How does DNS resolution work?",
      "Test my networking fundamentals",
      "Help me debug an interactive lab"
    ]
  };
}

/**
 * Executes a mentoring request through Gemini (using @google/genai SDK model gemini-3.8-flash)
 * with robust local fallback.
 */
export async function executeMentorRequest(
  message: string,
  context: MentorStudentContext,
  mode: MentorMode = 'socratic',
  preferredLanguage: string = 'English'
): Promise<MentorEngineResult> {
  const ai = getAiClient();

  if (!ai) {
    return generateLocalMentorResponse(message, context, mode, preferredLanguage);
  }

  try {
    const studentContextInfo = `
Learner Profile & Environment Context:
- Student Name: ${context.studentName || 'Learner'}
- Active Page: ${context.pagePath || '/'}
- Preferred Language: ${preferredLanguage}
- Pedagogical Mode: ${mode} (e.g. Socratic guiding, Coach motivating, Explainer deep-dive, Practice testing, Troubleshooter debugging)
- Streak: ${context.streak || 0} days
- XP: ${context.xp || 0}
- Recent Quiz Mistakes: ${JSON.stringify(context.lastQuizErrors || [])}
- Recent Lab Simulation Diagnostics: ${JSON.stringify(context.lastSimulationErrors || [])}
`;

    const userPrompt = `
${studentContextInfo}

Learner's message:
"${message}"

Respond strictly with valid JSON conforming to the requested schema. Ensure the response is warm, Socratic, personalized, and avoids robotic generic closures.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction: SOCRATIC_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    if (!text) {
      return generateLocalMentorResponse(message, context, mode, preferredLanguage);
    }

    try {
      const parsed = JSON.parse(text) as MentorEngineResult;
      if (parsed && parsed.reply) {
        return {
          reply: parsed.reply,
          mentorState: parsed.mentorState || 'speaking',
          emotionalTone: parsed.emotionalTone || 'supportive',
          practiceCard: parsed.practiceCard || undefined,
          formulaCard: parsed.formulaCard || undefined,
          diagnosticCard: parsed.diagnosticCard || undefined,
          recommendedStep: parsed.recommendedStep || undefined,
          suggestedFollowUps: parsed.suggestedFollowUps || [
            "Explain further",
            "Give me a practice question",
            "Show me an example"
          ]
        };
      }
    } catch (parseErr) {
      console.warn('Gemini response was not valid JSON, using cleaned text:', parseErr);
      return {
        reply: text,
        mentorState: 'speaking',
        emotionalTone: 'supportive',
        suggestedFollowUps: ["Give me an example", "Test me on this", "Explain the formula"]
      };
    }
  } catch (err) {
    console.error('Gemini API call failed, falling back to local mentor engine:', err);
  }

  return generateLocalMentorResponse(message, context, mode, preferredLanguage);
}

/**
 * Generates proactive intervention alerts based on student activity
 */
export async function generateProactiveAlert(context: MentorStudentContext) {
  // If user has recent quiz errors
  if (context.lastQuizErrors && context.lastQuizErrors.length > 0) {
    const error = context.lastQuizErrors[0];
    return {
      id: `alert-quiz-${Date.now()}`,
      title: '💡 Quick Concept Tune-Up',
      message: `I noticed you encountered a tricky question on "${error.questionText}". Would you like a 60-second visual breakdown?`,
      triggerType: 'quiz_mistake',
      actionPrompt: `Explain how to solve: ${error.questionText}`,
      timestamp: new Date().toISOString()
    };
  }

  // If user is on labs page
  if (context.pagePath.includes('/labs') || context.pagePath.includes('/simulation')) {
    return {
      id: `alert-lab-${Date.now()}`,
      title: '🔬 Lab Companion Active',
      message: "Working on your network topology? I can review your subnet mask allocations or help troubleshoot dropped packets.",
      triggerType: 'simulation_error',
      actionPrompt: "Help me verify my lab subnet mask and default gateway settings.",
      timestamp: new Date().toISOString()
    };
  }

  // Streak milestone
  if (context.streak && context.streak >= 3) {
    return {
      id: `alert-streak-${Date.now()}`,
      title: `🔥 ${context.streak}-Day Learning Streak!`,
      message: `Fantastic dedication, ${context.studentName || 'Learner'}! You're on a roll. Ready to test your mastery with an advanced drill?`,
      triggerType: 'streak_milestone',
      actionPrompt: "Give me an advanced challenge to celebrate my streak!",
      timestamp: new Date().toISOString()
    };
  }

  return null;
}
