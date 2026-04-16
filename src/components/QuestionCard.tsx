import React, { useState, useEffect, useRef } from 'react';
import { Question, GameState, SkillLevel } from '../types';

interface QuestionCardProps {
  question: Question;
  gameState: GameState;
  level: SkillLevel;
  reflectTime: number;
  moveTime: number;
  onReveal: () => void;
  onNext: () => void;
}

type TimerPhase = 'REFLECTING' | 'MOVING' | 'FINISHED' | 'IDLE';

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  gameState, 
  level,
  reflectTime,
  moveTime,
  onReveal, 
  onNext 
}) => {
  const isRevealing = gameState === GameState.REVEALING;
  
  const [timeLeft, setTimeLeft] = useState(reflectTime);
  const [phase, setPhase] = useState<TimerPhase>('REFLECTING');
  const timerRef = useRef<number | null>(null);

  // Lancement automatique au changement de question
  useEffect(() => {
    startSequence();
    return () => {
      stopTimer();
    };
  }, [question.statement]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startSequence = () => {
    stopTimer();
    setPhase('REFLECTING');
    setTimeLeft(reflectTime);
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Gestion du passage entre les phases
  useEffect(() => {
    if (timeLeft === 0) {
      if (phase === 'REFLECTING') {
        setPhase('MOVING');
        setTimeLeft(moveTime);
      } else if (phase === 'MOVING') {
        stopTimer();
        setPhase('FINISHED');
        if (!isRevealing) onReveal(); // Révélation automatique
      }
    }
  }, [timeLeft, phase, isRevealing, onReveal]);

  const getPhaseColor = () => {
    if (phase === 'REFLECTING') return 'text-indigo-600 bg-indigo-50';
    if (phase === 'MOVING') return 'text-orange-600 bg-orange-50 animate-pulse';
    return 'text-emerald-600 bg-emerald-50';
  };

  const getPhaseLabel = () => {
    if (phase === 'REFLECTING') return 'RÉFLÉCHIS';
    if (phase === 'MOVING') return 'BOUGE !';
    return 'TERMINÉ';
  };

  return (
    <div className="w-full h-full flex flex-col items-center relative min-h-0">
      
      {/* Zone de l'énoncé */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-4 lg:p-6 mb-2 md:mb-3 w-full border-b-4 md:border-b-8 border-indigo-200 relative flex flex-col items-center flex-shrink-0 animate-in fade-in zoom-in duration-500">
        
        {/* LE CHRONO DOUBLE COMPACT (Flottant à droite) */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col items-center gap-1 md:gap-2">
          <div className={`px-2 py-1 md:px-4 md:py-2 rounded-xl md:rounded-2xl border-2 flex flex-col items-center transition-all duration-500 ${getPhaseColor()} border-current shadow-sm`}>
            <span className="text-[8px] md:text-[10px] font-black tracking-widest leading-none mb-1">{getPhaseLabel()}</span>
            <div className="text-xl md:text-3xl lg:text-4xl font-black tabular-nums leading-none">
              {timeLeft}
            </div>
          </div>
          
          <div className="flex gap-1 md:gap-2">
            <button 
              onClick={startSequence}
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center transition-all active:scale-90"
              title="Relancer la séquence"
            >
               <span className="text-[10px] md:text-xs lg:text-sm">🔄</span>
            </button>
            <button 
              onClick={onNext}
              className="px-2 h-6 md:h-8 lg:h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center gap-1 transition-all active:scale-90 group"
              title="Passer à la question suivante"
            >
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter">Passer</span>
               <span className="text-[10px] md:text-sm lg:text-lg group-hover:translate-x-1 transition-transform">⏩</span>
            </button>
          </div>
        </div>

        <h2 className="text-xs md:text-sm lg:text-base text-indigo-400 font-black mb-1 uppercase tracking-[0.2em]">QUESTION</h2>
        <div className="text-xl md:text-2xl lg:text-4xl font-black text-slate-900 text-center leading-tight max-w-[85%] flex items-center justify-center">
          {question.statement}
        </div>
      </div>

      {/* Zone des options d'exercices ou Séquence Phonéo-Sport */}
      {question.phonemes ? (
        <div className="flex flex-row flex-wrap justify-center items-center gap-1 md:gap-2 lg:gap-3 w-full flex-1 min-h-0 overflow-hidden content-center">
          {question.phonemes.map((p, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col items-center justify-center p-1 md:p-2 lg:p-3 rounded-xl md:rounded-2xl transition-all duration-500 border-2 md:border-4 bg-white border-white shadow-xl flex-1 min-w-[70px] max-w-[120px] md:min-w-[100px] md:max-w-[150px] ${
                !isRevealing && phase === 'MOVING' ? 'ring-2 md:ring-4 ring-pink-400 animate-pulse' : ''
              }`}
            >
              <div className="text-lg md:text-xl lg:text-2xl font-black mb-1 text-slate-900">
                {p.sound}
              </div>

              <div className={`w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg md:rounded-xl text-xl md:text-2xl lg:text-4xl mb-1 shadow-md md:shadow-lg ${p.exercise.color} text-white`}>
                <span className="drop-shadow-md">{p.exercise.emoji}</span>
              </div>

              <div className="text-center text-[10px] md:text-xs lg:text-sm font-black uppercase tracking-tighter text-slate-800 leading-tight">
                {p.exercise.name}
              </div>
              
              <div className="text-[7px] md:text-[8px] lg:text-[10px] font-bold text-center uppercase tracking-tight opacity-70 text-slate-500 leading-tight mt-0.5">
                {p.exercise.description}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 w-full flex-1 min-h-0 justify-center items-stretch">
          {question.options.map((opt, idx) => {
            const isCorrect = idx === question.correctIndex;
            const showSuccess = isRevealing && isCorrect;
            const showFailure = isRevealing && !isCorrect;

            return (
              <div 
                key={idx}
                className={`relative flex flex-col items-center w-full md:w-auto flex-1 min-h-0 max-w-sm transition-all duration-500 ${
                  showSuccess 
                    ? 'scale-105 z-20' 
                    : showFailure 
                      ? 'opacity-30 grayscale'
                      : 'hover:-translate-y-1'
                }`}
              >
                {/* 1. Bloc Réponse (Cognitif) */}
                <div className={`w-full flex items-center justify-center p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl lg:rounded-3xl border-2 md:border-4 shadow-md transition-all duration-500 flex-shrink-0 min-h-[3rem] md:min-h-[4rem] lg:min-h-[5rem] ${
                  showSuccess ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-white text-slate-900'
                }`}>
                  <div className="text-lg md:text-xl lg:text-2xl font-black text-center break-words hyphens-auto w-full px-1 leading-tight">
                    {opt.value}
                  </div>
                  {showSuccess && (
                    <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 lg:-top-4 lg:-right-4 bg-emerald-500 text-white p-1.5 md:p-2 lg:p-3 rounded-full shadow-xl animate-in zoom-in duration-300 ring-2 md:ring-4 ring-white z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 2. Connecteur visuel */}
                <div className="h-1.5 md:h-2 lg:h-3 w-1.5 md:w-2 bg-slate-200 my-0.5 md:my-1 rounded-full flex-shrink-0"></div>

                {/* 3. Bloc Mouvement (Moteur) */}
                <div className={`w-full flex flex-col items-center justify-between p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl lg:rounded-3xl border-2 md:border-4 transition-all duration-500 flex-1 min-h-0 overflow-hidden ${opt.exercise.color} ${
                  showSuccess ? 'border-white shadow-2xl ring-2 md:ring-4 ring-emerald-400' : 'border-transparent shadow-md'
                }`}>
                  <div className={`flex-1 flex items-center justify-center w-full min-h-0 transition-all duration-500 ${isRevealing && isCorrect ? 'animate-bounce' : ''} ${!isRevealing && phase === 'MOVING' ? 'animate-pulse scale-110' : ''}`}>
                    <span className="text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] drop-shadow-2xl leading-none">{opt.exercise.emoji}</span>
                  </div>

                  <div className="flex flex-col items-center justify-end w-full flex-shrink-0 mt-1 md:mt-2">
                    <div className="text-center text-xs md:text-sm lg:text-lg font-black uppercase tracking-tighter mb-0.5 leading-tight text-white drop-shadow-md">
                      {opt.exercise.name}
                    </div>
                    
                    <div className="text-[8px] md:text-[9px] lg:text-xs font-bold text-center uppercase tracking-tight opacity-90 leading-tight text-white drop-shadow-sm">
                      {opt.exercise.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-12 md:h-16 lg:h-20 flex-shrink-0 flex items-center justify-center mt-2">
        {isRevealing ? (
          <button
            onClick={onNext}
            className="px-8 md:px-10 lg:px-12 py-2 md:py-3 lg:py-4 rounded-full text-xl md:text-2xl lg:text-3xl font-black text-white shadow-2xl bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-90 select-none animate-in slide-in-from-bottom-4"
          >
            SUIVANT ➔
          </button>
        ) : (
          <div className={`text-lg md:text-xl lg:text-2xl font-black uppercase tracking-widest ${phase === 'REFLECTING' ? 'text-indigo-400' : 'text-orange-500 animate-bounce'}`}>
            {phase === 'REFLECTING' ? 'Concentration...' : 'Tous en mouvement !'}
          </div>
        )}
      </div>
    </div>
  );
};
