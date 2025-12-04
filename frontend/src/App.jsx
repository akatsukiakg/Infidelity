import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Header from './components/Header'
import ConfessionForm from './components/ConfessionForm'
import ConfessionTable from './components/ConfessionTable'
import './App.css'

const API_URL = 'http://localhost:8000/reports';

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [confessions, setConfessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const fetchConfessions = async () => {
    try {
      const response = await fetch(API_URL + '/');
      if (!response.ok) {
        throw new Error('Error fetching confessions');
      }
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.id - a.id);
      setConfessions(sortedData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setError('No se pudieron cargar las confesiones. Asegúrate de que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
    const interval = setInterval(fetchConfessions, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleConfessionSubmit = async (newConfession) => {
    try {
      const response = await fetch(API_URL + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfession),
      });

      if (!response.ok) {
        throw new Error('Error submitting confession');
      }

      const savedConfession = await response.json();
      setConfessions(prev => [savedConfession, ...prev]);
      setIsPublishing(false); // Close modal on success

    } catch (err) {
      console.error("Failed to submit:", err);
      alert('Error al publicar la confesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPublishClick={() => setIsPublishing(true)}
      />

      <main className="main-content">
        {loading ? (
          <div className="loading">Cargando datos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ConfessionTable confessions={confessions} searchQuery={searchQuery} />
        )}
      </main>

      {/* Publish Modal Overlay */}
      {isPublishing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal-btn"
              onClick={() => setIsPublishing(false)}
            >
              <X size={24} />
            </button>
            <h2 className="modal-title">Nueva Confesión</h2>
            <ConfessionForm onSubmit={handleConfessionSubmit} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
