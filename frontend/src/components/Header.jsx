import React from 'react';
import { Search } from 'lucide-react';
import './Header.css';

const Header = ({ searchQuery, setSearchQuery, onPublishClick }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>Confesiones</h1>
                </div>

                <div className="search-bar-container">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar confesiones..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="publish-btn-header" onClick={onPublishClick}>
                    Publicar
                </button>
            </div>
        </header>
    );
};

export default Header;
