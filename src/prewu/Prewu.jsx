import { useState } from 'react'
import '../App.css'

function Prewu({ Picture, Avatar, Title, Channel, VideoId, onClick }) {
    const [isHovered, setIsHovered] = useState(false)

    const handleVideoClick = () => {
        if (onClick) {
            onClick({ videoId: VideoId, title: Title, channel: Channel })
        } else {
            window.open(`https://www.youtube.com/watch?v=${VideoId}`, '_blank')
        }
    }

    return (
        <article 
            className="video-card"
            onClick={handleVideoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="video-card__thumbnail-wrapper">
                <div
                    className="video-card__thumbnail"
                    style={{ backgroundImage: `url(${Picture})` }}
                />

                <div className="video-card__overlay">
                    <div className="video-card__play-button" />
                </div>

                <div className="video-card__duration">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}}>
                        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    Watch
                </div>
            </div>

            <div className="video-card__info">
                <div className="video-card__avatar-wrapper">
                    <div
                        className="video-card__avatar"
                        style={{ backgroundImage: `url(${Avatar})` }}
                    />
                </div>

                <div className="video-card__details">
                    <h3 className="video-card__title" title={Title}>
                        {Title}
                    </h3>

                    <p className="video-card__channel">{Channel}</p>
                </div>
            </div>
        </article>
    )
}

export default Prewu
