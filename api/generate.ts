import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      subject,
      theme,
      competenciesLabel,
      level,
      count,
      subjectRules,
      lengthRules,
      isPhoneoSport
    } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const promptContents = `Génère ${count} questions de quiz pédagogique.
Matière : ${subject.label}
Domaine : ${theme.label}
Niveau : ${level}
Compétences précises à évaluer : ${competenciesLabel}

RÈGLES SPÉCIFIQUES À LA MATIÈRE :
${subjectRules}

RÈGLES DE LONGUEUR ET DE NIVEAU :
${lengthRules}

FORMAT DE SORTIE :
1. Réponse sous forme de texte court ou nombre.
2. Trois options par question (pour les modes classiques).
3. Une seule réponse correcte. Les deux autres sont des pièges classiques.
4. L'index de la bonne réponse est 0, 1 ou 2.
${isPhoneoSport ? "5. Pour Phonéo-Sport, ajoute un champ 'phonemes' qui est un tableau des sons du mot." : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptContents,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              statement: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                minItems: 3,
                maxItems: 3
              },
              correctIndex: { type: Type.INTEGER },
              phonemes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["statement", "options", "correctIndex"]
          }
        }
      }
    });

    const rawQuestions = JSON.parse(response.text || "[]");
    return res.status(200).json(rawQuestions);
  } catch (error: any) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ error: error.message });
  }
}
