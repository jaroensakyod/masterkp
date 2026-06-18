import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const subjects = [
  {
    name: "Verbal & Numerical Reasoning",
    nameTh: "เธเธงเธฒเธกเธชเธฒเธกเธฒเธฃเธ–เธ—เธฑเนเธงเนเธ",
    slug: "general-ability",
    description: "เธ—เธ”เธชเธญเธเธเธงเธฒเธกเธชเธฒเธกเธฒเธฃเธ–เธ”เนเธฒเธเธ•เธฑเธงเน€เธฅเธ เธ•เธฃเธฃเธเธฐ เนเธฅเธฐเธญเธเธธเธเธฃเธก",
    icon: "๐งฎ",
    color: "#3B82F6",
    order: 1,
    topics: [
      {
        name: "Number Series",
        nameTh: "เธญเธเธธเธเธฃเธกเธ•เธฑเธงเน€เธฅเธ",
        slug: "number-series",
        description: "เธซเธฒเธ•เธฑเธงเน€เธฅเธเธฅเธณเธ”เธฑเธเธ•เนเธญเนเธเนเธเธญเธเธธเธเธฃเธก",
        order: 1,
        questions: [
          {
            content: "2, 4, 8, 16, ?",
            difficulty: "EASY",
            explanation: "เธญเธเธธเธเธฃเธกเธเธนเธ“ 2 เธ—เธธเธเธ•เธฑเธง: 2ร—2=4, 4ร—2=8, 8ร—2=16, 16ร—2=32",
            options: [
              { content: "24", isCorrect: false, order: 1 },
              { content: "32", isCorrect: true, order: 2 },
              { content: "30", isCorrect: false, order: 3 },
              { content: "28", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "3, 6, 11, 18, 27, ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฅเธ•เนเธฒเธเน€เธเธดเนเธกเธเธถเนเธเธ—เธตเธฅเธฐ 2: +3, +5, +7, +9, +11 โ’ 27+11=38",
            options: [
              { content: "36", isCorrect: false, order: 1 },
              { content: "38", isCorrect: true, order: 2 },
              { content: "40", isCorrect: false, order: 3 },
              { content: "34", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "1, 1, 2, 3, 5, 8, ?",
            difficulty: "EASY",
            explanation: "เธญเธเธธเธเธฃเธกเธเธตเนเธเธเธฑเธเธเธต: เนเธ•เนเธฅเธฐเธ•เธฑเธงเธเธทเธญเธเธฅเธเธงเธเธเธญเธเธชเธญเธเธ•เธฑเธงเธเนเธญเธเธซเธเนเธฒ 5+8=13",
            options: [
              { content: "11", isCorrect: false, order: 1 },
              { content: "12", isCorrect: false, order: 2 },
              { content: "13", isCorrect: true, order: 3 },
              { content: "14", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "100, 95, 85, 70, 50, ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฅเธ•เนเธฒเธเน€เธเธดเนเธกเธเธถเนเธเธ—เธตเธฅเธฐ 5: -5, -10, -15, -20, -25 โ’ 50-25=25",
            options: [
              { content: "20", isCorrect: false, order: 1 },
              { content: "25", isCorrect: true, order: 2 },
              { content: "30", isCorrect: false, order: 3 },
              { content: "35", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "2, 3, 5, 8, 12, 17, ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฅเธ•เนเธฒเธเน€เธเธดเนเธกเธเธถเนเธเธ—เธตเธฅเธฐ 1: +1, +2, +3, +4, +5, +6 โ’ 17+6=23",
            options: [
              { content: "22", isCorrect: false, order: 1 },
              { content: "23", isCorrect: true, order: 2 },
              { content: "24", isCorrect: false, order: 3 },
              { content: "25", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Logic & Reasoning",
        nameTh: "เธ•เธฃเธฃเธเธจเธฒเธชเธ•เธฃเน",
        slug: "logic-reasoning",
        description: "เธเธถเธเธ—เธฑเธเธฉเธฐเธเธฒเธฃเธเธดเธ”เน€เธเธดเธเธ•เธฃเธฃเธเธฐเนเธฅเธฐเธเธฒเธฃเธญเธเธธเธกเธฒเธ",
        order: 2,
        questions: [
          {
            content: "เธ–เนเธฒ A > B เนเธฅเธฐ B > C เนเธฅเนเธง เธเนเธญเนเธ”เธ•เนเธญเนเธเธเธตเนเธ–เธนเธเธ•เนเธญเธ?",
            difficulty: "EASY",
            explanation: "เธเธฒเธเธเธ Transitive: เธ–เนเธฒ A>B เนเธฅเธฐ B>C เธ”เธฑเธเธเธฑเนเธ A>C",
            options: [
              { content: "C > A", isCorrect: false, order: 1 },
              { content: "A > C", isCorrect: true, order: 2 },
              { content: "B > A", isCorrect: false, order: 3 },
              { content: "C = A", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฑเธเน€เธฃเธตเธขเธเธ—เธธเธเธเธเนเธเธซเนเธญเธเธเธตเนเธเธญเธเธเธ“เธดเธ•เธจเธฒเธชเธ•เธฃเน เธชเธกเธเธฒเธขเน€เธเนเธเธเธฑเธเน€เธฃเธตเธขเธเนเธเธซเนเธญเธเธเธตเน เธ”เธฑเธเธเธฑเนเธ...",
            difficulty: "EASY",
            explanation: "เธเธฒเธฃเธญเธเธธเธกเธฒเธเนเธเธ Syllogism: เธชเธกเธเธฒเธขเน€เธเนเธเธเธฑเธเน€เธฃเธตเธขเธเนเธเธซเนเธญเธ เธ”เธฑเธเธเธฑเนเธเธชเธกเธเธฒเธขเธเธญเธเธเธ“เธดเธ•เธจเธฒเธชเธ•เธฃเน",
            options: [
              { content: "เธชเธกเธเธฒเธขเนเธกเนเธเธญเธเธเธ“เธดเธ•เธจเธฒเธชเธ•เธฃเน", isCorrect: false, order: 1 },
              { content: "เธชเธกเธเธฒเธขเธเธญเธเธเธ“เธดเธ•เธจเธฒเธชเธ•เธฃเน", isCorrect: true, order: 2 },
              { content: "เธเธฑเธเน€เธฃเธตเธขเธเธเธฒเธเธเธเธเธญเธเธเธ“เธดเธ•เธจเธฒเธชเธ•เธฃเน", isCorrect: false, order: 3 },
              { content: "เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธชเธฃเธธเธเนเธ”เน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธ–เนเธฒเน€เธกเธทเนเธญเธงเธฒเธเธเธทเธญเธงเธฑเธเธเธธเธ เธงเธฑเธเธเธตเนเธเธทเธญเธงเธฑเธเธญเธฐเนเธฃ?",
            difficulty: "EASY",
            explanation: "เน€เธกเธทเนเธญเธงเธฒเธเธงเธฑเธเธเธธเธ เธ”เธฑเธเธเธฑเนเธเธงเธฑเธเธเธตเนเธเธทเธญเธงเธฑเธเธเธคเธซเธฑเธชเธเธ”เธต",
            options: [
              { content: "เธงเธฑเธเธญเธฑเธเธเธฒเธฃ", isCorrect: false, order: 1 },
              { content: "เธงเธฑเธเธเธธเธ", isCorrect: false, order: 2 },
              { content: "เธงเธฑเธเธเธคเธซเธฑเธชเธเธ”เธต", isCorrect: true, order: 3 },
              { content: "เธงเธฑเธเธจเธธเธเธฃเน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธกเธตเธเธฅเนเธญเธ 5 เนเธ เนเธ•เนเธฅเธฐเนเธเธกเธตเธฅเธนเธเธเธญเธฅ 8 เธฅเธนเธ เธ–เนเธฒเน€เธญเธฒเธฅเธนเธเธเธญเธฅเธญเธญเธ 12 เธฅเธนเธ เธเธฐเน€เธซเธฅเธทเธญเธฅเธนเธเธเธญเธฅเธเธตเนเธฅเธนเธ?",
            difficulty: "EASY",
            explanation: "เธฅเธนเธเธเธญเธฅเธ—เธฑเนเธเธซเธกเธ” = 5ร—8 = 40 เธฅเธนเธ; เน€เธซเธฅเธทเธญ = 40-12 = 28 เธฅเธนเธ",
            options: [
              { content: "25 เธฅเธนเธ", isCorrect: false, order: 1 },
              { content: "26 เธฅเธนเธ", isCorrect: false, order: 2 },
              { content: "28 เธฅเธนเธ", isCorrect: true, order: 3 },
              { content: "30 เธฅเธนเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เนเธ 1 เธชเธฑเธเธ”เธฒเธซเนเธกเธต 7 เธงเธฑเธ เนเธ 4 เธชเธฑเธเธ”เธฒเธซเนเธกเธตเธเธตเนเธงเธฑเธ?",
            difficulty: "EASY",
            explanation: "4 ร— 7 = 28 เธงเธฑเธ",
            options: [
              { content: "24 เธงเธฑเธ", isCorrect: false, order: 1 },
              { content: "28 เธงเธฑเธ", isCorrect: true, order: 2 },
              { content: "30 เธงเธฑเธ", isCorrect: false, order: 3 },
              { content: "32 เธงเธฑเธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Analogies",
        nameTh: "เธญเธธเธเธกเธฒเธญเธธเธเนเธกเธข",
        slug: "analogies",
        description: "เธเธงเธฒเธกเธชเธฑเธกเธเธฑเธเธเนเธฃเธฐเธซเธงเนเธฒเธเธเธณเนเธฅเธฐเนเธเธงเธเธดเธ”",
        order: 3,
        questions: [
          {
            content: "เธเธฒเธเธเธฒ : เน€เธเธตเธขเธ เน€เธเนเธเน€เธ”เธตเธขเธงเธเธฑเธ เธกเธตเธ” : ?",
            difficulty: "EASY",
            explanation: "เธเธฒเธเธเธฒเนเธเนเน€เธเธตเธขเธ เธกเธตเธ”เนเธเนเธซเธฑเนเธ/เธ•เธฑเธ”",
            options: [
              { content: "เนเธ—เธ", isCorrect: false, order: 1 },
              { content: "เธซเธฑเนเธ", isCorrect: true, order: 2 },
              { content: "เธ•เธต", isCorrect: false, order: 3 },
              { content: "เธขเธดเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฃเธน : เนเธฃเธเน€เธฃเธตเธขเธ เน€เธเนเธเน€เธ”เธตเธขเธงเธเธฑเธ เนเธเธ—เธขเน : ?",
            difficulty: "EASY",
            explanation: "เธเธฃเธนเธ—เธณเธเธฒเธเธ—เธตเนเนเธฃเธเน€เธฃเธตเธขเธ เนเธเธ—เธขเนเธ—เธณเธเธฒเธเธ—เธตเนเนเธฃเธเธเธขเธฒเธเธฒเธฅ",
            options: [
              { content: "เธเธฅเธดเธเธดเธ", isCorrect: false, order: 1 },
              { content: "เนเธฃเธเธเธขเธฒเธเธฒเธฅ", isCorrect: true, order: 2 },
              { content: "เธชเธ–เธฒเธเธตเธญเธเธฒเธกเธฑเธข", isCorrect: false, order: 3 },
              { content: "เธซเนเธญเธเธเธเธดเธเธฑเธ•เธดเธเธฒเธฃ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฅเธฒ : เธเนเธณ เน€เธเนเธเน€เธ”เธตเธขเธงเธเธฑเธ เธเธ : ?",
            difficulty: "EASY",
            explanation: "เธเธฅเธฒเธญเธฒเธจเธฑเธขเธญเธขเธนเนเนเธเธเนเธณ เธเธเธญเธฒเธจเธฑเธขเธญเธขเธนเนเนเธเธญเธฒเธเธฒเธจ/เธ—เนเธญเธเธเนเธฒ",
            options: [
              { content: "เธ•เนเธเนเธกเน", isCorrect: false, order: 1 },
              { content: "เธญเธฒเธเธฒเธจ", isCorrect: true, order: 2 },
              { content: "เธ”เธดเธ", isCorrect: false, order: 3 },
              { content: "เธซเธดเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธซเธเธฑเธเธชเธทเธญ : เธซเนเธญเธเธชเธกเธธเธ” เน€เธเนเธเน€เธ”เธตเธขเธงเธเธฑเธ เธขเธฒ : ?",
            difficulty: "EASY",
            explanation: "เธซเธเธฑเธเธชเธทเธญเธญเธขเธนเนเนเธเธซเนเธญเธเธชเธกเธธเธ” เธขเธฒเธญเธขเธนเนเนเธเธฃเนเธฒเธเธเธฒเธขเธขเธฒ/เธเธฅเธฑเธเธขเธฒ",
            options: [
              { content: "เนเธฃเธเธเธขเธฒเธเธฒเธฅ", isCorrect: false, order: 1 },
              { content: "เธฃเนเธฒเธเธเธฒเธขเธขเธฒ", isCorrect: true, order: 2 },
              { content: "เธ•เธฅเธฒเธ”", isCorrect: false, order: 3 },
              { content: "เธเธฅเธดเธเธดเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธฃเนเธญเธ : เธซเธเธฒเธง เน€เธเนเธเน€เธ”เธตเธขเธงเธเธฑเธ เธชเธงเนเธฒเธ : ?",
            difficulty: "EASY",
            explanation: "เธฃเนเธญเธเนเธฅเธฐเธซเธเธฒเธงเน€เธเนเธเธเธนเนเธ•เธฃเธเธเนเธฒเธก เธชเธงเนเธฒเธเนเธฅเธฐเธกเธทเธ”เน€เธเนเธเธเธนเนเธ•เธฃเธเธเนเธฒเธก",
            options: [
              { content: "เนเธชเธ", isCorrect: false, order: 1 },
              { content: "เธเธฅเธฒเธเธเธทเธ", isCorrect: false, order: 2 },
              { content: "เธกเธทเธ”", isCorrect: true, order: 3 },
              { content: "เน€เธขเนเธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Thai Language",
    nameTh: "เธ เธฒเธฉเธฒเนเธ—เธข",
    slug: "thai-language",
    description: "เธ—เธ”เธชเธญเธเธเธงเธฒเธกเธฃเธนเนเธ เธฒเธฉเธฒเนเธ—เธข เนเธงเธขเธฒเธเธฃเธ“เน เนเธฅเธฐเธเธฒเธฃเธญเนเธฒเธ",
    icon: "๐“–",
    color: "#EF4444",
    order: 2,
    topics: [
      {
        name: "Grammar & Spelling",
        nameTh: "เนเธงเธขเธฒเธเธฃเธ“เนเนเธฅเธฐเธเธฒเธฃเธชเธฐเธเธ”เธเธณ",
        slug: "thai-grammar",
        description: "เนเธงเธขเธฒเธเธฃเธ“เนเธ เธฒเธฉเธฒเนเธ—เธขเนเธฅเธฐเธเธฒเธฃเธชเธฐเธเธ”เธเธณเธ—เธตเนเธ–เธนเธเธ•เนเธญเธ",
        order: 1,
        questions: [
          {
            content: "เธเนเธญเนเธ”เน€เธเธตเธขเธเธ–เธนเธเธ•เนเธญเธเธ•เธฒเธกเธซเธฅเธฑเธเธ เธฒเธฉเธฒเนเธ—เธข?",
            difficulty: "MEDIUM",
            explanation: "'เธเธฐเธ—เธด' เน€เธเนเธเธเธฒเธฃเธชเธฐเธเธ”เธ—เธตเนเธ–เธนเธเธ•เนเธญเธ เธ•เธฒเธกเธเธเธเธฒเธเธธเธเธฃเธกเธฃเธฒเธเธเธฑเธ“เธ‘เธดเธ•เธขเธชเธ–เธฒเธ",
            options: [
              { content: "เธเธฃเธฐเธ—เธด", isCorrect: false, order: 1 },
              { content: "เธเธฐเธ—เธด", isCorrect: true, order: 2 },
              { content: "เธเธฃเธฐเธ—เธต", isCorrect: false, order: 3 },
              { content: "เธเธฐเธ—เธต", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธณเนเธ”เธ•เนเธญเนเธเธเธตเนเธกเธตเธเธงเธฒเธกเธซเธกเธฒเธขเธ•เธฃเธเธเธฑเธเธเธณเธงเนเธฒ 'เธกเธซเธดเธกเธฒ'?",
            difficulty: "MEDIUM",
            explanation: "เธกเธซเธดเธกเธฒ เธซเธกเธฒเธขเธ–เธถเธ เธเธงเธฒเธกเธขเธดเนเธเนเธซเธเน, เธเธงเธฒเธกเธชเธณเธเธฑเธ, เธเธงเธฒเธกเน€เธเธฃเธตเธขเธเนเธเธฃ",
            options: [
              { content: "เธเธงเธฒเธกเธเนเธฒเธเธฅเธฑเธง", isCorrect: false, order: 1 },
              { content: "เธเธงเธฒเธกเธขเธดเนเธเนเธซเธเน", isCorrect: true, order: 2 },
              { content: "เธเธงเธฒเธกเธชเธงเธขเธเธฒเธก", isCorrect: false, order: 3 },
              { content: "เธเธงเธฒเธกเน€เธกเธ•เธ•เธฒ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฃเธฐเนเธขเธเนเธ”เนเธเนเธเธณเธงเนเธฒ 'เนเธ”เธข' เนเธ”เนเธ–เธนเธเธ•เนเธญเธ?",
            difficulty: "MEDIUM",
            explanation: "'เธฃเธฒเธขเธเธฒเธเธเธตเนเธเธฑเธ”เธ—เธณเนเธ”เธขเธเธฑเธเธจเธถเธเธฉเธฒ' เนเธเน 'เนเธ”เธข' เนเธชเธ”เธเธเธนเนเธเธฃเธฐเธ—เธณ เธเธถเนเธเธ–เธนเธเธ•เนเธญเธ",
            options: [
              { content: "เน€เธเธฒเนเธเนเธฃเธเน€เธฃเธตเธขเธเนเธ”เธขเธฃเธ–เธขเธเธ•เน", isCorrect: false, order: 1 },
              { content: "เธฃเธฒเธขเธเธฒเธเธเธตเนเธเธฑเธ”เธ—เธณเนเธ”เธขเธเธฑเธเธจเธถเธเธฉเธฒ", isCorrect: true, order: 2 },
              { content: "เน€เธเธญเธฃเนเธญเธเนเธซเนเนเธ”เธขเน€เธซเธ•เธธเธเธฅ", isCorrect: false, order: 3 },
              { content: "เนเธ”เธขเธ—เธตเนเน€เธเธฒเน€เธ”เธดเธเนเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธณเธงเนเธฒ 'เธเธฃเธฃเธ—เธฑเธ”' เธกเธตเธเธตเนเธเธขเธฒเธเธเน?",
            difficulty: "EASY",
            explanation: "เธเธฃเธฃเธ—เธฑเธ” เนเธเนเธเน€เธเนเธ เธเธฑเธ-เธ—เธฑเธ” = 2 เธเธขเธฒเธเธเน",
            options: [
              { content: "1 เธเธขเธฒเธเธเน", isCorrect: false, order: 1 },
              { content: "2 เธเธขเธฒเธเธเน", isCorrect: true, order: 2 },
              { content: "3 เธเธขเธฒเธเธเน", isCorrect: false, order: 3 },
              { content: "4 เธเธขเธฒเธเธเน", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธญเนเธ”เน€เธเนเธเธเธณเธฃเธฒเธเธฒเธจเธฑเธเธ—เนเธเธญเธเธเธณเธงเนเธฒ 'เธเธดเธ'?",
            difficulty: "MEDIUM",
            explanation: "เธเธณเธฃเธฒเธเธฒเธจเธฑเธเธ—เนเธเธญเธ 'เธเธดเธ' เธเธทเธญ 'เน€เธชเธงเธข' (เธชเธณเธซเธฃเธฑเธเธเธฃเธฐเธกเธซเธฒเธเธฉเธฑเธ•เธฃเธดเธขเน)",
            options: [
              { content: "เธฃเธฑเธเธเธฃเธฐเธ—เธฒเธ", isCorrect: false, order: 1 },
              { content: "เน€เธชเธงเธข", isCorrect: true, order: 2 },
              { content: "เธเธฑเธ", isCorrect: false, order: 3 },
              { content: "เธเธฃเธดเนเธ เธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Reading Comprehension",
        nameTh: "เธเธฒเธฃเธญเนเธฒเธเธเธฑเธเนเธเธเธงเธฒเธก",
        slug: "thai-reading",
        description: "เธ—เธ”เธชเธญเธเธเธงเธฒเธกเน€เธเนเธฒเนเธเนเธเธเธฒเธฃเธญเนเธฒเธเธเธ—เธเธงเธฒเธกเธ เธฒเธฉเธฒเนเธ—เธข",
        order: 2,
        questions: [
          {
            content: "\"เธเธนเนเธเธณเธ—เธตเนเธ”เธตเธ•เนเธญเธเธเธฑเธเน€เธชเธตเธขเธเธเธญเธเธเธฃเธฐเธเธฒเธเธ เนเธกเนเนเธเนเนเธเนเธชเธฑเนเธเธเธฒเธฃ\" เธเนเธญเธเธงเธฒเธกเธเธตเนเน€เธเนเธเน€เธฃเธทเนเธญเธเนเธ”?",
            difficulty: "MEDIUM",
            explanation: "เธเนเธญเธเธงเธฒเธกเน€เธเนเธเธงเนเธฒเธเธนเนเธเธณเธ—เธตเนเธ”เธตเธเธงเธฃเธฃเธฑเธเธเธฑเธเนเธฅเธฐเธชเธทเนเธญเธชเธฒเธฃเธชเธญเธเธ—เธฒเธ เนเธกเนเนเธเนเนเธเนเธญเธญเธเธเธณเธชเธฑเนเธ",
            options: [
              { content: "เธเธงเธฒเธกเน€เธ”เนเธ”เธเธฒเธ”เธเธญเธเธเธนเนเธเธณ", isCorrect: false, order: 1 },
              { content: "เธเธฒเธฃเธชเธทเนเธญเธชเธฒเธฃเนเธฅเธฐเธเธฒเธฃเธเธฑเธ", isCorrect: true, order: 2 },
              { content: "เธญเธณเธเธฒเธเธเธญเธเธเธฃเธฐเธเธฒเธเธ", isCorrect: false, order: 3 },
              { content: "เธเธเธฃเธฐเน€เธเธตเธขเธเนเธเธเธฒเธฃเธเธฃเธดเธซเธฒเธฃ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธณเธงเนเธฒ 'เนเธเธเธงเนเธฒเธ' เนเธเธชเธณเธเธงเธเนเธ—เธขเธซเธกเธฒเธขเธเธงเธฒเธกเธงเนเธฒเธญเธฐเนเธฃ?",
            difficulty: "EASY",
            explanation: "เนเธเธเธงเนเธฒเธ เธซเธกเธฒเธขเธ–เธถเธ เธกเธตเธเนเธณเนเธ เนเธซเนเธญเธ เธฑเธขเธเนเธฒเธข เนเธกเนเธเธฑเธเนเธเธ",
            options: [
              { content: "เธกเธตเน€เธเธทเนเธญเธ—เธตเนเธเธงเนเธฒเธ", isCorrect: false, order: 1 },
              { content: "เธกเธตเธเนเธณเนเธเน€เธญเธทเนเธญเน€เธเธทเนเธญ", isCorrect: true, order: 2 },
              { content: "เธฃเธนเนเธชเธถเธเธ”เธตเนเธ", isCorrect: false, order: 3 },
              { content: "เธเธฅเนเธฒเธซเธฒเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธณเธเธงเธ 'เธเนเธณเธเธถเนเธเนเธซเนเธฃเธตเธเธ•เธฑเธ' เธซเธกเธฒเธขเธเธงเธฒเธกเธงเนเธฒเธญเธขเนเธฒเธเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธซเธกเธฒเธขเธ–เธถเธ เน€เธกเธทเนเธญเธกเธตเนเธญเธเธฒเธชเธญเธฑเธเธ”เธตเธเธงเธฃเธฃเธตเธเนเธเนเธเธฃเธฐเนเธขเธเธเน เธญเธขเนเธฒเธเธฅเนเธญเธขเนเธซเนเนเธญเธเธฒเธชเธซเธฅเธธเธ”เธกเธทเธญ",
            options: [
              { content: "เนเธซเนเธฃเธตเธเธ•เธฑเธเธเนเธณเนเธเธเธ“เธฐเธเนเธณเธเธถเนเธเธชเธนเธ", isCorrect: false, order: 1 },
              { content: "เธเธงเธฃเธฃเธตเธเนเธเนเนเธญเธเธฒเธชเธ—เธตเนเธกเธตเธญเธขเธนเน", isCorrect: true, order: 2 },
              { content: "เธญเธขเนเธฒเนเธเนเธ—เธฃเธฑเธเธขเธฒเธเธฃเธกเธฒเธเน€เธเธดเธเนเธ", isCorrect: false, order: 3 },
              { content: "เนเธซเนเธฃเธฐเธงเธฑเธเธเนเธณเธ—เนเธงเธก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธญเนเธ”เน€เธเนเธเธเธฒเธฃเนเธเนเธ เธฒเธฉเธฒเนเธเธฃเธฐเธ”เธฑเธเธ—เธฒเธเธเธฒเธฃ?",
            difficulty: "MEDIUM",
            explanation: "'เธเธญเน€เธฃเธตเธขเธเน€เธเธดเธเธ—เนเธฒเธเน€เธเนเธฒเธฃเนเธงเธกเธเธฃเธฐเธเธธเธก' เน€เธเนเธเธ เธฒเธฉเธฒเธ—เธฒเธเธเธฒเธฃเธ—เธตเนเนเธเนเนเธเธซเธเธฑเธเธชเธทเธญเธฃเธฒเธเธเธฒเธฃ",
            options: [
              { content: "เธกเธฒเธเธฃเธฐเธเธธเธกเธ”เนเธงเธขเธเธฐ", isCorrect: false, order: 1 },
              { content: "เธเธญเน€เธเธดเธเธกเธฒเธเธฃเธฐเธเธธเธกเธเธฃเธฑเธ", isCorrect: false, order: 2 },
              { content: "เธเธญเน€เธฃเธตเธขเธเน€เธเธดเธเธ—เนเธฒเธเน€เธเนเธฒเธฃเนเธงเธกเธเธฃเธฐเธเธธเธก", isCorrect: true, order: 3 },
              { content: "เธเนเธงเธขเธกเธฒเธเธฃเธฐเธเธธเธกเธซเธเนเธญเธขเนเธ”เนเนเธซเธก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธณเนเธ”เธ•เนเธญเนเธเธเธตเนเน€เธเนเธเธเธณเธ—เธตเนเธกเธตเธเธงเธฒเธกเธซเธกเธฒเธขเนเธ”เธขเธเธฑเธข (connotation)?",
            difficulty: "HARD",
            explanation: "'เธเธฅเธดเนเธเธญเธฒเธข' เน€เธเนเธเธเธณเธ—เธตเนเธกเธตเธเธงเธฒเธกเธซเธกเธฒเธขเน€เธเธดเธเธเธฑเธข เธซเธกเธฒเธขเธ–เธถเธเธเธงเธฒเธกเธฃเธนเนเธชเธถเธเธซเธฃเธทเธญเธเธฃเธฃเธขเธฒเธเธฒเธจเธ—เธตเนเธฃเธฑเธเธฃเธนเนเนเธ”เน เนเธกเนเนเธเนเธเธฅเธดเนเธเธเธฃเธดเธเน",
            options: [
              { content: "เธเนเธฒเธ", isCorrect: false, order: 1 },
              { content: "เธเธฅเธดเนเธเธญเธฒเธข", isCorrect: true, order: 2 },
              { content: "เนเธ•เนเธฐ", isCorrect: false, order: 3 },
              { content: "เธซเธเธฑเธเธชเธทเธญ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Proverbs & Idioms",
        nameTh: "เธชเธณเธเธงเธเนเธฅเธฐเธชเธธเธ เธฒเธฉเธดเธ•",
        slug: "thai-proverbs",
        description: "เธชเธณเธเธงเธเนเธฅเธฐเธชเธธเธ เธฒเธฉเธดเธ•เนเธ—เธขเธ—เธตเนเนเธเนเธเนเธญเธขเนเธเธเนเธญเธชเธญเธ",
        order: 3,
        questions: [
          {
            content: "เธชเธธเธ เธฒเธฉเธดเธ• 'เนเธกเนเธญเนเธญเธเธ”เธฑเธ”เธเนเธฒเธข เนเธกเนเนเธเนเธ”เธฑเธ”เธขเธฒเธ' เธชเธทเนเธญเธเธงเธฒเธกเธซเธกเธฒเธขเธงเนเธฒเธญเธขเนเธฒเธเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธซเธกเธฒเธขเธ–เธถเธ เธเธฒเธฃเธญเธเธฃเธกเธชเธฑเนเธเธชเธญเธเธเธงเธฃเธ—เธณเธ•เธฑเนเธเนเธ•เนเธขเธฑเธเน€เธ”เนเธ เน€เธเธฃเธฒเธฐเน€เธกเธทเนเธญเนเธ•เนเธฅเนเธงเธเธฐเน€เธเธฅเธตเนเธขเธเธเธดเธชเธฑเธขเนเธ”เนเธขเธฒเธ",
            options: [
              { content: "เธ•เนเธเนเธกเนเธญเนเธญเธเธขเธทเธ”เธซเธขเธธเนเธเธเธงเนเธฒเธ•เนเธเนเธกเนเนเธเน", isCorrect: false, order: 1 },
              { content: "เธเธงเธฃเธญเธเธฃเธกเธชเธฑเนเธเธชเธญเธเน€เธ”เนเธเธ•เธฑเนเธเนเธ•เนเน€เธฅเนเธ", isCorrect: true, order: 2 },
              { content: "เธเธเนเธเนเธกเธตเธเธฃเธฐเธชเธเธเธฒเธฃเธ“เนเธกเธฒเธเธเธงเนเธฒเน€เธ”เนเธ", isCorrect: false, order: 3 },
              { content: "เธเธฒเธฃเธเธญเธเนเธกเนเธ•เนเธญเธเธฃเธฐเธกเธฑเธ”เธฃเธฐเธงเธฑเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธณเธเธงเธ 'เธเธฑเธเนเธกเนเธเนเธณเธ—เธฑเนเธเธซเนเธฒ' เธซเธกเธฒเธขเธ–เธถเธเธญเธฐเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธซเธกเธฒเธขเธ–เธถเธ เธเธนเธ”เธซเธงเนเธฒเธเธฅเนเธญเธกเธญเนเธฒเธเน€เธซเธ•เธธเธเธฅเธ•เนเธฒเธเน เธเธฒเธเธฒ เน€เธเธทเนเธญเธเธฑเธเธเธนเธเนเธซเนเน€เธเธทเนเธญเธซเธฃเธทเธญเธขเธดเธเธขเธญเธก",
            options: [
              { content: "เธเธนเธ”เธ–เธถเธเนเธกเนเธเนเธณเธ•เนเธฒเธเน", isCorrect: false, order: 1 },
              { content: "เธเธนเธ”เธซเธงเนเธฒเธเธฅเนเธญเธกเธ”เนเธงเธขเน€เธซเธ•เธธเธเธฅเธ•เนเธฒเธเน", isCorrect: true, order: 2 },
              { content: "เธเธงเธเนเธเน€เธ—เธตเนเธขเธงเนเธกเนเธเนเธณ", isCorrect: false, order: 3 },
              { content: "เธเธนเธ”เนเธเธซเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธธเธ เธฒเธฉเธดเธ•เนเธ”เธกเธตเธเธงเธฒเธกเธซเธกเธฒเธขเธงเนเธฒ 'เธญเธขเนเธฒเธ”เธนเธ–เธนเธเธเธเธญเธทเนเธเน€เธเธฃเธฒเธฐเธชเธฑเธเธงเธฑเธเน€เธเธฒเธญเธฒเธเน€เธเนเธเธเธงเนเธฒเน€เธฃเธฒ'?",
            difficulty: "MEDIUM",
            explanation: "'เธญเธขเนเธฒเธ”เธนเธ–เธนเธเธเนเธณเธเนเธญเธข' เธซเธฃเธทเธญเนเธเธฅเนเน€เธเธตเธขเธเธ—เธตเนเธชเธธเธ”เธเธทเธญ 'เธญเธขเนเธฒเธ•เธตเธเธนเนเธซเนเธซเธฑเธงเธซเธฒเธ' เธซเธกเธฒเธขเธ–เธถเธเธญเธขเนเธฒเธ”เธนเธ–เธนเธเธเธนเนเธกเธตเธเธงเธฒเธกเธชเธฒเธกเธฒเธฃเธ– เนเธ•เนเธ–เนเธฒเน€เธฅเธทเธญเธเธ—เธตเนเนเธเธฅเนเน€เธเธตเธขเธเธ—เธตเนเธชเธธเธ” เธเธทเธญ เธญเธขเนเธฒเธ”เธนเธ–เธนเธเธเธเนเธ”เธขเธฃเธนเธเธฅเธฑเธเธฉเธ“เน",
            options: [
              { content: "เธกเธทเธญเธ–เธทเธญเธชเธฒเธ เธเธฒเธเธ–เธทเธญเธจเธตเธฅ", isCorrect: false, order: 1 },
              { content: "เธญเธขเนเธฒเธ”เธนเธเนเธฒเธเนเธ•เนเธซเธฒเธเน€เธ”เธตเธขเธง", isCorrect: true, order: 2 },
              { content: "เธเนเธฒเธงเนเธซเธกเนเธเธฅเธฒเธกเธฑเธ", isCorrect: false, order: 3 },
              { content: "เธเธเน€เธเธงเธตเธขเธเธเธณเน€เธเธงเธตเธขเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธณเธเธงเธ 'เน€เธชเธทเธญเธเธญเธเธเธดเธ' เธซเธกเธฒเธขเธ–เธถเธเธญเธฐเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธซเธกเธฒเธขเธ–เธถเธ เธเธฒเธฃเนเธ”เนเธฃเธฑเธเธเธฅเธเธฃเธฐเนเธขเธเธเนเนเธ”เธขเนเธกเนเธ•เนเธญเธเธ—เธณเธเธฒเธ เธซเธฃเธทเธญ เธกเธตเธฃเธฒเธขเนเธ”เนเนเธ”เธขเนเธกเนเธ•เนเธญเธเธญเธญเธเนเธฃเธ",
            options: [
              { content: "เน€เธชเธทเธญเธ—เธตเนเธเธตเนเน€เธเธตเธขเธ", isCorrect: false, order: 1 },
              { content: "เนเธ”เนเธฃเธฑเธเธเธฅเธเธฃเธฐเนเธขเธเธเนเนเธ”เธขเนเธกเนเธ•เนเธญเธเธ—เธณเธเธฒเธ", isCorrect: true, order: 2 },
              { content: "เธเธเธ—เธตเนเธเธญเธเธซเธฅเธฑเธเธ•เธฅเธญเธ”เน€เธงเธฅเธฒ", isCorrect: false, order: 3 },
              { content: "เธเธเธ—เธตเนเธฃเนเธณเธฃเธงเธขเธกเธฒเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "'เธเธเน€เธเธงเธตเธขเธเธเธณเน€เธเธงเธตเธขเธ' เธซเธกเธฒเธขเธเธงเธฒเธกเธงเนเธฒเธญเธขเนเธฒเธเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธซเธกเธฒเธขเธ–เธถเธ เธเธฃเธฃเธกเธ—เธตเนเน€เธเธขเธ—เธณเนเธงเนเธขเนเธญเธกเธชเนเธเธเธฅเธเธฅเธฑเธเธกเธฒเธซเธฒเธ•เธฑเธง เธซเธฃเธทเธญ เน€เธงเธฃเธเธฃเธฃเธกเธกเธตเธเธฃเธดเธ",
            options: [
              { content: "เธงเธเธฅเนเธญเธซเธกเธธเธเน€เธงเธตเธขเธ", isCorrect: false, order: 1 },
              { content: "เธเธฃเธฃเธกเธ•เธฒเธกเธชเธเธญเธ", isCorrect: true, order: 2 },
              { content: "เธเธงเธฒเธกเธขเธธเธ•เธดเธเธฃเธฃเธก", isCorrect: false, order: 3 },
              { content: "เนเธเธเธเธฐเธ•เธฒ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "English Language",
    nameTh: "เธ เธฒเธฉเธฒเธญเธฑเธเธเธคเธฉ",
    slug: "english",
    description: "เธ—เธ”เธชเธญเธเธ—เธฑเธเธฉเธฐเธ เธฒเธฉเธฒเธญเธฑเธเธเธคเธฉ เนเธงเธขเธฒเธเธฃเธ“เน เนเธฅเธฐเธเธฒเธฃเธญเนเธฒเธ",
    icon: "๐ฌ๐ง",
    color: "#8B5CF6",
    order: 3,
    topics: [
      {
        name: "Grammar & Vocabulary",
        nameTh: "เนเธงเธขเธฒเธเธฃเธ“เนเนเธฅเธฐเธเธณเธจเธฑเธเธ—เน",
        slug: "english-grammar",
        description: "เนเธงเธขเธฒเธเธฃเธ“เนเธ เธฒเธฉเธฒเธญเธฑเธเธเธคเธฉเนเธฅเธฐเธเธณเธจเธฑเธเธ—เนเธ—เธตเนเนเธเนเธเนเธญเธข",
        order: 1,
        questions: [
          {
            content: "Choose the correct sentence:",
            difficulty: "MEDIUM",
            explanation: "'She has worked here for five years' เนเธเน Present Perfect เน€เธเธฃเธฒเธฐเน€เธเนเธเธชเธดเนเธเธ—เธตเนเธขเธฑเธเธ—เธณเธญเธขเธนเนเธ–เธถเธเธเธฑเธเธเธธเธเธฑเธ",
            options: [
              { content: "She work here for five years.", isCorrect: false, order: 1 },
              { content: "She has worked here for five years.", isCorrect: true, order: 2 },
              { content: "She is working here since five years.", isCorrect: false, order: 3 },
              { content: "She worked here since five years.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The word 'benevolent' is closest in meaning to:",
            difficulty: "MEDIUM",
            explanation: "'Benevolent' เธซเธกเธฒเธขเธ–เธถเธ เธกเธตเธเธงเธฒเธกเน€เธกเธ•เธ•เธฒ เธกเธตเนเธเธเธธเธจเธฅ เธเธถเนเธเธ•เธฃเธเธเธฑเธ 'kind and generous'",
            options: [
              { content: "strict and demanding", isCorrect: false, order: 1 },
              { content: "kind and generous", isCorrect: true, order: 2 },
              { content: "cold and indifferent", isCorrect: false, order: 3 },
              { content: "fierce and aggressive", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Fill in the blank: If I _____ rich, I would travel the world.",
            difficulty: "MEDIUM",
            explanation: "Second Conditional เนเธเน were/was + would + V1: 'If I were rich, I would travel'",
            options: [
              { content: "am", isCorrect: false, order: 1 },
              { content: "will be", isCorrect: false, order: 2 },
              { content: "were", isCorrect: true, order: 3 },
              { content: "had been", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The passive voice of 'The teacher teaches the students' is:",
            difficulty: "MEDIUM",
            explanation: "Passive voice: The students are taught by the teacher (Subject + is/are + V3 + by + agent)",
            options: [
              { content: "The students taught by the teacher.", isCorrect: false, order: 1 },
              { content: "The students are taught by the teacher.", isCorrect: true, order: 2 },
              { content: "The students were taught by the teacher.", isCorrect: false, order: 3 },
              { content: "The teacher is taught the students.", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Which word is a synonym of 'diligent'?",
            difficulty: "EASY",
            explanation: "'Diligent' เธซเธกเธฒเธขเธ–เธถเธ เธเธขเธฑเธเธซเธกเธฑเนเธเน€เธเธตเธขเธฃ เธเธถเนเธเธ•เธฃเธเธเธฑเธ 'hardworking'",
            options: [
              { content: "lazy", isCorrect: false, order: 1 },
              { content: "hardworking", isCorrect: true, order: 2 },
              { content: "careless", isCorrect: false, order: 3 },
              { content: "reckless", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Reading Comprehension",
        nameTh: "เธเธฒเธฃเธญเนเธฒเธเธ เธฒเธฉเธฒเธญเธฑเธเธเธคเธฉ",
        slug: "english-reading",
        description: "เธเธถเธเธญเนเธฒเธเธเธ—เธเธงเธฒเธกเธ เธฒเธฉเธฒเธญเธฑเธเธเธคเธฉเนเธฅเธฐเธ•เธญเธเธเธณเธ–เธฒเธก",
        order: 2,
        questions: [
          {
            content: "Read the passage: 'Climate change is one of the most pressing issues of our time. It affects weather patterns, sea levels, and biodiversity worldwide.' What is the main topic of this passage?",
            difficulty: "EASY",
            explanation: "เธเธ—เธเธงเธฒเธกเธเธนเธ”เธ–เธถเธ Climate change เนเธฅเธฐเธเธฅเธเธฃเธฐเธ—เธ เธ”เธฑเธเธเธฑเนเธ main topic เธเธทเธญ climate change and its effects",
            options: [
              { content: "Weather forecasting", isCorrect: false, order: 1 },
              { content: "Climate change and its impacts", isCorrect: true, order: 2 },
              { content: "Ocean biodiversity", isCorrect: false, order: 3 },
              { content: "Environmental laws", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "The word 'pressing' in the sentence 'one of the most pressing issues' means:",
            difficulty: "MEDIUM",
            explanation: "'Pressing' เนเธเธเธฃเธดเธเธ—เธเธตเนเธซเธกเธฒเธขเธ–เธถเธ urgent/important เนเธกเนเนเธเนเธเธฒเธฃเธเธ”",
            options: [
              { content: "pushing physically", isCorrect: false, order: 1 },
              { content: "urgent and important", isCorrect: true, order: 2 },
              { content: "difficult to understand", isCorrect: false, order: 3 },
              { content: "controversial", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the sentence with correct punctuation:",
            difficulty: "MEDIUM",
            explanation: "เธเธฃเธฐเนเธขเธเธ—เธตเนเธ–เธนเธเธ•เนเธญเธเธ•เนเธญเธเธกเธต comma เธซเธฅเธฑเธ introductory clause เนเธฅเธฐเนเธชเน period เธ—เนเธฒเธขเธเธฃเธฐเนเธขเธ",
            options: [
              { content: "However he decided to stay.", isCorrect: false, order: 1 },
              { content: "However, he decided to stay.", isCorrect: true, order: 2 },
              { content: "However he decided, to stay.", isCorrect: false, order: 3 },
              { content: "However he decided to stay!", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "What does 'FAQ' stand for?",
            difficulty: "EASY",
            explanation: "FAQ = Frequently Asked Questions = เธเธณเธ–เธฒเธกเธ—เธตเนเธเธเธเนเธญเธข",
            options: [
              { content: "Fast Answer Questions", isCorrect: false, order: 1 },
              { content: "Frequently Asked Questions", isCorrect: true, order: 2 },
              { content: "Full Accuracy Queries", isCorrect: false, order: 3 },
              { content: "Formal Answer Questionnaire", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Choose the correct preposition: She is interested _____ learning Thai.",
            difficulty: "EASY",
            explanation: "'Interested in' เน€เธเนเธ collocation เธ—เธตเนเธ–เธนเธเธ•เนเธญเธ",
            options: [
              { content: "at", isCorrect: false, order: 1 },
              { content: "on", isCorrect: false, order: 2 },
              { content: "in", isCorrect: true, order: 3 },
              { content: "for", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Civil Service Regulations",
    nameTh: "เธฃเธฐเน€เธเธตเธขเธเธฃเธฒเธเธเธฒเธฃ",
    slug: "civil-service",
    description: "เธเธเธซเธกเธฒเธขเนเธฅเธฐเธฃเธฐเน€เธเธตเธขเธเธ—เธตเนเน€เธเธตเนเธขเธงเธเนเธญเธเธเธฑเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃ",
    icon: "โ–๏ธ",
    color: "#F59E0B",
    order: 4,
    topics: [
      {
        name: "Civil Service Act",
        nameTh: "เธเธฃเธ. เธฃเธฐเน€เธเธตเธขเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ",
        slug: "civil-service-act",
        description: "เธเธฃเธฐเธฃเธฒเธเธเธฑเธเธเธฑเธ•เธดเธฃเธฐเน€เธเธตเธขเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ เธ.เธจ. 2551",
        order: 1,
        questions: [
          {
            content: "เธเธฃเธฐเธฃเธฒเธเธเธฑเธเธเธฑเธ•เธดเธฃเธฐเน€เธเธตเธขเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ เธเธเธฑเธเธเธฑเธเธเธธเธเธฑเธ เธเธทเธญ เธ.เธจ. เนเธ”?",
            difficulty: "MEDIUM",
            explanation: "เธเธฃเธ. เธฃเธฐเน€เธเธตเธขเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ เธเธเธฑเธเธเธฑเธเธเธธเธเธฑเธเธเธทเธญ เธ.เธจ. 2551 เธเธถเนเธเธเธฃเธฐเธเธฒเธจเนเธเนเนเธ—เธเธเธเธฑเธ เธ.เธจ. 2535",
            options: [
              { content: "เธ.เธจ. 2535", isCorrect: false, order: 1 },
              { content: "เธ.เธจ. 2545", isCorrect: false, order: 2 },
              { content: "เธ.เธจ. 2551", isCorrect: true, order: 3 },
              { content: "เธ.เธจ. 2560", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธเธชเธฒเธกเธฑเธเนเธเนเธเธญเธญเธเน€เธเนเธเธเธตเนเธเธฃเธฐเน€เธ เธ—?",
            difficulty: "MEDIUM",
            explanation: "เธ•เธฒเธก เธเธฃเธ. 2551 เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธเธชเธฒเธกเธฑเธเนเธเนเธเน€เธเนเธ 4 เธเธฃเธฐเน€เธ เธ—: เธ—เธฑเนเธงเนเธ เธงเธดเธเธฒเธเธฒเธฃ เธญเธณเธเธงเธขเธเธฒเธฃ เนเธฅเธฐเธเธฃเธดเธซเธฒเธฃ",
            options: [
              { content: "2 เธเธฃเธฐเน€เธ เธ—", isCorrect: false, order: 1 },
              { content: "3 เธเธฃเธฐเน€เธ เธ—", isCorrect: false, order: 2 },
              { content: "4 เธเธฃเธฐเน€เธ เธ—", isCorrect: true, order: 3 },
              { content: "5 เธเธฃเธฐเน€เธ เธ—", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธญเธฒเธขเธธเธเธฑเนเธเธ•เนเธณเนเธเธเธฒเธฃเธชเธกเธฑเธเธฃเธชเธญเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธเธเธทเธญเธเธตเนเธเธต?",
            difficulty: "EASY",
            explanation: "เธเธนเนเธชเธกเธฑเธเธฃเธชเธญเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธ•เนเธญเธเธกเธตเธญเธฒเธขเธธเนเธกเนเธ•เนเธณเธเธงเนเธฒ 18 เธเธต",
            options: [
              { content: "15 เธเธต", isCorrect: false, order: 1 },
              { content: "18 เธเธต", isCorrect: true, order: 2 },
              { content: "20 เธเธต", isCorrect: false, order: 3 },
              { content: "25 เธเธต", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธเธเธฃเธฐเน€เธ เธ— 'เธงเธดเธเธฒเธเธฒเธฃ' เธกเธตเธเธตเนเธฃเธฐเธ”เธฑเธ?",
            difficulty: "MEDIUM",
            explanation: "เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฃเธฐเน€เธ เธ—เธงเธดเธเธฒเธเธฒเธฃเธกเธต 5 เธฃเธฐเธ”เธฑเธ: เธเธเธดเธเธฑเธ•เธดเธเธฒเธฃ เธเธณเธเธฒเธเธเธฒเธฃ เธเธณเธเธฒเธเธเธฒเธฃเธเธดเน€เธจเธฉ เน€เธเธตเนเธขเธงเธเธฒเธ เธ—เธฃเธเธเธธเธ“เธงเธธเธ’เธด",
            options: [
              { content: "3 เธฃเธฐเธ”เธฑเธ", isCorrect: false, order: 1 },
              { content: "4 เธฃเธฐเธ”เธฑเธ", isCorrect: false, order: 2 },
              { content: "5 เธฃเธฐเธ”เธฑเธ", isCorrect: true, order: 3 },
              { content: "6 เธฃเธฐเธ”เธฑเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธณเธเธฑเธเธเธฒเธ เธ.เธ. เธขเนเธญเธกเธฒเธเธฒเธเธญเธฐเนเธฃ?",
            difficulty: "EASY",
            explanation: "เธ.เธ. เธขเนเธญเธกเธฒเธเธฒเธ เธเธ“เธฐเธเธฃเธฃเธกเธเธฒเธฃเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ",
            options: [
              { content: "เธเธญเธเธเธฃเธดเธซเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ", isCorrect: false, order: 1 },
              { content: "เธเธ“เธฐเธเธฃเธฃเธกเธเธฒเธฃเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธฅเน€เธฃเธทเธญเธ", isCorrect: true, order: 2 },
              { content: "เธเธฃเธกเธเธฑเธ’เธเธฒเธเนเธฒเธฃเธฒเธเธเธฒเธฃ", isCorrect: false, order: 3 },
              { content: "เธเธญเธเธเธฒเธฃเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธเธฅเน€เธฃเธทเธญเธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Government Ethics",
        nameTh: "เธเธฃเธฃเธขเธฒเธเธฃเธฃเธ“เธเนเธฒเธฃเธฒเธเธเธฒเธฃ",
        slug: "government-ethics",
        description: "เธกเธฒเธ•เธฃเธเธฒเธเธเธฃเธดเธขเธเธฃเธฃเธกเนเธฅเธฐเธเธฃเธฃเธขเธฒเธเธฃเธฃเธ“เธเธญเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃ",
        order: 2,
        questions: [
          {
            content: "เธกเธฒเธ•เธฃเธเธฒเธเธ—เธฒเธเธเธฃเธดเธขเธเธฃเธฃเธกเธชเธณเธซเธฃเธฑเธเน€เธเนเธฒเธซเธเนเธฒเธ—เธตเนเธเธญเธเธฃเธฑเธ เธ•เธฒเธกเธเธฃเธฐเธฃเธฒเธเธเธฑเธเธเธฑเธ•เธดเธกเธฒเธ•เธฃเธเธฒเธเธ—เธฒเธเธเธฃเธดเธขเธเธฃเธฃเธก เธ.เธจ. 2562 เธกเธตเธเธตเนเธเนเธญ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฃเธ. เธกเธฒเธ•เธฃเธเธฒเธเธ—เธฒเธเธเธฃเธดเธขเธเธฃเธฃเธก 2562 เธเธณเธซเธเธ”เธกเธฒเธ•เธฃเธเธฒเธเธ—เธฒเธเธเธฃเธดเธขเธเธฃเธฃเธก 7 เธเนเธญ",
            options: [
              { content: "5 เธเนเธญ", isCorrect: false, order: 1 },
              { content: "7 เธเนเธญ", isCorrect: true, order: 2 },
              { content: "10 เธเนเธญ", isCorrect: false, order: 3 },
              { content: "12 เธเนเธญ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธญเนเธ”เธ•เนเธญเนเธเธเธตเนเนเธกเนเนเธเนเธเธฃเธฃเธขเธฒเธเธฃเธฃเธ“เธเธญเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฒเธฃเธฃเธฑเธเธชเธดเธเธเธ (เธเธญเธเธเธงเธฑเธเธ—เธตเนเธกเธตเธกเธนเธฅเธเนเธฒเน€เธเธดเธเธเธงเนเธฒเธเธณเธซเธเธ”) เธ–เธทเธญเน€เธเนเธเธเธฒเธฃเธฅเธฐเน€เธกเธดเธ”เธเธฃเธฃเธขเธฒเธเธฃเธฃเธ“ เนเธกเนเนเธเนเธเธฃเธฃเธขเธฒเธเธฃเธฃเธ“",
            options: [
              { content: "เธเธทเนเธญเธชเธฑเธ•เธขเนเธชเธธเธเธฃเธดเธ•", isCorrect: false, order: 1 },
              { content: "เธกเธธเนเธเธเธฅเธชเธฑเธกเธคเธ—เธเธดเนเธเธญเธเธเธฒเธ", isCorrect: false, order: 2 },
              { content: "เธฃเธฑเธเธชเธดเธเธเธเธเธฒเธเธเธนเนเธกเธฒเธ•เธดเธ”เธ•เนเธญ", isCorrect: true, order: 3 },
              { content: "เธขเธถเธ”เธ–เธทเธญเธเธฃเธฐเนเธขเธเธเนเธชเนเธงเธเธฃเธงเธก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธซเธฒเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธฃเธฑเธเธเธญเธเธเธงเธฑเธเนเธเธเนเธงเธเน€เธ—เธจเธเธฒเธฅ เธ•เธฒเธกเธฃเธฐเน€เธเธตเธขเธเธชเธณเธเธฑเธเธเธฒเธขเธเธฃเธฑเธเธกเธเธ•เธฃเธตเธงเนเธฒเธ”เนเธงเธขเธเธฒเธฃเนเธซเนเธซเธฃเธทเธญเธฃเธฑเธเธเธญเธเธเธงเธฑเธ เธชเธฒเธกเธฒเธฃเธ–เธฃเธฑเธเนเธ”เนเนเธกเนเน€เธเธดเธเธกเธนเธฅเธเนเธฒเน€เธ—เนเธฒเนเธ”?",
            difficulty: "HARD",
            explanation: "เธ•เธฒเธกเธฃเธฐเน€เธเธตเธขเธเธชเธณเธเธฑเธเธเธฒเธขเธเธฃเธฑเธเธกเธเธ•เธฃเธตเธฏ เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธชเธฒเธกเธฒเธฃเธ–เธฃเธฑเธเธเธญเธเธเธงเธฑเธเนเธเน€เธ—เธจเธเธฒเธฅเนเธ”เนเนเธกเนเน€เธเธดเธ 3,000 เธเธฒเธ—",
            options: [
              { content: "1,000 เธเธฒเธ—", isCorrect: false, order: 1 },
              { content: "3,000 เธเธฒเธ—", isCorrect: true, order: 2 },
              { content: "5,000 เธเธฒเธ—", isCorrect: false, order: 3 },
              { content: "10,000 เธเธฒเธ—", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธงเธดเธเธฑเธขเธ—เธตเนเธฃเนเธฒเธขเนเธฃเธเธ—เธตเนเธชเธธเธ”เธชเธณเธซเธฃเธฑเธเธเนเธฒเธฃเธฒเธเธเธฒเธฃเธเธทเธญเธญเธฐเนเธฃ?",
            difficulty: "MEDIUM",
            explanation: "เธเธฒเธฃเนเธเธญเธญเธเธฃเธฑเธเนเธเนเธเธฒเธเธ•เนเธฒเธเธเธฃเธฐเน€เธ—เธจ เธซเธฃเธทเธญเธเธฒเธฃเธ—เธธเธเธฃเธดเธ•เธ•เนเธญเธซเธเนเธฒเธ—เธตเน เน€เธเนเธเธงเธดเธเธฑเธขเธฃเนเธฒเธขเนเธฃเธเธ—เธตเนเธญเธฒเธเธเธณเนเธเธชเธนเนเธเธฒเธฃเนเธซเนเธญเธญเธ เธเธฅเธ”เธญเธญเธ เธซเธฃเธทเธญเนเธฅเนเธญเธญเธ",
            options: [
              { content: "เธเธฒเธฃเธกเธฒเธชเธฒเธข", isCorrect: false, order: 1 },
              { content: "เธเธฒเธฃเธฅเธฒเธเธฒเธ”", isCorrect: false, order: 2 },
              { content: "เธเธฒเธฃเธ—เธธเธเธฃเธดเธ•เธ•เนเธญเธซเธเนเธฒเธ—เธตเนเธฃเธฒเธเธเธฒเธฃ", isCorrect: true, order: 3 },
              { content: "เธเธฒเธฃเนเธชเธ”เธเธเธงเธฒเธกเธเธดเธ”เน€เธซเนเธเธ—เธฒเธเธเธฒเธฃเน€เธกเธทเธญเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธกเธตเธซเธเนเธฒเธ—เธตเนเธฃเธฑเธเธฉเธฒเธเธงเธฒเธกเธฅเธฑเธเธฃเธฒเธเธเธฒเธฃ เนเธเธฃเธกเธตเธญเธณเธเธฒเธเธญเธเธธเธเธฒเธ•เนเธซเนเน€เธเธดเธ”เน€เธเธขเธเธงเธฒเธกเธฅเธฑเธเธ—เธฒเธเธฃเธฒเธเธเธฒเธฃ?",
            difficulty: "HARD",
            explanation: "เธเธฒเธฃเน€เธเธดเธ”เน€เธเธขเธเนเธญเธกเธนเธฅเธฃเธฒเธเธเธฒเธฃเธ•เนเธญเธเนเธ”เนเธฃเธฑเธเธญเธเธธเธเธฒเธ•เธเธฒเธเธเธนเนเธเธฑเธเธเธฑเธเธเธฑเธเธเธฒเธเธนเนเธกเธตเธญเธณเธเธฒเธเธซเธฃเธทเธญเธ•เธฒเธกเธเธเธซเธกเธฒเธขเธ—เธตเนเธเธณเธซเธเธ”",
            options: [
              { content: "เธเนเธฒเธฃเธฒเธเธเธฒเธฃเธชเธฒเธกเธฒเธฃเธ–เธ•เธฑเธ”เธชเธดเธเนเธเน€เธญเธเนเธ”เน", isCorrect: false, order: 1 },
              { content: "เธเธนเนเธเธฑเธเธเธฑเธเธเธฑเธเธเธฒเธซเธฃเธทเธญเธเธนเนเธกเธตเธญเธณเธเธฒเธเธ•เธฒเธกเธเธเธซเธกเธฒเธข", isCorrect: true, order: 2 },
              { content: "เน€เธเธทเนเธญเธเธฃเนเธงเธกเธเธฒเธ", isCorrect: false, order: 3 },
              { content: "เธเธฃเธฐเธเธฒเธเธเธ—เธฑเนเธงเนเธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "General Knowledge",
    nameTh: "เธเธงเธฒเธกเธฃเธนเนเธ—เธฑเนเธงเนเธ",
    slug: "general-knowledge",
    description: "เธเธงเธฒเธกเธฃเธนเนเธ—เธฑเนเธงเนเธ เน€เธซเธ•เธธเธเธฒเธฃเธ“เนเธเธฑเธเธเธธเธเธฑเธ เนเธฅเธฐเธเธฃเธฐเธงเธฑเธ•เธดเธจเธฒเธชเธ•เธฃเนเนเธ—เธข",
    icon: "๐",
    color: "#10B981",
    order: 5,
    topics: [
      {
        name: "Thai History & Society",
        nameTh: "เธเธฃเธฐเธงเธฑเธ•เธดเธจเธฒเธชเธ•เธฃเนเนเธฅเธฐเธชเธฑเธเธเธกเนเธ—เธข",
        slug: "thai-history",
        description: "เธเธฃเธฐเธงเธฑเธ•เธดเธจเธฒเธชเธ•เธฃเนเนเธ—เธขเนเธฅเธฐเธชเธฑเธเธเธกเนเธ—เธขเธ—เธตเนเธญเธญเธเธชเธญเธ",
        order: 1,
        questions: [
          {
            content: "เธเธฃเธธเธเธฃเธฑเธ•เธเนเธเธชเธดเธเธ—เธฃเนเธเนเธญเธ•เธฑเนเธเธเธถเนเธเนเธเธเธต เธ.เธจ. เนเธ”?",
            difficulty: "EASY",
            explanation: "เธเธฃเธธเธเธฃเธฑเธ•เธเนเธเธชเธดเธเธ—เธฃเนเธเนเธญเธ•เธฑเนเธเน€เธกเธทเนเธญ เธ.เธจ. 2325 เนเธ”เธขเธเธฃเธฐเธเธฒเธ—เธชเธกเน€เธ”เนเธเธเธฃเธฐเธเธธเธ—เธเธขเธญเธ”เธเนเธฒเธเธธเธฌเธฒเนเธฅเธเธกเธซเธฒเธฃเธฒเธ เธฃเธฑเธเธเธฒเธฅเธ—เธตเน 1",
            options: [
              { content: "เธ.เธจ. 2310", isCorrect: false, order: 1 },
              { content: "เธ.เธจ. 2325", isCorrect: true, order: 2 },
              { content: "เธ.เธจ. 2350", isCorrect: false, order: 3 },
              { content: "เธ.เธจ. 2400", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธงเธฑเธเธเนเธญเนเธซเนเธเธเธฒเธ•เธดเธเธญเธเนเธ—เธขเธ•เธฃเธเธเธฑเธเธงเธฑเธเนเธ”?",
            difficulty: "EASY",
            explanation: "เธงเธฑเธเธเนเธญเนเธซเนเธเธเธฒเธ•เธดเธ•เธฃเธเธเธฑเธเธงเธฑเธเธ—เธตเน 5 เธเธฑเธเธงเธฒเธเธก เธเธถเนเธเน€เธเนเธเธงเธฑเธเธเธฅเนเธฒเธขเธงเธฑเธเธเธฃเธฐเธเธฃเธกเธฃเธฒเธเธชเธกเธ เธเธเธญเธเธฃเธฑเธเธเธฒเธฅเธ—เธตเน 9",
            options: [
              { content: "5 เธเธฑเธเธงเธฒเธเธก", isCorrect: true, order: 1 },
              { content: "12 เธชเธดเธเธซเธฒเธเธก", isCorrect: false, order: 2 },
              { content: "1 เธกเธเธฃเธฒเธเธก", isCorrect: false, order: 3 },
              { content: "10 เธเธฑเธเธงเธฒเธเธก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฃเธฐเน€เธ—เธจเนเธ—เธขเธเธเธเธฃเธญเธเธ”เนเธงเธขเธฃเธฐเธเธญเธเนเธ”เนเธเธเธฑเธเธเธธเธเธฑเธ?",
            difficulty: "EASY",
            explanation: "เนเธ—เธขเธเธเธเธฃเธญเธเธ”เนเธงเธขเธฃเธฐเธเธญเธเธเธฃเธฐเธเธฒเธเธดเธเนเธ•เธขเธญเธฑเธเธกเธตเธเธฃเธฐเธกเธซเธฒเธเธฉเธฑเธ•เธฃเธดเธขเนเธ—เธฃเธเน€เธเนเธเธเธฃเธฐเธกเธธเธ",
            options: [
              { content: "เธชเธฒเธเธฒเธฃเธ“เธฃเธฑเธ", isCorrect: false, order: 1 },
              { content: "เธเธฃเธฐเธเธฒเธเธดเธเนเธ•เธขเธญเธฑเธเธกเธตเธเธฃเธฐเธกเธซเธฒเธเธฉเธฑเธ•เธฃเธดเธขเนเธ—เธฃเธเน€เธเนเธเธเธฃเธฐเธกเธธเธ", isCorrect: true, order: 2 },
              { content: "เธชเธกเธเธนเธฃเธ“เธฒเธเธฒเธชเธดเธ—เธเธดเธฃเธฒเธ", isCorrect: false, order: 3 },
              { content: "เธชเธฑเธเธเธกเธเธดเธขเธก", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธเธเธฒเธ•เธดเนเธ—เธขเธกเธตเธเธตเนเธชเธต?",
            difficulty: "EASY",
            explanation: "เธเธเธเธฒเธ•เธดเนเธ—เธขเธกเธต 3 เธชเธต เธเธทเธญ เนเธ”เธ เธเธฒเธง เนเธฅเธฐเธเนเธณเน€เธเธดเธ",
            options: [
              { content: "2 เธชเธต", isCorrect: false, order: 1 },
              { content: "3 เธชเธต", isCorrect: true, order: 2 },
              { content: "4 เธชเธต", isCorrect: false, order: 3 },
              { content: "5 เธชเธต", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธฃเธฑเธเธเธฃเธฃเธกเธเธนเธเธเธเธฑเธเธเธฑเธเธเธธเธเธฑเธเธเธญเธเนเธ—เธขเธเธฃเธฐเธเธฒเธจเนเธเนเน€เธกเธทเนเธญ เธ.เธจ. เนเธ”?",
            difficulty: "MEDIUM",
            explanation: "เธฃเธฑเธเธเธฃเธฃเธกเธเธนเธเนเธซเนเธเธฃเธฒเธเธญเธฒเธ“เธฒเธเธฑเธเธฃเนเธ—เธข เธ.เธจ. 2560 เธเธฃเธฐเธเธฒเธจเนเธเนเน€เธกเธทเนเธญเธงเธฑเธเธ—เธตเน 6 เน€เธกเธฉเธฒเธขเธ เธ.เธจ. 2560",
            options: [
              { content: "เธ.เธจ. 2550", isCorrect: false, order: 1 },
              { content: "เธ.เธจ. 2557", isCorrect: false, order: 2 },
              { content: "เธ.เธจ. 2560", isCorrect: true, order: 3 },
              { content: "เธ.เธจ. 2562", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
      {
        name: "Current Affairs",
        nameTh: "เน€เธซเธ•เธธเธเธฒเธฃเธ“เนเธเธฑเธเธเธธเธเธฑเธ",
        slug: "current-affairs",
        description: "เธเนเธฒเธงเธชเธฒเธฃเนเธฅเธฐเน€เธซเธ•เธธเธเธฒเธฃเธ“เนเธชเธณเธเธฑเธเธ—เธตเนเธเธงเธฃเธฃเธนเน",
        order: 2,
        questions: [
          {
            content: "ASEAN เธเนเธญเธ•เธฑเนเธเธเธถเนเธเนเธเธเธต เธ.เธจ. เนเธ”?",
            difficulty: "EASY",
            explanation: "ASEAN (Association of Southeast Asian Nations) เธเนเธญเธ•เธฑเนเธเน€เธกเธทเนเธญเธงเธฑเธเธ—เธตเน 8 เธชเธดเธเธซเธฒเธเธก เธ.เธจ. 1967 (เธ.เธจ. 2510)",
            options: [
              { content: "เธ.เธจ. 1945", isCorrect: false, order: 1 },
              { content: "เธ.เธจ. 1960", isCorrect: false, order: 2 },
              { content: "เธ.เธจ. 1967", isCorrect: true, order: 3 },
              { content: "เธ.เธจ. 1975", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธเธฃเธฐเน€เธ—เธจเนเธ—เธขเน€เธเนเธเธชเธกเธฒเธเธดเธเธญเธเธเนเธเธฃเธฃเธฐเธซเธงเนเธฒเธเธเธฃเธฐเน€เธ—เธจเนเธ”เธ•เนเธญเนเธเธเธตเน?",
            difficulty: "EASY",
            explanation: "เนเธ—เธขเน€เธเนเธเธชเธกเธฒเธเธดเธ UN (เธญเธเธเนเธเธฒเธฃเธชเธซเธเธฃเธฐเธเธฒเธเธฒเธ•เธด) เธ•เธฑเนเธเนเธ•เนเธเธต 1946",
            options: [
              { content: "NATO", isCorrect: false, order: 1 },
              { content: "UN", isCorrect: true, order: 2 },
              { content: "EU", isCorrect: false, order: 3 },
              { content: "G7", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "เธชเธเธธเธฅเน€เธเธดเธเธเธญเธเธชเธซเธ เธฒเธเธขเธธเนเธฃเธ (EU) เธเธทเธญเธญเธฐเนเธฃ?",
            difficulty: "EASY",
            explanation: "เธชเธเธธเธฅเน€เธเธดเธเธเธญเธ EU เธเธทเธญ เธขเธนเนเธฃ (Euro)",
            options: [
              { content: "เธ”เธญเธฅเธฅเธฒเธฃเน", isCorrect: false, order: 1 },
              { content: "เธขเธนเนเธฃ", isCorrect: true, order: 2 },
              { content: "เธเธญเธเธ”เน", isCorrect: false, order: 3 },
              { content: "เน€เธขเธ", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "SDGs เธเธทเธญเน€เธเนเธฒเธซเธกเธฒเธขเธเธฒเธฃเธเธฑเธ’เธเธฒเธ—เธตเนเธขเธฑเนเธเธขเธทเธเธเธญเธเธญเธเธเนเธเธฃเนเธ”?",
            difficulty: "MEDIUM",
            explanation: "SDGs (Sustainable Development Goals) เน€เธเนเธเน€เธเนเธฒเธซเธกเธฒเธข 17 เธเนเธญเธเธญเธเธชเธซเธเธฃเธฐเธเธฒเธเธฒเธ•เธด (UN) เธเธณเธซเธเธ”เนเธเธเธต 2015",
            options: [
              { content: "World Bank", isCorrect: false, order: 1 },
              { content: "ASEAN", isCorrect: false, order: 2 },
              { content: "เธชเธซเธเธฃเธฐเธเธฒเธเธฒเธ•เธด (UN)", isCorrect: true, order: 3 },
              { content: "WHO", isCorrect: false, order: 4 },
            ],
          },
          {
            content: "Thailand 4.0 เน€เธเนเธเธเนเธขเธเธฒเธขเธเธญเธเธฃเธฑเธเธเธฒเธฅเนเธ—เธขเธ—เธตเนเน€เธเนเธเน€เธฃเธทเนเธญเธเนเธ”?",
            difficulty: "MEDIUM",
            explanation: "Thailand 4.0 เน€เธเนเธเธเนเธขเธเธฒเธขเธ—เธตเนเน€เธเนเธเธเธฒเธฃเธเธฑเธ’เธเธฒเน€เธจเธฃเธฉเธเธเธดเธเนเธ”เธขเนเธเนเธเธงเธฑเธ•เธเธฃเธฃเธกเนเธฅเธฐเน€เธ—เธเนเธเนเธฅเธขเธตเน€เธเนเธเธ•เธฑเธงเธเธฑเธเน€เธเธฅเธทเนเธญเธ",
            options: [
              { content: "เธเธฒเธฃเธ—เนเธญเธเน€เธ—เธตเนเธขเธง", isCorrect: false, order: 1 },
              { content: "เธเธฒเธฃเน€เธเธฉเธ•เธฃ", isCorrect: false, order: 2 },
              { content: "เธเธงเธฑเธ•เธเธฃเธฃเธกเนเธฅเธฐเน€เธ—เธเนเธเนเธฅเธขเธต", isCorrect: true, order: 3 },
              { content: "เธญเธธเธ•เธชเธฒเธซเธเธฃเธฃเธกเธซเธเธฑเธ", isCorrect: false, order: 4 },
            ],
          },
        ],
      },
    ],
  },
];

const achievements = [
  { name: "First Step", nameTh: "เธเนเธฒเธงเนเธฃเธ", description: "เธ—เธณเธเนเธญเธชเธญเธเธเธฃเธฑเนเธเนเธฃเธ", icon: "๐ฑ", condition: "first_question", xpReward: 50 },
  { name: "Century", nameTh: "เธฃเนเธญเธขเธเนเธญ", description: "เธ•เธญเธเธเธณเธ–เธฒเธกเธเธฃเธ 100 เธเนเธญ", icon: "๐’ฏ", condition: "questions_100", xpReward: 100 },
  { name: "Streak 7", nameTh: "เน€เธฃเธตเธขเธเธ•เนเธญเน€เธเธทเนเธญเธ 7 เธงเธฑเธ", description: "เน€เธฃเธตเธขเธเธ•เนเธญเน€เธเธทเนเธญเธ 7 เธงเธฑเธ", icon: "๐”ฅ", condition: "streak_7", xpReward: 150 },
  { name: "Perfect Score", nameTh: "เน€เธ•เนเธกเธฃเนเธญเธข", description: "เนเธ”เนเธเธฐเนเธเธ 100% เนเธเธเธฒเธฃเธชเธญเธ", icon: "โญ", condition: "perfect_exam", xpReward: 200 },
  { name: "All Subjects", nameTh: "เธเธฃเธเธ—เธธเธเธงเธดเธเธฒ", description: "เธ—เธณเธเนเธญเธชเธญเธเธเธฃเธเธ—เธธเธเธงเธดเธเธฒ", icon: "๐ฏ", condition: "all_subjects", xpReward: 250 },
  { name: "Speed Demon", nameTh: "เนเธงเน€เธซเธกเธทเธญเธเธชเธฒเธขเธเนเธฒ", description: "เธ•เธญเธเธ–เธนเธ 10 เธเนเธญเธ•เธดเธ”เธ•เนเธญเธเธฑเธ", icon: "โก", condition: "correct_10_streak", xpReward: 100 },
  { name: "Scholar", nameTh: "เธเธฑเธเธงเธดเธเธฒเธเธฒเธฃ", description: "เธ–เธถเธเธฃเธฐเธ”เธฑเธ 6", icon: "๐“", condition: "level_6", xpReward: 300 },
  { name: "Expert", nameTh: "เธเธนเนเน€เธเธตเนเธขเธงเธเธฒเธ", description: "เธ–เธถเธเธฃเธฐเธ”เธฑเธ 10", icon: "๐‘‘", condition: "level_10", xpReward: 500 },
];

async function main() {
  console.log("๐ฑ Seeding database...");

  // Seed subjects and topics
  for (const subject of subjects) {
    const { topics, ...subjectData } = subject;
    const createdSubject = await prisma.subject.upsert({
      where: { slug: subjectData.slug },
      update: subjectData,
      create: subjectData,
    });

    for (const topic of topics) {
      const { questions, ...topicData } = topic;
      const createdTopic = await prisma.topic.upsert({
        where: { slug: topicData.slug },
        update: { ...topicData, subjectId: createdSubject.id },
        create: { ...topicData, subjectId: createdSubject.id },
      });

      for (const question of questions) {
        const { options, ...questionData } = question;
        const createdQuestion = await prisma.question.create({
          data: {
            ...questionData,
            topicId: createdTopic.id,
            options: {
              create: options,
            },
          },
        });
        console.log(`  โ“ Question: ${createdQuestion.content.substring(0, 50)}...`);
      }
    }
  }

  // Seed achievements
  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.name.toLowerCase().replace(/\s/g, "-") },
      update: achievement,
      create: { ...achievement, id: achievement.name.toLowerCase().replace(/\s/g, "-") },
    });
  }

  // Create demo admin user
  const hashedPassword = await bcrypt.hash("admin1234", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kpexam.com" },
    update: {},
    create: {
      email: "admin@kpexam.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
      profile: {
        create: { xp: 9999, level: 10, streak: 0 },
      },
    },
  });
  console.log(`โ“ Admin user: ${admin.email}`);

  console.log("โ… Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
