import React from 'react';
import { LogData } from '../types';

interface Props {
  data: LogData;
  onChange: (data: LogData) => void;
  onNext: () => void;
}

export default function ImprovementLog({ data, onChange, onNext }: Props) {
  const handleChange = (field: keyof LogData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8 shrink-0">
        <h2 className="text-3xl font-black">개선 기록</h2>
        <button 
          onClick={onNext}
          className="text-[10px] font-bold bg-indigo-600 text-white px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm"
        >
          저장하고 다음
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-8 flex-1 overflow-hidden pb-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col shadow-sm">
          <label className="block text-sm font-bold mb-3 text-slate-800">테스트 후 발견한 문제</label>
          <textarea 
            className="flex-1 w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none transition-shadow"
            placeholder="레드팀 테스트 중 발견된 AI의 약점을 적어주세요..."
            value={data.foundProblems}
            onChange={(e) => handleChange('foundProblems', e.target.value)}
          />
        </div>

        <div className="space-y-6 flex flex-col overflow-hidden">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm shrink-0">
            <label className="block text-sm font-bold mb-3 text-slate-800">추가한 방어 규칙</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-shadow"
              placeholder="예: 예외 상황 방어 규칙 강화"
              value={data.addedRules}
              onChange={(e) => handleChange('addedRules', e.target.value)}
            />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 flex-1 flex flex-col shadow-sm">
            <label className="block text-sm font-bold mb-3 text-slate-800">최종 개선 내용 및 느낀 점</label>
            <textarea 
              className="flex-1 w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none transition-shadow"
              placeholder="최종적으로 어떻게 바뀌었는지, 무엇을 배웠는지 적어주세요."
              value={data.reflections}
              onChange={(e) => handleChange('reflections', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
