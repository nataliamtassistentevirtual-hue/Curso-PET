
import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { CTAButton } from './CTAButton';

interface AuthScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBack, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor, digite seu e-mail primeiro.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-mail de recuperação enviado com sucesso!');
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
          className="flex items-center gap-2 text-[#4B3F3A] mb-8 hover:translate-x-[-4px] transition-transform font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para o site
        </button>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-[#4B3F3A]/5 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#4B3F3A] mb-2">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-500">Acesse sua área exclusiva de estudos.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#D97706] focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#D97706] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#4B3F3A] text-white font-bold py-4 rounded-2xl hover:bg-[#2D2A28] transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Entrar' : 'Cadastrar')}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            {isLogin && (
              <button 
                onClick={handleResetPassword}
                className="text-sm text-gray-500 hover:text-[#D97706] transition-colors"
              >
                Esqueceu sua senha?
              </button>
            )}
            
            <p className="text-sm text-gray-500">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-[#4B3F3A] hover:text-[#D97706] transition-colors"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
