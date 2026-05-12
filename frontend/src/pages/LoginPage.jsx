import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { saveTokens } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      saveTokens(data.access_token, data.refresh_token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.cardShell}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Compliance Platform</h1>
            <p className={styles.subtitle}>Inicia sesión para continuar</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                className={styles.input}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
