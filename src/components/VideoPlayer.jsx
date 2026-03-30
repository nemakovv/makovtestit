import { useState, useRef, useEffect } from 'react'
import '../App.css'

function VideoPlayer({ videoId, onClose }) {
    const [loading, setLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [error, setError] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const controlsTimeoutRef = useRef(null)
    const playerRef = useRef(null)
    const checkIntervalRef = useRef(null)

    useEffect(() => {
        setLoading(true)
        setLoadingProgress(0)
        setError(null)

        // Функция инициализации плеера
        const initPlayer = () => {
            if (window.YT && window.YT.Player) {
                playerRef.current = new window.YT.Player('youtube-player', {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        iv_load_policy: 3,
                        enablejsapi: 1,
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange,
                        onError: onPlayerError
                    }
                })
            } else {
                // Если API ещё не загрузился, пробуем снова через 100мс
                setTimeout(initPlayer, 100)
            }
        }

        const onPlayerReady = (event) => {
            console.log('Player ready!')
            setLoading(false)
            setLoadingProgress(100)
            event.target.playVideo()
        }

        const onPlayerStateChange = (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
                setDuration(event.target.getDuration())
                
                // Очищаем старый интервал если есть
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current)
                }
                
                // Обновляем время
                checkIntervalRef.current = setInterval(() => {
                    const currentTime = event.target.getCurrentTime()
                    const duration = event.target.getDuration()
                    setCurrentTime(currentTime)
                    setLoadingProgress(Math.min(100, (currentTime / duration) * 100))
                }, 500)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current)
                }
            } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false)
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current)
                }
            } else if (event.data === window.YT.PlayerState.BUFFERING) {
                setLoadingProgress(50)
            }
        }

        const onPlayerError = (event) => {
            console.error('YouTube Player Error:', event.data)
            const errorMessages = {
                2: 'Неверный ID видео',
                5: 'Ошибка HTML5 плеера',
                100: 'Видео не найдено',
                101: 'Воспроизведение запрещено',
                150: 'Воспроизведение запрещено'
            }
            setError(errorMessages[event.data] || 'Ошибка воспроизведения')
            setLoading(false)
        }

        // Загружаем YouTube IFrame Player API
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            tag.onload = initPlayer
            document.head.appendChild(tag)
        } else {
            initPlayer()
        }

        return () => {
            if (checkIntervalRef.current) {
                clearInterval(checkIntervalRef.current)
            }
            if (playerRef.current) {
                playerRef.current.destroy()
                playerRef.current = null
            }
        }
    }, [videoId])

    useEffect(() => {
        const handleMouseMove = () => {
            setShowControls(true)
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false)
                }
            }, 2500)
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }
        }
    }, [isPlaying])

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const togglePlay = () => {
        if (!playerRef.current) return
        
        if (isPlaying) {
            playerRef.current.pauseVideo()
        } else {
            playerRef.current.playVideo()
        }
    }

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value)
        setCurrentTime(newTime)
        if (playerRef.current?.seekTo) {
            playerRef.current.seekTo(newTime, true)
        }
    }

    const toggleFullscreen = () => {
        const container = document.querySelector('.video-player')
        if (!container) return

        if (!document.fullscreenElement) {
            container.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleVideoClick = (e) => {
        if (e.target.closest('.video-player__controls')) return
        togglePlay()
    }

    return (
        <div className="video-player" onClick={handleBackdropClick}>
            <div className="video-player__content">
                <button className="video-player__close" onClick={onClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <div className="video-player__video-wrapper" onClick={handleVideoClick}>
                    {loading && (
                        <div className="video-player__loading">
                            <div className="loading-spinner">
                                <div className="loading-spinner__circle"></div>
                                <div className="loading-spinner__text">{Math.round(loadingProgress)}%</div>
                            </div>
                            <p>Загрузка видео...</p>
                            <div className="loading-spinner__status">
                                {loadingProgress < 30 ? 'Подключение к YouTube...' : 
                                 loadingProgress < 70 ? 'Буферизация...' : 'Почти готово...'}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="video-player__error">
                            <div style={{fontSize: '48px', marginBottom: '16px'}}>😕</div>
                            <p>{error}</p>
                            <button className="video-player__retry" onClick={onClose}>
                                Закрыть
                            </button>
                        </div>
                    )}

                    {/* YouTube IFrame Player */}
                    <div id="youtube-player" className="youtube-player" />

                    {/* Контролы */}
                    <div className={`video-player__controls ${showControls || !isPlaying ? 'visible' : ''}`}>
                        {/* Progress bar */}
                        <div className="video-player__progress">
                            <div
                                className="video-player__buffer"
                                style={{ width: `${loadingProgress}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                className="video-player__seek"
                            />
                        </div>

                        <div className="video-player__controls-bottom">
                            <div className="video-player__controls-left">
                                <button className="video-player__button" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                                    {isPlaying ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="4" width="4" height="16" rx="1" />
                                            <rect x="14" y="4" width="4" height="16" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>

                                <span className="video-player__time">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="video-player__controls-right">
                                <button className="video-player__button" onClick={toggleFullscreen} aria-label="Fullscreen">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
