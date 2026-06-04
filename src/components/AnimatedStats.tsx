"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../app/page.module.css";

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let timer: NodeJS.Timeout;
    
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const steps = 20;
          const stepTime = duration / steps;
          let currentStep = 0;
          
          timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor((currentStep / steps) * end));
            }
          }, stepTime);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [end, duration]);

  return { count, elementRef };
};

export default function AnimatedStats() {
  const videos = useCountUp(15);
  const partenaires = useCountUp(5);
  const departements = useCountUp(12);
  const personnes = useCountUp(12, 2000); // 1.2M represented as 12 then divided by 10

  return (
    <section className={`section ${styles.statsSection}`}>
      <div className={`container ${styles.statsContainer}`}>
        <div className={styles.statCard} ref={videos.elementRef}>
          <div className={styles.statNumber}>{videos.count}+</div>
          <div className={styles.statLabel}>Capsules Vidéo</div>
        </div>
        <div className={styles.statCard} ref={partenaires.elementRef}>
          <div className={styles.statNumber}>{partenaires.count}+</div>
          <div className={styles.statLabel}>Partenaires</div>
        </div>
        <div className={styles.statCard} ref={departements.elementRef}>
          <div className={styles.statNumber}>{departements.count}</div>
          <div className={styles.statLabel}>Départements</div>
        </div>
        <div className={styles.statCard} ref={personnes.elementRef}>
          <div className={styles.statNumber}>{(personnes.count / 10).toFixed(1)}M</div>
          <div className={styles.statLabel}>Personnes Sensibilisées</div>
        </div>
      </div>
    </section>
  );
}
