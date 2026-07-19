import React from 'react';
import { CanvasData, LogData } from '../types';

interface Props {
  canvas: CanvasData;
  logs: LogData;
}

export default function Presentation({ canvas, logs }: Props) {
  return (
    <div className="h-full flex flex-col w-full bg-indigo-900 text-white rounded-3xl shadow-xl overflow-hidden p-12 relative">
      <div className="flex justify-between items-start mb-12 relative z-10 shrink-0">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">최종 발표 리포트</h2>
          <p className="text-indigo-300 font-medium tracking-wide">Team #07 Digital Justice</p>
        </div>
        <div className="bg-indigo-600 px-6 py-2 rounded-full font-bold uppercase tracking-tighter italic text-sm">
          Ethical AI Confirmed
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1 overflow-y-auto relative z-10 pb-6 hide-scrollbar">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] uppercase font-bold text-indigo-300 tracking-widest mb-2">에이전트 명칭</h4>
            <p className="text-3xl font-black italic underline decoration-amber-400 underline-offset-4">
              {canvas.agentName || 'FairPlay v1.0'}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold text-indigo-300 tracking-widest mb-2">해결할 문제</h4>
            <p className="text-sm leading-relaxed text-indigo-100 bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner">
              {canvas.problem || '불법 리셀러들의 자동화 봇에 의한 한정판 물건 독점 및 개인정보 오남용 방지'}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold text-indigo-300 tracking-widest mb-2">에이전트 목표</h4>
            <p className="text-sm leading-relaxed text-indigo-100 bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner">
              {canvas.goal || '모든 사람에게 공평하게 구매 기회를 제공하고 봇을 차단합니다.'}
            </p>
          </div>
        </div>

        {/* Right Column (2 spans) */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-3xl border border-white/10 flex flex-col shadow-lg">
            <h4 className="text-xs font-bold text-amber-400 mb-6 tracking-widest uppercase underline underline-offset-4 decoration-amber-400/30">최종 윤리 규칙</h4>
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">공정성 규칙</span>
                <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{canvas.fairnessRules || '동일 시간에 1개 부스만 이용 가능'}</p>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">개인정보 보호</span>
                <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{canvas.privacyRules || '팀 번호, 별명 외 정보 요구 불가'}</p>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">인간 확인 원칙</span>
                <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{canvas.humanConfirmation || '결제 전 반드시 인간 확인 단계 거침'}</p>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider text-red-300/70">금지 행동</span>
                <p className="text-xs text-red-200 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{canvas.forbiddenActions || '실제 정보 요구 불가'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 p-6 rounded-3xl border border-white/10 flex flex-col shadow-lg">
            <h4 className="text-xs font-bold text-emerald-400 mb-6 tracking-widest uppercase underline underline-offset-4 decoration-emerald-400/30">테스트 & 개선</h4>
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">발견한 문제점</span>
                <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{logs.foundProblems || '-'}</p>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">추가된 방어 규칙</span>
                <p className="text-xs font-mono p-3 bg-black/30 rounded-xl italic text-emerald-300 border border-black/10 shadow-inner">
                  {logs.addedRules || '예외 상황 방어 프로세스 강화'}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">느낀 점</span>
                <p className="text-xs text-white/90 leading-relaxed bg-black/20 p-3 rounded-xl border border-black/10">{logs.reflections || 'AI가 효율적인 것보다 공정한 것이 훨씬 중요하다는 것을 배웠습니다.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 text-center text-[10px] tracking-[1em] uppercase opacity-40 relative z-10 border-t border-white/10 shrink-0">
        AI Ethics Camp for Students
      </div>
    </div>
  );
}
