import styles from "./page.module.css";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import AnimatedStats from "@/components/AnimatedStats";
import InteractiveMap from "@/components/InteractiveMap";
import VideoCard from "@/components/VideoCard";
import VaccineCalculator from '../components/VaccineCalculator';

export default async function Home() {
  // Fetch real data from Supabase (with fallback for demo purposes)
  const { data: fetchedVideos } = await supabase.from('videos').select('*').order('created_at', { ascending: false }).limit(3);
  const { data: fetchedCampaigns } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false }).limit(2);

  // Les capsules locales prioritaires
  const localVideos = [
    { id: 'local-1', title: "PP Olga KATHEMA ABALLO", description: "Vice Présidente Bénin de la Commission Polio Plus du district 9103.", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-1.mp4", thumbnailTime: 45 },
    { id: 'local-2', title: "Mohamed BONI SENI", description: "Président du Comité de Liaison Inter Clubs du Bénin (CLIC).", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-2.mp4", thumbnailTime: 30 },
    { id: 'local-3', title: "Kémal-Dine MAMA", description: "Président du club Rotaract de Cotonou Rive Droite", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-3.mp4" },
    { id: 'local-4', title: "INOUSSA Moumouna", description: "Agent de santé, Aide PEV (Programme Élargi de Vaccination) CS KARIMAMA", duration: "", category: "Témoignages", language: "Dendi", video_url: "/capsule-4.mp4" },
    { id: 'local-5', title: "LAIMA Aliou", description: "Facilitateur à PIED ONG", duration: "", category: "Témoignages", language: "PEULH", video_url: "/capsule-5.mp4" },
    { id: 'local-6', title: "OUANDO Ameline", description: "Volontaire communautaire et Mère de famille", duration: "", category: "Témoignages", language: "WAMA", video_url: "/capsule-6.mp4" },
    { id: 'local-7', title: "IBRAHIM Djihadatou", description: "Volontaire ANPE", duration: "", category: "Témoignages", language: "KOTOKOLI", video_url: "/capsule-7.mp4" },
    { id: 'local-8', title: "Maimounatou AROUNA", description: "Jeune femme Leader / Commune de DJOUGOU", duration: "", category: "Témoignages", language: "Dendi", video_url: "/capsule-8.mp4" },
    { id: 'local-9', title: "KOTO Zibo", description: "Relais communautaire / Commune de Karimama", duration: "", category: "Témoignages", language: "DENDI", video_url: "/capsule-9.mp4" },
    { id: 'local-10', title: "Djamaloul-Dine ALIDOU", description: "Membre du Rotary Club de Natitingou Tanguiéta", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-10.mp4" }
  ];

  const displayVideos = fetchedVideos && fetchedVideos.length > 0 
    ? [...localVideos, ...fetchedVideos] 
    : localVideos;

  const displayCampaigns = fetchedCampaigns && fetchedCampaigns.length > 0 ? fetchedCampaigns : [
    {
      id: 1,
      title: "Communiqué de Lancement de l'initiative \"Vacciner pour la vie\" : campagne digitale de sensibilisation",
      date: "Mai 2026",
      image_url: "/annonce-vacciner-pour-la-vie.jpg",
      description: `La Commission Nationale Polio Plus du Rotary Bénin, avec l’engagement des Rotary clubs et clubs Rotaract du Bénin, lance l’initiative « Vacciner pour la vie », une caravane digitale de sensibilisation communautaire pour promouvoir la vaccination et renforcer la confiance des populations dans les services de santé.
À travers des capsules vidéo, des témoignages communautaires, des messages d’experts et des contenus en langues locales, cette campagne vise à rapprocher l’information fiable des familles et des communautés.

Objectif :
Informer, rassurer et mobiliser autour de l’importance de la vaccination pour la protection des enfants et des communautés.

Avec l’appui des partenaires de l’Initiative mondiale pour l’éradication de la poliomyélite (IMEP), cette action s’inscrit dans une dynamique de sensibilisation moderne, inclusive et de proximité.

Suivez la campagne et partagez les messages autour de vous.

#VaccinerPourLaVie #EndPolioNow #RotaryBenin`
    },
    {
      id: 2,
      title: "2ᵉ TOUR DE LA CAMPAGNE LOCALE DE VACCINATION CONTRE LA POLIOMYÉLITE",
      date: "Juin 2026",
      image_url: "/annonce-date-1.jpg",
      description: `Du 12 au 15 juin 2026, les équipes de vaccination passeront dans les ménages des départements de l’Alibori, l’Atacora, le Borgou, les Collines, la Donga et le Plateau pour administrer gratuitement le vaccin contre la poliomyélite aux enfants de 0 à 59 mois.

Chaque enfant compte.
Le vaccin est sûr, efficace et gratuit.
La vaccination protège nos enfants contre la paralysie et contribue à préserver la santé de nos communautés.

Parents, leaders communautaires, responsables religieux, enseignants et élus locaux, mobilisons-nous pour que chaque enfant soit effectivement vacciné.

Ensemble, poursuivons nos efforts pour un avenir sans polio.

#VaccinerPourLaVie #EndPolioNow #RotaryBenin #PolioPlus`
    }
  ];

  return (
    <>
      <div className={styles.topTicker}>
        <div className={styles.tickerContent}>
          <span>📢 Campagne locale de vaccination contre la Poliomyélite du 12 au 15 Juin 2026 (Alibori, Atacora, Borgou, Collines, Donga et Plateau)</span>
          <span>&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;</span>
          <span>📢 Campagne locale de vaccination contre la Poliomyélite du 12 au 15 Juin 2026 (Alibori, Atacora, Borgou, Collines, Donga et Plateau)</span>
        </div>
      </div>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Image 
            src="/logo-commission-polio.png" 
            alt="Logo Commission Nationale Polio Plus" 
            width={400} 
            height={120} 
            className={styles.logo}
            style={{ objectFit: 'contain' }}
            priority={true}
          />
          <nav className={styles.desktopNav}>
            <a href="#accueil" className={styles.navLink}>Accueil</a>
            <a href="#capsules" className={styles.navLink}>NOS CAPSULES</a>
            <a href="#rumeurs" className={styles.navLink}>RUMEUR/VERITE</a>
            <a href="#ressources" className={styles.navLink}>IMPACT/GALERIE</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
          <div className="social-nav" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '20px' }}>
            <a href="#" className="social-link" title="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-white)"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
            </a>
            <a href="#" className="social-link" title="Twitter / X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-white)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="social-link" title="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-white)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="social-link" title="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-white)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* HERO SECTION */}
        <section id="accueil" className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>VACCINER POUR LA VIE</h1>
          <p className={styles.heroSubtitle}>
            Informer, rassurer et protéger grâce à une information fiable sur la vaccination.
          </p>
          <div className={styles.heroButtons}>
            <a href="#capsules" className={styles.btnPrimary}>
              Regarder les capsules vidéo
            </a>
            <a href="#campagnes" className={styles.btnSecondary}>
              Découvrir la campagne
            </a>
          </div>
        </div>
      </section>

      {/* MOT DU PRÉSIDENT */}
      <section className={`section ${styles.presidentSection}`}>
        <div className={`container ${styles.presidentContainer}`}>
          <div className={styles.presidentImageWrapper}>
            <Image 
              src="/DOROTHE GOUNON.png" 
              alt="PDG Dorothé GOUNON, Président de la Commission Nationale Polio Plus du Bénin"
              width={400}
              height={500}
              className={styles.presidentImage}
              priority
            />
            <div className={styles.presidentInfo}>
              <p className={styles.presidentName}>PDG Dorothé GOUNON</p>
              <p className={styles.presidentTitle}>Président de la Commission Nationale Polio Plus du Bénin</p>
            </div>
          </div>
          
          <div className={styles.presidentContent}>
            <h2 className={styles.sectionTitle}>Mot du Président de la Commission Nationale Polio Plus du Bénin</h2>
            <div className={styles.presidentMessage}>
              <p><strong>Chers visiteurs,</strong></p>
              <p>Bienvenue sur la plateforme « Vacciner pour la Vie », une initiative portée par la Commission Nationale Polio Plus du Rotary Bénin.</p>
              <p>Depuis plusieurs décennies, le Rotary International est engagé dans l'un des plus grands combats de santé publique de notre époque : l'éradication de la poliomyélite. Grâce à l'engagement des gouvernements, des partenaires techniques et financiers, des professionnels de santé et des communautés, le monde est aujourd'hui plus proche que jamais d'un avenir sans polio.</p>
              <p>Toutefois, les défis liés à la désinformation, aux rumeurs et à l'hésitation vaccinale nous rappellent que la sensibilisation demeure essentielle.</p>
              <p>À travers cette plateforme, nous souhaitons offrir à chaque citoyen un accès simple à des informations fiables, des témoignages inspirants et des contenus éducatifs permettant de mieux comprendre l'importance de la vaccination.</p>
              <p>Nous invitons chacun à devenir un ambassadeur de la santé, de la prévention et de la protection des enfants.</p>
              <p>Ensemble, continuons à bâtir des communautés mieux informées, mieux protégées et résolument tournées vers un avenir sans maladies évitables par la vaccination.</p>
              <p>Je vous remercie pour votre engagement.</p>
            </div>
            <button className={styles.btnPrimary}>
              Découvrir nos actions
            </button>
          </div>
        </div>
      </section>
      {/* CHIFFRES CLÉS (ANIMÉS) */}
      <AnimatedStats />
      {/* CAPSULES VIDÉO */}
      <section id="capsules" className={`section ${styles.videoSection}`}>
        <div className={`container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleCenter}>Nos Capsules de Sensibilisation</h2>
            <p className={styles.sectionSubtitle}>Découvrez nos messages vidéo classés par catégories pour mieux comprendre et prévenir la poliomyélite.</p>
          </div>
          
          <div className={styles.videoFilters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>Toutes</button>
            <button className={styles.filterBtn}>Institutionnels</button>
            <button className={styles.filterBtn}>Rotary</button>
            <button className={styles.filterBtn}>OMS / UNICEF</button>
            <button className={styles.filterBtn}>Témoignages</button>
          </div>

          <div className={styles.videoGrid}>
            {displayVideos.map((item: any) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.viewAllWrapper}>
            <button className={styles.btnPrimary}>Voir toutes les capsules</button>
          </div>
        </div>
      </section>

      {/* INFO OU RUMEUR */}
      <section id="rumeurs" className={`section ${styles.rumorSection}`}>
        <div className={`container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleCenter}>Info ou Rumeur ?</h2>
            <p className={styles.sectionSubtitle}>Démêlez le vrai du faux sur la vaccination.</p>
          </div>
          
          <div className={styles.rumorGrid}>
            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>Les vaccins sont dangereux.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>Les vaccins sont sûrs, efficaces et rigoureusement contrôlés par l'OMS.</p>
                </div>
              </div>
            </div>

            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>Mon enfant semble en bonne santé, il n'a pas besoin d'être vacciné.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>La vaccination protège avant l'apparition de la maladie et crée une immunité de groupe.</p>
                </div>
              </div>
            </div>

            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>La poliomyélite a disparu, le vaccin n'est plus utile aujourd'hui.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>Tant que le virus circule encore dans le monde, chaque enfant non vacciné est en danger. La vaccination reste indispensable.</p>
                </div>
              </div>
            </div>

            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>Plusieurs doses du même vaccin contre la polio peuvent affaiblir l'enfant.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>Au contraire, les doses supplémentaires renforcent l'immunité et assurent une protection complète à 100% contre le virus.</p>
                </div>
              </div>
            </div>

            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>Le vaccin contre la polio rendrait les enfants stériles à l'âge adulte.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>C'est totalement faux. Les vaccins protègent la santé sans aucun effet sur la fertilité, comme prouvé par de nombreuses études scientifiques indépendantes.</p>
                </div>
              </div>
            </div>

            <div className={styles.rumorCard}>
              <div className={styles.rumorInner}>
                <div className={styles.rumorFront}>
                  <div className={styles.rumorIcon}>❌</div>
                  <h3>Rumeur</h3>
                  <p>Les remèdes traditionnels suffisent à protéger l'enfant contre la polio.</p>
                  <span className={styles.flipHint}>Voir la vérité ⤵</span>
                </div>
                <div className={styles.rumorBack}>
                  <div className={styles.rumorIcon}>✅</div>
                  <h3>Vérité</h3>
                  <p>Seuls les vaccins homologués ont prouvé scientifiquement leur efficacité pour prévenir des maladies graves et invalidantes comme la poliomyélite.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDRIER VACCINAL */}
      <section className={`section ${styles.calendarSection}`}>
        <div className={`container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleCenter}>Calendrier Vaccinal de l'Enfant au Bénin</h2>
            <p className={styles.sectionSubtitle}>Protégez vos enfants dès la naissance en respectant rigoureusement ces rendez-vous de santé.</p>
          </div>
          
          <div className={styles.calendarGrid}>
            <div className={styles.calendarCard}>
              <div className={styles.calendarIcon}>👶</div>
              <h4 className={styles.calendarAge}>À la naissance</h4>
              <ul className={styles.calendarList}>
                <li><strong>BCG</strong> (Tuberculose)</li>
                <li><strong>VPO 0</strong> (Polio Oral)</li>
              </ul>
            </div>
            
            <div className={styles.calendarCard}>
              <div className={styles.calendarIcon}>⏳</div>
              <h4 className={styles.calendarAge}>6 semaines <br/><small>(1 mois et demi)</small></h4>
              <ul className={styles.calendarList}>
                <li><strong>VPO 1</strong> (Polio Oral)</li>
                <li>Penta 1, Pneumo 1, Rota 1</li>
              </ul>
            </div>
            
            <div className={styles.calendarCard}>
              <div className={styles.calendarIcon}>🍼</div>
              <h4 className={styles.calendarAge}>10 semaines <br/><small>(2 mois et demi)</small></h4>
              <ul className={styles.calendarList}>
                <li><strong>VPO 2</strong> (Polio Oral)</li>
                <li>Penta 2, Pneumo 2, Rota 2</li>
              </ul>
            </div>
            
            <div className={styles.calendarCard}>
              <div className={styles.calendarIcon}>🧸</div>
              <h4 className={styles.calendarAge}>14 semaines <br/><small>(3 mois et demi)</small></h4>
              <ul className={styles.calendarList}>
                <li><strong>VPO 3</strong> (Polio Oral)</li>
                <li><strong>VPI</strong> (Polio Injectable)</li>
                <li>Penta 3, Pneumo 3</li>
              </ul>
            </div>
            
            <div className={styles.calendarCard}>
              <div className={styles.calendarIcon}>🎂</div>
              <h4 className={styles.calendarAge}>9 mois</h4>
              <ul className={styles.calendarList}>
                <li><strong>RR</strong> (Rougeole, Rubéole)</li>
                <li><strong>VAA</strong> (Fièvre Jaune)</li>
              </ul>
            </div>
          </div>
          
          <VaccineCalculator />
        </div>
      </section>

      {/* CAMPAGNES & ACTUALITÉS */}
      <section id="campagnes" className={`section ${styles.campaignSection}`}>
        <div className={`container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleCenter}>Nos Campagnes & Actualités</h2>
            <p className={styles.sectionSubtitle}>Restez informés des dernières actions sur le terrain.</p>
          </div>
          
          <div className={styles.campaignGrid}>
            {displayCampaigns.map((camp: any) => (
              <div key={camp.id} className={styles.campaignCard}>
                <div className={styles.campaignImageWrapper}>
                  <Image src={camp.image_url || "/hero-bg.jpg"} alt={camp.title} layout="fill" objectFit="contain" priority />
                </div>
                <div className={styles.campaignInfo}>
                  <span className={styles.campaignDate}>{camp.date || "Récemment"}</span>
                  <h3 className={styles.campaignTitle}>{camp.title}</h3>
                  <p className={styles.campaignDesc} style={{ whiteSpace: "pre-wrap" }}>{camp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARTE INTERACTIVE */}
      <section id="ressources" className={`section ${styles.mapSection}`}>
        <div className={`container ${styles.mapContainer}`}>
          <div className={styles.mapContent}>
            <h2 className={styles.sectionTitle}>Découvrez l'impact dans nos départements prioritaires</h2>
            <p className={styles.mapText}>Explorez notre carte interactive pour découvrir les témoignages locaux, les vidéos adaptées aux langues de chaque région et les statistiques de vaccination.</p>
            <ul className={styles.mapList}>
              <li>📍 Alibori</li>
              <li>📍 Atacora</li>
              <li>📍 Borgou</li>
              <li>📍 Collines</li>
              <li>📍 Donga</li>
              <li>📍 Plateau</li>
            </ul>
            <button className={styles.btnPrimary}>Explorer la carte</button>
          </div>
          <div className={styles.mapVisual}>
            <div className={styles.mapPlaceholder} style={{ background: "none", border: "none" }}>
              <InteractiveMap />
            </div>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className={`section ${styles.partnerSection}`}>
        <div className={`container`}>
          <h2 className={styles.partnerTitle}>Ils s'engagent avec nous</h2>
          
          <div className={styles.marqueeContainer}>
            <div className={styles.partnerGrid}>
              {/* FIRST SET */}
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-rotary-polio.png" alt="Rotary Polio" width={300} height={100} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-ministere-sante.png" alt="Ministère de la Santé" width={140} height={80} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-oms.png" alt="OMS" width={100} height={80} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-unicef.png" alt="UNICEF" width={140} height={80} style={{ objectFit: 'contain' }} />
              </div>

              {/* DUPLICATE SET FOR SEAMLESS SCROLL */}
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-rotary-polio.png" alt="Rotary Polio" width={300} height={100} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-ministere-sante.png" alt="Ministère de la Santé" width={140} height={80} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-oms.png" alt="OMS" width={100} height={80} style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.partnerLogoImage}>
                <Image src="/logo-unicef.png" alt="UNICEF" width={140} height={80} style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS & CONTACT */}
      <section className={`section ${styles.contactSection}`}>
        <div className={`container ${styles.contactContainer}`}>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>À Propos</h2>
            <p className={styles.aboutText}>La Commission Nationale Polio Plus du Rotary Bénin coordonne les actions de sensibilisation, de plaidoyer et de mobilisation en faveur de l'éradication de la poliomyélite et de la promotion de la vaccination au Bénin.</p>
            <div className={styles.contactInfo}>
              <p>📍 Cotonou, Bénin</p>
              <p>📞 00229 01 97 11 33 33</p>
              <p>✉️ contact@vaccinerpourlavie.bj</p>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://wa.me/2290197113333" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.whatsapp}`} title="WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590120160886" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.facebook}`} title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/vaccinerpourlavie/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagram}`} title="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.tiktok.com/@vaccinerpourlavie" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.tiktok}`} title="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/118934615/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.linkedin}`} title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          <div className={styles.contactForm}>
            <h3 className={styles.formTitle}>Nous contacter</h3>
            <form>
              <input type="text" placeholder="Nom complet" className={styles.formInput} />
              <input type="email" placeholder="Adresse Email" className={styles.formInput} />
              <input type="text" placeholder="Sujet" className={styles.formInput} />
              <textarea placeholder="Votre message" rows={5} className={styles.formTextarea}></textarea>
              <button type="button" className={styles.btnPrimary}>Envoyer le message</button>
            </form>
          </div>
        </div>
      </section>

      </main>

      <footer className={styles.footer}>
        <span>&copy; 2026 CNPP Rotary Bénin. Tous droits réservés. &nbsp;|&nbsp; </span>
        <span>Réalisé par <strong style={{ color: '#00D1B2' }}>ITA INNOVATE</strong></span>
      </footer>
    </>
  );
}
