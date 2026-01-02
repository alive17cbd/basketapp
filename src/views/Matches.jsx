import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, MapPin, BarChart2, Plus, FileText } from 'lucide-react';
import { generateMatchItineraryPDF } from '../utils/pdfGenerator';

const Matches = () => {
    const matches = [
        { id: 1, opponent: 'Bulls', date: '25 Dic, 18:00', type: 'Liga Regular', location: 'Estadio Obras', status: 'Scheduled' },
        { id: 2, opponent: 'Lakers Local', date: '18 Dic, 21:00', type: 'Amistoso', location: 'Cancha Central', status: 'Played', score: '85 - 72', result: 'W' },
        { id: 3, opponent: 'Warriors B', date: '12 Dic, 19:30', type: 'Liga Regular', location: 'Polideportivo San Luis', status: 'Played', score: '64 - 70', result: 'L' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="matches-view">
            <div className="flex-row-mobile-stack" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Gestión de Partidos</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Resultados y calendario competitivo.</p>
                </div>
                <button className="btn btn-primary" style={{ width: 'auto' }}>
                    <Plus size={18} /> <span className="hide-mobile">Nuevo Partido</span><span className="show-mobile">Nuevo</span>
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '0.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>Rival</th>
                            <th style={{ padding: '1rem' }}>Fecha/Hora</th>
                            <th style={{ padding: '1rem' }} className="hide-mobile">Tipo</th>
                            <th style={{ padding: '1rem' }} className="hide-mobile">Ubicación</th>
                            <th style={{ padding: '1rem' }}>Resultado</th>
                            <th style={{ padding: '1rem' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((m) => (
                            <tr key={m.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                                <td style={{ padding: '1.2rem' }} data-label="Rival">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🏀</div>
                                        <span style={{ fontWeight: '600' }}>{m.opponent}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }} data-label="Fecha/Hora">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                        <Clock size={14} color="var(--primary)" /> {m.date}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }} data-label="Tipo" className="hide-mobile">
                                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{m.type}</span>
                                </td>
                                <td style={{ padding: '1.2rem' }} data-label="Ubicación" className="hide-mobile">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                        <MapPin size={14} color="var(--accent)" /> {m.location}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }} data-label="Resultado">
                                    {m.status === 'Played' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{m.score}</span>
                                            <span style={{
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold',
                                                background: m.result === 'W' ? 'var(--success)' : 'var(--error)',
                                                color: 'white'
                                            }}>
                                                {m.result}
                                            </span>
                                        </div>
                                    ) : (
                                        <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600' }}>Próximamente</span>
                                    )}
                                </td>
                                <td style={{ padding: '1.2rem' }} data-label="Acciones">
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }} onClick={() => generateMatchItineraryPDF(m)}>
                                            <FileText size={14} /> Itinerario
                                        </button>
                                        <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                                            <BarChart2 size={14} /> Stats
                                        </button>
                                        {m.status === 'Scheduled' && (
                                            <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                                                Live
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .show-mobile { display: inline; }
          h1 { margin-bottom: 0.2rem; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none; }
        }
      `}</style>
        </motion.div>
    );
};

export default Matches;
