import { useState, useEffect } from 'react'
import './App.css'
import Prewu from './prewu/Prewu'
import Header from './components/header/Header'
import VideoPlayer from './components/VideoPlayer'

// YouTube каналы для парсинга (стартовые)
const CHANNEL_IDS = [
    'UC6JRrn_7Qe1CZBcQDMieadw', // ExileShow
]

const VIDEOS_PER_CHANNEL = 20

function App() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    // Загрузка видео с каналов при старте
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const allVideos = []
                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

                console.log('🚀 Fetching videos from YouTube API...')

                for (const channelId of CHANNEL_IDS) {
                    try {
                        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${VIDEOS_PER_CHANNEL}&order=date&type=video&key=${apiKey}`

                        const response = await fetch(searchUrl)
                        const data = await response.json()

                        if (data.error) {
                            console.error(`❌ YouTube API error for ${channelId}:`, data.error.message)
                            continue
                        }

                        if (data.items) {
                            console.log(`✅ Found ${data.items.length} videos for channel ${channelId}`)
                            
                            for (const item of data.items) {
                                const videoId = item.id.videoId
                                const snippet = item.snippet

                                if (videoId && snippet) {
                                    allVideos.push({
                                        id: videoId,
                                        videoId,
                                        title: snippet.title,
                                        channel: snippet.channelTitle,
                                        thumbnail: snippet.thumbnails?.high?.url ||
                                                   snippet.thumbnails?.medium?.url ||
                                                   snippet.thumbnails?.default?.url ||
                                                   `https://img.youtube.com/vi/${videoId}/hq720.jpg`,
                                        publishedAt: snippet.publishedAt
                                    })
                                }
                            }
                        }
                    } catch (err) {
                        console.error(`❌ Failed to fetch channel ${channelId}:`, err)
                    }
                }

                allVideos.sort((a, b) => {
                    return new Date(b.publishedAt) - new Date(a.publishedAt)
                })

                console.log(`🎉 Total videos loaded: ${allVideos.length}`)
                setVideos(allVideos)
                setLoading(false)
            } catch (error) {
                console.error('❌ Error fetching videos:', error)
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

    // Поиск по YouTube
    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            if (!searchQuery.trim()) {
                setSearchResults([])
                setHasSearched(false)
                return
            }

            setIsSearching(true)
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

            try {
                // Ищем только видео
                const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&maxResults=20&type=video&key=${apiKey}`

                const response = await fetch(searchUrl)
                const data = await response.json()

                if (data.error) {
                    console.error('Search API error:', data.error.message)
                    return
                }

                if (data.items) {
                    const results = data.items.map(item => ({
                        id: item.id.videoId,
                        videoId: item.id.videoId,
                        title: item.snippet?.title,
                        channel: item.snippet?.channelTitle,
                        thumbnail: item.snippet?.thumbnails?.high?.url ||
                                   item.snippet?.thumbnails?.medium?.url ||
                                   item.snippet?.thumbnails?.default?.url ||
                                   `https://img.youtube.com/vi/${item.id.videoId}/hq720.jpg`,
                        description: item.snippet?.description,
                        publishedAt: item.snippet?.publishedAt
                    }))
                    setSearchResults(results)
                    setHasSearched(true)
                }
            } catch (err) {
                console.error('Search error:', err)
            } finally {
                setIsSearching(false)
            }
        }, 500) // Debounce 500ms

        return () => clearTimeout(debounceTimer)
    }, [searchQuery])

    const handleCloseModal = () => {
        setSelectedVideo(null)
    }

    const handleVideoClick = (video) => {
        setSelectedVideo(video)
    }

    const handleSearchChange = (query) => {
        setSearchQuery(query)
    }

    const handleClearSearch = () => {
        setSearchQuery('')
    }

    // Показываем результаты поиска или обычные видео
    const displayVideos = hasSearched ? searchResults : videos
    const isSearchingActive = searchQuery.trim().length > 0

    return (
        <div className="app-container">
            <Header onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} searchQuery={searchQuery} />
            
            <main className="video-grid">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="video-card skeleton-card">
                            <div className="skeleton skeleton--thumbnail" />
                            <div className="video-card__info">
                                <div className="skeleton skeleton--avatar" />
                                <div className="video-card__details">
                                    <div className="skeleton skeleton--title" />
                                    <div className="skeleton skeleton--channel" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : isSearchingActive && isSearching ? (
                    // Показываем скелетоны во время поиска
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="video-card skeleton-card">
                            <div className="skeleton skeleton--thumbnail" />
                            <div className="video-card__info">
                                <div className="skeleton skeleton--avatar" />
                                <div className="video-card__details">
                                    <div className="skeleton skeleton--title" />
                                    <div className="skeleton skeleton--channel" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : displayVideos.length > 0 ? (
                    displayVideos.map((video) => (
                        <Prewu
                            key={video.id}
                            Picture={video.thumbnail}
                            Avatar={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.channel)}&background=ff0000&color=fff&size=100`}
                            Title={video.title}
                            Channel={video.channel}
                            VideoId={video.videoId}
                            onClick={handleVideoClick}
                        />
                    ))
                ) : isSearchingActive ? (
                    <div className="no-videos">
                        <div style={{fontSize: '64px', marginBottom: '20px', opacity: 0.5}}>🔍</div>
                        <p>Ничего не найдено по запросу "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="no-videos">
                        <div style={{fontSize: '64px', marginBottom: '20px', opacity: 0.5}}>📺</div>
                        <p>Видео не загружены. Проверьте подключение к интернету или откройте консоль для деталей.</p>
                    </div>
                )}
            </main>

            {selectedVideo && (
                <VideoPlayer videoId={selectedVideo.videoId} onClose={handleCloseModal} />
            )}
        </div>
    )
}

export default App
