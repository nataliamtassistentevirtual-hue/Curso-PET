
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Users,
  Brain,
  Zap,
  Lock,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Target,
  BookOpen
} from 'lucide-react';
import { CTAButton } from './components/CTAButton';
import { AuthScreen } from './components/AuthScreen';
import { AdminArea } from './components/AdminArea';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

type View = 'landing' | 'auth' | 'admin';

export interface SiteContent {
  headline: string;
  subheadline: string;
  courseLink: string;
  specialistName: string;
  specialistBio: string;
  specialistImageUrl: string;
  priceInstallments: string;
  priceValue: string;
  priceCash: string;
  whatsappLink: string;
}

const DEFAULT_CONTENT: SiteContent = {
  headline: "Eleve sua Prática Clínica com o Plano Estratégico em EMDR",
  subheadline: "Segurança e precisão neurobiológica para casos complexos com a Senior Trainer Silvia Guz. Saia da insegurança para a maestria terapêutica.",
  courseLink: "https://chk.eduzz.com/R9JJGYBE9X",
  specialistName: "Silvia Guz",
  specialistBio: "Psicóloga com mais de 30 anos de experiência clínica, Senior Trainer EMDRIA e precursora da abordagem EMDR no Brasil. Referência absoluta em Neuroterapia e Trauma.",
  specialistImageUrl: "",
  priceInstallments: "12x",
  priceValue: "197,00",
  priceCash: "1.997,00",
  whatsappLink: ""
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && view === 'auth') {
        setView('admin');
      }
    });
    return unsubscribe;
  }, [view]);

  const handleUpdateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem('site_content', JSON.stringify(newContent));
  };

  if (view === 'auth') return <AuthScreen onBack={() => setView('landing')} onSuccess={() => setView('admin')} />;
  if (view === 'admin' && user) return <AdminArea content={content} onUpdate={handleUpdateContent} onLogout={() => setView('landing')} />;

  const modules = [
    { 
      id: 1, 
      title: "Fundamentos da Neuroterapia", 
      topics: [
        "Base neurobiológica do trauma e memória",
        "Modelo PAI (Processamento Adaptativo de Informações)",
        "A neurociência do reprocessamento em profundidade"
      ] 
    },
    { 
      id: 2, 
      title: "Arquitetura do Plano Estratégico", 
      topics: [
        "Conceituação de caso para pacientes complexos",
        "Identificação de nós críticos no histórico clínico",
        "Fase 2 avançada: estabilização e recursos"
      ] 
    },
    { 
      id: 3, 
      title: "Manejo de Bloqueios e Impasses", 
      topics: [
        "Entrelaçamentos cognitivos e somatossensoriais",
        "Estratégias para processamentos circulares",
        "Trabalhando com defesas e resistências inconscientes"
      ] 
    },
    { 
      id: 4, 
      title: "Consolidação e Alta Terapêutica", 
      topics: [
        "Instalação de recursos positivos futuros",
        "Critérios objetivos para alta terapêutica",
        "Manutenção de resultados a longo prazo"
      ] 
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white">
      {/* Header Premium */}
      <nav className="fixed top-0 w-full z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <span className="font-serif text-2xl font-bold tracking-tighter italic text-primary">{content.specialistName}</span>
          <div className="flex items-center gap-6">
            <CTAButton 
              text="Contratar Conteúdo" 
              href={content.courseLink} 
              className="!py-2.5 !px-6 !text-xs !bg-dark hover:!bg-primary !rounded-full !shadow-none font-bold uppercase tracking-widest" 
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-beige to-beige">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-white/50 text-primary text-xs font-bold uppercase tracking-widest mb-10 shadow-sm">
            <Sparkles size={14} /> Vagas Limitadas para esta Turma
          </div>
          <h1 className="heading-serif mb-10 text-dark italic font-bold">
            {content.headline}
          </h1>
          <p className="text-xl md:text-2xl font-light text-primary-dark/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            {content.subheadline}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <CTAButton 
              text="Contratar Conteúdo Agora" 
              href={content.courseLink} 
              className="btn-premium w-full md:w-auto text-lg" 
            />
            <div className="flex items-center gap-3 text-dark/40 font-medium text-sm">
              <CheckCircle2 size={18} className="text-primary" /> Certificado Master de Conclusão
            </div>
          </div>
        </div>
        {/* Elementos Decorativos */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { icon: <Shield />, title: "Segurança Clínica", text: "Trabalhe com traumas complexos sem o medo de desestabilizar o paciente." },
            { icon: <Zap />, title: "Precisão Cirúrgica", text: "Saiba exatamente qual alvo atacar para destravar o processamento." },
            { icon: <Brain />, title: "Base Científica", text: "Entendimento profundo da neurobiologia aplicada à cada fase do EMDR." }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-beige/30 border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="font-serif text-2xl mb-4 italic font-bold">{item.title}</h3>
              <p className="text-dark/60 leading-relaxed font-light">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialist Section */}
      <section className="py-32 bg-beige">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-primary/10 border-8 border-white shadow-2xl">
                {content.specialistImageUrl ? (
                  <img src={content.specialistImageUrl} alt={content.specialistName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users size={80} className="text-primary/10" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-primary/10 max-w-[280px]">
                <p className="font-bold text-dark text-lg leading-tight mb-2 italic font-serif">Senior Trainer EMDRIA</p>
                <p className="text-[10px] text-dark/50 uppercase tracking-[0.2em] font-bold">Referência Internacional</p>
              </div>
            </div>
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Sobre sua Mentora</span>
              <h2 className="font-serif text-5xl md:text-6xl mb-10 italic font-bold tracking-tight">{content.specialistName}</h2>
              <p className="text-2xl text-dark/70 font-light leading-relaxed italic mb-12">
                "{content.specialistBio}"
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-sm font-bold border border-primary/10 text-primary">
                    <Award size={18} /> Master em Neuroterapia
                 </div>
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-sm font-bold border border-primary/10 text-primary">
                    <BookOpen size={18} /> Pioneira no Brasil
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos Section (Grade Curricular) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Conteúdo Estratégico</span>
            <h2 className="font-serif text-5xl italic font-bold">Estrutura do Aprendizado</h2>
          </div>
          
          <div className="space-y-6">
            {modules.map((m) => (
              <div key={m.id} className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${openModule === m.id ? 'bg-beige/30 border-primary/20 shadow-xl' : 'bg-white border-primary/5 hover:border-primary/20'}`}>
                <button 
                  onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between p-10 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-10">
                    <span className="font-serif text-5xl text-primary/15 italic font-bold">0{m.id}</span>
                    <h3 className="text-2xl font-bold tracking-tight">{m.title}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${openModule === m.id ? 'bg-primary text-white rotate-180 shadow-lg' : 'bg-primary/5 text-primary'}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                
                {openModule === m.id && (
                  <div className="px-10 pb-12 pl-24 md:pl-32 animate-fade-in">
                    <div className="h-px bg-primary/10 mb-8 w-full"></div>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {m.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-dark/70 font-light text-lg">
                          <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-1" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section Premium */}
      <section className="py-32 bg-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl italic mb-10 font-bold">Sua jornada rumo à maestria.</h2>
          
          <div className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-sm mb-16 shadow-2xl">
            <p className="text-primary-light uppercase tracking-[0.4em] font-bold text-sm mb-10">Opções de Investimento</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-2xl font-light opacity-60">12x de</span>
              <span className="text-7xl md:text-9xl font-serif font-bold italic tracking-tighter text-primary-light">R$ {content.priceValue}</span>
            </div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em] mb-12">ou R$ {content.priceCash} à vista</p>
            
            <ul className="text-left space-y-5 max-w-sm mx-auto mb-12">
               {[
                 "Acesso Vitalício ao Conteúdo",
                 "Materiais de Apoio em PDF",
                 "Certificado Digital de Conclusão",
                 "Suporte Estratégico Exclusivo"
               ].map((item) => (
                 <li key={item} className="flex items-center gap-4 text-white/70 font-light italic">
                    <CheckCircle2 size={20} className="text-primary-light" /> {item}
                 </li>
               ))}
            </ul>

            <CTAButton 
              text="Contratar Conteúdo Agora" 
              href={content.courseLink} 
              className="!bg-primary-light hover:!bg-white hover:!text-dark w-full md:w-auto text-xl px-20 !py-6 !shadow-none font-bold" 
            />
          </div>
          <div className="flex items-center justify-center gap-3 text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
            <Lock size={14} /> Transação 100% Segura & Criptografada
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-20 bg-[#141211] text-white/40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl font-bold text-white italic block mb-2">{content.specialistName}</span>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Excelência em Terapia de Trauma</p>
          </div>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <button 
              onClick={() => view === 'landing' ? setView('auth') : setView('landing')} 
              className="hover:text-primary transition-colors"
            >
              Admin
            </button>
          </div>
          <div className="text-[10px] font-medium tracking-widest">© 2024 Silvia Guz. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
