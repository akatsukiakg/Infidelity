import React, { useState, useEffect } from 'react';
import { MapPin, Instagram, Sparkles, User } from 'lucide-react';
import './ConfessionForm.css';

const ADJECTIVES = ['Misterioso', 'Solitario', 'Enamorado', 'Secreto', 'Oculto', 'Silencioso', 'Anonimo', 'Nocturno'];
const NOUNS = ['Corazon', 'Alma', 'Suspiro', 'Pensamiento', 'Deseo', 'Secreto', 'Confesion', 'Sombra'];

const generateAlias = () => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const num = Math.floor(Math.random() * 99) + 1;
    return `${noun}${adj}_${num}`;
};

const ConfessionForm = ({ onSubmit }) => {
    const [alias, setAlias] = useState('');
    const [location, setLocation] = useState('');
    const [cheaterName, setCheaterName] = useState('');
    const [description, setDescription] = useState('');
    const [instagram, setInstagram] = useState('');
    const [category, setCategory] = useState('Infidelidad'); // Default category
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setAlias(generateAlias());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;

        setIsSubmitting(true);

        const newConfession = {
            person_name: cheaterName.trim() || 'Desconocido',
            description: description,
            location: location.trim(),
            instagram: instagram.trim() || 'Unknown',
            category: category,
            alias: alias // Send alias separately
        };

        await onSubmit(newConfession);

        // Reset form
        setDescription('');
        setLocation('');
        setCheaterName('');
        setInstagram('');
        setCategory('Infidelidad');
        setAlias(generateAlias());
        setIsSubmitting(false);
    };

    return (
        <div className="confession-form-container">
            <div className="alias-badge">
                <Sparkles size={14} />
                <span>Tu Alias: {alias}</span>
            </div>

            <form onSubmit={handleSubmit} className="confession-form">
                <div className="form-group">
                    <label className="form-label">Categoría:</label>
                    <div className="category-selector">
                        <button
                            type="button"
                            className={`category-btn ${category === 'Infidelidad' ? 'active' : ''}`}
                            onClick={() => setCategory('Infidelidad')}
                        >
                            Infidelidad
                        </button>
                        <button
                            type="button"
                            className={`category-btn ${category === 'Funa' ? 'active' : ''}`}
                            onClick={() => setCategory('Funa')}
                        >
                            Funa
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <MapPin size={18} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Ubicación (opcional) Ej: Santiago, Chile"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Nombre del infiel (o apodo)"
                            value={cheaterName}
                            onChange={(e) => setCheaterName(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Escribe la confesión..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                        required
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <Instagram size={18} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Red social (opcional)"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting || !description.trim()}
                >
                    {isSubmitting ? 'Publicando...' : 'Publicar de forma anónima'}
                </button>
            </form>
        </div>
    );
};

export default ConfessionForm;
