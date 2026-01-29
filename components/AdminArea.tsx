
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { LogOut, Save, Layout, Link as LinkIcon, Image as ImageIcon, CreditCard, MessageSquare } from 'lucide-react';
import { SiteContent } from '../App';

interface AdminAreaProps {
  content: SiteContent;
  onUpdate: (content: SiteContent) => void;
  onLogout: () => void;
}

export const AdminArea: React.FC<AdminAreaProps> = ({ content, onUpdate, onLogout }) => {
  const [form, setForm] = useState<SiteContent>(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(form);
      setIsSaving(false);
      alert('Alterações salvas com sucesso!');
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Layout className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg">Painel de Edição</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-all"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button 
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-600 flex items-center gap-2 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-8 pb-20">
        <div className="grid gap-8">
          {/* Seção Principal */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Layout className="text-blue-600" /> Cabeçalho e Hero
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Headline (Título Principal)</label>
                <input 
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sub-headline (Descrição)</label>
                <textarea 
                  name="subheadline"
                  value={form.subheadline}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </section>

          {/* Seção Especialista */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="text-blue-600" /> Especialista
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nome Completo</label>
                <input 
                  name="specialistName"
                  value={form.specialistName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">URL da Imagem</label>
                <input 
                  name="specialistImageUrl"
                  value={form.specialistImageUrl}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bio / Descrição Curta</label>
                <textarea 
                  name="specialistBio"
                  value={form.specialistBio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </section>

          {/* Links e Preços */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-blue-600" /> Links e Oferta
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Link do Checkout (Eduzz/Hotmart)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    name="courseLink"
                    value={form.courseLink}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Parcelas (ex: 12x)</label>
                <input 
                  name="priceInstallments"
                  value={form.priceInstallments}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Valor da Parcela</label>
                <input 
                  name="priceValue"
                  value={form.priceValue}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Valor à Vista</label>
                <input 
                  name="priceCash"
                  value={form.priceCash}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">WhatsApp Link</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    name="whatsappLink"
                    value={form.whatsappLink}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
