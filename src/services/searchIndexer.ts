import { COURSES_CATALOG } from '../data/coursesCatalog';
import { LABS_CATALOG } from '../data/labsCatalog';
import { AI_KNOWLEDGE_BASE } from '../data/aiKnowledgeBase';

export interface SearchDocument {
  id: string;
  entity_id: string;
  entity_type: 'course' | 'lesson' | 'topic' | 'lab' | 'simulation' | 'question' | 'competition' | 'cheatsheet' | 'store' | 'roadmap' | 'ai_knowledge';
  title: string;
  description: string;
  content: string;
  category: string;
  skills: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Easy' | 'Medium' | 'Hard';
  course_id?: string;
  url: string;
  updated_at: string;
}

// Pre-seeded searchable aliases in memory / DB format
export const SEARCH_ALIASES: Record<string, string[]> = {
  "networking": ["computer networks", "net", "subnet", "cidr", "router", "switch", "packet"],
  "net": ["networking", "computer networks"],
  "subnet": ["subnetting", "cidr", "network addressing", "magic number"],
  "subnet mask": ["subnetting", "cidr", "ip partitioning"],
  "ip": ["ipv4", "ipv6", "addressing", "ping"],
  "router": ["routing", "network hardware", "ospf", "switch"],
  "linux": ["linux security", "linux administration", "shell scripting"],
  "cyber": ["cybersecurity", "penetration testing", "ethical hacking"],
  "ethical hacking": ["penetration testing", "security assessment"],
  "web security": ["web application security", "owasp", "xss"],
  "db": ["database", "sql", "mysql", "postgresql"],
  "sql": ["database", "sql joins", "queries", "dbms"],
  "cloud": ["cloud computing", "aws", "azure", "google cloud"],
  "ai": ["artificial intelligence", "machine learning", "deep learning"],
  "ml": ["machine learning", "neural networks"],
  "frontend": ["web development", "react", "html", "css", "javascript"],
  "backend": ["backend development", "express", "node", "api"]
};

// Static Roadmaps mapping (Section 16 / Search Learning Path)
export const ROADMAPS_DATA = [
  {
    id: "cybersecurity-roadmap",
    title: "Cybersecurity Learning Roadmap",
    description: "Your ultimate guided path from absolute security beginner to fully certified Penetration Tester and SOC Analyst.",
    category: "Cybersecurity",
    skills: ["Ethical Hacking", "Linux Security", "Network Defense", "OWASP", "Penetration Testing"],
    difficulty: "Beginner",
    url: "/learn-store?tab=roadmaps",
    updated_at: "2026-09-01T00:00:00Z"
  },
  {
    id: "networking-roadmap",
    title: "Computer Networking & Infrastructure Roadmap",
    description: "Master logical subnets, packet routing, OSPF, and hardware routing matrices.",
    category: "Computer Networks",
    skills: ["Subnetting", "VLSM", "OSI Model", "Routing Protocols", "Switching"],
    difficulty: "Beginner",
    url: "/learn-store?tab=roadmaps",
    updated_at: "2026-09-02T00:00:00Z"
  },
  {
    id: "programming-roadmap",
    title: "Full-Stack Software Engineering Roadmap",
    description: "Step-by-step masterclass in programming logic, algorithms, relational databases, and secure web application pipelines.",
    category: "Computer Science",
    skills: ["Python", "JavaScript", "SQL", "Data Structures", "Recursion", "OOP"],
    difficulty: "Beginner",
    url: "/learn-store?tab=roadmaps",
    updated_at: "2026-09-03T00:00:00Z"
  }
];

// Helper to normalize and clean strings
export function normalizeSearchString(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Compute simple Levenshtein distance for typo tolerance
export function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Builds and populates the global search documents index array
 */
export function buildSearchIndex(): SearchDocument[] {
  const index: SearchDocument[] = [];

  // 1. Index Courses Catalog
  COURSES_CATALOG.forEach(course => {
    index.push({
      id: `course-${course.id}`,
      entity_id: course.id,
      entity_type: 'course',
      title: course.title,
      description: course.description,
      content: `${course.category} ${course.subcategory || ''} ${(course.learningObjectives || []).join(' ')} ${(course.skills || []).join(' ')}`,
      category: course.category,
      skills: course.skills || [],
      difficulty: course.difficulty as any || 'Beginner',
      url: `/courses/${course.id}`,
      updated_at: new Date().toISOString()
    });
  });

  // 2. Index Labs Catalog
  LABS_CATALOG.forEach(lab => {
    index.push({
      id: `lab-${lab.id}`,
      entity_id: lab.id,
      entity_type: 'lab',
      title: lab.title,
      description: lab.description,
      content: `${lab.category} ${(lab.objectives || []).join(' ')} ${lab.language || ''}`,
      category: lab.category || 'Simulation Labs',
      skills: lab.objectives || [],
      difficulty: lab.difficulty as any || 'Beginner',
      url: `/labs/${lab.id}`,
      updated_at: new Date().toISOString()
    });
  });

  // 3. Index AI Trainer Knowledge Topics
  AI_KNOWLEDGE_BASE.topics.forEach(topic => {
    const conceptsJoined = topic.keyConcepts.map(c => `${c.name} ${c.definition} ${c.explanation}`).join(' ');
    const formulasJoined = topic.formulas.map(f => `${f.name} ${f.expression} ${f.description}`).join(' ');
    index.push({
      id: `knowledge-${topic.id}`,
      entity_id: topic.id,
      entity_type: 'ai_knowledge',
      title: topic.title,
      description: topic.description,
      content: `${topic.category} ${conceptsJoined} ${formulasJoined}`,
      category: 'AI Knowledge',
      skills: topic.keyConcepts.map(c => c.name),
      url: `/dashboard`, // Trigger AI chat from dashboard/widget
      updated_at: new Date().toISOString()
    });
  });

  // 4. Index Roadmaps Data (Section 16)
  ROADMAPS_DATA.forEach(roadmap => {
    index.push({
      id: `roadmap-${roadmap.id}`,
      entity_id: roadmap.id,
      entity_type: 'roadmap',
      title: roadmap.title,
      description: roadmap.description,
      content: `${roadmap.category} ${roadmap.skills.join(' ')}`,
      category: 'Roadmaps',
      skills: roadmap.skills,
      difficulty: roadmap.difficulty as any,
      url: roadmap.url,
      updated_at: roadmap.updated_at
    });
  });

  return index;
}

/**
 * Executes scoring, ranking, context boosts, and filters over the documents index.
 */
export function querySearchIndex(
  index: SearchDocument[],
  query: string,
  filters: {
    category?: string;
    course_id?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
  } = {}
): { results: (SearchDocument & { score: number })[]; total: number } {
  const normQuery = normalizeSearchString(query);
  if (!normQuery) {
    return { results: [], total: 0 };
  }

  const queryTerms = normQuery.split(' ').filter(t => t.length > 0);
  const matchedDocs: (SearchDocument & { score: number })[] = [];

  for (const doc of index) {
    let score = 0;
    const normTitle = normalizeSearchString(doc.title);
    const normDesc = normalizeSearchString(doc.description);
    const normContent = normalizeSearchString(doc.content);

    // 1. Exact Title Match
    if (normTitle === normQuery) {
      score += 100;
    }
    // 2. Exact Title Phrase Match
    else if (normTitle.includes(normQuery)) {
      score += 50;
    }

    // 3. Keyword Match in Title
    queryTerms.forEach(term => {
      if (normTitle.includes(term)) {
        score += 15;
      }
    });

    // 4. Synonym / Alias Match (Section 6)
    Object.entries(SEARCH_ALIASES).forEach(([alias, targets]) => {
      if (normQuery.includes(alias) || alias.includes(normQuery)) {
        const matchesTarget = targets.some(target => 
          normTitle.includes(target) || normDesc.includes(target) || normContent.includes(target)
        );
        if (matchesTarget) {
          score += 25;
        }
      }
    });

    // 5. Keyword Match in description / content
    queryTerms.forEach(term => {
      if (normDesc.includes(term)) {
        score += 5;
      }
      if (normContent.includes(term)) {
        score += 2;
      }
    });

    // 6. Skill & Category Match
    doc.skills.forEach(skill => {
      if (normalizeSearchString(skill).includes(normQuery)) {
        score += 10;
      }
    });
    if (normalizeSearchString(doc.category).includes(normQuery)) {
      score += 8;
    }

    // 7. Context Boost (Section 10 / 15)
    if (filters.course_id && doc.course_id === filters.course_id) {
      score += 30; // Boost documents belonging to the current course context
    }

    // 8. Typo Tolerance Support (Section 23)
    if (score === 0) {
      const wordsInTitle = normTitle.split(' ');
      wordsInTitle.forEach(w => {
        queryTerms.forEach(qt => {
          if (Math.abs(w.length - qt.length) <= 1) {
            const dist = getLevenshteinDistance(w, qt);
            if (dist === 1) {
              score += 12; // award partial score for close typo matches (e.g., databse -> database)
            }
          }
        });
      });
    }

    // Push if matched
    if (score > 0) {
      matchedDocs.push({ ...doc, score });
    }
  }

  // Apply filters
  let filtered = matchedDocs;
  if (filters.category && filters.category !== 'All') {
    const categoryLower = filters.category.toLowerCase();
    filtered = filtered.filter(d => {
      // Map frontend category filter terms to doc entity_types
      if (categoryLower === 'courses') return d.entity_type === 'course';
      if (categoryLower === 'labs') return d.entity_type === 'lab';
      if (categoryLower === 'roadmaps') return d.entity_type === 'roadmap';
      if (categoryLower === 'ai knowledge') return d.entity_type === 'ai_knowledge';
      return d.category.toLowerCase().includes(categoryLower);
    });
  }

  if (filters.difficulty) {
    filtered = filtered.filter(d => d.difficulty?.toLowerCase() === filters.difficulty!.toLowerCase());
  }

  // Sort by score/relevance (descending)
  filtered.sort((a, b) => b.score - a.score);

  const total = filtered.length;
  const limit = filters.limit || 15;
  const offset = filters.offset || 0;
  const paginated = filtered.slice(offset, offset + limit);

  return { results: paginated, total };
}
