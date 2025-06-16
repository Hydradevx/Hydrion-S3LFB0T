import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../services/tokenService';
import { KeyRound, Sparkles } from 'lucide-react';
import hydrionLogo from '../assets/hydrion.jpg';

const AuthPage: React.FC = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!token.trim()) {
      setError('Discord token is required');
      setLoading(false);
      return;
    }

    try {
      if (token.length < 50 || token.length > 130) {
        throw new Error('Invalid token format');
      }

      await saveToken(token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid or malformed token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] to-[#0f1440] text-white flex items-center justify-center font-sans px-4">
      <div className="w-full max-w-md bg-[#0a0f2c] rounded-2xl shadow-[0_0_40px_rgba(0,204,255,0.3)] border border-blue-400/30 p-8 relative">
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-[#0a0f2c] rounded-full border-4 border-blue-500/40 shadow-[0_0_25px_rgba(0,204,255,0.5)] p-2">
          <img
            src={hydrionLogo}
            alt="Hydrion Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mt-16 text-blue-400 drop-shadow-[0_0_12px_rgba(0,204,255,0.8)] flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
          Hydrion Selfbot
        </h2>

        <p className="text-center text-blue-100 text-sm mt-1 mb-6">
          Paste your Discord token to continue
        </p>

        <div className="flex items-center gap-2 bg-[#0f1440] border border-blue-500/30 rounded-lg px-4 py-3 mb-4 shadow-inner focus-within:shadow-[0_0_15px_rgba(0,204,255,0.4)] transition">
          <KeyRound className="text-blue-400" />
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={2}
            placeholder="Discord token"
            className="flex-1 bg-transparent text-blue-100 placeholder-blue-300 outline-none resize-none"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-[#0a0f2c] font-semibold rounded-lg shadow-[0_0_20px_rgba(0,204,255,0.4)] hover:shadow-[0_0_25px_rgba(0,204,255,0.6)] transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
