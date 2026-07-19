import React from 'react';

export default function Home({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <div className="max-w-2xl">
        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Mission Statement</span>
        <h2 className="text-5xl font-black mb-6 tracking-tight leading-[1.1]">불공정한 리셀러 AI를 고쳐라!</h2>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed italic underline decoration-indigo-200 underline-offset-4">
          특정인이 물건을 독점하지 못하도록 공정하고 투명한 예약 AI 에이전트를 설계하는 것이 여러분의 미션입니다.
        </p>
        
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="text-xs font-bold">공정성</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-xs font-bold">개인정보</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-xs font-bold">투명성</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-xs font-bold">사람 확인</div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-colors tracking-widest uppercase text-sm shadow-md"
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}
