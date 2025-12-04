import React from 'react';
import ConfessionCard from './ConfessionCard';
import './ConfessionList.css';

const ConfessionList = ({ confessions, searchQuery }) => {
    // Filter confessions based on search query
    const filteredConfessions = confessions.filter(confession => {
        const query = searchQuery.toLowerCase();
        const text = confession.description.toLowerCase();
        const alias = (confession.person_name || '').toLowerCase();
        const location = (confession.description.split(' - ')[0] || '').toLowerCase();

        return text.includes(query) || alias.includes(query) || location.includes(query);
    });

    if (filteredConfessions.length === 0) {
        return (
            <div className="no-results">
                <p>Sin resultados. Intenta otra palabra.</p>
            </div>
        );
    }

    return (
        <div className="confession-list">
            {filteredConfessions.map((confession) => (
                <ConfessionCard key={confession.id || Math.random()} confession={confession} />
            ))}
        </div>
    );
};

export default ConfessionList;
