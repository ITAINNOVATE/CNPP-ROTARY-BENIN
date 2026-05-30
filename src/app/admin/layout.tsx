import "../globals.css";
import styles from "./admin.module.css";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Administration</h2>
          <p>Vacciner pour la Vie</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Tableau de bord</Link>
          <Link href="/admin/videos" className={styles.navLink}>Vidéos</Link>
          <Link href="/admin/campagnes" className={styles.navLink}>Campagnes</Link>
          <Link href="/admin/ressources" className={styles.navLink}>Ressources</Link>
          <Link href="/admin/partenaires" className={styles.navLink}>Partenaires</Link>
          <button className={styles.btnDanger}>Déconnexion</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
