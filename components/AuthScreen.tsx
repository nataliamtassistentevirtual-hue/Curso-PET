
import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBack, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      setError('Credenciais inválidas ou erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Digite seu e-mail administrativo.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-mail de recuperação enviado.');
    } catch (err: any) {
      setError('Erro ao enviar e-mail de recuperação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#8B735B] mb-8 hover:translate-x-[-4px] transition-transform font-medium text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o site
        </button>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-[#8B735B]/5 border border-[#8B735B]/5">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#2D2A28] mb-2 font-['Playfair_Display']">
              Acesso Administrativo
            </h2>
            <p className="text-gray-400 text-base italic">Área restrita para edição do conteúdo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">E-mail Admin</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-1 focus:ring-[#8B735B] text-base"
                  placeholder="admin@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#8B735B]/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-1 focus:ring-[#8B735B] text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center">{message}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#2D2A28] text-white font-bold py-4 rounded-2xl hover:bg-[#8B735B] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar no Painel'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={handleResetPassword}
              className="text-xs text-gray-400 hover:text-[#8B735B] transition-colors uppercase tracking-widest"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
