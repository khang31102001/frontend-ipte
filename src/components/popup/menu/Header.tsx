import React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HeaderProps {
    title: string
    onBack: () => void
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
    return (
        <header className="relative w-40">
            <button
                className="flex hover:bg-slate-700 w-full pl-2"
                onClick={onBack}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="mt-1.5" />
                <h4 className="text-lg">{title}</h4>
            </button>
        </header>
    )
}

export default Header
