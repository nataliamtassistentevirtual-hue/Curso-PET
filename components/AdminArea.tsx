
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Save, Layout, Link as LinkIcon, Eye, CreditCard } from 'lucide-react';
import { SiteContent } from '../App';

interface AdminAreaProps {
  content: SiteContent;
  onUpdate: (content: SiteContent) => Promise<boolean>;
  onLogout: () => void;
  onViewSite: () => void;
}

export const AdminArea: React.FC<AdminAreaProps> = ({ content, onUpdate, onLogout, onViewSite }) => {
  const [form, setForm] = useState<SiteContent>(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(form);
      alert('Alterações salvas no Firebase com sucesso!');
    } catch (error) {
      alert('Erro ao salvar no banco de dados. Verifique as permissões.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#2D2A28]">
      <nav className="bg-white border-b border-[#8B735B]/10 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#8B735B] rounded-lg flex items-center justify-center">
            <Layout className="text-white w-5 h-5" />
          </div>
          <span className="font-['Playfair_Display'] font-bold text-xl">Painel de Edição</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onViewSite}
            className="text-[#8B735B] hover:bg-[#8B735B]/5 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-all"
          >
            <Eye className="w-4 h-4" /> Ver Site
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#8B735B] hover:bg-[#76624D] text-white px-8 py-2.5 rounded-full font-bold flex items-center gap-2 text-sm uppercase tracking-widest transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Salvando...' : 'Salvar Site'}
          </button>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-600 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors font-bold px-4"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-12 pb-32">
        <div className="grid gap-12">
          {/* Seção Principal */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#8B735B]/5">
            <h2 className="text-base font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-[#8B735B]">
               Chamada Principal
            </h2>
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Título Principal (Headline)</label>
                <input 
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#8B735B]/20 font-['Playfair_Display'] text-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Texto de Apoio (Sub-headline)</label>
                <textarea 
                  name="subheadline"
                  value={form.subheadline}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#8B735B]/20 font-light text-base"
                />
              </div>
            </div>
          </section>

          {/* Seção Especialista */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#8B735B]/5">
            <h2 className="text-base font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-[#8B735B]">
               Sobre a Especialista
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Nome</label>
                <input 
                  name="specialistName"
                  value={form.specialistName}
                  onChange={handleChange}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Link da Foto (URL)</label>
                <input 
                  name="specialistImageUrl"
                  value={form.specialistImageUrl}
                  onChange={handleChange}
                  placeholder="Link da imagem hospedada externa"
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Mini Bio</label>
                <textarea 
                  name="specialistBio"
                  value={form.specialistBio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none font-light text-base"
                />
              </div>
            </div>
          </section>

          {/* Links e Preços */}
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#8B735B]/5">
            <h2 className="text-base font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-[#8B735B]">
               Venda e Acesso Externo
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Link da Plataforma de Pagamento</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-4.5 w-4 h-4 text-slate-300" />
                  <input 
                    name="courseLink"
                    value={form.courseLink}
                    onChange={handleChange}
                    className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Parcelamento</label>
                <input 
                  name="priceInstallments"
                  value={form.priceInstallments}
                  onChange={handleChange}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Valor da Parcela</label>
                <input 
                  name="priceValue"
                  value={form.priceValue}
                  onChange={handleChange}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Valor Total</label>
                <input 
                  name="priceCash"
                  value={form.priceCash}
                  onChange={handleChange}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl p-4 outline-none text-base"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
