import React, { useState } from 'react';
import { SectionType } from './types';
import { SECTIONS } from './constants';
import ConicVisualizer from './components/ConicVisualizer';
import AITutor from './components/AITutor';
import { 
  Rocket, 
  Circle, 
  Orbit, // Using standard Lucide icons that visually map to these
  Activity, 
  Wifi, 
  Zap,
  BookOpen,
  Clock,
  Target,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
    Rocket: Rocket,
    Circle: Circle,
    Orbit: Orbit,
    Activity: Activity,
    Wifi: Wifi,
    Zap: Zap
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionData = SECTIONS[activeSection];

  const renderNavButton = (type: SectionType) => {
    const data = SECTIONS[type];
    const Icon = IconMap[data.icon];
    const isActive = activeSection === type;
    
    return (
      <button
        key={type}
        onClick={() => {
            setActiveSection(type);
            setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive 
            ? 'bg-slate-700 text-white shadow-lg border border-slate-600' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full duration-1000`} />
        <Icon className={`w-5 h-5 ${isActive ? data.color.replace('text-', 'text-') : ''}`} />
        <span className="font-medium tracking-wide">{data.title.split(' ')[0]}</span>
        {isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${data.color.replace('text-', 'bg-')}`} />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-purple-500/30">
        
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex flex-col md:flex-row max-w-[1600px] mx-auto min-h-screen">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed md:sticky top-0 z-50 h-screen w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
           <div className="p-6 border-b border-slate-800 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <Rocket className="text-purple-500 w-6 h-6" />
               <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                 星际几何
               </span>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400">
                <X size={24} />
             </button>
           </div>
           
           <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
             {Object.values(SectionType).map(type => renderNavButton(type))}
           </nav>
           
           <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
             System Status: Nominal<br/>v2.5 Flash Enabled
           </div>
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
           <span className="font-bold text-lg text-slate-100">星际几何</span>
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-300">
              <Menu size={24} />
           </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden">
            
            {/* Header Area */}
            <header className="mb-8">
                <h1 className={`text-4xl md:text-5xl font-bold mb-2 flex items-center gap-4 ${sectionData.color}`}>
                    {activeSection !== SectionType.HOME && IconMap[sectionData.icon] && React.createElement(IconMap[sectionData.icon], { className: "w-10 h-10 md:w-12 md:h-12" })}
                    {sectionData.title}
                </h1>
                {sectionData.formula && (
                    <div className="font-mono text-xl text-slate-400 mt-2 bg-slate-800/50 inline-block px-4 py-2 rounded-lg border border-slate-700">
                        {sectionData.formula}
                    </div>
                )}
            </header>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Visuals & AI (Sticky on desktop) */}
                <div className="lg:col-span-5 space-y-6">
                    {activeSection !== SectionType.HOME ? (
                        <ConicVisualizer section={activeSection} />
                    ) : (
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center shadow-2xl">
                            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Rocket className="w-12 h-12 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">欢迎来到圆锥曲线指挥中心</h2>
                            <p className="text-slate-400 mb-6">
                                这里的每一个公式都对应着宇宙中真实的运行轨迹。
                                点击左侧导航，开始你的探索之旅。
                            </p>
                        </div>
                    )}
                    
                    {/* Real World Card */}
                    {sectionData.realWorld && (
                        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl backdrop-blur-sm">
                            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Activity size={14} /> 现实映射 (Real World Link)
                            </h4>
                            <p className="text-slate-200">{sectionData.realWorld}</p>
                        </div>
                    )}

                    {/* AI Tutor */}
                    <AITutor currentSection={activeSection} />
                </div>

                {/* Right Column: Syllabus Content */}
                <div className="lg:col-span-7 space-y-6">
                    {sectionData.modules.length > 0 ? (
                        sectionData.modules.map((module) => (
                            <div key={module.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/60 transition-colors group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                                                module.level === '基础' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                                module.level === '中档' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                                'bg-red-500/20 text-red-300 border border-red-500/30'
                                            }`}>
                                                {module.level}
                                            </span>
                                            {module.duration && (
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Clock size={12} /> {module.duration}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                            {module.title}
                                        </h3>
                                    </div>
                                    <div className="bg-slate-900 p-2 rounded-lg text-slate-600 group-hover:text-slate-300 group-hover:scale-110 transition-all">
                                        <BookOpen size={20} />
                                    </div>
                                </div>
                                
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed border-l-2 border-slate-700 pl-3">
                                    {module.description}
                                </p>

                                <div className="space-y-3">
                                    <h5 className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Target size={12} /> 核心要点
                                    </h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {module.keyPoints.map((kp, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-2 rounded-lg">
                                                <ChevronRight size={14} className="text-blue-500" />
                                                {kp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Home Screen Dashboard Tiles */}
                             {Object.values(SectionType).filter(t => t !== SectionType.HOME).map(t => (
                                 <button 
                                    key={t}
                                    onClick={() => setActiveSection(t)}
                                    className="h-32 bg-slate-800/30 hover:bg-slate-800/80 border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 text-left transition-all flex flex-col justify-between group"
                                 >
                                     <div className={`text-lg font-bold group-hover:translate-x-1 transition-transform ${SECTIONS[t].color}`}>
                                         {SECTIONS[t].title}
                                     </div>
                                     <div className="text-slate-500 text-sm flex justify-between items-center">
                                         <span>Access Module</span>
                                         <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                     </div>
                                 </button>
                             ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default App;