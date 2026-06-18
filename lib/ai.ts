import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface GeneratedQuestion {
  content: string;
  explanation: string;
  options: Array<{ content: string; isCorrect: boolean; order: number }>;
}

export async function generateQuestions(
  topicName: string,
  subjectName: string,
  difficulty: "EASY" | "MEDIUM" | "HARD",
  count: number
): Promise<GeneratedQuestion[]> {
  const difficultyMap = { EASY: "ง่าย", MEDIUM: "ปานกลาง", HARD: "ยาก" };

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `สร้างข้อสอบ ${count} ข้อ สำหรับการสอบ ก.พ. ภาค ก ในหัวข้อ "${topicName}" วิชา "${subjectName}" ระดับความยาก: ${difficultyMap[difficulty]}

รูปแบบ JSON ที่ต้องการ (ตอบเฉพาะ JSON เท่านั้น ไม่ต้องมีคำอธิบายเพิ่มเติม):
[
  {
    "content": "คำถาม",
    "explanation": "คำอธิบายเฉลยโดยละเอียด",
    "options": [
      { "content": "ตัวเลือก A", "isCorrect": false, "order": 1 },
      { "content": "ตัวเลือก B", "isCorrect": true, "order": 2 },
      { "content": "ตัวเลือก C", "isCorrect": false, "order": 3 },
      { "content": "ตัวเลือก D", "isCorrect": false, "order": 4 }
    ]
  }
]

กฎ:
- แต่ละข้อต้องมีตัวเลือก 4 ข้อ มีคำตอบที่ถูกต้องเพียง 1 ข้อ
- ข้อสอบต้องเกี่ยวข้องกับหัวข้อและระดับความยากที่กำหนด
- เฉลยต้องอธิบายเหตุผลอย่างชัดเจน`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("AI did not return valid JSON");
  return JSON.parse(jsonMatch[0]) as GeneratedQuestion[];
}

export async function explainAnswer(
  question: string,
  selectedAnswer: string,
  correctAnswer: string,
  explanation: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `ข้อสอบ ก.พ.: ${question}

คำตอบที่เลือก: ${selectedAnswer}
คำตอบที่ถูก: ${correctAnswer}
เฉลย: ${explanation}

อธิบายแบบ step-by-step ว่าทำไมคำตอบที่เลือกจึงผิด และทำไมคำตอบที่ถูกจึงถูก ใช้ภาษาไทยที่เข้าใจง่าย ตอบสั้น 3-5 ประโยค`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : explanation;
}

export async function getStudyRecommendations(
  weakTopics: Array<{ name: string; accuracy: number }>
): Promise<string> {
  const topicList = weakTopics
    .map((t) => `- ${t.name}: แม่น ${t.accuracy}%`)
    .join("\n");

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `ผู้เรียนกำลังเตรียมสอบ ก.พ. โดยมีผลการฝึกซ้อมดังนี้:
${topicList}

แนะนำแผนการเรียน 3-5 ข้อ เพื่อเพิ่มคะแนนในหัวข้อที่ยังอ่อน ตอบเป็นภาษาไทย กระชับ เข้าใจง่าย`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}
