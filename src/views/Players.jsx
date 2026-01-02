import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Filter, Shield, Activity, Award } from 'lucide-react';

const Players = () => {
    const players = [
        { id: 1, name: 'Juan "Meteorito" Pérez', pos: 'Base (PG)', num: '#10', stats: '18.5 PPG', status: 'Fit', img: 'JP' },
        { id: 2, name: 'Carlos "Muro" Lopez', pos: 'Pívot (C)', num: '#32', stats: '12.0 PPG', status: 'Fit', img: 'CL' },
        { id: 3, name: 'Mario Rossi', pos: 'Alero (SF)', num: '#07', stats: '15.2 PPG', status: 'Injured', img: 'MR' },
        { id: 4, name: 'David Smith', pos: 'Escolta (SG)', num: '#23', stats: '22.1 PPG', status: 'Fit', img: 'DS' },
        { id: 5, name: 'Luis García', pos: 'Ala-Pívot (PF)', num: '#15', stats: '9.8 PPG', status: 'Resting', img: 'LG' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Fit': return 'var(--success)';
            case 'Injured': return 'var(--error)';
            case 'Resting': return '#e3b341';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="players-view">
            <div className="flex-row-mobile-stack" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Jugadores</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plantilla y rendimiento individual.</p>
                </div>
                <button className="btn btn-primary">
                    <UserPlus size={18} /> <span className="hide-mobile">Nuevo Jugador</span><span className="show-mobile">Nuevo</span>
                </button>
            </div>

            <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', outline: 'none', fontSize: '0.9rem' }}
                    />
                </div>
                <button className="btn btn-secondary" style={{ padding: '0.6rem' }}><Filter size={18} /></button>
            </div>

            <div className="grid grid-cols-3" style={{ gap: '1.25rem' }}>
                {players.map((player) => (
                    <div key={player.id} className="glass-card fade-in" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ height: '70px', background: 'linear-gradient(135deg, var(--primary) 0%, #a14d00 100%)', position: 'relative' }}>
                            <div style={{ position: 'absolute', bottom: '-25px', left: '15px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-surface)', border: '3px solid var(--bg-card)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
                                {player.img}
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                {player.num}
                            </div>
                        </div>
                        <div style={{ padding: '35px 15px 15px 15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem' }}>{player.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{player.pos}</p>
                                </div>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: getStatusColor(player.status),
                                    boxShadow: '0 0 5px ' + getStatusColor(player.status)
                                }} />
                            </div>

                            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                                <div>
                                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Promedio</p>
                                    <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{player.stats}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button className="btn btn-secondary" style={{ padding: '6px' }}><Shield size={14} /></button>
                                    <button className="btn btn-secondary" style={{ padding: '6px' }}><Activity size={14} /></button>
                                </div>
                            </div>

                            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.8rem', padding: '0.5rem' }}>Ver Perfil</button>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .show-mobile { display: inline; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none; }
        }
      `}</style>
        </motion.div>
    );
};

export default Players;
