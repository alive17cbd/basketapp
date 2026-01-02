import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Trophy, ChevronRight, Mail, Activity, Star, FileText } from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
    const messages = [
        { from: 'Presidente', subject: 'Objetivos de la temporada', time: 'Hoy, 09:00', urgent: true },
        { from: 'Jefe Médico', subject: 'Informe de lesión: M. Rossi', time: 'Ayer, 18:30', urgent: false },
        { from: 'Asistente', subject: 'Análisis del rival: Bulls', time: 'Ayer, 14:00', urgent: false },
    ];

    const menuItems = [
        { label: 'PIZARRA', icon: Trophy, color: '#e67e22', action: 'tactics', day: 1 },
        { label: 'CALENDARIO', icon: Calendar, color: '#27ae60', action: 'calendar', day: 2 },
        { label: 'ESTADÍSTICAS', icon: TrendingUp, color: '#9b59b6', action: 'stats', day: 3 },
        { label: 'PDF AND FILES', icon: FileText, color: '#c0392b', action: 'fundamentals', day: 4 },
        { label: 'CHAT COACH & STAFF', icon: Mail, color: '#2c3e50', action: 'messages', day: 5 },
        { label: 'EQUIPOS', icon: Users, color: '#f1c40f', action: 'teams', day: 6 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard"
        >
            {/* TOP INFO BAR (FM Style Date/Time) */}
            <div className="glass-panel" style={{ padding: '0', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                <div style={{ background: 'var(--alive-blue)', color: 'white', padding: '0.8rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '150px' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>ESTADO</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: '1.2', textAlign: 'center' }}>TEMPORADA ACTIVA</span>
                </div>
                <div style={{ flex: 1, padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Alive Digital Management</h2>
                        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                            <span className="status-bubble" style={{ background: 'var(--success)' }}></span>
                            Coach Mendoza — Staff Conectado
                        </p>
                    </div>
                </div>
            </div>

            {/* CALENDAR STYLE MENU GRID */}
            <div className="glass-panel" style={{ padding: '0', marginBottom: '1.5rem', background: '#e0e5ec' }}>
                <div className="panel-header" style={{ background: 'var(--alive-blue)', color: 'white' }}>MENÚ PRINCIPAL</div>
                <div className="grid grid-cols-3" style={{ gap: '1px', background: '#ccc', border: '1px solid #ccc' }}>
                    {menuItems.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveTab(item.action)}
                            style={{
                                background: 'white',
                                aspectRatio: '1.2 / 1',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                position: 'relative',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f8ff'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '0.8rem', color: '#ccc', fontWeight: 'bold' }}>
                                {item.day}
                            </div>
                            <div style={{
                                width: '40px', height: '40px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <item.icon size={32} color={item.color} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', textTransform: 'uppercase' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2">
                {/* NEXT MATCH WIDGET */}
                <div className="glass-panel" style={{ padding: '0' }}>
                    <div className="panel-header">
                        <span>PRÓXIMO PARTIDO</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JORNADA 12</span>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--fm-bg)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>🏀</div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Alive</div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--alive-blue)' }}>VS</div>
                                <div style={{ fontSize: '0.7rem', background: '#ecf0f1', padding: '2px 8px', borderRadius: '4px', marginTop: '5px' }}>24 DIC 18:00</div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--fm-bg)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>🐂</div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Bulls</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '8px', background: '#f1f1f1', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                        <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>Preparar Partido</button>
                    </div>
                </div>

                {/* INBOX WIDGET */}
                <div className="glass-panel" style={{ padding: '0' }}>
                    <div className="panel-header">
                        <span>CORREO IMPORTANTE</span>
                        <div style={{ background: 'var(--error)', color: 'white', fontSize: '0.7rem', padding: '1px 5px', borderRadius: '4px' }}>1 Nuevo</div>
                    </div>
                    <div style={{ background: 'white' }}>
                        {messages.slice(0, 2).map((msg, i) => (
                            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', gap: '8px', alignItems: 'center', background: msg.urgent ? '#fff5f5' : 'white' }}>
                                <div style={{ width: '3px', height: '25px', background: msg.urgent ? 'var(--error)' : 'var(--alive-teal)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--alive-blue)' }}>{msg.from}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '8px', textAlign: 'center' }}>
                        <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.8rem' }} onClick={() => setActiveTab('messages')}>Ver Todo</button>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 600px) {
                    .grid-cols-3 {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Dashboard;
