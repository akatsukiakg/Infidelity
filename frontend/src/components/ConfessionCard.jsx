import React, { useState } from 'react';
import { HeartCrack, Clock, MapPin, Instagram } from 'lucide-react';
import './ConfessionCard.css';

const ConfessionCard = ({ confession }) => {
    const [expanded, setExpanded] = useState(false);

    // Parse description to extract location if possible (based on "Location - Description" format)
    // Or just display as is if no separator found
    let location = '';
    let text = confession.description;

    if (confession.description.includes(' - ')) {
        const parts = confession.description.split(' - ');
        if (parts.length > 1 && parts[0].length < 30) { // Simple heuristic
            location = parts[0];
            text = parts.slice(1).join(' - ');
        }
    }

    // Mock time for now, or use a timestamp if available
    const timeAgo = "hace 2 minutos";

    return (
        <div className="confession-card">
            <div className="card-ribbon"></div>
            <div className="card-content">
                <div className="card-header">
                    <div className="alias-container">
                        <HeartCrack size={18} className="card-icon" />
                        <span className="alias">{confession.person_name || 'Anónimo'}</span>
                    </div>
                    <div className="time-container">
                        <Clock size={14} />
                        <span>{timeAgo}</span>
                    </div>
                </div>

                {location && (
                    <div className="location-tag">
                        <MapPin size={14} />
                        <span>{location}</span>
                    </div>
                )}

                <div className={`card-text ${expanded ? 'expanded' : ''}`}>
                    <p>{text}</p>
                </div>

                {text.length > 150 && (
                    <button
                        className="read-more-btn"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Ver menos' : 'Ver más'}
                    </button>
                )}

                {confession.instagram && confession.instagram !== 'Unknown' && (
                    <div className="social-link">
                        <Instagram size={14} />
                        <span>{confession.instagram}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfessionCard;
