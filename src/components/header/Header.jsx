import { useEffect, useState } from 'react'
import '../../App.css'

function Header({ onSearchChange, onClearSearch, searchQuery }) {
    const [opacity, setOpacity] = useState(0)
    const [localValue, setLocalValue] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const scrolls = window.scrollY
            if (scrolls >= 100) {
                setOpacity(1)
            } else {
                const newOpacity = scrolls / 100
                setOpacity(newOpacity)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setLocalValue(searchQuery || '')
    }, [searchQuery])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setLocalValue(value)
        if (onSearchChange) {
            onSearchChange(value)
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
    }

    const handleClear = () => {
        setLocalValue('')
        if (onClearSearch) {
            onClearSearch()
        }
    }

    return (
        <header className="header">
            <div 
                className="header__background"
                style={{ opacity: opacity }}
            />
            
            <div className="header__container">
                <form className="header__search-form" onSubmit={handleSearchSubmit}>
                    <svg 
                        className="header__search-icon"
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    
                    <input 
                        className="header__input"
                        type="text"
                        placeholder="Введите ваш запрос"
                        value={localValue}
                        onChange={handleSearchChange}
                        aria-label="Search videos"
                    />
                    
                    {localValue && (
                        <button 
                            type="button"
                            className="header__clear-button"
                            onClick={handleClear}
                            aria-label="Clear search"
                        >
                            <svg 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    )}
                </form>
            </div>
        </header>
    )
}

export default Header
