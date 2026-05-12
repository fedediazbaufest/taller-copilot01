import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('access_token'));

  const saveTokens = useCallback((accessToken, refreshToken) => {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
    setToken(accessToken);
  }, []);

  const clearTokens = useCallback(() => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, saveTokens, clearTokens }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
