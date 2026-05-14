import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';

const certifications = [
  {
    exam: 'AZ-900',
    name: 'Azure Fundamentals',
    level: 'Principiante',
    description:
      'Demuestra conocimiento fundamental de conceptos de nube, servicios principales de Azure y características de gobernanza y administración.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
  },
  {
    exam: 'AZ-204',
    name: 'Azure Developer Associate',
    level: 'Intermedio',
    description:
      'Diseña, construye, prueba y mantiene soluciones en la nube como Azure Functions, aplicaciones web y opciones de almacenamiento en Azure.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-developer/',
  },
  {
    exam: 'AZ-104',
    name: 'Azure Administrator Associate',
    level: 'Intermedio',
    description:
      'Implementa, administra y monitorea la infraestructura de Azure, incluyendo redes virtuales, almacenamiento y máquinas virtuales.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/',
  },
  {
    exam: 'AZ-500',
    name: 'Azure Security Engineer Associate',
    level: 'Intermedio',
    description:
      'Implementa controles de seguridad, mantiene la postura de seguridad e identifica y remedia vulnerabilidades en entornos Azure.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-security-engineer/',
  },
  {
    exam: 'MS-721',
    name: 'M365: Collaboration Communications Systems Engineer',
    level: 'Intermedio',
    description:
      'Configura y administra características de voz de Microsoft Teams. Añadida como opción de certificación en el programa de socios de Microsoft en 2026.',
    url: 'https://learn.microsoft.com/credentials/certifications/m365-collaboration-communications-systems-engineer/',
  },
  {
    exam: 'AI-900',
    name: 'Azure AI Fundamentals',
    level: 'Principiante',
    description:
      'Conocimientos fundamentales de conceptos de Machine Learning e Inteligencia Artificial implementados en Microsoft Azure.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/',
  },
];

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

        <section className={styles.certsSection}>
          <div className={styles.certsSectionHeader}>
            <h2 className={styles.certsTitle}>Certificaciones Microsoft 2026</h2>
            <p className={styles.certsSubtitle}>
              Explora las últimas certificaciones de Microsoft para impulsar tu carrera profesional en tecnología cloud e inteligencia artificial.
            </p>
          </div>
          <div className={styles.certsGrid}>
            {certifications.map((cert) => (
              <a
                key={cert.exam}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certCard}
              >
                <div className={styles.certCardInner}>
                  <div className={styles.certHeader}>
                    <span className={styles.certExamBadge}>{cert.exam}</span>
                    <span className={styles.certLevel}>{cert.level}</span>
                  </div>
                  <h3 className={styles.certName}>{cert.name}</h3>
                  <p className={styles.certDescription}>{cert.description}</p>
                  <div className={styles.certFooter}>
                    <span className={styles.certLink}>Ver certificación →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
