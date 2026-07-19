import React, { useState } from 'react';
import { Reservation, BOOTHS, TIME_SLOTS, MAX_CAPACITY_PER_SLOT } from '../types';

interface Props {
  reservations: Reservation[];
  onAddReservation: (r: Reservation) => void;
  agentName: string;
}

export default function PurchaseAgent({ reservations, onAddReservation, agentName }: Props) {
  const [teamNumber, setTeamNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const initialLog = `> [SYSTEM] Agent "${agentName || 'FairPlay'}" initialized.\n> [INFO] Fairness mode: ACTIVE\n> [INFO] Monitoring inventory for 4 items...`;
  const [logs, setLogs] = useState<string[]>([initialLog]);
  const [pendingAction, setPendingAction] = useState<'confirm' | 'waitlist' | null>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleCheck = () => {
    if (!teamNumber || !nickname || !selectedBooth || !selectedTime) {
      addLog('> [USER] Request failed. Missing fields.');
      return;
    }

    addLog(`> [USER] Request: Buy ${BOOTHS.find(b=>b.id===selectedBooth)?.name} at ${selectedTime}.`);

    const hasSameTimeReservation = reservations.find(
      r => r.teamNumber === teamNumber && r.timeSlot === selectedTime
    );

    if (hasSameTimeReservation) {
      addLog(`> [AI] Fairness rule applied: Checking purchase history for user...`);
      addLog(`> [ALERT] [공정성 위반] ${selectedTime}에 이미 다른 예약이 존재합니다.`);
      setPendingAction(null);
      return;
    }

    const currentCount = reservations.filter(
      r => r.boothId === selectedBooth && r.timeSlot === selectedTime && r.status === 'confirmed'
    ).length;

    if (currentCount >= MAX_CAPACITY_PER_SLOT) {
      addLog(`> [AI] Checking availability... 0 slots left.`);
      addLog(`> [ALERT] 대기자 등록이 필요합니다. 진행하시겠습니까?`);
      setPendingAction('waitlist');
      return;
    }

    addLog(`> [AI] Checking availability... ${MAX_CAPACITY_PER_SLOT - currentCount} slots left.`);
    addLog(`> [AI] Fairness rule passed.`);
    addLog(`> [ALERT] Final confirmation needed by human.`);
    setPendingAction('confirm');
  };

  const handleAction = () => {
    if (!pendingAction) return;

    const newReservation: Reservation = {
      id: Date.now().toString(),
      teamNumber,
      nickname,
      boothId: selectedBooth,
      timeSlot: selectedTime,
      status: pendingAction === 'confirm' ? 'confirmed' : 'waitlist'
    };

    onAddReservation(newReservation);
    
    if (pendingAction === 'confirm') {
      addLog(`> [SYSTEM] Purchase confirmed for ${nickname}.`);
    } else {
      addLog(`> [SYSTEM] Added to waitlist for ${nickname}.`);
    }
    setPendingAction(null);
    setSelectedBooth('');
    setSelectedTime('');
  };

  const getInventoryStatus = (boothId: string) => {
    const totalConfirmed = reservations.filter(
      r => r.boothId === boothId && r.status === 'confirmed'
    ).length;
    const remaining = Math.max(0, MAX_CAPACITY_PER_SLOT - totalConfirmed);
    const percentage = ((MAX_CAPACITY_PER_SLOT - remaining) / MAX_CAPACITY_PER_SLOT) * 100;
    
    return { remaining, percentage };
  };

  const boothIcons: Record<string, string> = {
    'sneakers': '👟',
    'shoes': '👞',
    'hat': '🎩',
    'tshirt': '👕'
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-black mb-8">AI 구매 에이전트 실행</h2>
      
      <div className="grid grid-cols-2 gap-8 flex-1 overflow-hidden pb-6">
        {/* Left: Input Form & Inventory */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6 overflow-y-auto hide-scrollbar">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 현재 예약 가능한 한정판 상품
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {BOOTHS.map(booth => {
                const status = getInventoryStatus(booth.id);
                const isSoldOut = status.remaining === 0;
                
                return (
                  <div key={booth.id} className={`p-4 border border-slate-100 rounded-2xl ${isSoldOut ? 'opacity-50' : ''}`}>
                    <div className="text-2xl mb-1">{boothIcons[booth.id]}</div>
                    <div className="text-sm font-bold">{booth.name}</div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden relative">
                      <div 
                        className={`absolute left-0 top-0 h-full ${isSoldOut ? 'bg-red-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                    <div className={`text-[10px] text-right mt-1 ${isSoldOut ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                      {isSoldOut ? '매진 (Sold Out)' : `남은 수량: ${status.remaining}/${MAX_CAPACITY_PER_SLOT}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> 예약 요청 정보 입력
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">팀 번호</label>
                <input 
                  type="text" placeholder="예: #07" 
                  className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-medium focus:outline-none focus:border-indigo-300"
                  value={teamNumber} onChange={e => setTeamNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">별명</label>
                <input 
                  type="text" placeholder="예: BlueSky" 
                  className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-medium focus:outline-none focus:border-indigo-300"
                  value={nickname} onChange={e => setNickname(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">상품 선택</label>
              <div className="grid grid-cols-4 gap-2">
                {BOOTHS.map(booth => (
                  <button
                    key={booth.id}
                    onClick={() => setSelectedBooth(booth.id)}
                    className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-colors ${
                      selectedBooth === booth.id 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {booth.name.replace(' 부스', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">시간대 선택</label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-xl border text-sm font-bold transition-colors ${
                      selectedTime === time 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleCheck}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-sm shadow-md"
            >
              AI에게 예약 가능 여부 묻기
            </button>
          </div>
        </div>

        {/* Right: AI Terminal */}
        <div className="bg-slate-900 rounded-3xl p-6 text-emerald-400 font-mono text-xs overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Agent Activity Log</span>
            <span className="animate-pulse text-[10px] font-bold">● LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 whitespace-pre-wrap flex flex-col pb-4 hide-scrollbar">
            {logs.map((log, i) => (
              <p key={i} className={`${
                log.includes('[USER]') ? 'text-white/80' :
                log.includes('[ALERT]') ? 'text-amber-400 font-bold' :
                log.includes('[공정성') ? 'text-amber-400 font-bold' :
                log.includes('Fairness rule') ? 'text-emerald-300 italic' :
                'text-emerald-400'
              }`}>{log}</p>
            ))}
          </div>

          {pendingAction === 'confirm' && (
            <button 
              onClick={handleAction}
              className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl uppercase tracking-widest transition-colors shadow-lg"
            >
              Confirm Purchase
            </button>
          )}
          {pendingAction === 'waitlist' && (
            <button 
              onClick={handleAction}
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl uppercase tracking-widest transition-colors shadow-lg"
            >
              Add to Waitlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
