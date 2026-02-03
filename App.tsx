
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Users,
  Brain,
  Zap,
  Lock,
  Award,
  Play
} from 'lucide-react';
import { CTAButton } from './components/CTAButton';
import { AuthScreen } from './components/AuthScreen';
import { AdminArea } from './components/AdminArea';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  headline: "Plano Estratégico em Terapia EMDR",
  subheadline: "Domine a prática clínica com a Senior Trainer Silvia Guz. Segurança e precisão neurobiológica para casos complexos.",
  courseLink: "https://chk.eduzz.com/R9JJGYBE9X",
  specialistName: "Silvia Guz",
  specialistBio: "Psicóloga, Senior Trainer EMDRIA e precursora da abordagem no Brasil. Referência internacional com foco em Neuroterapia e Trauma.",
  specialistImageUrl: "",
  priceInstallments: "12x",
  priceValue: "197",
  priceCash: "1.997,00",
  whatsappLink: ""
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do Firestore ao iniciar
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "website", "content");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContent(docSnap.data() as SiteContent);
        } else {
          // Se não existir no Firebase, tenta carregar do localStorage ou usa o default
          const saved = localStorage.getItem('site_content');
          if (saved) setContent(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Erro ao carregar do Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && view === 'auth') {
        setView('admin');
      }
    });
    return unsubscribe;
  }, [view]);

  const handleUpdateContent = async (newContent: SiteContent) => {
    try {
      const docRef = doc(db, "website", "content");
      await setDoc(docRef, newContent);
      setContent(newContent);
      localStorage.setItem('site_content', JSON.stringify(newContent));
      return true;
    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
      throw error;
    }
  };

  if (view === 'auth') {
    return <AuthScreen onBack={() => setView('landing')} onSuccess={() => setView('admin')} />;
  }

  if (view === 'admin' && user) {
    return (
      <AdminArea 
        content={content} 
        onUpdate={handleUpdateContent} 
        onLogout={() => setView('landing')} 
        onViewSite={() => setView('landing')}
      />
    );
  }

  const modules = [
    {
      id: 1,
      title: "Fundamentos da Neuroterapia",
      topics: ["Base neurobiológica do trauma", "Modelo PAI em profundidade", "A neurociência do reprocessamento"]
    },
    {
      id: 2,
      title: "Fases 1 e 2: Planejamento Estratégico",
      topics: ["Conceituação de caso complexo", "Organização da avalanche de traumas", "Identificação de nós críticos"]
    },
    {
      id: 3,
      title: "Manejo de Bloqueios no Processamento",
      topics: ["Estratégias para processamentos lentos", "Entrelaçamentos cognitivos", "Uso estratégico de estimulação bilateral"]
    },
    {
      id: 4,
      title: "Integração e Finalização de Casos",
      topics: ["Critérios para alta", "Instalação de recursos futuros", "Consolidação de resultados"]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center">
        <div className="animate-pulse text-[#8B735B] font-serif text-xl italic">Carregando conteúdo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#2D2A28] font-sans selection:bg-[#8B735B] selection:text-white">
      {/* Botão Flutuante Admin se logado */}
      {user && (
        <button 
          onClick={() => setView('admin')}
          className="fixed bottom-8 right-8 bg-[#8B735B] text-white p-4 rounded-full shadow-2xl z-[100] hover:scale-110 transition-transform flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          <Lock className="w-4 h-4" /> Painel Admin
        </button>
      )}

      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#FDFCF9]/90 backdrop-blur-md z-50 border-b border-[#8B735B]/10">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
             <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tighter text-[#2D2A28]">{content.specialistName}</span>
          </div>
          <div className="flex items-center gap-8">
            <CTAButton text="Acessar Conteúdo" href={content.courseLink} className="py-2.5 px-6 text-base !bg-transparent !border !border-[#8B735B] !text-[#8B735B] hover:!bg-[#8B735B] hover:!text-white !shadow-none !rounded-full" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#8B735B]/5 rounded-full blur-[150px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block border border-[#8B735B]/20 text-[#8B735B] text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-10">
            Formação 100% Online
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-[#2D2A28] mb-10 leading-[1.15] font-['Playfair_Display'] italic">
            {content.headline}
          </h1>
          <p className="text-[#8B735B] text-xl md:text-3xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            {content.subheadline}
          </p>
          <div className="flex flex-col items-center gap-6">
            <CTAButton text="Adquirir Acesso ao Curso" href={content.courseLink} className="w-full md:w-auto px-16 py-6 text-xl" />
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400 font-medium">Plataforma de ensino exclusiva</span>
          </div>
        </div>
      </section>

      {/* Specialist Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#FDFCF9] border border-[#8B735B]/10">
                {content.specialistImageUrl ? (
                   <img src={content.specialistImageUrl} alt={content.specialistName} className="w-full h-full object-cover grayscale-[20%]" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-[#8B735B]/5">
                      <Users className="w-20 h-20 text-[#8B735B]/20" />
                   </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B735B] rounded-full flex items-center justify-center text-white p-4 text-center text-sm font-bold uppercase tracking-widest leading-tight border-8 border-white shadow-lg">
                Referência em EMDR no Brasil
              </div>
            </div>
            <div>
              <span className="text-[#8B735B] text-sm font-bold uppercase tracking-[0.3em] mb-6 block">Sobre a Especialista</span>
              <h2 className="text-4xl font-bold text-[#2D2A28] mb-8 font-['Playfair_Display']">{content.specialistName}</h2>
              <p className="text-[#2D2A28]/80 text-2xl leading-relaxed mb-10 font-light italic">
                {content.specialistBio}
              </p>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-lg text-[#8B735B]">
                    <Award className="w-6 h-6 opacity-60" />
                    <span>EMDRIA Accredited Senior Trainer</span>
                 </div>
                 <div className="flex items-center gap-4 text-lg text-[#8B735B]">
                    <Shield className="w-6 h-6 opacity-60" />
                    <span>Especialista em Traumas Complexos</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-[#FDFCF9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[#8B735B] text-base font-bold uppercase tracking-[0.3em] mb-6 block">Metodologia</span>
            <h2 className="text-4xl font-bold font-['Playfair_Display'] mb-8">O que você vai dominar</h2>
            <div className="w-16 h-[1px] bg-[#8B735B]/30 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Shield />, title: "Segurança Clínica", desc: "Aprenda protocolos precisos para estabilização de pacientes e manejo de crises durante o processamento." },
              { icon: <Zap />, title: "Neurobiologia", desc: "Entenda exatamente o que acontece no cérebro durante o reprocessamento e use isso a seu favor." },
              { icon: <Users />, title: "Traumas Complexos", desc: "Estratégias específicas para casos de dissociação e traumas de desenvolvimento que não cedem ao protocolo básico." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                 <div className="w-20 h-20 bg-white border border-[#8B735B]/10 rounded-full flex items-center justify-center mx-auto mb-10 transition-all duration-500 group-hover:bg-[#8B735B] group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-[#8B735B]/20">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "text-[#8B735B] w-8 h-8 group-hover:text-white transition-colors" })}
                 </div>
                 <h3 className="text-2xl font-bold mb-6 font-['Playfair_Display']">{item.title}</h3>
                 <p className="text-[#2D2A28]/60 text-xl leading-[1.8] font-light">
                   {item.desc}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-md">
              <span className="text-[#8B735B] text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Grade Curricular</span>
              <h2 className="text-4xl font-bold font-['Playfair_Display']">Estrutura do Aprendizado</h2>
            </div>
            <p className="text-slate-400 text-lg font-light italic">Conteúdo distribuído em etapas estratégicas</p>
          </div>
          
          <div className="space-y-6">
            {modules.map((m) => (
              <div key={m.id} className="border-b border-[#8B735B]/10">
                <button 
                  onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between py-10 text-left group"
                >
                  <div className="flex items-center gap-10">
                    <span className="text-[#8B735B]/40 font-['Playfair_Display'] text-3xl italic">0{m.id}</span>
                    <span className="font-bold text-[#2D2A28] text-2xl group-hover:text-[#8B735B] transition-colors">{m.title}</span>
                  </div>
                  <div className={`w-12 h-12 rounded-full border border-[#8B735B]/10 flex items-center justify-center transition-all ${openModule === m.id ? 'bg-[#8B735B] border-transparent' : ''}`}>
                    {openModule === m.id ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-[#8B735B]" />}
                  </div>
                </button>
                {openModule === m.id && (
                  <div className="pb-10 pl-20 pr-10">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {m.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-lg text-[#2D2A28]/70 font-light">
                          <div className="w-1.5 h-1.5 bg-[#8B735B] rounded-full"></div>
                          {t}
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

      {/* Checkout Section */}
      <section className="py-32 bg-[#FDFCF9]">
        <div className="max-w-lg mx-auto px-6">
           <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-[#8B735B]/5 border border-[#8B735B]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B735B]/5 rounded-bl-[4rem]"></div>
              
              <span className="text-[#8B735B] text-sm font-bold uppercase tracking-[0.4em] mb-12 block">Investimento no seu Futuro</span>
              
              <div className="mb-14">
                 <p className="text-slate-300 text-lg line-through mb-4">De R$ 2.497,00</p>
                 <div className="flex items-baseline justify-center gap-2">
                    <span className="text-[#2D2A28] font-light text-2xl">{content.priceInstallments} de</span>
                    <span className="text-[#2D2A28] font-bold text-6xl font-['Playfair_Display'] italic">R$ {content.priceValue}</span>
                 </div>
                 <p className="text-[#8B735B] text-base mt-6 uppercase tracking-widest font-bold">À vista por R$ {content.priceCash}</p>
              </div>
              
              <ul className="text-left space-y-6 mb-16 border-t border-slate-50 pt-10">
                 {[
                   "Acesso imediato à plataforma de alunos",
                   "Materiais complementares exclusivos",
                   "Certificado de Conclusão Digital",
                   "Suporte via área de membros"
                 ].map((feature) => (
                   <li key={feature} className="flex items-center gap-4 text-[#2D2A28]/60 text-lg font-light">
                     <Check className="w-6 h-6 text-[#8B735B]" />
                     {feature}
                   </li>
                 ))}
              </ul>

              <CTAButton text="Garantir meu Acesso" href={content.courseLink} className="w-full !rounded-2xl py-6 text-xl" />
              
              <div className="mt-12 flex items-center justify-center gap-3 text-sm text-slate-300 font-bold uppercase tracking-widest">
                 <Lock className="w-4 h-4" /> Transação Criptografada & Segura
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2A28] text-[#FDFCF9]/90 py-24 px-6 border-t border-[#8B735B]/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <span className="font-['Playfair_Display'] text-3xl font-bold tracking-tighter mb-8 block">{content.specialistName}</span>
              <p className="text-[#FDFCF9]/50 text-lg max-w-sm leading-relaxed font-light italic">
                Aprimorando a excelência clínica e transformando o atendimento de traumas através da ciência.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-10">
              <div className="flex gap-12 text-sm uppercase tracking-[0.3em] font-bold text-[#FDFCF9]/40">
                 <a href="#" className="hover:text-[#8B735B] transition-colors">Termos</a>
                 <a href="#" className="hover:text-[#8B735B] transition-colors">Privacidade</a>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                  <Play className="w-4 h-4 fill-[#FDFCF9]/30 text-transparent" />
                </div>
                <div className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                  <Brain className="w-5 h-5 opacity-30" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[#FDFCF9]/20 text-sm uppercase tracking-[0.2em]">
              © 2024 {content.specialistName}.
            </p>
            
            <button 
              onClick={() => user ? setView('admin') : setView('auth')}
              className="text-sm uppercase tracking-[0.4em] text-[#FDFCF9]/20 hover:text-[#8B735B] transition-colors font-bold"
            >
              Área Administrativa
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
