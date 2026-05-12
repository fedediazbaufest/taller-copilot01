import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { clearTokens } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    clearTokens();
    navigate('/login');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>Compliance Platform</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.cardShell}>
          <div className={styles.card}>
            <h1 className={styles.title}>¡Bienvenido!</h1>
            <p className={styles.body}>
              Has iniciado sesión correctamente en la plataforma. Tu sesión está activa y protegida con JWT.
            </p>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Sesión activa
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
