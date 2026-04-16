import React, { useState } from 'react';
import { Subject, Theme, Competency, Question, GameState, SkillLevel } from './types';
import { SUBJECTS } from './constants';
import { generateQuizQuestions } from './services/geminiService';
import { QuestionCard } from './components/QuestionCard';

const App: React.FC = () => {
  const [level, setLevel] = useState<SkillLevel>(SkillLevel.CM1);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedCompetencies, setSelectedCompetencies] = useState<Competency[]>([]);
  const [reflectTime, setReflectTime] = useState(10);
  const [moveTime, setMoveTime] = useState(20);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const levelOrder = [SkillLevel.CP, SkillLevel.CE1, SkillLevel.CE2, SkillLevel.CM1, SkillLevel.CM2];

  const toggleCompetency = (comp: Competency) => {
    setSelectedCompetencies(prev => 
      prev.find(c => c.id === comp.id) 
        ? prev.filter(c => c.id !== comp.id)
        : [...prev, comp]
    );
  };

  const handleStart = async () => {
    if (!selectedSubject || !selectedTheme || selectedCompetencies.length === 0) return;

    setGameState(GameState.LOADING);
    setError(null);
    try {
      const generated = await generateQuizQuestions(
        selectedSubject, 
        selectedTheme, 
        selectedCompetencies, 
        level,
        10
      );
      setQuestions(generated);
      setCurrentIndex(0);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setError("Désolé, une erreur est survenue lors de la génération. Réessayez !");
      setGameState(GameState.IDLE);
    }
  };

  const isIdle = gameState === GameState.IDLE;

  const isCycle2 = level === SkillLevel.CP || level === SkillLevel.CE1 || level === SkillLevel.CE2;
  const isCycle3 = level === SkillLevel.CM1 || level === SkillLevel.CM2;

  const availableSubjects = SUBJECTS.filter(s => {
    if (s.id === 'questionner_monde') return isCycle2;
    if (s.id === 'histoire' || s.id === 'geographie' || s.id === 'sciences') return isCycle3;
    return true;
  });

  // Filtrage spiralaire : On montre les compétences introduites à ce niveau OU aux niveaux précédents
  const currentLevelIdx = levelOrder.indexOf(level);
  const filteredCompetencies = selectedTheme?.competencies.filter(comp => {
    // Si la compétence est introduite à un niveau supérieur au niveau choisi, on la cache
    return comp.levels.some(lvl => levelOrder.indexOf(lvl) <= currentLevelIdx);
  }) || [];

  return (
    <div className="h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden flex flex-col">
      <header className={`${isIdle ? 'py-4 mb-2' : 'py-2 mb-1'} bg-slate-900 text-white px-4 shadow-md transition-all flex-shrink-0`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 px-2 py-1 rounded-lg text-white text-xl font-black italic">S</div>
            <h1 className="text-xl font-black uppercase tracking-tighter">Classe & Sport <span className="text-indigo-400">Élémentaire</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {!isIdle && (
              <button 
                onClick={() => setGameState(GameState.IDLE)}
                className="px-4 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold uppercase"
              >
                Quitter
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pb-4 flex flex-col min-h-0 overflow-y-auto">
        {isIdle && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            {/* 1. Choix du Niveau */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-center text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Sélectionnez la classe</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {levelOrder.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      const newIsCycle2 = lvl === SkillLevel.CP || lvl === SkillLevel.CE1 || lvl === SkillLevel.CE2;
                      const oldIsCycle2 = level === SkillLevel.CP || level === SkillLevel.CE1 || level === SkillLevel.CE2;
                      if (newIsCycle2 !== oldIsCycle2) {
                        setSelectedSubject(null);
                        setSelectedTheme(null);
                      }
                      setLevel(lvl);
                      setSelectedCompetencies([]);
                    }}
                    className={`flex-1 min-w-[70px] py-3 rounded-2xl font-black text-lg transition-all ${level === lvl ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Matières */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableSubjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSubject(s); setSelectedTheme(null); setSelectedCompetencies([]); }}
                  className={`flex flex-col items-center p-4 rounded-3xl transition-all border-b-4 ${selectedSubject?.id === s.id ? `${s.color} text-white border-black/20 scale-105 shadow-xl` : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  <span className="text-4xl mb-2">{s.icon}</span>
                  <span className="font-black text-[10px] uppercase tracking-tight text-center">{s.label}</span>
                </button>
              ))}
            </div>

            {/* 3. Thèmes (si matière sélectionnée) */}
            {selectedSubject && (
              <div className="space-y-6">
                {/* Section Spécifique Phonéo-Sport pour CP Français */}
                {selectedSubject.id === 'francais' && level === SkillLevel.CP && (
                  <div className="bg-white p-6 rounded-3xl shadow-sm animate-in slide-in-from-top-4 border-2 border-pink-100">
                    <h3 className="text-sm font-black text-pink-500 uppercase mb-4 flex items-center gap-2">
                      <span className="text-xl">✨</span> Phonéo-Sport (Gestes des sons)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubject.themes.filter(t => t.id === 'phoneo_sport').map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setSelectedTheme(t); setSelectedCompetencies([]); }}
                          className={`px-6 py-3 rounded-2xl font-bold transition-all ${selectedTheme?.id === t.id ? 'bg-pink-500 text-white shadow-md' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white p-6 rounded-3xl shadow-sm animate-in slide-in-from-top-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase mb-4">Domaine d'apprentissage</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject.themes
                      .filter(t => t.id !== 'phoneo_sport')
                      .map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setSelectedTheme(t); setSelectedCompetencies([]); }}
                        className={`px-6 py-3 rounded-2xl font-bold transition-all ${selectedTheme?.id === t.id ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Compétences (si thème sélectionné) */}
            {selectedTheme && (
              <div className="bg-white p-6 rounded-3xl shadow-sm animate-in slide-in-from-top-4">
                <h3 className="text-sm font-black text-slate-400 uppercase mb-4">Compétences ciblées (multi-choix)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredCompetencies.map(c => {
                    const isSelected = selectedCompetencies.some(sc => sc.id === c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleCompetency(c)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-slate-100 hover:border-indigo-200'}`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`font-bold text-sm ${isSelected ? 'text-indigo-800' : 'text-slate-600'}`}>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Temps de réflexion</label>
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-black">{reflectTime}s</span>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="30" 
                      value={reflectTime} 
                      onChange={(e) => setReflectTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Rapide (3s)</span>
                      <span>Zen (30s)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-slate-500 uppercase tracking-wider">Temps d'effort</label>
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-lg font-black">{moveTime}s</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="60" 
                      value={moveTime} 
                      onChange={(e) => setMoveTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Flash (5s)</span>
                      <span>Intense (60s)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleStart}
                    disabled={selectedCompetencies.length === 0 || gameState === GameState.LOADING}
                    className="group relative px-12 py-5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-2xl font-black rounded-full shadow-2xl transition-all active:scale-95 flex items-center gap-4"
                  >
                    {gameState === GameState.LOADING ? 'CHARGEMENT...' : 'LANCER LE DÉFI ! 🚀'}
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-red-500 text-center font-bold">{error}</p>}
          </div>
        )}

        {gameState === GameState.LOADING && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-2xl italic font-black text-indigo-600">S</div>
            </div>
            <p className="mt-8 text-2xl font-black text-slate-800 uppercase tracking-widest">Préparation pédagogique...</p>
          </div>
        )}

        {(gameState === GameState.PLAYING || gameState === GameState.REVEALING) && questions.length > 0 && (
          <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500 overflow-hidden">
             <div className="mb-2 flex-shrink-0 flex justify-between items-center bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{level} - {selectedSubject?.label}</span>
                  <div className="flex gap-1 mt-1">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-indigo-600 w-8' : i < currentIndex ? 'bg-emerald-400 w-4' : 'bg-slate-200 w-4'}`} />
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-50 px-3 py-1 rounded-lg text-xs font-black text-indigo-600 uppercase">Quiz {currentIndex + 1}/{questions.length}</div>
            </div>
            
            <div className="flex-1 min-h-0 w-full">
              <QuestionCard 
                question={questions[currentIndex]}
                gameState={gameState}
                level={level}
                reflectTime={reflectTime}
                moveTime={moveTime}
                onReveal={() => setGameState(GameState.REVEALING)}
                onNext={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setGameState(GameState.PLAYING);
                  } else {
                    setGameState(GameState.IDLE);
                  }
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
