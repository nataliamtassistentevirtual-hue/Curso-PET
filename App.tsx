
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
  Target
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
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "website", "content");
        const docSnap = await getDoc(docRef);
        if (isMounted) {
          if (docSnap.exists()) setContent(docSnap.data() as SiteContent);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Erro ao carregar banco de dados:", error);
        setIsLoading(false);
      }
    };
    fetchContent();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleUpdateContent = async (newContent: SiteContent) => {
    try {
      const docRef = doc(db, "website", "content");
      await setDoc(docRef, newContent);
      setContent(newContent);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  if (view === 'auth') return <AuthScreen onBack={() => setView('landing')} onSuccess={() => setView('admin')} />;
  if (view === 'admin' && user) return <AdminArea content={content} onUpdate={handleUpdateContent} onLogout={() => setView('landing')} onViewSite={() => setView('landing')} />;

  const modules = [
    { 
      id: 1, 
      title: "Fundamentos da Neuroterapia de Ponta", 
      desc: "Entenda a engrenagem cerebral por trás do trauma.",
      topics: [
        "A neurobiologia do trauma e da memória traumática",
        "O Modelo PAI na prática clínica real",
        "Como o cérebro processa e reprocessa informações"
      ] 
    },
    { 
      id: 2, 
      title: "Arquitetura do Plano Estratégico", 
      desc: "Como planejar o sucesso do tratamento desde o dia 1.",
      topics: [
        "Conceituação de caso para pacientes complexos",
        "O 'nó górdio' do trauma: identificando o alvo mestre",
        "Estabilização e Fase 2 para casos de dissociação"
      ] 
    },
    { 
      id: 3, 
      title: "Manejo de Bloqueios e Impasses", 
      desc: "O que fazer quando o processamento trava.",
      topics: [
        "Entrelaçamentos cognitivos e somatossensoriais",
        "Estratégias para processamentos lentos ou circulares",
        "Trabalhando com defesas e resistências inconscientes"
      ] 
    },
    { 
      id: 4, 
      title: "Consolidação e Alta Terapêutica", 
      desc: "Fechando o ciclo com segurança e resiliência.",
      topics: [
        "Instalação de recursos positivos e futuros",
        "Critérios objetivos para encerramento de casos",
        "Manutenção de resultados a longo prazo"
      ] 
    }
  ];

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-beige"><div className="animate-pulse text-primary font-serif italic text-2xl">Carregando maestria...</div></div>;

  return (
    <div className="min-h-screen">
      {user && (
        <button onClick={() => setView('admin')} className="fixed bottom-8 right-8 z-50 bg-dark text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-primary transition-all">
          <Lock size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Editar Site</span>
        </button>
      )}

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <span className="font-serif text-2xl font-bold tracking-tighter italic text-primary">{content.specialistName}</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#metodo" className="text-sm font-semibold uppercase tracking-widest text-dark/70 hover:text-primary transition-colors">Método</a>
            <a href="#modulos" className="text-sm font-semibold uppercase tracking-widest text-dark/70 hover:text-primary transition-colors">Módulos</a>
            <CTAButton text="Inscrever-se" href={content.courseLink} className="!py-2.5 !px-6 !text-xs !bg-dark hover:!bg-primary" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-beige to-beige">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white/50 text-primary text-xs font-bold uppercase tracking-widest mb-12 animate-fade-in">
            <Sparkles size={14} /> Transforme sua Clínica em 2024
          </div>
          <h1 className="heading-serif mb-10 text-dark italic">
            {content.headline}
          </h1>
          <p className="text-xl md:text-2xl font-light text-primary-dark/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            {content.subheadline}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <CTAButton text="Quero Garantir minha Vaga" href={content.courseLink} className="btn-gold w-full md:w-auto" />
            <div className="flex items-center gap-3 text-slate-400 font-medium text-sm">
              <CheckCircle2 size={18} className="text-primary" /> Acesso imediato à plataforma
            </div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </section>

      {/* Diferenciais Section */}
      <section id="metodo" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">O Caminho da Maestria</span>
            <h2 className="font-serif text-5xl md:text-6xl italic">Por que este Plano?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Shield />, title: "Segurança Absoluta", text: "Trabalhe com traumas complexos sem o medo de desestabilizar o paciente." },
              { icon: <Zap />, title: "Precisão Cirúrgica", text: "Saiba exatamente qual alvo atacar para destravar o processamento." },
              { icon: <Brain />, title: "Base Científica", text: "Entendimento profundo da neurobiologia aplicada à cada fase do EMDR." }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-beige/30 border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-serif text-2xl mb-4 italic">{item.title}</h3>
                <p className="text-dark/60 leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-padding bg-beige relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-primary/10 border-8 border-white shadow-2xl">
              {content.specialistImageUrl ? (
                <img src={content.specialistImageUrl} alt={content.specialistName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><Users size={80} className="text-primary/20" /></div>
              )}
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-primary/10 max-w-[280px]">
              <div className="flex gap-2 text-primary mb-2"><Award /><Award /><Award /></div>
              <p className="font-bold text-dark text-lg leading-tight mb-2 italic">Senior Trainer EMDRIA</p>
              <p className="text-xs text-dark/50 uppercase tracking-widest font-bold">Referência internacional em Trauma</p>
            </div>
          </div>
          <div>
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-6 block">Sua Mentora</span>
            <h2 className="heading-serif mb-8 italic">{content.specialistName}</h2>
            <div className="space-y-6 text-xl text-dark/70 font-light leading-relaxed">
              <p>"{content.specialistBio}"</p>
              <p>Prepare-se para aprender com quem trouxe o EMDR para o Brasil e formou gerações de terapeutas de sucesso.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10">Psicóloga Clínica</span>
              <span className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10">Senior Trainer EMDR</span>
              <span className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10">Especialista em Neuroterapia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos Section */}
      <section id="modulos" className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Grade Curricular Premium</span>
            <h2 className="font-serif text-5xl italic">O Mapa da sua Evolução</h2>
          </div>
          
          <div className="space-y-6">
            {modules.map((m) => (
              <div key={m.id} className={`rounded-[2.5rem] border transition-all duration-500 ${openModule === m.id ? 'bg-beige/30 border-primary/20 shadow-xl' : 'bg-white border-primary/5 hover:border-primary/20'}`}>
                <button 
                  onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between p-10 text-left"
                >
                  <div className="flex items-center gap-8">
                    <span className="font-serif text-5xl text-primary/20 italic">0{m.id}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{m.title}</h3>
                      <p className="text-sm text-dark/40 font-medium uppercase tracking-widest">{m.desc}</p>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${openModule === m.id ? 'bg-primary text-white rotate-180' : 'bg-primary/5 text-primary'}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                
                {openModule === m.id && (
                  <div className="px-10 pb-12 pl-24 md:pl-32 animate-fade-in">
                    <div className="h-px bg-primary/10 mb-8 w-full"></div>
                    <ul className="grid md:grid-cols-2 gap-6">
                      {m.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-dark/70 font-light text-lg">
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

      {/* Final CTA */}
      <section className="section-padding bg-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl italic mb-10">Sua jornada rumo à maestria começa aqui.</h2>
          <p className="text-xl md:text-2xl font-light text-white/60 mb-16 italic">Últimas vagas com valor promocional para esta turma.</p>
          <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-sm mb-16">
            <p className="text-primary-light uppercase tracking-[0.3em] font-bold text-sm mb-6">Investimento</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-2xl font-light">12x de</span>
              <span className="text-6xl md:text-8xl font-serif font-bold italic tracking-tighter text-primary-light">R$ {content.priceValue}</span>
            </div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">ou R$ {content.priceCash} à vista</p>
          </div>
          <CTAButton text="Garantir meu Acesso Master" href={content.courseLink} className="btn-gold !bg-primary-light hover:!bg-white hover:!text-dark w-full md:w-auto text-xl px-20" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#141211] text-white/50 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl font-bold text-white italic block mb-2">{content.specialistName}</span>
            <p className="text-xs uppercase tracking-[0.3em] font-bold">Maestria em Terapia de Trauma</p>
          </div>
          <div className="flex gap-12 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <button onClick={() => view === 'landing' ? setView('auth') : setView('landing')} className="hover:text-primary transition-colors">Admin</button>
          </div>
          <div className="text-xs font-medium">© 2024 Silvia Guz. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
