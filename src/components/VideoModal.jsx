import { useState, useEffect } from 'react'
import '../App.css'

function VideoModal({ video, onClose }) {
    if (!video) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
        
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'auto'
        }
    }, [onClose])

    return (
        <div className="video-modal" onClick={handleBackdropClick}>
            <div className="video-modal__content">
                <button className="video-modal__close" onClick={onClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
                
                <div className="video-modal__video-wrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                
                <div className="video-modal__info">
                    <h2 className="video-modal__title">{video.title}</h2>
                    <p className="video-modal__channel">{video.channel}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoModal
