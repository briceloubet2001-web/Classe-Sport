import React from 'react';
import { Competency } from '../types';

interface SkillButtonProps {
  skill: Competency;
  isSelected: boolean;
  onClick: () => void;
}

export const SkillButton: React.FC<SkillButtonProps> = ({ skill, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex flex-col gap-1 ${
        isSelected 
          ? 'border-indigo-600 bg-indigo-50 shadow-md' 
          : 'border-slate-200 bg-white hover:border-indigo-300'
      }`}
    >
      <span className={`font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
        {skill.label}
      </span>
    </button>
  );
};
