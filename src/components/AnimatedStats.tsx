"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../app/page.module.css";

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
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
