import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Use the safe API Key (Server-side)
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Add the generate endpoint here
  app.post('/api/generate', async (req, res) => {
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
      res.json(rawQuestions);
    } catch (error: any) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Support Vercel serverless export
export default startServer;

if (process.env.NODE_ENV !== 'production') {
    startServer();
}
