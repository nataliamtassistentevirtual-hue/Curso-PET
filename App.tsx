
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  MessageCircle,
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
  headline: "Plano Estratégico em Terapia EMDR",
  subheadline: "Domine a prática clínica com a Senior Trainer Silvia Guz. Segurança e precisão neurobiológica para casos complexos.",
  courseLink: "https://chk.eduzz.com/R9JJGYBE9X",
  specialistName: "Silvia Guz",
  specialistBio: "Psicóloga, Senior Trainer EMDRIA e precursora da abordagem no Brasil. Referência internacional com foco em Neuroterapia e Trauma.",
  specialistImageUrl: "",
  priceInstallments: "12x",
  priceValue: "197",
  priceCash: "1.997,00",
  whatsappLink: "https://wa.me/seu-numero"
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);
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

  if (view === 'auth') {
    return <AuthScreen onBack={() => setView('landing')} onSuccess={() => setView('admin')} />;
  }

  if (view === 'admin' && user) {
    return <AdminArea content={content} onUpdate={handleUpdateContent} onLogout={() => setView('landing')} />;
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#1d4ed8] rounded-lg flex items-center justify-center">
                <Brain className="text-white w-5 h-5" />
             </div>
             <span className="font-bold text-slate-800 tracking-tight">{content.specialistName.replace(/\s/g, '')}</span>
          </div>
          <CTAButton text="Matricule-se" href={content.courseLink} className="py-2 px-6 text-sm !bg-transparent !border !border-blue-600 !text-blue-600 hover:!bg-blue-50 !shadow-none" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            Inscrições Abertas
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight font-['Inter']">
            {content.headline}
          </h1>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
          <CTAButton text="Garantir minha vaga" href={content.courseLink} className="w-full md:w-auto px-12 py-5" />
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
             <Check className="w-4 h-4 text-green-500" />
             <span>CERTIFICADO RECONHECIDO</span>
          </div>
        </div>
      </section>

      {/* Specialist Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6 relative inline-block">
             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto bg-slate-100 flex items-center justify-center">
                {content.specialistImageUrl ? (
                   <img src={content.specialistImageUrl} alt={content.specialistName} className="w-full h-full object-cover" />
                ) : (
                   <Users className="w-12 h-12 text-slate-300" />
                )}
             </div>
          </div>
          <span className="block text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">Especialista</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.specialistName}</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed mb-8">
            {content.specialistBio}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
             <span className="bg-slate-50 text-slate-600 text-xs font-medium px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                <Award className="w-3 h-3" /> EMDRIA Trainer
             </span>
             <span className="bg-slate-50 text-slate-600 text-xs font-medium px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Trauma Specialist
             </span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">O que você vai dominar</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              Um roteiro prático e estruturado para levar sua clínica ao próximo nível de excelência técnica.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <Shield />, title: "Segurança Clínica", desc: "Aprenda protocolos precisos para estabilização de pacientes e manejo de crises durante o processamento." },
              { icon: <Zap />, title: "Neurobiologia", desc: "Entenda exatamente o que acontece no cérebro durante o reprocessamento e use isso a seu favor." },
              { icon: <Users />, title: "Traumas Complexos", desc: "Estratégias específicas para casos de dissociação e traumas de desenvolvimento que não cedem ao protocolo básico." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-start group hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "text-blue-600 w-6 h-6 group-hover:text-white" })}
                 </div>
                 <div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Conteúdo do Curso</h2>
          <div className="space-y-4">
            {modules.map((m) => (
              <div key={m.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenModule(openModule === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-blue-600 font-bold text-sm">0{m.id}</span>
                    <span className="font-bold text-slate-800 text-sm md:text-base text-left">{m.title}</span>
                  </div>
                  {openModule === m.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {openModule === m.id && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <ul className="space-y-3">
                      {m.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
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

      {/* Target Audience Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#eff6ff] rounded-[32px] p-12 text-center border border-blue-100">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">Para quem é este curso?</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Psicólogos e Psiquiatras com formação concluída em EMDR (Nível 1 ou 2) que buscam aprofundamento técnico e maior segurança em casos de alta complexidade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Psicólogos", "Psiquiatras", "Terapeutas EMDR"].map((item) => (
                <div key={item} className="bg-white px-6 py-3 rounded-full flex items-center gap-2 shadow-sm border border-blue-50">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-lg mx-auto px-6">
           <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100">
              <div className="bg-blue-600 text-white text-center py-3 text-[10px] font-bold uppercase tracking-widest">
                 Oferta Exclusiva
              </div>
              <div className="p-10 text-center">
                 <p className="text-slate-400 text-xs line-through mb-2">De R$ 2.497,00</p>
                 <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-slate-900 font-bold text-lg">{content.priceInstallments}</span>
                    <span className="text-blue-600 font-bold text-5xl">R$ {content.priceValue}</span>
                    <span className="text-slate-900 font-bold text-lg">,00</span>
                 </div>
                 <p className="text-slate-400 text-xs mb-10">ou R$ {content.priceCash} à vista</p>
                 
                 <ul className="text-left space-y-4 mb-10">
                    {[
                      "Acesso vitalício às aulas",
                      "Material didático em PDF",
                      "Certificado assinado por Silvia Guz",
                      "Suporte direto para dúvidas"
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-slate-600 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                 </ul>

                 <CTAButton text="Inscrever-se Agora" href={content.courseLink} className="w-full !rounded-xl" />
                 
                 <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex gap-2 opacity-30">
                       <Play className="w-5 h-5" /> 
                       <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                       <Lock className="w-3 h-3" /> Pagamento 100% Seguro
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white w-5 h-5" />
             </div>
             <span className="font-bold text-xl tracking-tight">{content.specialistName}</span>
          </div>
          <p className="text-slate-400 text-sm mb-12 max-w-sm mx-auto">
            Elevando o padrão da terapia EMDR no Brasil através da ciência e experiência clínica.
          </p>
          
          <div className="flex justify-center gap-8 mb-12 text-slate-400 text-xs font-bold uppercase tracking-widest">
             <a href="#" className="hover:text-white">Termos</a>
             <a href="#" className="hover:text-white">Privacidade</a>
             <a href="#" className="hover:text-white">Suporte</a>
          </div>
          
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">
            © 2024 {content.specialistName}. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={content.whatsappLink}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
           Dúvidas? Fale conosco
        </span>
      </a>

      {/* Discrete Login Button in Footer */}
      <div className="bg-[#1e293b] pb-8 text-center border-t border-slate-800/50">
         <button 
           onClick={() => user ? setView('admin') : setView('auth')}
           className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-blue-400 transition-colors"
         >
           Painel de Administração
         </button>
      </div>
    </div>
  );
};

export default App;
