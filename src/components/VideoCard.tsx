"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/page.module.css';
import { supabase } from '../lib/supabaseClient';

export default function VideoCard({ item }: { item: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ likes: 0, ratingSum: 0, ratingCount: 0 });
  const [comments, setComments] = useState<any[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStats();
    fetchComments();
    
    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      
      if (videoRef.current) {
        observer.observe(videoRef.current);
      }
    }, 800); // Delay video loading by 800ms to keep page load fluid
    
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [item.id]);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('video_stats')
      .select('*')
      .eq('video_id', item.id)
      .single();
    
    if (data) {
      setStats({
        likes: data.likes || 0,
        ratingSum: data.rating_sum || 0,
        ratingCount: data.rating_count || 0
      });
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('video_comments')
      .select('*')
      .eq('video_id', item.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setComments(data);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) return;
    
    // Optimistic update
    setStats(prev => ({ ...prev, likes: prev.likes + 1 }));
    setHasLiked(true);

    const { data: existing } = await supabase.from('video_stats').select('likes').eq('video_id', item.id).single();
    if (existing) {
      await supabase.from('video_stats').update({ likes: existing.likes + 1 }).eq('video_id', item.id);
    } else {
      await supabase.from('video_stats').insert({ video_id: item.id, likes: 1, rating_sum: 0, rating_count: 0 });
    }
  };

  const handleRate = async (rating: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (hasRated) return;

    setStats(prev => ({ 
      ...prev, 
      ratingSum: prev.ratingSum + rating,
      ratingCount: prev.ratingCount + 1 
    }));
    setHasRated(true);

    const { data: existing } = await supabase.from('video_stats').select('rating_sum, rating_count').eq('video_id', item.id).single();
    if (existing) {
      await supabase.from('video_stats')
        .update({ 
          rating_sum: existing.rating_sum + rating,
          rating_count: existing.rating_count + 1 
        })
        .eq('video_id', item.id);
    } else {
      await supabase.from('video_stats').insert({ 
        video_id: item.id, 
        likes: 0, 
        rating_sum: rating, 
        rating_count: 1 
      });
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from('video_comments')
      .insert({
        video_id: item.id,
        author_name: newCommentName,
        content: newCommentText
      })
      .select()
      .single();

    if (data) {
      setComments([data, ...comments]);
      setNewCommentName('');
      setNewCommentText('');
    }
    setIsSubmitting(false);
  };

  const avgRating = stats.ratingCount > 0 ? (stats.ratingSum / stats.ratingCount).toFixed(1) : '0';

  return (
    <>
      <div className={styles.videoCard}>
        <div className={styles.videoThumbnailWrapper} ref={videoRef} onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer', position: 'relative' }}>
          {isVisible ? (
            item.video_url ? (
              <video 
                src={`${item.video_url}#t=${item.thumbnailTime || 25.0}`} 
                preload="metadata"
                poster={item.thumbnail_url ? item.thumbnail_url : undefined}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
              />
            ) : (
              <Image src={item.thumbnail_url || "/video-thumb.jpg"} alt="Video thumbnail" layout="fill" objectFit="cover" />
            )
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', borderRadius: '12px' }}></div>
          )}
          
          {/* OVERLAY STATS ON CARD */}
          <div className="video-stats-overlay">
            <span onClick={handleLike} className={`stat-item ${hasLiked ? 'liked' : ''}`}>❤️ {stats.likes}</span>
            <span className="stat-item">⭐ {avgRating}</span>
            <span className="stat-item">💬 {comments.length}</span>
          </div>
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
          <button className="video-modal-close" onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>&larr;</span> Retour au site
          </button>
          
          <div className="video-modal-content large-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-video-section">
              {item.video_url ? (
                <video src={item.video_url} controls autoPlay style={{ width: '100%', height: 'auto', maxHeight: '50vh', borderRadius: '16px 16px 0 0', backgroundColor: '#000' }} />
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Vidéo en cours de chargement...</div>
              )}
            </div>
            
            <div className="modal-interactions">
              <div className="interaction-bar">
                <button onClick={(e) => handleLike(e as any)} className={`action-btn ${hasLiked ? 'active' : ''}`}>
                  {hasLiked ? '❤️ Aimé' : '🤍 J\'aime'} ({stats.likes})
                </button>
                <div className="star-rating">
                  <span>Noter : </span>
                  {[1,2,3,4,5].map(star => (
                    <span 
                      key={star} 
                      className={`star ${hasRated ? 'disabled' : ''}`}
                      onClick={(e) => handleRate(star, e as any)}
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="rating-avg">({avgRating}/5 - {stats.ratingCount} avis)</span>
                </div>
              </div>

              <div className="comments-section">
                <h4>💬 Commentaires ({comments.length})</h4>
                <form onSubmit={submitComment} className="comment-form">
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Votre Nom et Prénom" 
                      value={newCommentName} 
                      onChange={e => setNewCommentName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <textarea 
                      placeholder="Laissez votre commentaire ici..." 
                      value={newCommentText} 
                      onChange={e => setNewCommentText(e.target.value)} 
                      required 
                      rows={3}
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="submit-btn">
                    {isSubmitting ? 'Envoi en cours...' : 'Publier le commentaire'}
                  </button>
                </form>

                <div className="comments-list">
                  {comments.length === 0 ? (
                    <p style={{ color: 'var(--color-gray-dark)', fontStyle: 'italic' }}>Soyez le premier à commenter !</p>
                  ) : (
                    comments.map(c => (
                      <div key={c.id} className="comment-item">
                        <strong>{c.author_name}</strong>
                        <span className="comment-date">{new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <p>{c.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
