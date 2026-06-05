import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenType, TransitionType, SajuInput, CompatibilityInput } from './types';

// Icons using material symbols template
const iconClass = "material-symbols-outlined";

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('IMPTI_DASHBOARD');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');

  // Interactive Form States
  const [sajuInput, setSajuInput] = useState<SajuInput>({
    birthDate: '1990-05-15',
    birthTime: '14:30',
    birthPlace: 'Seoul, South Korea',
    isLunar: false,
  });

  const [compatibilityInput, setCompatibilityInput] = useState<CompatibilityInput>({
    birthDate: '1992-08-20',
    birthTime: '08:45',
    gender: 'female',
    isLunar: true,
  });

  const [selectedMBTI, setSelectedMBTI] = useState<string>('INTJ');

  // Transition Helper
  const navigateTo = (screen: ScreenType, transition: TransitionType = 'none') => {
    setTransitionType(transition);
    setCurrentScreen(screen);
  };

  // MBTI Definitions for Hybrid Description
  const mbtiDetails: Record<string, { role: string; desc: string; element: string; pct: { metal: number; water: number; fire: number; wood: number; earth: number } }> = {
    INTJ: {
      role: '전략적인 건축가',
      desc: '독창적인 사고와 강한 추진력을 지닌 에너지. 사주 오행 중 금(金)과 수(水)의 차갑고 논리적인 기운과 높은 상관관계를 보일 확률이 높습니다.',
      element: '금(Metal) 기운',
      pct: { metal: 40, water: 25, fire: 10, wood: 20, earth: 5 }
    },
    INTP: {
      role: '아이디어 분석가',
      desc: '정밀한 사색과 비평적 직관을 지닌 지성. 수(水)와 목(木) 오행의 유연함과 탐구 에너지가 정렬되어 있습니다.',
      element: '수(Water) 기운',
      pct: { metal: 15, water: 45, fire: 5, wood: 30, earth: 5 }
    },
    ENTJ: {
      role: '대담한 지도자',
      desc: '체계적인 설계와 불꽃 같은 실행력. 화(火)와 금(金)의 맹렬하고 집중력 높은 궤적을 그리며 대세의 흐름에 강합니다.',
      element: '화(Fire) 기운',
      pct: { metal: 30, water: 10, fire: 40, wood: 10, earth: 10 }
    },
    ENTP: {
      role: '뜨거운 변론가',
      desc: '예측 불가능한 혁신과 융합의 촉매제. 수(水)와 화(火)의 격렬한 대치 상태 속에서 창의적 불꽃을 이끌어냅니다.',
      element: '화(Fire) 기운',
      pct: { metal: 10, water: 35, fire: 35, wood: 15, earth: 5 }
    },
    INFJ: {
      role: '선의의 옹호자',
      desc: '통찰력 있고 깊은 정신의 치유 에너지. 수(水)와 토(土)의 은밀하고도 포용력 있는 결합 패턴을 지닙니다.',
      element: '토(Earth) 기운',
      pct: { metal: 10, water: 30, fire: 10, wood: 20, earth: 30 }
    },
    INFP: {
      role: '열정적인 중재자',
      desc: '신비롭고 문학적인 순수한 물의 성향. 목(木)과 수(Water)가 지닌 온화한 자양분 에너지가 완벽히 매칭됩니다.',
      element: '목(Wood) 기운',
      pct: { metal: 5, water: 35, fire: 10, wood: 45, earth: 5 }
    },
    ENFJ: {
      role: '정의로운 선도자',
      desc: '공동체를 따뜻하게 감싸는 조화의 수호자. 화(火)와 토(土)가 어우러져 평온하고 밝은 주파수를 방출합니다.',
      element: '화(Fire) 기운',
      pct: { metal: 15, water: 15, fire: 40, wood: 10, earth: 20 }
    },
    ENFP: {
      role: '재기발랄한 활동가',
      desc: '모든 생명을 역동적으로 피워내는 따스한 봄바람. 목(木)과 화(火)의 유려한 상승 곡선을 투영하고 있습니다.',
      element: '목(Wood) 기운',
      pct: { metal: 10, water: 20, fire: 25, wood: 40, earth: 5 }
    },
    ISTJ: {
      role: '청렴결백한 공직자',
      desc: '견고한 대지와 비바람을 막는 내벽을 이루는 보석. 금(金)과 토(土)의 단단하고 질서정연한 정추 구조를 이룹니다.',
      element: '토(Earth) 기운',
      pct: { metal: 35, water: 5, fire: 10, wood: 10, earth: 40 }
    },
    ISFJ: {
      role: '용감한 수호자',
      desc: '우리가 기댈 수 있는 가장 안락한 터전. 토(土) 기질이 정관의 가호 속에서 비옥하고 안정적 결실을 확보합니다.',
      element: '토(Earth) 기운',
      pct: { metal: 20, water: 15, fire: 10, wood: 15, earth: 40 }
    },
    ESTJ: {
      role: '엄격한 관리자',
      desc: '한 치의 오차도 허용치 않는 냉철한 법관. 금(金)의 절대적 권력과 기강이 시간의 자오선을 따라 작동합니다.',
      element: '금(Metal) 기운',
      pct: { metal: 45, water: 10, fire: 15, wood: 10, earth: 20 }
    },
    ESFJ: {
      role: '사교적인 외교관',
      desc: '모든 인간 관계의 결합을 촉진하는 윤활 작용. 토(土)와 화(火) 요소가 타인과의 통신 터널을 열어줍니다.',
      element: '토(Earth) 기운',
      pct: { metal: 10, water: 20, fire: 30, wood: 10, earth: 30 }
    },
    ISTP: {
      role: '만능 재주꾼',
      desc: '금속을 정밀하게 다듬는 정예 대장장이. 금(Metal)과 화(火)의 융합 궤적으로 유연한 문제 해결가 특징입니다.',
      element: '금(Metal) 기운',
      pct: { metal: 40, water: 15, fire: 20, wood: 15, earth: 10 }
    },
    ISFP: {
      role: '호기심 많은 예술가',
      desc: '자연의 숨겨진 색채를 꺼내는 시적 통찰. 목(木)과 토(土) 요소가 예술적 기풍과 미니멀한 집중을 부여합니다.',
      element: '목(Wood) 기운',
      pct: { metal: 15, water: 15, fire: 5, wood: 40, earth: 25 }
    },
    ESTP: {
      role: '모험을 즐기는 사업가',
      desc: '지평선을 달리는 뇌우와 야성적인 야망. 화(火)와 금(金)의 충돌 속에서 급진적인 부가 반응을 추진합니다.',
      element: '화(Fire) 기운',
      pct: { metal: 25, water: 10, fire: 45, wood: 10, earth: 10 }
    },
    ESFP: {
      role: '자유로운 영혼의 연예인',
      desc: '태양빛 노을 아래 축제의 무드를 자아내는 주인공. 화(火)와 목(木) 오행의 에너제틱 튜닝이 완벽합니다.',
      element: '화(Fire) 기운',
      pct: { metal: 5, water: 25, fire: 40, wood: 25, earth: 5 }
    }
  };

  const currentMBTIInfo = mbtiDetails[selectedMBTI] || mbtiDetails.INTJ;

  // Animation variants mapping based on transitionType
  const getVariants = () => {
    if (transitionType === 'push') {
      return {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        exit: { x: -300, opacity: 0, transition: { duration: 0.3 } },
      };
    }
    if (transitionType === 'push_back') {
      return {
        initial: { x: -300, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        exit: { x: 300, opacity: 0, transition: { duration: 0.3 } },
      };
    }
    // none or fade
    return {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
    };
  };

  return (
    <div className="min-h-screen bg-[#F7F4F0] text-[#2D2926] flex flex-col pt-16 pb-20 md:pb-0 relative overflow-hidden bg-grid font-sans">
      
      {/* GLOBAL TOP APP BAR */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#FFFFFF]/90 backdrop-blur-xl border-b border-[#E5E1DA]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#E5E1DA] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            title="대시보드로 가기"
          >
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwe_Wp_ZzNqFD7BdBX4UhuAZ7WnbNs3rVk6JhWyDrK5wwNZN8gDbrbDctBx1k8eFuI_X7r--W2YD-9Rvxbljx7hHJ-J8dn0iIL2pQrii4Db8dynTVJ-_dq4Lt5DH1jDazptJ4SlXrrQfQztA2rILis6J29qmksl4TT9GtPZNX_ID9lA6V8LhVM2StTTfYZRmlc5URpesw9vgNKmcOKF4We0QvtSymxGEmXMvv8P4jB--Kxqklq6bNQtbCA2hT5yYUaHWFfzqRVgQ"
            />
          </button>
          <h1 
            onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
            className="text-2xl font-bold tracking-tighter text-[#5A5A40] cursor-pointer hover:text-[#A67C52] transition-colors font-serif italic"
            id="brand-header-title"
          >
            IMPTI
          </h1>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')}
            className={`font-label-caps text-xs tracking-wider font-semibold transition-colors uppercase cursor-pointer ${currentScreen === 'IMPTI_DASHBOARD' ? 'text-[#5A5A40]' : 'text-[#8C857D] hover:text-[#2D2926]'}`}
          >
            대시보드
          </button>
          <button 
            onClick={() => navigateTo('DAILY_FORTUNE', 'none')}
            className={`font-label-caps text-xs tracking-wider font-semibold transition-colors uppercase cursor-pointer ${currentScreen === 'DAILY_FORTUNE' ? 'text-[#5A5A40]' : 'text-[#8C857D] hover:text-[#2D2926]'}`}
          >
            일간 운세
          </button>
          <button 
            onClick={() => navigateTo('PRECISION_SAJU', 'none')}
            className={`font-label-caps text-xs tracking-wider font-semibold transition-colors uppercase cursor-pointer ${currentScreen === 'PRECISION_SAJU' ? 'text-[#5A5A40]' : 'text-[#8C857D] hover:text-[#2D2926]'}`}
          >
            정밀 분석
          </button>
          <button 
            onClick={() => navigateTo('RELATIONSHIP_COMPATIBILITY', 'none')}
            className={`font-label-caps text-xs tracking-wider font-semibold transition-colors uppercase cursor-pointer ${currentScreen === 'RELATIONSHIP_COMPATIBILITY' ? 'text-[#5A5A40]' : 'text-[#8C857D] hover:text-[#2D2926]'}`}
          >
            궁합
          </button>
          <button 
            onClick={() => navigateTo('MBTI_REVERSE_INPUT', 'none')}
            className={`font-label-caps text-xs tracking-wider font-semibold transition-colors uppercase cursor-pointer ${currentScreen === 'MBTI_REVERSE_INPUT' ? 'text-[#5A5A40]' : 'text-[#8C857D] hover:text-[#2D2926]'}`}
          >
            역발상 MBTI
          </button>
        </div>
 
        <button 
          onClick={() => navigateTo('GENERAL_LIFE_ANALYSIS', 'push')}
          className="text-[#A67C52] hover:opacity-80 transition-opacity active:scale-95 duration-150 p-2 rounded-full hover:bg-[#A67C52]/5"
          title="종합분석가기"
        >
          <span className={`${iconClass} filled`}>verified</span>
        </button>
      </header>
 
      {/* AMBIENT GLOW ANIMATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5A5A40]/3 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A67C52]/3 rounded-full blur-[100px] pointer-events-none z-0" />
 
      {/* RENDER CANVAS CONTAINER */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col"
          >
            {/* 1. IMPTI 대시보드 (국문) */}
            {currentScreen === 'IMPTI_DASHBOARD' && (
              <div id="screen-dashboard" className="space-y-12">
                <section className="max-w-3xl">
                  <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] mb-4 font-serif leading-tight">
                    당신의 오늘을 위한<br />
                    <span className="text-[#A67C52] italic font-semibold">데이터 기상도</span>
                  </h2>
                  <p className="text-lg md:text-xl text-[#8C857D] font-sans">
                    최적화된 일일 의사 결정을 위한 환경 변수 및 시간 에너지 분석.
                  </p>
                </section>
 
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* IMPTI: 격국 분석 (오른쪽 노드) */}
                  <div className="md:col-span-8 glass-panel-active rounded-3xl p-6 lg:p-8 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#5A5A40]/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-8 z-10 relative">
                      <div>
                        <span className="font-label-caps text-xs text-[#A67C52] block mb-2 font-bold tracking-wider uppercase">환경 변수</span>
                        <h3 className="text-2xl font-bold text-[#2D2926] font-sans" id="dashboard-orbit-title">IMPTI: 격국 분석</h3>
                      </div>
                      <button 
                        onClick={() => navigateTo('GENERAL_LIFE_ANALYSIS', 'push')}
                        className="w-10 h-10 rounded-full border border-[#5A5A40]/30 flex items-center justify-center text-[#5A5A40] hover:bg-[#5A5A40]/10 transition-colors cursor-pointer"
                        title="전체 리포트 가기"
                      >
                        <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                      </button>
                    </div>
 
                    {/* Orbit Matrix Widget */}
                    <div className="flex-grow flex items-center justify-center relative z-10 py-6">
                      <div className="orbit-container">
                        <div className="orbit-ring orbit-ring-1" />
                        <div className="orbit-ring orbit-ring-2" />
                        <div className="orbit-ring orbit-ring-3" />
                        <div className="orbit-ring orbit-ring-4 flex items-center justify-center">
                          <span className="font-mono-data text-sm font-semibold text-[#5A5A40]">핵심</span>
                        </div>
 
                        {/* Node Elements */}
                        {/* Top Node */}
                        <div className="orbit-node active" style={{ top: '0%', left: '50%' }} />
                        <span className="absolute text-xs text-[#2D2926] font-semibold" style={{ top: '-22px', left: '50%', transform: 'translateX(-50%)' }}>목 (성장)</span>
 
                        {/* Right Node */}
                        <div className="orbit-node" style={{ top: '50%', left: '100%' }} />
                        <span className="absolute text-xs text-[#2D2926] font-semibold" style={{ top: '50%', right: '-32px', transform: 'translateY(-50%)' }}>화 (활동)</span>
 
                        {/* Bottom Node */}
                        <div className="orbit-node" style={{ top: '100%', left: '50%' }} />
                        <span className="absolute text-xs text-[#2D2926] font-semibold" style={{ bottom: '-22px', left: '50%', transform: 'translateX(-50%)' }}>금 (집중)</span>
 
                        {/* Left Node */}
                        <div className="orbit-node active" style={{ top: '50%', left: '0%' }} />
                        <span className="absolute text-xs text-[#2D2926] font-semibold" style={{ top: '50%', left: '-32px', transform: 'translateY(-50%)' }}>수 (유연)</span>
 
                        {/* Celestial Geometry */}
                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                          <polygon fill="rgba(90, 90, 64, 0.02)" points="50,0 100,50 50,100 0,50" stroke="rgba(90, 90, 64, 0.3)" strokeWidth="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
 
                  {/* 시간적 페이즈 & 가이드 */}
                  <div className="md:col-span-4 flex flex-col gap-6">
                    {/* 시간적 페이즈 */}
                    <div className="glass-panel rounded-3xl p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="font-label-caps text-xs text-[#A67C52] block mb-2 font-bold tracking-wider uppercase">시간적 페이즈</span>
                        <h3 className="text-2xl font-bold text-[#2D2926] font-sans">현재 에너지 단계</h3>
                        <p className="text-sm text-[#8C857D] mb-6">리셋 및 미니멀리즘</p>
                      </div>
 
                      {/* Sun-path Arc Widget */}
                      <div className="sun-path-arc">
                        <div className="sun-path-curve" />
                        <div className="sun-orb" style={{ left: '68%' }} />
                        <div className="absolute bottom-0 w-full flex justify-between px-2">
                          <span className="font-mono-data text-xs text-[#8C857D]">새벽</span>
                          <span className="font-mono-data text-xs text-[#8C857D]">정오</span>
                          <span className="font-mono-data text-xs text-[#A67C52] font-semibold">황혼</span>
                          <span className="font-mono-data text-xs text-[#8C857D]">자정</span>
                        </div>
                      </div>
                    </div>
 
                    {/* 실용 가이드 */}
                    <div className="glass-panel rounded-3xl p-6 bg-[#FFFFFF]">
                      <span className="font-label-caps text-xs text-[#A67C52] block mb-4 flex items-center gap-2 font-bold tracking-wider uppercase">
                        <span className="material-symbols-outlined text-base">flare</span>
                        실행 가이드
                      </span>
                      <p className="text-base text-[#2D2926] leading-relaxed mb-6 border-l-2 border-[#5A5A40] pl-4 py-1 font-sans">
                        "오늘은 내면의 성장에 집중할 때입니다. 외부 활동보다는 데이터 정리와 계획 수립에 에너지를 할당하세요."
                      </p>
                      <button 
                        onClick={() => navigateTo('GENERAL_LIFE_ANALYSIS', 'push')}
                        className="w-full py-3 px-4 rounded-xl bg-[#5A5A40] text-white font-semibold text-xs tracking-widest hover:bg-[#5A5A40]/90 transition-colors text-center uppercase cursor-pointer"
                        id="btn-detail-logs"
                      >
                        상세 로그 보기
                      </button>
                    </div>
                  </div>
                </div>
 
                {/* Dashboard Screen Specific Anchor links for Spec compliance:
                    - Element (xpath: //a[contains(., '일간')]) -> 오늘의 운세
                    - Element (xpath: //a[contains(., '분석')]) -> 정밀 사주 분석
                */}
                <div className="flex justify-center gap-6 pt-12 md:hidden">
                  <a 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')}
                    className="text-sm font-semibold text-[#2D2926] hover:text-[#5A5A40] cursor-pointer flex items-center gap-1 border-b border-[#E5E1DA] pb-1"
                  >
                    일간 기상도 보기 &rarr;
                  </a>
                  <a 
                    onClick={() => navigateTo('PRECISION_SAJU', 'none')}
                    className="text-sm font-semibold text-[#2D2926] hover:text-[#5A5A40] cursor-pointer flex items-center gap-1 border-b border-[#E5E1DA] pb-1"
                  >
                    정밀 사주 분석 &rarr;
                  </a>
                </div>
              </div>
            )}
 
            {/* 2. 정밀 사주 분석 (국문) */}
            {currentScreen === 'PRECISION_SAJU' && (
              <div id="screen-precision-saju" className="space-y-12">
                <section className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] font-serif leading-tight">데이터 무결성 기반 심층 진단</h1>
                  <p className="text-lg text-[#8C857D]">구조적 에너지 아카이빙을 시작하기 위해 시간 좌표를 입력하십시오.</p>
                </section>
 
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Parameter Panel */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-6">
                      <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-4">
                        <span className="material-symbols-outlined text-[#5A5A40]">tune</span>
                        <h2 className="font-label-caps text-xs font-bold text-[#A67C52] uppercase tracking-wider">시간 좌표 입력</h2>
                      </div>
                      
                      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-xs text-[#8C857D] font-semibold">출생 일자</label>
                          <input 
                            className="input-underline font-mono-data text-[#2D2926] w-full" 
                            type="date" 
                            value={sajuInput.birthDate}
                            onChange={(e) => setSajuInput({ ...sajuInput, birthDate: e.target.value })}
                          />
                        </div>
 
                        <div className="flex flex-col gap-1 relative">
                          <label className="font-label-caps text-xs text-[#8C857D] font-semibold">출생 시각</label>
                          <input 
                            className="input-underline font-mono-data text-[#2D2926] w-full" 
                            type="time" 
                            value={sajuInput.birthTime}
                            onChange={(e) => setSajuInput({ ...sajuInput, birthTime: e.target.value })}
                          />
                          <div className="absolute right-0 top-6 flex items-center gap-1 text-[10px] text-[#A67C52] bg-[#A67C52]/5 px-2.5 py-0.5 rounded-full border border-[#A67C52]/20 font-bold">
                            <span className="material-symbols-outlined text-[12px]">sync</span>
                            서머타임 자동 보정
                          </div>
                        </div>
 
                        <div className="flex flex-col gap-1">
                          <label className="font-label-caps text-xs text-[#8C857D] font-semibold">출생 장소</label>
                          <input 
                            className="input-underline font-mono-data text-[#2D2926] w-full" 
                            type="text" 
                            value={sajuInput.birthPlace}
                            onChange={(e) => setSajuInput({ ...sajuInput, birthPlace: e.target.value })}
                          />
                        </div>
 
                        <div className="flex items-center gap-2 mt-2">
                          <input 
                            type="checkbox" 
                            id="lunar-checkbox"
                            checked={sajuInput.isLunar}
                            onChange={(e) => setSajuInput({ ...sajuInput, isLunar: e.target.checked })}
                            className="rounded border-[#D0C9C0] bg-transparent text-[#5A5A40] focus:ring-[#5A5A40] focus:ring-offset-[#F7F4F0]"
                          />
                          <label htmlFor="lunar-checkbox" className="font-mono-data text-xs text-[#2D2926] select-none cursor-pointer font-semibold">
                            음력 사용
                          </label>
                        </div>
 
                        <button 
                          type="button"
                          onClick={() => navigateTo('GENERAL_LIFE_ANALYSIS', 'push')}
                          className="mt-4 bg-[#5A5A40] text-white font-semibold text-xs tracking-widest py-3.5 rounded-xl hover:bg-[#5A5A40]/90 transition-colors flex justify-center items-center gap-2 uppercase cursor-pointer"
                        >
                          <span className="material-symbols-outlined filled text-[18px]">radar</span>
                          데이터 분석 시작
                        </button>
                      </form>
                    </div>
 
                    {/* Progress Phase */}
                    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 overflow-hidden relative">
                      <h2 className="font-label-caps text-xs font-bold text-[#A67C52] uppercase z-10 relative tracking-wider">현재 라이프 스테이지</h2>
                      <div className="mt-8 mb-4">
                        <div className="ecliptic-arc">
                          <div className="sun-orb" style={{ left: '75%' }} />
                        </div>
                      </div>
                      <div className="flex justify-between font-mono-data text-[10px] text-[#8C857D] uppercase tracking-widest z-10 relative font-semibold">
                        <span>새벽</span>
                        <span>정오</span>
                        <span className="text-[#A67C52] font-bold">황혼</span>
                        <span>자정</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Saju Core Matrix & Graphics Data */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="glass-panel-active rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-black/5 bg-black/[0.01] blur-3xl pointer-events-none" />
                      
                      <div className="flex justify-between items-center z-10 relative border-b border-[#E5E1DA] pb-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#5A5A40]">grid_4x4</span>
                          <h2 className="font-label-caps text-xs font-bold text-[#A67C52] uppercase tracking-wider">구조적 핵심 (사주팔자)</h2>
                        </div>
                        <span className="font-mono-data text-[10px] text-[#5A5A40] bg-[#F0EDE8] px-2.5 py-1 rounded-md font-bold">시스템 준비됨</span>
                      </div>
 
                      {/* Saju Matrix 4x2 Column Grid */}
                      <div className="grid grid-cols-4 gap-3 md:gap-4 z-10 relative text-center">
                        {/* Headers */}
                        <div className="font-label-caps text-[10px] text-[#8C857D] font-semibold">시 (시간)</div>
                        <div className="font-label-caps text-[10px] text-[#8C857D] font-semibold">일 (자아)</div>
                        <div className="font-label-caps text-[10px] text-[#8C857D] font-semibold">월 (사회)</div>
                        <div className="font-label-caps text-[10px] text-[#8C857D] font-semibold">년 (조상)</div>
 
                        {/* Stems */}
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#2D2926]">辛</span>
                          <span className="font-mono-data text-[10px] text-[#8C857D] font-semibold">금 (음)</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#A67C52] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[#A67C52]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="text-3xl font-bold font-serif text-[#A67C52]">庚</span>
                          <span className="font-mono-data text-[10px] text-[#A67C52] font-bold">금 (양) *핵심*</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#2D2926]">辛</span>
                          <span className="font-mono-data text-[10px] text-[#8C857D] font-semibold">금 (음)</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#2D2926]">庚</span>
                          <span className="font-mono-data text-[10px] text-[#8C857D] font-semibold">금 (양)</span>
                        </div>
 
                        {/* Branches */}
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#A67C52]">巳</span>
                          <span className="font-mono-data text-[10px] text-[#A67C52] font-semibold">화 (양)</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#2D2926]">午</span>
                          <span className="font-mono-data text-[10px] text-[#8C857D] font-semibold">화 (음)</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#A67C52]">巳</span>
                          <span className="font-mono-data text-[10px] text-[#A67C52] font-semibold">화 (양)</span>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#E5E1DA] rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-[#5A5A40] transition-colors">
                          <span className="text-3xl font-bold font-serif text-[#2D2926]">午</span>
                          <span className="font-mono-data text-[10px] text-[#8C857D] font-semibold">화 (음)</span>
                        </div>
                      </div>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Latent Routine (Jijanggan) */}
                      <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-4">
                          <span className="material-symbols-outlined text-[#A67C52]">layers</span>
                          <h2 className="font-label-caps text-xs font-bold text-[#A67C52] uppercase tracking-wider">잠재 데이터 객체 (지장간)</h2>
                        </div>
                        <p className="text-xs text-[#8C857D]">기본 지지 아래에서 소환 및 구동되는 내재적 잠재 서브 루트 기운 배열군입니다.</p>
                        
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex justify-between items-center p-3 rounded-xl bg-[#FDFBF8] border border-[#E5E1DA]">
                            <span className="font-mono-data text-xs text-[#2D2926] font-semibold">월: 巳 (사화)</span>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-[#F0EDE8] text-[#5A5A40] border border-[#5A5A40]/20 font-bold">戊</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-[#F0EDE8] text-[#A67C52] border border-[#A67C52]/20 font-bold">庚</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-[#E5E1DA] text-[#8C857D] border border-transparent font-bold">丙</span>
                            </div>
                          </div>
 
                          <div className="flex justify-between items-center p-3 rounded-xl bg-[#FDFBF8] border border-[#E5E1DA]">
                            <span className="font-mono-data text-xs text-[#2D2926] font-semibold">일: 午 (오화)</span>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-[#E5E1DA] text-[#8C857D] border border-transparent font-bold">丙</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data opacity-40 border border-dashed border-[#E5E1DA]">-</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-[#F0EDE8] text-[#5A5A40] border border-[#5A5A40]/20 font-bold">己</span>
                            </div>
                          </div>
                        </div>
                      </div>
 
                      {/* Orbit Viz panel */}
                      <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 relative min-h-[180px] overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-[#E5E1DA] pb-4 z-10 relative">
                          <span className="material-symbols-outlined text-[#5A5A40]">data_usage</span>
                          <h2 className="font-label-caps text-xs font-bold text-[#5A5A40] uppercase tracking-wider">주요 에너지 위상</h2>
                        </div>
                        <div className="absolute inset-0 top-16 flex items-center justify-center opacity-70">
                          <div className="orbit-ring w-24 h-24" />
                          <div className="orbit-ring w-36 h-36 border-[#5A5A40]/20" />
                          <div className="orbit-ring w-44 h-44 border-dashed border-[#E5E1DA]" />
                          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#A67C52] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(166,124,82,0.2)] animate-pulse">
                            <span className="text-xs text-[#A67C52] font-bold">CORE</span>
                          </div>
                        </div>
                      </div>
                    </div>
 
                    {/* Action Bar */}
                    <div className="flex justify-end gap-3 mt-4">
                      <button className="px-6 py-2.5 rounded-xl border border-[#5A5A40] text-[#5A5A40] font-semibold text-xs tracking-wider uppercase hover:bg-[#5A5A40]/5 transition-colors cursor-pointer">
                        데이터 내보내기
                      </button>
                      <button 
                        onClick={() => navigateTo('MBTI_HYBRID_ANALYSIS', 'push')}
                        className="px-6 py-2.5 rounded-xl bg-[#A67C52] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#A67C52]/90 transition-colors cursor-pointer"
                      >
                        심층 분석
                      </button>
                    </div>
                  </div>
                </div>
 
                {/* Sub links alignment for spec validation */}
                <div className="flex justify-center gap-6 pt-6">
                  <a 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    대시보드
                  </a>
                  <span className="text-black/10">|</span>
                  <a 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    데일리
                  </a>
                </div>
              </div>
            )}

            {/* 3. 오늘의 운세 (국문) */}
            {currentScreen === 'DAILY_FORTUNE' && (
              <div id="screen-daily-fortune" className="space-y-12">
                <section className="text-center space-y-4 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] font-serif leading-tight">오늘의 에너지 흐름</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5A5A40]/30 bg-[#F0EDE8]">
                    <span className="material-symbols-outlined text-[14px] text-[#5A5A40] filled">check_circle</span>
                    <span className="font-mono-data text-xs text-[#5A5A40] font-bold">100% 데이터 무결성 검증 완료</span>
                  </div>
                </section>
 
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Radial Score */}
                  <div className="glass-panel rounded-3xl p-8 md:col-span-5 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 bg-[#5A5A40]/3 blur-3xl rounded-full" />
                    <h3 className="font-label-caps text-xs text-[#A67C52] mb-8 z-10 font-bold tracking-wider uppercase">오늘의 에너지 스코어</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center z-10">
                      <div className="absolute inset-0 rounded-full gradient-ring" />
                      <div className="absolute inset-[3px] rounded-full inner-void flex flex-col items-center justify-center bg-white shadow-sm">
                        <span className="text-5xl font-bold text-[#2D2926] font-serif">84</span>
                        <span className="font-label-caps text-xs text-[#8C857D] mt-1 font-bold tracking-widest uppercase">최적</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Keywords & Narrative */}
                  <div className="glass-panel rounded-3xl p-6 md:col-span-7 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-label-caps text-xs text-[#A67C52] mb-6 flex items-center gap-2 font-bold tracking-wider uppercase">
                        <span className="material-symbols-outlined text-base">radar</span>
                        감지된 핵심 변수
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        <div className="px-4 py-2 rounded-xl bg-[#F0EDE8] border border-[#E5E1DA] font-sans text-xs font-bold text-[#5A5A40]">
                          협업 시너지
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-[#F0EDE8] border border-[#E5E1DA] font-sans text-xs font-bold text-[#5A5A40]">
                          분석적 사고
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-[#F0EDE8] border border-[#E5E1DA] font-sans text-xs font-bold text-[#5A5A40]">
                          자산 운용
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-[#F0EDE8] border border-[#E5E1DA] font-sans text-xs font-bold text-[#5A5A40]">
                          전략적 정렬
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#E5E1DA]">
                      <p className="text-base text-[#8C857D] leading-relaxed font-sans font-medium">
                        에너지 파동은 정오 무렵 협업 노력이 정점에 도달할 것임을 시사합니다. 분석 역량이 강화되어 전략적 의사결정을 내리기에 최적인 시간대입니다.
                      </p>
                    </div>
                  </div>
                </div>
 
                {/* Vertical Timeline */}
                <section className="glass-panel rounded-3xl p-6 md:p-8 bg-white">
                  <h3 className="font-label-caps text-xs text-[#5A5A40] mb-8 flex items-center gap-2 font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    에너지 흐름 변화
                  </h3>
 
                  <div className="relative pl-8 md:pl-12 space-y-12">
                    <div className="absolute left-[15px] md:left-[23px] top-2 bottom-2 w-[2px] timeline-line rounded-full" />
                    
                    {/* Event 1 */}
                    <div className="relative">
                      <div className="absolute -left-8 md:-left-12 w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[#B0A9A0] flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-[#B0A9A0]" />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                        <span className="font-mono-data text-sm font-bold text-[#A67C52]">06:00 - 09:00</span>
                        <h4 className="text-lg font-bold text-[#2D2926] font-sans">데이터 초기화</h4>
                      </div>
                      <p className="text-sm text-[#8C857D] font-medium font-sans">기준 지표 수집 단계입니다. 외부 간섭이 적으며 독자적인 과업 수행에 적합합니다.</p>
                    </div>
 
                    {/* Event 2 */}
                    <div className="relative">
                      <div className="absolute -left-8 md:-left-12 w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[#A67C52] flex items-center justify-center z-10 shadow-[0_0_8px_rgba(166,124,82,0.2)]">
                        <div className="w-2 h-2 rounded-full bg-[#A67C52]" />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                        <span className="font-mono-data text-sm font-bold text-[#A67C52]">11:00 - 14:00</span>
                        <h4 className="text-lg font-bold text-[#2D2926] font-sans">시너지 정점</h4>
                      </div>
                      <p className="text-sm text-[#8C857D] font-medium font-sans">협업 노드의 정렬이 최대화되는 시기입니다. 성공적인 데이터 교환 확률이 매우 높습니다.</p>
                    </div>
 
                    {/* Event 3 */}
                    <div className="relative">
                      <div className="absolute -left-8 md:-left-12 w-6 h-6 rounded-full bg-[#FFFFFF] border-2 border-[#5A5A40] flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-[#5A5A40]" />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                        <span className="font-mono-data text-sm font-bold text-[#5A5A40]">18:00 - 21:00</span>
                        <h4 className="text-lg font-bold text-[#2D2926] font-sans">분석적 통합</h4>
                      </div>
                      <p className="text-sm text-[#8C857D] font-medium font-sans">에너지가 프로세싱 및 아카이빙 단계로 전환됩니다. 데이터 로그 검토에 유리한 환경입니다.</p>
                    </div>
                  </div>
                </section>
 
                {/* Sub links alignment for spec validation */}
                <div className="flex justify-center gap-6 pt-6">
                  <a 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    대시보드
                  </a>
                  <span className="text-black/10">|</span>
                  <a 
                    onClick={() => navigateTo('PRECISION_SAJU', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    분석
                  </a>
                </div>
              </div>
            )}

            {/* 4. 인연 궁합 분석 (국문) */}
            {currentScreen === 'RELATIONSHIP_COMPATIBILITY' && (
              <div id="screen-relationship" className="space-y-12">
                <section className="text-center space-y-2 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] font-serif leading-tight">인연 궁합 분석</h2>
                  <p className="text-lg text-[#8C857D]">우주의 에너지를 동기화하고 공명을 평가합니다.</p>
                </section>
 
                {/* Partner Input Area */}
                <section className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden bg-white">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#5A5A40]/3 rounded-full blur-[80px]" />
                  <h3 className="font-label-caps text-xs text-[#A67C52] mb-6 flex items-center gap-2 font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-base">person_add</span>
                    상대방 정보 입력
                  </h3>
 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-xs text-[#8C857D] font-semibold">생년월일</label>
                      <input 
                        type="date" 
                        value={compatibilityInput.birthDate}
                        onChange={(e) => setCompatibilityInput({ ...compatibilityInput, birthDate: e.target.value })}
                        className="input-underline w-full text-[#2D2926] font-mono-data text-xs py-2 px-1 focus:ring-0 border-b border-[#E5E1DA]"
                      />
                    </div>
 
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-xs text-[#8C857D] font-semibold">출생 시간</label>
                      <input 
                        type="time" 
                        value={compatibilityInput.birthTime}
                        onChange={(e) => setCompatibilityInput({ ...compatibilityInput, birthTime: e.target.value })}
                        className="input-underline w-full text-[#2D2926] font-mono-data text-xs py-2 px-1 focus:ring-0 border-b border-[#E5E1DA]"
                      />
                    </div>
 
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-xs text-[#8C857D] font-semibold">성별</label>
                      <div className="flex bg-[#F0EDE8] rounded-full p-1 border border-[#E5E1DA]">
                        <button 
                          onClick={() => setCompatibilityInput({ ...compatibilityInput, gender: 'female' })}
                          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs transition-all cursor-pointer ${compatibilityInput.gender === 'female' ? 'bg-[#5A5A40] text-white' : 'text-[#8C857D]'}`}
                        >
                          여성
                        </button>
                        <button 
                          onClick={() => setCompatibilityInput({ ...compatibilityInput, gender: 'male' })}
                          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs transition-all cursor-pointer ${compatibilityInput.gender === 'male' ? 'bg-[#5A5A40] text-white' : 'text-[#8C857D]'}`}
                        >
                          남성
                        </button>
                      </div>
                    </div>
 
                    <div className="flex flex-col gap-2">
                      <label className="font-label-caps text-xs text-[#8C857D] font-semibold">달력</label>
                      <div className="flex bg-[#F0EDE8] rounded-full p-1 border border-[#E5E1DA]">
                        <button 
                          onClick={() => setCompatibilityInput({ ...compatibilityInput, isLunar: true })}
                          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs transition-all cursor-pointer ${compatibilityInput.isLunar ? 'bg-[#A67C52] text-white' : 'text-[#8C857D]'}`}
                        >
                          음력
                        </button>
                        <button 
                          onClick={() => setCompatibilityInput({ ...compatibilityInput, isLunar: false })}
                          className={`flex-1 py-1.5 px-4 rounded-full font-bold text-xs transition-all cursor-pointer ${!compatibilityInput.isLunar ? 'bg-[#A67C52] text-white' : 'text-[#8C857D]'}`}
                        >
                          양력
                        </button>
                      </div>
                    </div>
                  </div>
 
                  <div className="mt-8 flex justify-end">
                    <button className="bg-[#5A5A40] text-white font-semibold text-xs tracking-widest px-6 py-3 rounded-full hover:bg-[#5A5A40]/90 transition-all shadow-[0_4px_12px_rgba(90,90,64,0.15)] cursor-pointer">
                      에너지 공명 분석
                    </button>
                  </div>
                </section>
 
                {/* Score & Evaluation */}
                <section className="flex flex-col lg:flex-row gap-8 items-center justify-center py-8">
                  {/* Orbit Sphere visualization */}
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border border-[#E5E1DA] rounded-full animate-[spin_30s_linear_infinite]" />
                    <div className="absolute inset-4 border border-[#5A5A40]/15 border-dashed rounded-full animate-[spin_20s_linear_infinite]" style={{ animationDirection: 'reverse' }} />
                    <div className="absolute inset-8 border border-[#A67C52]/20 rounded-full animate-[spin_12s_linear_infinite]" />
                    
                    <div className="absolute inset-12 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.03)] border border-[#E5E1DA] z-10">
                      <span className="text-5xl font-bold text-[#2D2926] font-serif">85</span>
                      <span className="font-label-caps text-xs text-[#8C857D] font-bold tracking-widest uppercase">점수</span>
                    </div>
 
                    <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
                      <div className="w-3 h-3 bg-[#A67C52] rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(166,124,82,0.5)]" />
                    </div>
                  </div>
 
                  <div className="text-center lg:text-left space-y-4 max-w-md">
                    <div className="inline-block px-4 py-1 rounded-full bg-[#F0EDE8] border border-[#5A5A40]/30 text-[#5A5A40] font-bold text-xs tracking-wider uppercase font-sans">
                      A 등급
                    </div>
                    <h3 className="text-2xl font-normal text-[#2D2926] font-serif">강력한 공명</h3>
                    <p className="text-base text-[#8C857D] leading-relaxed font-sans font-medium">
                      높은 천문학적 일치도가 감지되었습니다. 귀하와 상대방의 오행 기운이 서로를 보완하며 조화로운 에너지를 형성하고 있습니다. 이는 지속 가능한 성장과 상호 이해를 위한 견고한 토대가 됩니다.
                    </p>
                  </div>
                </section>
 
                {/* Sub links alignment for spec validation */}
                <div className="flex justify-center gap-4 pt-6">
                  <button 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="px-4 py-2 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer"
                  >
                    대시보드
                  </button>
                  <button 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="px-4 py-2 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer"
                  >
                    데일리
                  </button>
                  <button 
                    onClick={() => navigateTo('PRECISION_SAJU', 'none')} 
                    className="px-4 py-2 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer"
                  >
                    분석
                  </button>
                </div>
              </div>
            )}

            {/* 5. 종합 라이프 분석 (MBTI 통합) */}
            {currentScreen === 'GENERAL_LIFE_ANALYSIS' && (
              <div id="screen-general-life" className="space-y-12">
                <header className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] font-serif mb-2 leading-none">라이프 사이클 내비게이션</h1>
                  <p className="text-lg text-[#8C857D]">종합적인 인생 디자인 분석 리포트 (MBTI 통합)</p>
                </header>
 
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Rotating Macro Orbit */}
                  <div className="col-span-1 lg:col-span-8 glass-panel rounded-3xl p-6 flex flex-col justify-between min-h-[480px] bg-white">
                    <div>
                      <h2 className="font-label-caps text-xs text-[#A67C52] font-bold tracking-wider mb-4 uppercase">거시적 사이클</h2>
                      <p className="text-sm text-[#8C857D] font-medium">천체 정렬에 기반한 장기적인 에너지 궤적 맵핑입니다.</p>
                    </div>
 
                    <div className="flex-grow flex items-center justify-center relative py-6">
                      <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                        <div className="orbit-ring w-full h-full border-[#E5E1DA]" />
                        <div className="orbit-ring w-2/3 h-2/3 border-dashed border-[#E5E1DA]" />
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#FDFBF8] border border-[#E5E1DA] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] z-10">
                          <span className={`${iconClass} text-[#5A5A40]`}>center_focus_strong</span>
                        </div>
 
                        <div className="orbit-ring w-full h-full border-none animate-[spin_25s_linear_infinite]">
                          <div className="absolute w-3.5 h-3.5 bg-[#A67C52] rounded-full top-[15%] left-[85%] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(166,124,82,0.4)]" />
                        </div>
 
                        {/* Labels surrounding the cycle orbit */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 pb-2 font-mono-data text-xs text-[#8C857D] font-bold uppercase">절정 (정오)</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 pt-2 font-mono-data text-xs text-[#8C857D] font-bold uppercase">재설정 (자정)</div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-16 -translate-y-1/2 pr-2 font-mono-data text-xs text-[#8C857D] font-bold uppercase">탄생 (새벽)</div>
                        <div className="absolute right-0 top-1/2 transform translate-x-16 -translate-y-1/2 pl-2 font-mono-data text-xs text-[#8C857D] font-bold uppercase">기록 (황혼)</div>
                      </div>
                    </div>
                  </div>
 
                  {/* Environment Parameters stack */}
                  <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                    <div className="glass-panel rounded-3xl p-6 flex-1 bg-white">
                      <h2 className="font-label-caps text-xs text-[#5A5A40] mb-4 font-bold tracking-wider uppercase">환경 변수</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-2.5">
                          <span className="font-mono-data text-xs text-[#8C857D] font-semibold">절기</span>
                          <span className="font-bold text-[#2D2926] font-sans">추분 (Autumnal Equinox)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-2.5">
                          <span className="font-mono-data text-xs text-[#8C857D] font-semibold">월령</span>
                          <span className="font-bold text-[#2D2926] font-sans">하현달 (Waning Gibbous)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-2.5">
                          <span className="font-mono-data text-xs text-[#8C857D] font-semibold">주요 오행</span>
                          <span className="font-bold text-[#2D2926] font-sans">금 (金)</span>
                        </div>
                      </div>
                    </div>
 
                    <div className="glass-panel rounded-3xl p-6 flex-1 bg-white">
                      <h2 className="font-label-caps text-xs text-[#5A5A40] mb-4 font-bold tracking-wider uppercase">에너지 시그니처 (MBTI)</h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-[#F0EDE8] border border-[#5A5A40]/30 text-[#5A5A40] font-mono-data text-xs font-bold uppercase">
                            {selectedMBTI}
                          </span>
                          <span className="text-sm text-[#8C857D] font-medium font-sans">{currentMBTIInfo.role}</span>
                        </div>
                        <button 
                          onClick={() => navigateTo('MBTI_REVERSE_INPUT', 'push')}
                          className="material-symbols-outlined text-[#8C857D] hover:text-[#5A5A40] transition-colors cursor-pointer"
                          title="MBTI 변경"
                        >
                          edit
                        </button>
                      </div>
                    </div>
 
                    <div className="glass-panel rounded-3xl p-6 flex-1 bg-[#FDFBF8] border border-[#E5E1DA]">
                      <h2 className="font-label-caps text-xs text-[#A67C52] mb-4 font-bold tracking-wider uppercase">현재 단계</h2>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-[#A67C52] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[#A67C52] filled">archive</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#2D2926] font-sans">데이터 축적 단계 (묘)</div>
                          <div className="font-mono-data text-xs text-[#8C857D] font-semibold">6주기 중 4주기</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#8C857D] leading-relaxed font-sans font-medium">내실을 다지고 지난 과정을 검토하기에 최적인 시기입니다. 대외적인 확장은 권장되지 않습니다.</p>
                    </div>
 
                    <div className="glass-panel rounded-3xl p-6 flex-1 border border-[#A67C52]/20 bg-[#A67C52]/5">
                      <h2 className="font-label-caps text-xs text-[#A67C52] mb-4 font-bold tracking-wider uppercase">사주로 보는 MBTI 성향</h2>
                      <div className="flex items-end justify-between mb-4">
                        <div className="text-3xl font-bold text-[#A67C52] font-serif leading-none">85%</div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-[#8C857D] mb-1">기질 일치율</div>
                          <div className="text-sm font-semibold text-[#2D2926]">사주: ENTJ</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#8C857D] leading-relaxed font-sans font-medium">
                        선천적 기질(사주)은 <span className="text-[#A67C52] font-semibold">ENTJ</span>에 가까우며, 후천적 노력으로 <span className="text-[#5A5A40] font-semibold">{selectedMBTI}</span>의 특성을 강화하고 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
 
                {/* Tactical Guideline Cards */}
                <div className="glass-panel rounded-3xl p-6 mt-6 bg-white">
                  <h2 className="font-label-caps text-xs text-[#5A5A40] mb-6 font-bold tracking-wider uppercase">전략적 행동 가이드</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40] transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-[#8C857D]">work</span>
                        <h3 className="text-base font-bold text-[#2D2926]">커리어 전환</h3>
                      </div>
                      <div className="w-full h-1 bg-[#E5E1DA] rounded-full mb-3 overflow-hidden">
                        <div className="h-full bg-[#A67C52] w-1/4" />
                      </div>
                      <p className="text-xs text-[#8C857D] leading-relaxed font-sans font-medium">에너지 공명도가 낮습니다. 현재 위치를 유지하세요. 중대한 변화는 피하는 것이 좋습니다.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40] transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#5A5A40]/3 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="material-symbols-outlined text-[#5A5A40]">trending_up</span>
                          <h3 className="text-base font-bold text-[#2D2926]">투자 및 자산</h3>
                        </div>
                        <div className="w-full h-1 bg-[#E5E1DA] rounded-full mb-3 overflow-hidden">
                          <div className="h-full bg-[#5A5A40] w-3/4" />
                        </div>
                        <p className="text-xs text-[#8C857D] leading-relaxed font-sans font-medium">유리한 흐름입니다. '금(Metal)' 오행과 관련된 장기적인 자산에 집중하면 이롭습니다.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40] transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-[#8C857D]">self_improvement</span>
                        <h3 className="text-base font-bold text-[#2D2926]">휴식 및 회복</h3>
                      </div>
                      <div className="w-full h-1 bg-[#E5E1DA] rounded-full mb-3 overflow-hidden">
                        <div className="h-full bg-[#A67C52] w-full" />
                      </div>
                      <p className="text-xs text-[#8C857D] leading-relaxed font-sans font-medium">매우 중요한 우선순위입니다. 다음 재설정 단계를 대비해 휴식에 아낌없이 투자하세요.</p>
                    </div>
                  </div>
                </div>

                {/* Navigation compliance redirection list for Spec */}
                <div className="flex justify-center gap-6 pt-6">
                  <a 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    대시보드
                  </a>
                  <span className="text-black/10">|</span>
                  <a 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    데일리
                  </a>
                  <span className="text-black/10">|</span>
                  <a 
                    onClick={() => navigateTo('PRECISION_SAJU', 'none')} 
                    className="text-xs text-[#8C857D] hover:text-[#5A5A40] cursor-pointer font-semibold"
                  >
                    분석
                  </a>
                </div>
              </div>
            )}

            {/* 6. MBTI 하이브리드 분석 (국문) */}
            {currentScreen === 'MBTI_HYBRID_ANALYSIS' && (
              <div id="screen-hybrid-mbti" className="space-y-12">
                <section className="flex flex-col gap-4 items-center text-center">
                  <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-[#2D2926] font-serif leading-tight">하이브리드 에너지 시그니처</h1>
                  <p className="text-lg text-[#8C857D] max-w-2xl font-medium">선천적 사주 기질과 후천적 MBTI 프레임워크의 통합 분석</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                    <div className="glass-panel bg-white border border-[#E5E1DA] rounded-full px-6 py-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#A67C52] shadow-sm animate-pulse" />
                      <span className="font-label-caps text-xs text-[#A67C52] font-bold tracking-widest uppercase">신금: 완벽주의자</span>
                    </div>
                    <div className="glass-panel bg-white border border-[#E5E1DA] rounded-full px-6 py-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#5A5A40] shadow-sm animate-pulse" />
                      <span className="font-label-caps text-xs text-[#5A5A40] font-bold tracking-widest uppercase">{selectedMBTI}: 건축가</span>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Radar Axes Module */}
                  <div className="glass-panel rounded-3xl p-6 lg:col-span-7 flex flex-col min-h-[400px] relative overflow-hidden bg-white">
                    <div className="flex justify-between items-center mb-8 relative z-10">
                      <h2 className="font-label-caps text-xs text-[#2D2926] uppercase tracking-widest flex items-center gap-2 font-bold">
                        <span className="material-symbols-outlined text-[#5A5A40]">radar</span>
                        차원적 정렬
                      </h2>
                      <div className="flex gap-4 font-mono-data text-xs text-[#8C857D] font-semibold">
                        <div className="flex items-center gap-2"><span className="w-3 h-1 bg-[#A67C52] rounded-full" /> 선천적(사주)</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-1 bg-[#5A5A40] rounded-full" /> 후천적(MBTI)</div>
                      </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center relative w-full h-full min-h-[300px]">
                      {/* Grid concentric rings */}
                      <div className="absolute w-[240px] h-[240px] rounded-full border border-[#E5E1DA]" />
                      <div className="absolute w-[170px] h-[170px] rounded-full border border-[#E5E1DA]/80" />
                      <div className="absolute w-[100px] h-[100px] rounded-full border border-[#E5E1DA]/50" />
                      
                      {/* Diagonals */}
                      <div className="absolute w-full h-[1px] bg-[#E5E1DA]/40 rotate-0" />
                      <div className="absolute w-full h-[1px] bg-[#E5E1DA]/40 rotate-[60deg]" />
                      <div className="absolute w-full h-[1px] bg-[#E5E1DA]/40 rotate-[120deg]" />

                      {/* Shapes */}
                      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-[#A67C52]/30 animate-spin" style={{ animationDuration: '40s' }} />
                      <div className="absolute w-[140px] h-[140px] rounded-full border border-dashed border-[#5A5A40]/30 animate-spin" style={{ animationDuration: '25s' }} />

                      {/* Radar labels */}
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 font-mono-data text-[10px] text-[#2D2926] font-bold">자율성</span>
                      <span className="absolute top-1/4 right-0 translate-x-4 font-mono-data text-[10px] text-[#2D2926] font-bold">속도</span>
                      <span className="absolute bottom-1/4 right-0 translate-x-4 font-mono-data text-[10px] text-[#2D2926] font-bold">현실성</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 font-mono-data text-[10px] text-[#2D2926] font-bold">서포트</span>
                      <span className="absolute bottom-1/4 left-0 -translate-x-4 font-mono-data text-[10px] text-[#2D2926] font-bold">표현력</span>
                      <span className="absolute top-1/4 left-0 -translate-x-4 font-mono-data text-[10px] text-[#2D2926] font-bold">관계 거리</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:col-span-5">
                    {/* Hybrid Insight Card */}
                    <div className="glass-panel rounded-3xl p-6 flex-grow flex flex-col justify-center relative overflow-hidden group bg-white">
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A67C52]/3 rounded-full blur-[40px] group-hover:bg-[#A67C52]/8 transition-all duration-700" />
                      <h2 className="font-label-caps text-xs text-[#A67C52] uppercase tracking-widest flex items-center gap-2 mb-4 font-bold">
                        <span className="material-symbols-outlined">compare_arrows</span>
                        역설적 매력
                      </h2>
                      <div className="text-xl font-bold text-[#2D2926] mb-2 font-sans font-bold leading-snug">정밀함과 직관의 만남</div>
                      <p className="text-[#8C857D] font-medium leading-relaxed font-sans">
                        신금의 완벽주의적 실행력과 {selectedMBTI}의 전략적 직관이 결합되어, 현실적 제약을 넘어서는 혁신적인 기획력을 발휘합니다.
                      </p>
                    </div>

                    {/* Role Panel */}
                    <div className="glass-panel rounded-3xl p-6 flex items-center gap-4 relative bg-white">
                      <div className="w-12 h-12 rounded-xl bg-[#F0EDE8] flex items-center justify-center border border-[#E5E1DA] shrink-0">
                        <span className="material-symbols-outlined text-[#A67C52] text-3xl">architecture</span>
                      </div>
                      <div>
                        <div className="font-label-caps text-[10px] text-[#8C857D] uppercase tracking-wider mb-1 font-bold">원형적 역할</div>
                        <div className="text-xl font-bold text-[#2D2926] font-sans">시스템 아키텍트</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline and 대운 viz */}
                <section className="glass-panel rounded-3xl p-8 relative overflow-hidden bg-white">
                  <h2 className="font-label-caps text-xs text-[#5A5A40] uppercase tracking-widest flex items-center gap-2 mb-8 font-bold">
                    <span className="material-symbols-outlined text-[#5A5A40]">timeline</span>
                    시간적 변화 궤적
                  </h2>

                  <div className="relative w-full max-w-3xl mx-auto py-8">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 sun-path-gradient opacity-40 animate-pulse" />
                    <div className="absolute top-1/2 left-[65%] w-4 h-4 rounded-full bg-[#A67C52] shadow-[0_0_12px_rgba(166,124,82,0.4)] -translate-y-1/2 -translate-x-1/2 z-10 border-2 border-white" />
                    
                    <div className="flex justify-between relative z-0">
                      <div className="flex flex-col items-center gap-2 -translate-x-1/2">
                        <div className="w-2 h-2 rounded-full bg-[#B0A9A0]" />
                        <span className="font-mono-data text-xs text-[#8C857D] font-bold">2014</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 translate-x-1/2">
                        <div className="w-2 h-2 rounded-full bg-[#B0A9A0]" />
                        <span className="font-mono-data text-xs text-[#8C857D] font-bold">2034</span>
                      </div>
                    </div>

                    <div className="absolute top-[80%] left-[65%] -translate-x-1/2 text-center w-max mt-4">
                      <div className="font-label-caps text-xs text-[#A67C52] mb-1 font-bold">대운 흐름 시각화</div>
                      <div className="font-mono-data text-xs text-[#8C857D] font-bold">1.2년 후 대운 교체기</div>
                    </div>
                  </div>
                </section>

                {/* Desktop and spec target redirection actions */}
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="px-5 py-2.5 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer animate-none"
                  >
                    대시보드
                  </button>
                  <button 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="px-5 py-2.5 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer animate-none"
                  >
                    데일리
                  </button>
                  <button 
                    onClick={() => navigateTo('PRECISION_SAJU', 'none')} 
                    className="px-5 py-2.5 border border-[#E5E1DA] hover:border-[#5A5A40]/20 rounded-xl bg-[#F0EDE8] text-xs text-[#8C857D] hover:text-[#2D2926] font-semibold transition-colors cursor-pointer animate-none"
                  >
                    분석
                  </button>
                </div>
              </div>
            )}

            {/* 7. MBTI 기반 사주 성향 결과 */}
            {currentScreen === 'MBTI_SAJU_RESULT' && (
              <div id="screen-mbti-saju-result" className="max-w-2xl mx-auto space-y-12 w-full">
                
                {/* Embedded Header bar */}
                <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4">
                  <button 
                    onClick={() => navigateTo('MBTI_REVERSE_INPUT', 'push_back')}
                    className="text-[#5A5A40] hover:text-[#2D2926] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-[#5A5A40]/5 cursor-pointer"
                    title="뒤로 가기"
                  >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                  </button>
                  <h1 className="text-xl font-normal text-[#2D2926] font-serif">분석 결과</h1>
                  <div className="w-10" /> {/* Balance spacer */}
                </div>

                <section className="flex flex-col items-center justify-center text-center space-y-4 pt-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-panel bg-white border border-[#E5E1DA] shadow-sm relative shrink-0">
                    <div className="orbit-ring w-[120%] h-[120%] border-dashed border-[#E5E1DA]" />
                    <span className="text-3xl font-bold text-[#2D2926] font-serif tracking-tight">{selectedMBTI}</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-[#A67C52] tracking-[0.2em] mb-1 font-bold uppercase">DOMINANT ENERGY</p>
                    <h2 className="text-2xl font-bold text-[#2D2926] font-sans">{currentMBTIInfo.element}</h2>
                  </div>
                </section>

                {/* Energy Distribution dynamic circle mapping */}
                <section className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-white">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A67C52]/3 rounded-full blur-3xl" />
                  <h3 className="font-label-caps text-xs text-[#A67C52] mb-6 text-center font-bold uppercase tracking-wider">에너지 분포도 (추론됨)</h3>
                  
                  <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FDFBF8] shadow-[0_4px_12px_rgba(0,0,0,0.03)] z-10 flex items-center justify-center border border-[#E5E1DA] animate-pulse">
                      <span className="material-symbols-outlined text-[#A67C52] text-2xl">psychology</span>
                    </div>

                    <div className="orbit-ring w-full h-full border-[#E5E1DA]/80">
                      {/* Metal */}
                      <div className="absolute top-[10%] left-[80%] transform -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-[#A67C52] shadow-sm" />
                        <span className="font-mono-data text-[10px] text-[#A67C52] font-bold">금 {currentMBTIInfo.pct.metal}%</span>
                      </div>
                      {/* Water */}
                      <div className="absolute top-[80%] left-[80%] transform -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#5A5A40] shadow-sm" />
                        <span className="font-mono-data text-[10px] text-[#5A5A40] font-bold">수 {currentMBTIInfo.pct.water}%</span>
                      </div>
                      {/* Fire */}
                      <div className="absolute top-[80%] left-[20%] transform -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D38E70] shadow-sm" />
                        <span className="font-mono-data text-[10px] text-[#D38E70] font-bold">화 {currentMBTIInfo.pct.fire}%</span>
                      </div>
                      {/* Wood */}
                      <div className="absolute top-[10%] left-[20%] transform -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#8CA885] shadow-sm" />
                        <span className="font-mono-data text-[10px] text-[#8CA885] font-bold">목 {currentMBTIInfo.pct.wood}%</span>
                      </div>
                      {/* Earth */}
                      <div className="absolute top-[-5%] left-[50%] transform -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B5A48F] shadow-sm" />
                        <span className="font-mono-data text-[10px] text-[#8C857D] font-bold">토 {currentMBTIInfo.pct.earth}%</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Analytical Text Cards */}
                <section className="space-y-6">
                  <div className="glass-panel rounded-3xl p-5 border-l-4 border-[#A67C52] bg-white">
                    <h4 className="font-label-caps text-xs text-[#A67C52] mb-2 flex items-center gap-2 font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-base">menu_book</span>
                      선천적 기질 요약
                    </h4>
                    <p className="text-sm text-[#8C857D] leading-relaxed font-sans font-medium">
                      분석적이고 체계적인 사고를 지향하는 {selectedMBTI} 유형은 사주 명리학에서 논리와 결단력을 상징하는 '{currentMBTIInfo.element.split(' ')[0]}'의 기운, 특히 관성(官星)과 인성(印星)의 에너지와 강하게 공명합니다. 객관적 데이터를 중시하며, 복잡한 패턴을 파악하여 구조화하는 능력이 탁월합니다.
                    </p>
                  </div>

                  <div className="glass-panel rounded-3xl p-5 border-l-4 border-[#5A5A40] bg-white">
                    <h4 className="font-label-caps text-xs text-[#5A5A40] mb-2 flex items-center gap-2 font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-base">explore</span>
                      추천 행동 가이드
                    </h4>
                    <p className="text-sm text-[#8C857D] leading-relaxed font-sans font-medium">
                      지나친 완벽주의가 스스로를 고립시킬 수 있습니다. 유연성과 지혜를 상징하는 수(Water)와 목(Wood)의 에너지를 보완하기 위해, 엄격한 일상 서브루틴 계획에서 벗어나 자연의 순리를 느끼는 창의적인 휴식 시간을 가지는 것을 추천합니다.
                    </p>
                  </div>
                </section>

                {/* Bottom Action bar */}
                <section className="pt-4">
                  <button 
                    onClick={() => navigateTo('PRECISION_SAJU', 'push')}
                    className="w-full py-4 rounded-full bg-[#5A5A40] text-white font-bold text-sm hover:bg-[#5A5A40]/90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_4px_12px_rgba(90,90,64,0.15)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined">data_usage</span>
                    정밀 사주 데이터 대조하기
                  </button>
                  <p className="text-center font-label-caps text-[10px] text-[#8C857D] mt-3 uppercase tracking-wider font-semibold">
                    정확한 생년월일을 입력하여 오차율을 보정하세요.
                  </p>
                </section>

                {/* Bottom Navigation Matrix */}
                <div className="flex bg-[#F0EDE8]/95 backdrop-blur-md rounded-2xl border border-[#E5E1DA] p-2 justify-around items-center w-full mt-6">
                  <button 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">query_stats</span>
                    <span className="font-label-caps text-[10px] font-bold">Dashboard</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">auto_awesome</span>
                    <span className="font-label-caps text-[10px] font-bold">Daily</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('MBTI_REVERSE_INPUT', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">insights</span>
                    <span className="font-label-caps text-[10px] font-bold">Analysis</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('RELATIONSHIP_COMPATIBILITY', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">join_inner</span>
                    <span className="font-label-caps text-[10px] font-bold">Soulmate</span>
                  </button>
                </div>
              </div>
            )}

            {/* 8. MBTI 역발상 분석 입력 */}
            {currentScreen === 'MBTI_REVERSE_INPUT' && (
              <div id="screen-reverse-input" className="max-w-2xl mx-auto space-y-12 w-full">
                
                <section className="flex flex-col gap-4 relative">
                  <div className="absolute -left-4 top-2 w-[3px] h-12 bg-[#5A5A40] rounded-r-full opacity-80" />
                  <h2 className="text-4xl font-normal text-[#2D2926] tracking-tight leading-tight font-serif">
                    MBTI로 보는 <br />
                    <span className="text-[#A67C52]">선천적 기질</span>
                  </h2>
                  <p className="text-base text-[#8C857D] leading-relaxed font-sans font-medium">
                    후천적 성향으로 당신의 오행 에너지를 역추적합니다. 객관적 지표를 통해 에너지 코어를 분석하세요.
                  </p>
                </section>

                {/* MBTI Grid Input layout */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-label-caps text-xs text-[#5A5A40] tracking-wider font-bold uppercase">에너지 서명 입력 (MBTI)</h3>
                    <span className="font-mono-data text-xs text-[#B0A9A0] font-bold">16 TYPES</span>
                  </div>

                  {/* 4 Quadrants of MBTI types */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Analysts Column */}
                    <div className="glass-panel rounded-3xl p-4 flex flex-col gap-3 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[#A67C52] text-[18px]">psychology</span>
                        <span className="font-label-caps text-[10px] text-[#A67C52] tracking-wider font-bold">ANALYSTS (분석형)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['INTJ', 'INTP', 'ENTJ', 'ENTP'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedMBTI(type)}
                            className={`rounded-xl py-2 flex items-center justify-center font-mono-data text-sm font-bold transition-all active:scale-95 cursor-pointer ${selectedMBTI === type ? 'bg-[#5A5A40] text-white border border-[#5A5A40]' : 'bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40]/30 text-[#8C857D]'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* 2. Diplomats column */}
                    <div className="glass-panel rounded-3xl p-4 flex flex-col gap-3 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[#5A5A40] text-[18px]">spa</span>
                        <span className="font-label-caps text-[10px] text-[#5A5A40] tracking-wider font-bold">DIPLOMATS (외교형)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['INFJ', 'INFP', 'ENFJ', 'ENFP'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedMBTI(type)}
                            className={`rounded-xl py-2 flex items-center justify-center font-mono-data text-sm font-bold transition-all active:scale-95 cursor-pointer ${selectedMBTI === type ? 'bg-[#5A5A40] text-white border border-[#5A5A40]' : 'bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40]/30 text-[#8C857D]'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Sentinels column */}
                    <div className="glass-panel rounded-3xl p-4 flex flex-col gap-3 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[#A67C52] text-[18px]">shield</span>
                        <span className="font-label-caps text-[10px] text-[#A67C52] tracking-wider font-bold">SENTINELS (관리형)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedMBTI(type)}
                            className={`rounded-xl py-2 flex items-center justify-center font-mono-data text-sm font-bold transition-all active:scale-95 cursor-pointer ${selectedMBTI === type ? 'bg-[#5A5A40] text-white border border-[#5A5A40]' : 'bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40]/30 text-[#8C857D]'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Explorers column */}
                    <div className="glass-panel rounded-3xl p-4 flex flex-col gap-3 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-[#5A5A40] text-[18px]">explore</span>
                        <span className="font-label-caps text-[10px] text-[#5A5A40] tracking-wider font-bold">EXPLORERS (탐험형)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['ISTP', 'ISFP', 'ESTP', 'ESFP'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedMBTI(type)}
                            className={`rounded-xl py-2 flex items-center justify-center font-mono-data text-sm font-bold transition-all active:scale-95 cursor-pointer ${selectedMBTI === type ? 'bg-[#5A5A40] text-white border border-[#5A5A40]' : 'bg-[#FDFBF8] border border-[#E5E1DA] hover:border-[#5A5A40]/30 text-[#8C857D]'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selected summary */}
                  <div className="glass-panel rounded-3xl p-5 relative overflow-hidden mt-2 bg-white">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#5A5A40]/3 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[#F0EDE8] border border-[#E5E1DA] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#A67C52] text-2xl">architecture</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono-data text-[10px] text-[#A67C52] font-bold mb-1 uppercase">SELECTED: {selectedMBTI}</span>
                        <h4 className="text-lg font-bold text-[#2D2926] mb-2 font-sans font-bold leading-tight">{currentMBTIInfo.role}</h4>
                        <p className="text-sm text-[#8C857D] leading-relaxed font-medium">
                          {currentMBTIInfo.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Primary core button */}
                <section className="mt-4 mb-8 flex justify-center">
                  <button 
                    onClick={() => navigateTo('MBTI_SAJU_RESULT', 'push')}
                    className="w-full relative group overflow-hidden rounded-full bg-[#5A5A40] text-white py-4 px-6 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(90,90,64,0.15)] transition-all active:scale-[0.98] font-bold uppercase cursor-pointer"
                    id="btn-start-ambient-analysis"
                  >
                    <span className="tracking-widest relative z-10 font-bold text-sm">잠재 기질 분석 시작</span>
                    <span className="material-symbols-outlined text-[20px] relative z-10 font-bold">arrow_forward</span>
                  </button>
                </section>
 
                {/* Bottom navigation bar */}
                <div className="flex bg-[#F0EDE8]/95 backdrop-blur-md rounded-2xl border border-[#E5E1DA] p-2 justify-around items-center w-full mt-6">
                  <button 
                    onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">query_stats</span>
                    <span className="font-label-caps text-[10px] font-bold">Dashboard</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('DAILY_FORTUNE', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">auto_awesome</span>
                    <span className="font-label-caps text-[10px] font-bold">Daily</span>
                  </button>
                  <button 
                    onClick={() => navigateTo('RELATIONSHIP_COMPATIBILITY', 'none')} 
                    className="flex flex-col items-center justify-center text-xs p-2.5 hover:bg-[#5A5A40]/5 rounded-xl transition-all text-[#8C857D] hover:text-[#2D2926] cursor-pointer"
                  >
                    <span className="material-symbols-outlined mb-1">join_inner</span>
                    <span className="font-label-caps text-[10px] font-bold">Soulmate</span>
                  </button>
                </div>
 
              </div>
            )}
 
          </motion.div>
        </AnimatePresence>
      </main>
 
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2.5 bg-[#F7F4F0]/95 backdrop-blur-2xl border-t border-[#E5E1DA] shadow-lg rounded-t-2xl">
        <button 
          onClick={() => navigateTo('IMPTI_DASHBOARD', 'none')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${currentScreen === 'IMPTI_DASHBOARD' ? 'text-[#5A5A40] bg-[#5A5A40]/5 rounded-2xl px-4 py-1.5 font-bold' : 'text-[#8C857D] px-4 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[22px] mb-0.5">dashboard</span>
          <span className="font-label-caps text-[9px] uppercase tracking-wider font-bold">대시보드</span>
        </button>
 
        <button 
          onClick={() => navigateTo('DAILY_FORTUNE', 'none')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${currentScreen === 'DAILY_FORTUNE' ? 'text-[#5A5A40] bg-[#5A5A40]/5 rounded-2xl px-4 py-1.5 font-bold' : 'text-[#8C857D] px-4 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[22px] mb-0.5">wb_sunny</span>
          <span className="font-label-caps text-[9px] uppercase tracking-wider font-bold font-sans">일일운세</span>
        </button>
 
        <button 
          onClick={() => navigateTo('PRECISION_SAJU', 'none')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${currentScreen === 'PRECISION_SAJU' || currentScreen === 'GENERAL_LIFE_ANALYSIS' || currentScreen === 'MBTI_HYBRID_ANALYSIS' ? 'text-[#5A5A40] bg-[#5A5A40]/5 rounded-2xl px-4 py-1.5 font-bold' : 'text-[#8C857D] px-4 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[22px] mb-0.5">query_stats</span>
          <span className="font-label-caps text-[9px] uppercase tracking-wider font-bold font-sans">분석</span>
        </button>
 
        <button 
          onClick={() => navigateTo('RELATIONSHIP_COMPATIBILITY', 'none')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${currentScreen === 'RELATIONSIBILITY_COMPATIBILITY' || currentScreen === 'RELATIONSHIP_COMPATIBILITY' ? 'text-[#5A5A40] bg-[#5A5A40]/5 rounded-2xl px-4 py-1.5 font-bold' : 'text-[#8C857D] px-4 py-1.5'}`}
        >
          <span className="material-symbols-outlined text-[22px] mb-0.5">favorite</span>
          <span className="font-label-caps text-[9px] uppercase tracking-wider font-bold font-sans">인연</span>
        </button>
      </nav>
 
    </div>
  );
}

