import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, List, Play, Clock, Target, Users } from 'lucide-react';

const Training = () => {
    const trainingPlan = [
        { day: 'Lunes', focus: 'Técnica Individual', drills: ['Manejo de balón', 'Finalizaciones', 'Tiro tras salida'], time: '10:00 - 12:00' },
        { day: 'Martes', focus: 'Táctica de Equipo', drills: ['Sistemas vs 2-3', 'Transición 3x2', 'Saques de fondo'], time: '18:00 - 20:00' },
        { day: 'Miércoles', focus: 'Físico / Recuperación', drills: ['Gimnasio', 'Movilidad', 'Análisis video'], time: '09:30 - 11:30' },
        { day: 'Jueves', focus: 'Defensa Colectiva', drills: ['Rotaciones', 'Cerrar el rebote', 'Comunicación'], time: '18:00 - 20:00' },
        { day: 'Viernes', focus: 'Repaso y Scouting', drills: ['Tiros libres', 'Jugadas especiales', 'Plan partido'], time: '17:00 - 19:00' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="training-view" style={{ padding: '20px' }}>
            <div className="flex-row-mobile-stack" style={{ marginBottom: '2rem', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Planificación de Entrenamiento</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Organización semanal y objetivos de la temporada.</p>
                </div>
                <button className="btn btn-primary" style={{ height: 'fit-content' }}>
                    <Calendar size={18} /> Nueva Sesión
                </button>
            </div>

            <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
                {/* CALENDAR DASHBOARD */}
                <div className="col-span-2 glass-panel" style={{ padding: '0' }}>
                    <div className="panel-header">PLAN SEMANAL</div>
                    <div style={{ padding: '1rem' }}>
                        {trainingPlan.map((session, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                background: 'rgba(255,255,255,0.03)',
                                marginBottom: '10px',
                                borderRadius: '10px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: '100px',
                                    background: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>
                                    {session.day}
                                </div>
                                <div style={{ flex: 1, padding: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent)' }}>{session.focus}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><Clock size={14} /> {session.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {session.drills.map((drill, i) => (
                                            <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{drill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TEMPLATE / STATS WIDGET */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={20} color="var(--primary)" /> Objetivos Temporada
                        </h3>
                        {[
                            { label: 'Condición Física', val: 75 },
                            { label: 'Porcentaje TL', val: 68 },
                            { label: 'Sistemas Aprendidos', val: 90 },
                            { label: 'Defensa de Zona', val: 40 },
                        ].map((obj, i) => (
                            <div key={i} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                                    <span>{obj.label}</span>
                                    <span>{obj.val}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                                    <div style={{ width: `${obj.val}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #1a1a2e 100%)' }}>
                        <h3 style={{ color: 'white' }}>Template Rápido</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '10px 0' }}>Arrastra una sesión predefinida al calendario.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', justifyContent: 'flex-start' }}><Play size={16} /> Recuperación Activa</button>
                            <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', justifyContent: 'flex-start' }}><CheckSquare size={16} /> Test de Resistencia</button>
                            <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', justifyContent: 'flex-start' }}><Users size={16} /> 5 contra 5 Scrimmage</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Training;
