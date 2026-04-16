import { Subject, PhysicalExercise, SkillLevel } from './types';

// Niveaux spécifiques d'introduction (pour filtrage précis)
const INTRO_CP = [SkillLevel.CP];
const INTRO_CE1 = [SkillLevel.CE1];
const INTRO_CE2 = [SkillLevel.CE2];
const INTRO_CM1 = [SkillLevel.CM1];
const INTRO_CM2 = [SkillLevel.CM2];

export const SUBJECTS: Subject[] = [
  {
    id: 'maths',
    label: 'Mathématiques',
    icon: '➕',
    color: 'bg-blue-600',
    themes: [
      {
        id: 'calcul_mental_faits',
        label: 'Calcul mental : Faits',
        competencies: [
          { id: 'cmf1', label: 'Tables d\'addition', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'cmf2', label: 'Doubles et moitiés', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'cmf3', label: 'Tables de multiplication', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cmf4', label: 'Multiples de 25, 50', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'calcul_mental_num',
        label: 'Calcul mental : Numération',
        competencies: [
          { id: 'cmn1', label: '+1, +2, -1, -2', levels: [SkillLevel.CP] },
          { id: 'cmn2', label: '+/- 10', levels: [SkillLevel.CP] },
          { id: 'cmn3', label: '+/- dizaines', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'cmn4', label: 'Multiplier par 10 ou 100', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'calcul_mental_proc',
        label: 'Calcul mental : Procédures',
        competencies: [
          { id: 'cmp1', label: 'Complément à la dizaine', levels: [SkillLevel.CP, SkillLevel.CE1] },
          { id: 'cmp2', label: 'Ajouter/Soustraire < 9', levels: [SkillLevel.CP, SkillLevel.CE1] },
          { id: 'cmp3', label: 'Ajouter 9, 19, 29...', levels: [SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'cmp4', label: 'Multiplier par 4 ou 8', levels: [SkillLevel.CE2, SkillLevel.CM1] }
        ]
      },
      {
        id: 'nombres_entiers',
        label: 'Nombres entiers',
        competencies: [
          { id: 'ne01', label: 'Nombres jusqu\'à 100', levels: [SkillLevel.CP] },
          { id: 'ne02', label: 'Nombres jusqu\'à 1 000', levels: [SkillLevel.CE1] },
          { id: 'ne03', label: 'Nombres jusqu\'à 10 000', levels: [SkillLevel.CE2] },
          { id: 'ne04', label: 'Grands nombres', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'fractions_decimaux',
        label: 'Fractions et Décimaux',
        competencies: [
          { id: 'fd01', label: 'Fractions simples', levels: [SkillLevel.CE2, SkillLevel.CM1] },
          { id: 'fd02', label: 'Nombres décimaux', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'calcul_pose',
        label: 'Calcul posé',
        competencies: [
          { id: 'cp01', label: 'Additions et soustractions', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'cp02', label: 'Multiplications', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cp03', label: 'Divisions', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'grandeurs',
        label: 'Grandeurs et Mesures',
        competencies: [
          { id: 'gm01', label: 'Longueurs (cm, m)', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm02', label: 'Monnaie', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'gm03', label: 'Masses et Contenances', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm04', label: 'L\'heure et les durées', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm05', label: 'Périmètre', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm06', label: 'Aire', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'geometrie',
        label: 'Espace et Géométrie',
        competencies: [
          { id: 'g01', label: 'Repérage, déplacement', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'g02', label: 'Solides', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'g03', label: 'Figures planes', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'g04', label: 'Alignement, angle droit', levels: [SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'g05', label: 'Symétrie axiale', levels: [SkillLevel.CE2, SkillLevel.CM1] }
        ]
      },
      {
        id: 'donnees',
        label: 'Gestion de données',
        competencies: [
          { id: 'od01', label: 'Lire un tableau / graphique', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'od02', label: 'Proportionnalité', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      }
    ]
  },
  {
    id: 'francais',
    label: 'Français',
    icon: '📚',
    color: 'bg-emerald-600',
    themes: [
      {
        id: 'phoneo_sport',
        label: 'Phonéo-Sport',
        competencies: [
          { id: 'ps01', label: 'Sons complexes', levels: [SkillLevel.CP] }
        ]
      },
      {
        id: 'lecture_graphemes',
        label: 'Lecture : Graphèmes',
        competencies: [
          { id: 'gr01', label: 'Voyelles et consonnes', levels: [SkillLevel.CP] },
          { id: 'gr02', label: 'Syllabes simples', levels: [SkillLevel.CP] },
          { id: 'gr03', label: 'Graphèmes complexes', levels: [SkillLevel.CP] },
          { id: 'gr04', label: 'Lettres muettes', levels: [SkillLevel.CP, SkillLevel.CE1] }
        ]
      },
      {
        id: 'lecture_compr',
        label: 'Compréhension',
        competencies: [
          { id: 'lc01', label: 'Sens global', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'lc02', label: 'Inférences / Implicite', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'grammaire',
        label: 'Grammaire',
        competencies: [
          { id: 'gm01', label: 'La phrase', levels: [SkillLevel.CP, SkillLevel.CE1] },
          { id: 'gm02', label: 'Le groupe nominal', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm03', label: 'Sujet et Verbe', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'gm04', label: 'Compléments', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'conjugaison',
        label: 'Conjugaison',
        competencies: [
          { id: 'cj01', label: 'Présent', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cj02', label: 'Imparfait', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cj03', label: 'Futur simple', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cj04', label: 'Passé composé', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'cj05', label: 'Passé simple', levels: [SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'orthographe',
        label: 'Orthographe',
        competencies: [
          { id: 'or01', label: 'Mots invariables', levels: [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2] },
          { id: 'or02', label: 'Accords (Nominal)', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'or03', label: 'Accord Sujet-Verbe', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'or04', label: 'Homophones', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] }
        ]
      },
      {
        id: 'lexique',
        label: 'Lexique',
        competencies: [
          { id: 'lx01', label: 'Ordre alphabétique', levels: [SkillLevel.CP, SkillLevel.CE1] },
          { id: 'lx02', label: 'Synonymes/Antonymes', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'lx03', label: 'Familles de mots', levels: [SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] },
          { id: 'lx04', label: 'Sens propre/figuré', levels: [SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2] }
        ]
      }
    ]
  },
  {
    id: 'questionner_monde',
    label: 'Questionner le monde',
    icon: '🌱',
    color: 'bg-teal-600',
    themes: [
      {
        id: 'qm_temps',
        label: 'Le Temps',
        competencies: [
          { id: 'qm01', label: 'Le jour et la nuit', levels: INTRO_CP },
          { id: 'qm02', label: 'Jours, mois, saisons', levels: INTRO_CP },
          { id: 'qm03', label: 'Passé, présent, futur', levels: INTRO_CE1 },
          { id: 'qm04', label: 'L\'évolution des modes de vie', levels: INTRO_CE2 },
          { id: 'qm05', label: 'Frise chronologique', levels: INTRO_CE2 }
        ]
      },
      {
        id: 'qm_espace',
        label: 'L\'Espace',
        competencies: [
          { id: 'qm06', label: 'Ma classe et mon école', levels: INTRO_CP },
          { id: 'qm07', label: 'Mon quartier, mon village', levels: INTRO_CE1 },
          { id: 'qm08', label: 'Lire un plan ou une carte', levels: INTRO_CE2 },
          { id: 'qm09', label: 'Les paysages (ville, campagne, mer)', levels: INTRO_CE2 }
        ]
      },
      {
        id: 'qm_vivant',
        label: 'Vivant, Matière, Objets',
        competencies: [
          { id: 'qm10', label: 'Vivant vs Non-vivant', levels: INTRO_CP },
          { id: 'qm11', label: 'Alimentation et hygiène', levels: INTRO_CE1 },
          { id: 'qm12', label: 'Cycle de vie des animaux/végétaux', levels: INTRO_CE2 },
          { id: 'qm13', label: 'Les états de l\'eau', levels: INTRO_CE1 },
          { id: 'qm14', label: 'Circuits électriques simples', levels: INTRO_CE2 }
        ]
      }
    ]
  },
  {
    id: 'histoire',
    label: 'Histoire',
    icon: '🏰',
    color: 'bg-amber-600',
    themes: [
      {
        id: 'h_cm1_1',
        label: 'Et avant la France ? (CM1)',
        competencies: [
          { id: 'h01', label: 'Celtes, Gaulois, Grecs et Romains', levels: INTRO_CM1 },
          { id: 'h02', label: 'Clovis et Charlemagne', levels: INTRO_CM1 },
          { id: 'h05', label: 'Les invasions barbares', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'h_cm1_2',
        label: 'Le temps des rois (CM1)',
        competencies: [
          { id: 'h06', label: 'Louis IX, le roi chrétien', levels: INTRO_CM1 },
          { id: 'h07', label: 'François Ier et la Renaissance', levels: INTRO_CM1 },
          { id: 'h08', label: 'Louis XIV, le Roi Soleil', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'h_cm1_3',
        label: 'Révolutions et Empire (CM1)',
        competencies: [
          { id: 'h03', label: 'L\'année 1789 et la République', levels: INTRO_CM1 },
          { id: 'h09', label: 'Napoléon Bonaparte', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'h_cm2_1',
        label: 'Le temps de la République (CM2)',
        competencies: [
          { id: 'h13', label: '1892 : La République fête ses 100 ans', levels: INTRO_CM2 },
          { id: 'h14', label: 'L\'école de Jules Ferry', levels: INTRO_CM2 },
          { id: 'h15', label: 'Symboles et valeurs républicains', levels: INTRO_CM2 }
        ]
      },
      {
        id: 'h_cm2_2',
        label: 'L\'âge industriel / Guerres (CM2)',
        competencies: [
          { id: 'h10', label: 'L\'industrialisation au XIXe', levels: INTRO_CM2 },
          { id: 'h04', label: 'La Première Guerre Mondiale', levels: INTRO_CM2 },
          { id: 'h11', label: 'La Seconde Guerre Mondiale', levels: INTRO_CM2 },
          { id: 'h12', label: 'La construction européenne', levels: INTRO_CM2 }
        ]
      }
    ]
  },
  {
    id: 'geographie',
    label: 'Géographie',
    icon: '🌍',
    color: 'bg-cyan-600',
    themes: [
      {
        id: 'ge_cm1',
        label: 'Découvrir / Habiter / Consommer (CM1)',
        competencies: [
          { id: 'ge01', label: 'Habiter une métropole', levels: INTRO_CM1 },
          { id: 'ge03', label: 'Habiter un littoral ou montagne', levels: INTRO_CM1 },
          { id: 'ge11', label: 'Satisfaire les besoins en eau', levels: INTRO_CM1 },
          { id: 'ge12', label: 'Satisfaire les besoins en énergie', levels: INTRO_CM1 },
          { id: 'ge13', label: 'D\'où viennent nos aliments ?', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'ge_cm2',
        label: 'Se déplacer / Communiquer (CM2)',
        competencies: [
          { id: 'ge02', label: 'Transports du quotidien', levels: INTRO_CM2 },
          { id: 'ge06', label: 'Se déplacer en France et en Europe', levels: INTRO_CM2 },
          { id: 'ge07', label: 'Internet : un monde connecté', levels: INTRO_CM2 },
          { id: 'ge08', label: 'Mieux habiter : Écologie urbaine', levels: INTRO_CM2 }
        ]
      }
    ]
  },
  {
    id: 'sciences',
    label: 'Sciences et Technologie',
    icon: '🔬',
    color: 'bg-purple-600',
    themes: [
      {
        id: 'sc_matiere',
        label: 'Matière, Mouvement, Énergie',
        competencies: [
          { id: 'sc01', label: 'États et changements d\'état', levels: INTRO_CM1 },
          { id: 'sc02', label: 'Mélanges et solutions', levels: INTRO_CM1 },
          { id: 'sc03', label: 'Vitesse et mouvement', levels: INTRO_CM2 },
          { id: 'sc04', label: 'Conversions d\'énergie', levels: INTRO_CM2 }
        ]
      },
      {
        id: 'sc_vivant',
        label: 'Le Vivant, diversité et fonctions',
        competencies: [
          { id: 'sc05', label: 'Classification du vivant', levels: INTRO_CM1 },
          { id: 'sc06', label: 'Chaînes et réseaux alimentaires', levels: INTRO_CM1 },
          { id: 'sc07', label: 'Développement et reproduction', levels: INTRO_CM2 },
          { id: 'sc08', label: 'Besoins alimentaires humains', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'sc_objets',
        label: 'Objets techniques',
        competencies: [
          { id: 'sc09', label: 'Besoins et fonctions techniques', levels: INTRO_CM1 },
          { id: 'sc10', label: 'Évolution technologique', levels: INTRO_CM2 },
          { id: 'sc11', label: 'Algorithmique et programmation', levels: INTRO_CM2 }
        ]
      },
      {
        id: 'sc_terre',
        label: 'La Terre, planète peuplée',
        competencies: [
          { id: 'sc12', label: 'Le système solaire', levels: INTRO_CM1 },
          { id: 'sc13', label: 'Volcans et séismes', levels: INTRO_CM2 },
          { id: 'sc14', label: 'Météorologie et climat', levels: INTRO_CM2 },
          { id: 'sc15', label: 'Écosystèmes et actions humaines', levels: INTRO_CM2 }
        ]
      }
    ]
  },
  {
    id: 'emc',
    label: 'Enseignement Moral et Civique',
    icon: '🤝',
    color: 'bg-rose-500',
    themes: [
      {
        id: 'emc_respect',
        label: 'Respecter autrui',
        competencies: [
          { id: 'emc01', label: 'Identifier et exprimer ses émotions', levels: INTRO_CP },
          { id: 'emc02', label: 'Le respect des différences', levels: INTRO_CE1 },
          { id: 'emc03', label: 'L\'égalité filles-garçons', levels: INTRO_CE2 },
          { id: 'emc04', label: 'Le harcèlement et les moqueries', levels: INTRO_CM1 }
        ]
      },
      {
        id: 'emc_valeurs',
        label: 'Valeurs de la République',
        competencies: [
          { id: 'emc05', label: 'Les symboles de la République', levels: INTRO_CP },
          { id: 'emc06', label: 'La devise : Liberté, Égalité, Fraternité', levels: INTRO_CE1 },
          { id: 'emc07', label: 'La laïcité à l\'école', levels: INTRO_CE2 },
          { id: 'emc08', label: 'Les droits de l\'enfant', levels: INTRO_CM1 },
          { id: 'emc09', label: 'Le vote et la démocratie', levels: INTRO_CM2 }
        ]
      },
      {
        id: 'emc_civique',
        label: 'Culture civique et Engagement',
        competencies: [
          { id: 'emc10', label: 'Les règles de vie en classe', levels: INTRO_CP },
          { id: 'emc11', label: 'Le secours à autrui (premiers gestes)', levels: INTRO_CE2 },
          { id: 'emc12', label: 'Protéger l\'environnement (éco-gestes)', levels: INTRO_CE1 },
          { id: 'emc13', label: 'Le développement durable', levels: INTRO_CM1 },
          { id: 'emc14', label: 'S\'informer et esprit critique', levels: INTRO_CM2 }
        ]
      }
    ]
  }
];

export const PHYSICAL_EXERCISES: PhysicalExercise[] = [
  { id: 'sprint', name: 'COURSE', emoji: '🏃‍♂️', description: 'Cours sur place très vite !', color: 'bg-red-600' },
  { id: 'jumping_jack', name: 'PANTIN', emoji: '🤸', description: 'Écarte bras et jambes !', color: 'bg-blue-500' },
  { id: 'burpees', name: 'SAUT FUSÉE', emoji: '🚀', description: 'Touche le sol et saute au ciel !', color: 'bg-orange-600' },
  { id: 'knees', name: 'GENOUX HAUTS', emoji: '🧗', description: 'Monte les genoux bien haut !', color: 'bg-purple-600' },
  { id: 'claps', name: 'BRAVO !', emoji: '👏', description: 'Applaudis au-dessus de ta tête !', color: 'bg-indigo-500' },
  { id: 'boxe', name: 'BOXE', emoji: '🥊', description: 'Donne des petits coups de poing !', color: 'bg-rose-600' },
  { id: 'frog', name: 'GRENOUILLE', emoji: '🐸', description: 'Fais des grands sauts de grenouille !', color: 'bg-emerald-600' },
  { id: 'heels', name: 'TALONS-FESSES', emoji: '👞', description: 'Touche tes fesses avec tes talons !', color: 'bg-lime-600' },
  { id: 'skater', name: 'SAUT DE CÔTÉ', emoji: '⛸️', description: 'Saute d\'un pied sur l\'autre !', color: 'bg-sky-500' },
  { id: 'star', name: 'L\'ÉTOILE', emoji: '⭐', description: 'Saute en faisant l\'étoile !', color: 'bg-yellow-500' },
  { id: 'climber', name: 'L\'ÉCHELLE', emoji: '🪜', description: 'Grimpe à une échelle imaginaire !', color: 'bg-stone-600' },
  { id: 'criss_cross', name: 'CROISE-DÉCROISE', emoji: '✂️', description: 'Croise tes jambes en sautant !', color: 'bg-cyan-600' }
];

export const PHONEO_SPORT_EXERCISES: PhysicalExercise[] = [
  { id: 'son_a', name: '[a]', emoji: '🙆', description: 'Bras en l\'air', color: 'bg-red-400' },
  { id: 'son_i', name: '[i]', emoji: '☝️', description: 'Doigt levé', color: 'bg-blue-400' },
  { id: 'son_o', name: '[o]', emoji: '⭕', description: 'Mains en cercle', color: 'bg-orange-400' },
  { id: 'son_u', name: '[u]', emoji: '👆', description: 'Pointé vers le haut', color: 'bg-green-400' },
  { id: 'son_ou', name: '[ou]', emoji: '👐', description: 'Mains écartées', color: 'bg-pink-500' },
  { id: 'son_on', name: '[on]', emoji: '🙆‍♀️', description: 'Mains sur la tête', color: 'bg-purple-500' },
  { id: 'son_an', name: '[an/en]', emoji: '👃', description: 'Main devant le nez', color: 'bg-orange-500' },
  { id: 'son_in', name: '[in/ain]', emoji: '✋', description: 'Mains devant', color: 'bg-yellow-500' },
  { id: 'son_ch', name: '[ch]', emoji: '🤫', description: 'Doigt sur la bouche', color: 'bg-cyan-500' },
  { id: 'son_gn', name: '[gn]', emoji: '🤝', description: 'Mains qui se serrent', color: 'bg-emerald-500' },
  { id: 'son_p_b', name: '[p/b]', emoji: '👏', description: 'Mains qui tapent', color: 'bg-rose-400' },
  { id: 'son_t_d', name: '[t/d]', emoji: '👣', description: 'Taper des pieds', color: 'bg-slate-400' },
  { id: 'son_r_l', name: '[r/l]', emoji: '🔄', description: 'Rouler les bras', color: 'bg-indigo-400' },
  { id: 'son_s_z', name: '[s/z]', emoji: '🐍', description: 'Serpent avec la main', color: 'bg-lime-400' }
];
