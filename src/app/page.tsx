import styles from "./page.module.css";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import AnimatedStats from "@/components/AnimatedStats";
import InteractiveMap from "@/components/InteractiveMap";

export default async function Home() {
  // Fetch real data from Supabase (with fallback for demo purposes)
  const { data: fetchedVideos } = await supabase.from('videos').select('*').order('created_at', { ascending: false }).limit(3);
  const { data: fetchedCampaigns } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false }).limit(2);

  // Les capsules locales prioritaires
  const localVideos = [
    { id: 'local-1', title: "PP Olga KATHEMA ABALLO", description: "Vice Présidente Bénin de la Commission Polio Plus du district 9103.", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-1.mp4" },
    { id: 'local-2', title: "Mohamed BONI SENI", description: "Président du Comité de Liaison Inter Clubs du Bénin (CLIC).", duration: "", category: "Rotary", language: "Français", video_url: "/capsule-2.mp4" }
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
            <a href="#campagnes" className={styles.navLink}>Campagnes</a>
            <a href="#ressources" className={styles.navLink}>IMPACT/GALERIE</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
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
            <button className={styles.btnPrimary}>
              Regarder les capsules vidéo
            </button>
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
              src="/pdg_dorothee_gounon.jpg" 
              alt="PDG Dorothé GOUNON, Président de la Commission Nationale Polio Plus du Bénin"
              width={400}
              height={500}
              className={styles.presidentImage}
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
      <section className={`section ${styles.videoSection}`}>
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
              <div key={item.id} className={styles.videoCard}>
                <div className={styles.videoThumbnailWrapper}>
                  {item.video_url ? (
                    <video 
                      src={item.video_url} 
                      controls 
                      preload="none"
                      poster="/video-thumb.jpg"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
                    />
                  ) : (
                    <>
                      <Image src={item.thumbnail_url || "/video-thumb.jpg"} alt="Video thumbnail" layout="fill" objectFit="cover" />
                      <div className={styles.playIcon}>▶</div>
                      <span className={styles.videoDuration}>{item.duration || "03:45"}</span>
                    </>
                  )}
                </div>
                <div className={styles.videoInfo}>
                  <div className={styles.videoTags}>
                    <span className={styles.tag}>{item.category || "Général"}</span>
                    {item.language && <span className={styles.tag}>{item.language}</span>}
                  </div>
                  <h3 className={styles.videoTitle}>{item.title}</h3>
                  <p className={styles.videoDesc}>{item.description}</p>
                  <button className={styles.btnWatch}>Regarder la vidéo</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.viewAllWrapper}>
            <button className={styles.btnPrimary}>Voir toutes les capsules</button>
          </div>
        </div>
      </section>

      {/* INFO OU RUMEUR */}
      <section className={`section ${styles.rumorSection}`}>
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
                  <Image src={camp.image_url || "/hero-bg.jpg"} alt={camp.title} layout="fill" objectFit="contain" />
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
              <a href="https://wa.me/2290197113333" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590120160886" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/vaccinerpourlavie/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/118934615/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} title="LinkedIn">
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
