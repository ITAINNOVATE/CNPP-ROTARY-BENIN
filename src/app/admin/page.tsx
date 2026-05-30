import styles from "./admin.module.css";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminDashboard() {
  const { count: videoCount } = await supabase.from('videos').select('*', { count: 'exact', head: true });
  const { count: campaignCount } = await supabase.from('campaigns').select('*', { count: 'exact', head: true });
  const { count: partnerCount } = await supabase.from('partners').select('*', { count: 'exact', head: true });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Vue d'ensemble</h1>
        <p>Bienvenue sur le tableau de bord d'administration.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Vidéos publiées</h3>
          <p className={styles.statNumber}>{videoCount || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Campagnes actives</h3>
          <p className={styles.statNumber}>{campaignCount || 0}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Partenaires</h3>
          <p className={styles.statNumber}>{partnerCount || 0}</p>
        </div>
      </div>
    </div>
  );
}
