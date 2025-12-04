import React from 'react';
import { Instagram, MapPin, Clock, User } from 'lucide-react';
import './ConfessionTable.css';

const ConfessionTable = ({ confessions, searchQuery }) => {
    // Filter confessions based on search query
    const filteredConfessions = confessions.filter(confession => {
        const query = searchQuery.toLowerCase();
        const text = confession.description.toLowerCase();
        const cheater = (confession.person_name || '').toLowerCase();
        const alias = (confession.alias || confession.category || '').toLowerCase();
        const loc = (confession.location || '').toLowerCase();

        return text.includes(query) || cheater.includes(query) || alias.includes(query) || loc.includes(query);
    });

    if (filteredConfessions.length === 0) {
        return (
            <div className="no-results-table">
                <p>Sin resultados. Intenta otra palabra.</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="confession-table">
                <thead>
                    <tr>
                        <th className="col-alias">Alias</th>
                        <th className="col-category">Categoría</th>
                        <th className="col-cheater">Infiel</th>
                        <th className="col-location">Ubicación</th>
                        <th className="col-confession">Confesión</th>
                        <th className="col-social">Red Social</th>
                        <th className="col-time">Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredConfessions.map((confession) => {
                        return (
                            <tr key={confession.id || Math.random()}>
                                <td className="cell-alias">
                                    <span className="alias-badge-table">{confession.alias || confession.category || 'Anónimo'}</span>
                                </td>
                                <td className="cell-category">
                                    <span className={`category-badge ${confession.category === 'Funa' ? 'cat-funa' : 'cat-infidelidad'}`}>
                                        {confession.category || 'Infidelidad'}
                                    </span>
                                </td>
                                <td className="cell-cheater">
                                    <div className="cheater-flex">
                                        <User size={14} className="cheater-icon" />
                                        <span>{confession.person_name || 'Desconocido'}</span>
                                    </div>
                                </td>
                                <td className="cell-location">
                                    {confession.location && (
                                        <div className="location-flex">
                                            <MapPin size={14} />
                                            <span>{confession.location}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="cell-confession" title={confession.description}>
                                    {confession.description}
                                </td>
                                <td className="cell-social">
                                    {confession.instagram && confession.instagram !== 'Unknown' ? (
                                        <a
                                            href={`https://instagram.com/${confession.instagram.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link-table"
                                        >
                                            <Instagram size={14} />
                                            <span>{confession.instagram}</span>
                                        </a>
                                    ) : (
                                        <span className="text-muted">-</span>
                                    )}
                                </td>
                                <td className="cell-time">
                                    <div className="time-flex">
                                        <Clock size={14} />
                                        <span>hace 2 min</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ConfessionTable;
