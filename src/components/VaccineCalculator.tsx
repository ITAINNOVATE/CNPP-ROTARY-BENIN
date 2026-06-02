"use client";

import { useState } from 'react';
import styles from './VaccineCalculator.module.css';

interface VaccineAppointment {
  age: string;
  daysOffset: number;
  vaccines: string;
}

const SCHEDULE: VaccineAppointment[] = [
  { age: "À la naissance", daysOffset: 0, vaccines: "BCG, VPO 0" },
  { age: "6 semaines", daysOffset: 42, vaccines: "VPO 1, Penta 1, Pneumo 1, Rota 1" },
  { age: "10 semaines", daysOffset: 70, vaccines: "VPO 2, Penta 2, Pneumo 2, Rota 2" },
  { age: "14 semaines", daysOffset: 98, vaccines: "VPO 3, VPI, Penta 3, Pneumo 3" },
  { age: "9 mois", daysOffset: 274, vaccines: "RR, VAA" }, // approx 9 months
];

export default function VaccineCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');

  const calculateDate = (baseDateStr: string, daysOffset: number) => {
    if (!baseDateStr) return '';
    const date = new Date(baseDateStr);
    date.setDate(date.getDate() + daysOffset);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.calculatorWrapper}>
      <h3 className={styles.title}>Calculateur de Rendez-vous</h3>
      <p className={styles.subtitle}>Saisissez la date de naissance de l'enfant pour obtenir son calendrier vaccinal personnalisé.</p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="birthdate">Date de naissance :</label>
        <input 
          type="date" 
          id="birthdate" 
          className={styles.dateInput}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      {birthDate && (
        <div className={styles.results}>
          <h4 className={styles.resultsTitle}>Prochaines dates prévues :</h4>
          <div className={styles.timeline}>
            {SCHEDULE.map((apt, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.itemDate}>
                  {calculateDate(birthDate, apt.daysOffset)}
                </div>
                <div className={styles.itemAge}>({apt.age})</div>
                <div className={styles.itemVaccines}>{apt.vaccines}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
