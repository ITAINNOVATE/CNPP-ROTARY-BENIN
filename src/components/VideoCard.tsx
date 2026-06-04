"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../app/page.module.css';

export default function VideoCard({ item }: { item: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.videoCard}>
        <div className={styles.videoThumbnailWrapper} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
          {item.video_url ? (
            <video 
              src={`${item.video_url}#t=15.0`} 
              preload="metadata"
              poster={item.thumbnail_url ? item.thumbnail_url : undefined}
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
          <button className={styles.btnWatch} onClick={() => setIsModalOpen(true)}>Regarder la vidéo</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="video-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            {item.video_url ? (
              <video src={item.video_url} controls autoPlay style={{ width: '100%', height: '100%', borderRadius: '12px' }} />
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#222', color: '#fff', borderRadius: '12px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3>Vidéo en cours de chargement...</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
