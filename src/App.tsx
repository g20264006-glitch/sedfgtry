import React, { useState } from 'react';
import { TabType, CanvasData, LogData, Reservation } from './types';
import Home from './components/Home';
import EthicsCanvas from './components/EthicsCanvas';
import PurchaseAgent from './components/PurchaseAgent';
import RedTeamTest from './components/RedTeamTest';
import ImprovementLog from './components/ImprovementLog';
import Presentation from './components/Presentation';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  
  const [canvasData, setCanvasData] = useState<CanvasData>({
    agentName: 'FairPlay v1',
    problem: '',
    goal: '모든 사람에게 공평하게 구매 기회를 제공하고, 봇이나 다량 구매를 차단합니다.',
    inputInfo: '팀 번호, 별명, 예약 항목',
    forbiddenActions: '실제 전화번호/주소 묻기, 한 사람에게 2개 이상 예약',
    humanConfirmation: '결제 전 반드시 사용자가 "확인" 버튼을 눌러야 함.',
    privacyRules: '개인정보를 절대 저장하지 않는다.',
    fairnessRules: '남은 자리가 없으면 대기자로 안내한다.\n동일 시간에 1개 부스만 이용 가능하다.'
  });

  const [logData, setLogData] = useState<LogData>({
    foundProblems: '',
    addedRules: '',
    finalImprovements: '',
    reflections: ''
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleAddReservation = (r: Reservation) => {
    setReservations([...reservations, r]);
  };

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Mission Home' },
    { id: 'canvas', label: 'Ethics Canvas' },
    { id: 'agent', label: 'Agent Simulator' },
    { id: 'redteam', label: 'Red Team Test' },
    { id: 'log', label: 'Improvement' },
    { id: 'presentation', label: 'Presentation' },
  ];

  return (
    <div className="flex w-full h-screen bg-[#F7F7F9] text-[#1A1A1A] font-sans overflow-hidden select-none">
      <nav className="w-[220px] bg-white border-r border-slate-200 flex flex-col p-6 shrink-0">
        <div className="mb-8">
          <h1 className="text-xl font-black leading-tight text-indigo-600 tracking-tighter">AI ETHICS<br/>CAMP 2024</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Guardians of Fairness</p>
        </div>
        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="pt-6 border-t border-slate-100">
          <div className="p-3 bg-indigo-50 rounded-lg text-[11px]">
            <div className="font-bold text-indigo-800">TEAM INFO</div>
            <div className="text-indigo-600">#07 Digital Justice</div>
            <div className="text-indigo-400">Member: BlueSky</div>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative overflow-y-auto">
        <div className="h-full flex flex-col p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'home' && <Home onNext={() => setActiveTab('canvas')} />}
          {activeTab === 'canvas' && (
            <EthicsCanvas 
              data={canvasData} 
              onChange={setCanvasData} 
              onNext={() => setActiveTab('agent')} 
            />
          )}
          {activeTab === 'agent' && (
            <PurchaseAgent 
              reservations={reservations} 
              onAddReservation={handleAddReservation}
              agentName={canvasData.agentName}
            />
          )}
          {activeTab === 'redteam' && <RedTeamTest />}
          {activeTab === 'log' && (
            <ImprovementLog 
              data={logData} 
              onChange={setLogData} 
              onNext={() => setActiveTab('presentation')} 
            />
          )}
          {activeTab === 'presentation' && (
            <Presentation canvas={canvasData} logs={logData} />
          )}
        </div>
      </main>
    </div>
  );
}
