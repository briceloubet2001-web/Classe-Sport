import { Question, Competency, Theme, Subject, SkillLevel } from "../types";
import { PHYSICAL_EXERCISES, PHONEO_SPORT_EXERCISES } from "../constants";

export const generateQuizQuestions = async (
  subject: Subject,
  theme: Theme,
  competencies: Competency[],
  level: SkillLevel,
  count: number = 10
): Promise<Question[]> => {
  const competenciesLabel = competencies.map(c => c.label).join(", ");
  const isPhoneoSport = theme.id === 'phoneo_sport';

  const mathRange = level === SkillLevel.CP ? "nombres jusqu'à 100" : level === SkillLevel.CE1 ? "nombres jusqu'à 1 000" : "nombres jusqu'à 10 000";

  let subjectRules = "";
  switch (subject.id) {
    case 'maths':
      if (theme.id.startsWith('calcul_mental')) {
        subjectRules = `ATTENTION CALCUL MENTAL : 
        - Champ numérique strict pour le niveau ${level} : ${mathRange}.
        - L'énoncé doit être EXCLUSIVEMENT une écriture mathématique (ex: "12 + 15 = ?", "4 x 8 = ?", "150 - 30 = ?").
        - Pour les divisions, utilise impérativement le symbole ":" au lieu de "/" (ex: "15 : 3 = ?").
        - AUCUNE PHRASE, AUCUNE QUESTION TEXTUELLE. Juste le calcul visuel direct.`;
      } else {
        subjectRules = `Pose des questions de mathématiques (nombres, géométrie, grandeurs, données) adaptées au niveau ${level}.
        - Champ numérique strict : ${mathRange}.
        - Programme CP : additions/soustractions, doubles/moitiés, figures de base (carré, rectangle, triangle, cube, pavé, cylindre), longueurs (comparaison).
        - Programme CE1 : multiplication, alignement, angle droit, symétrie, mesures (m, cm, km, g, kg, L, euros).
        - Programme CE2 : sens de la division, fractions simples (1/2, 1/3, 1/4, 1/10), périmètre, compas.`;
      }
      break;
    case 'francais':
      if (isPhoneoSport) {
        subjectRules = `ATTENTION PHONÉO-SPORT (CP) - ENCODAGE DE MOTS : 
        - L'objectif est de faire deviner l'encodage complet d'un mot simple.
        - Pour chaque question, fournis un mot simple (ex: "CHAT", "LAPIN", "CHAMPIGNON", "MOUCHE").
        - Fournis également un EMOJI correspondant au mot.
        - Décompose le mot en ses sons principaux (phonèmes) parmi cette liste : [a], [i], [o], [u], [ou], [on], [an], [in], [ch], [gn], [p/b], [t/d], [r/l], [s/z].
        - Exemple pour "CHAT" : sons = ["[ch]", "[a]"].
        - Exemple pour "MOUCHE" : sons = ["[m]", "[ou]", "[ch]"]. (Note: simplifie les consonnes si nécessaire vers les catégories proposées).
        - Le champ "statement" doit contenir l'EMOJI et le MOT.`;
      } else if (theme.id === 'graphemes') {
        subjectRules = `Focus GRAPHÈMES : Travaille sur l'identification VISUELLE des lettres ou syllabes dans un mot (ex: 'Où est le [ou] ?' dans 'journal', 'four', 'balle').`;
      } else if (theme.id === 'lecture') {
        subjectRules = `Focus PHONOLOGIE : Travaille sur le SON entendu (ex: 'Quel mot contient le son [s] ?').`;
      } else {
        subjectRules = `Pose des questions de grammaire, conjugaison, orthographe, lexique ou compréhension strictement basées sur le programme officiel de ${level} :
        - Programme CP : phrase simple (majuscule, point), singulier/pluriel (+s), féminin (+e), présent (verbes 1er groupe, être, avoir), ordre alphabétique, mots invariables.
        - Programme CE1 : identifier nom, verbe, déterminant, adjectif, pronom. Temps : présent, imparfait, futur, passé composé. Synonymes, antonymes, familles de mots, accords simples.
        - Programme CE2 : accords dans le groupe nominal, accord sujet-verbe, homophones, préfixes/suffixes, sens propre/figuré.`;
      }
      break;
    case 'questionner_monde':
      subjectRules = `Pose des questions de connaissances pures sur le programme "Questionner le monde" pour le niveau ${level}.
      - Programme CP : repérage dans le temps (journée, semaine) et l'espace proche (classe, école), vivant vs non-vivant.
      - Programme CE1 : repérage sur l'année, évolution des modes de vie, maquettes/plans du quartier, alimentation, états de l'eau.
      - Programme CE2 : frise chronologique, paysages de France, cycle de vie des animaux/végétaux, circuits électriques simples.`;
      break;
    case 'histoire':
    case 'geographie':
    case 'sciences':
      subjectRules = `Pose des questions de connaissances pures sur le programme de ${subject.label} pour le niveau ${level}.
      - Histoire CM1 : Avant la France, Rois, Révolution/Empire. CM2 : République, Âge industriel, Guerres mondiales.
      - Géographie CM1 : Habiter, Consommer. CM2 : Se déplacer, Internet, Mieux habiter.
      - Sciences CM1 : États de la matière, Système solaire, Classification, Digestion. CM2 : Vitesse, Énergie, Volcans, Écosystèmes, Programmation.`;
      break;
    case 'emc':
      subjectRules = `Pose des questions sur l'Enseignement Moral et Civique (EMC) pour le niveau ${level}.
      - CP/CE1 : Émotions, règles de vie, symboles de la République (drapeau, hymne), respect des différences, éco-gestes.
      - CE2/CM1 : Égalité filles-garçons, laïcité, droits de l'enfant, harcèlement, développement durable.
      - CM2 : Le vote, la démocratie, s'informer, esprit critique.`;
      break;
    default:
      subjectRules = `Pose des questions adaptées au niveau ${level} sur le thème ${theme.label}.`;
  }

  let lengthRules = "";
  if (level === SkillLevel.CP || level === SkillLevel.CE1) {
    lengthRules = `RÈGLE ABSOLUE POUR LES APPRENTIS LECTEURS (${level}) : 
    - L'énoncé de la question doit être ULTRA-COURT (10 mots maximum).
    - Les réponses doivent faire 1 à 3 mots maximum.
    - Utilise SYSTÉMATIQUEMENT un EMOJI illustratif au début de chaque option de réponse si c'est pertinent (ex: "🍎 Pomme", "🐶 Chien", "☀️ Le Soleil").
    - Le temps de lecture doit être le plus court et le plus simple possible.`;
  } else {
    lengthRules = `RÈGLE DE LONGUEUR :
    - L'énoncé doit être clair, direct et adapté à des élèves de ${level}.
    - Les réponses doivent être concises pour une lecture rapide sur tableau interactif.`;
  }

  // APPEL AU BACKEND (SERVERLESS FUNCTION SUR VERCEL) AU LIEU DU SDK DIRECT
  const apiResponse = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject,
      theme,
      competenciesLabel,
      level,
      count,
      subjectRules,
      lengthRules,
      isPhoneoSport
    })
  });

  if (!apiResponse.ok) {
    throw new Error('Failed to fetch from backend API');
  }

  const rawQuestions = await apiResponse.json();
  let lastUsedIds: string[] = [];

  return rawQuestions.map((q: any) => {
    let shuffledExercises;
    let phonemeSequence = undefined;

    if (isPhoneoSport && q.phonemes) {
      phonemeSequence = q.phonemes.map((p: string) => {
        const cleanP = p.toLowerCase().replace('[', '').replace(']', '');
        const exercise = PHONEO_SPORT_EXERCISES.find(ex => 
          ex.name.toLowerCase().includes(cleanP) || cleanP.includes(ex.name.toLowerCase().replace('[', '').replace(']', ''))
        );
        return { sound: p, exercise: exercise || PHONEO_SPORT_EXERCISES[0] };
      });
      // On remplit quand même options pour la compatibilité
      shuffledExercises = [PHONEO_SPORT_EXERCISES[0], PHONEO_SPORT_EXERCISES[1], PHONEO_SPORT_EXERCISES[2]];
    } else if (isPhoneoSport) {
      // Fallback si phonemes est manquant
      shuffledExercises = q.options.map((opt: string) => {
        const cleanOpt = opt.toLowerCase().replace('[', '').replace(']', '');
        const exercise = PHONEO_SPORT_EXERCISES.find(ex => 
          ex.name.toLowerCase().includes(cleanOpt) || cleanOpt.includes(ex.name.toLowerCase().replace('[', '').replace(']', ''))
        );
        return exercise || PHONEO_SPORT_EXERCISES[0];
      });
    } else {
      // Sélectionner des exercices physiques variés (comportement standard)
      const availablePool = PHYSICAL_EXERCISES.filter(ex => !lastUsedIds.includes(ex.id));
      shuffledExercises = [...availablePool]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      if (shuffledExercises.length < 3) {
        const extras = PHYSICAL_EXERCISES
          .filter(ex => !shuffledExercises.find(s => s.id === ex.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 - shuffledExercises.length);
        shuffledExercises.push(...extras);
      }
      lastUsedIds = shuffledExercises.map(ex => ex.id);
    }

    const options = q.options.map((val: string, index: number) => ({
      value: val,
      exercise: shuffledExercises[index]
    }));

    return {
      statement: q.statement,
      options,
      correctIndex: q.correctIndex,
      phonemes: phonemeSequence
    };
  });
};
