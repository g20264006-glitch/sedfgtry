import React from 'react';
import { CanvasData } from '../types';

interface Props {
  data: CanvasData;
  onChange: (data: CanvasData) => void;
  onNext: () => void;
}

export default function EthicsCanvas({ data, onChange, onNext }: Props) {
  const handleChange = (field: keyof CanvasData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black">윤리 설계 캔버스</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-400">v1.0 DRAFT</span>
          <button 
            onClick={onNext}
            className="text-[10px] font-bold bg-indigo-600 text-white px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm"
          >
            저장하고 다음
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-6">
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">AI 이름</label>
            <input 
              type="text" 
              className="w-full bg-transparent font-medium focus:outline-none"
              placeholder="예: 페어플레이(FairPlay) v1"
              value={data.agentName}
              onChange={(e) => handleChange('agentName', e.target.value)}
            />
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col h-32">
            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">해결할 문제</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm"
              placeholder="예: 리셀러 봇의 물건 독점"
              value={data.problem}
              onChange={(e) => handleChange('problem', e.target.value)}
            />
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col h-32">
            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">에이전트의 목표</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm"
              placeholder="예: 모든 사람에게 공평한 기회 제공"
              value={data.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
            />
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col min-h-[96px]">
            <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">입력받을 정보</label>
            <textarea 
              className="w-full bg-transparent text-sm focus:outline-none resize-none flex-1 italic text-slate-600"
              placeholder="예: 팀 번호, 별명"
              value={data.inputInfo}
              onChange={(e) => handleChange('inputInfo', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100 flex flex-col flex-1 min-h-[160px]">
            <label className="block text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">절대 하면 안 되는 행동</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm text-red-700"
              placeholder="예: 실제 개인정보 묻기, 몰래 예약"
              value={data.forbiddenActions}
              onChange={(e) => handleChange('forbiddenActions', e.target.value)}
            />
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex flex-col flex-1 min-h-[160px]">
            <label className="block text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">사람 확인 원칙</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm text-amber-700"
              placeholder="예: 결제 전 사용자가 직접 '확인'을 눌러야 함."
              value={data.humanConfirmation}
              onChange={(e) => handleChange('humanConfirmation', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex flex-col flex-1 min-h-[160px]">
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">개인정보 규칙</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm text-emerald-800"
              placeholder="예: 정보 저장을 최소화한다."
              value={data.privacyRules}
              onChange={(e) => handleChange('privacyRules', e.target.value)}
            />
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex flex-col flex-1 min-h-[160px]">
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">공정성 규칙</label>
            <textarea 
              className="w-full bg-transparent font-medium focus:outline-none flex-1 resize-none text-sm text-emerald-800"
              placeholder="예: 1인 1품목만 구매 가능."
              value={data.fairnessRules}
              onChange={(e) => handleChange('fairnessRules', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
