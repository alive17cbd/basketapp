import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar as CalIcon, Trophy, Disc, FileText, X } from 'lucide-react';

const Calendar = () => {
    // Current date for navigation, starting at Dec 2025 as requested
    const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [newEvent, setNewEvent] = useState({ type: 'training', title: '', time: '18:00' });

    useEffect(() => {
        const savedEvents = localStorage.getItem('basket_calendar_events');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        } else {
            setEvents({
                '2025-12-25': [{ id: 1, type: 'match', title: 'Día de Navidad', time: '12:00' }]
            });
        }
    }, []);

    const saveEvents = (updatedEvents) => {
        setEvents(updatedEvents);
        localStorage.setItem('basket_calendar_events', JSON.stringify(updatedEvents));
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);

        // Validation: Only Dec 2025 and 2026+
        const year = newDate.getFullYear();
        const month = newDate.getMonth();

        if (year < 2025) return;
        if (year === 2025 && month < 11) return; // Prevent before Dec 2025

        setCurrentDate(newDate);
        setSelectedDate(null);
    };

    const handleDateClick = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        setShowModal(true);
        setNewEvent({ type: 'training', title: '', time: '18:00' });
    };

    const handleAddEvent = () => {
        if (!newEvent.title) return;
        const event = { id: Date.now(), ...newEvent };
        const updatedEvents = { ...events, [selectedDate]: [...(events[selectedDate] || []), event] };
        saveEvents(updatedEvents);
        setNewEvent({ type: 'training', title: '', time: '18:00' });
    };

    const handleDeleteEvent = (eventId) => {
        const updated = events[selectedDate].filter(e => e.id !== eventId);
        const newEvents = { ...events };
        if (updated.length === 0) delete newEvents[selectedDate];
        else newEvents[selectedDate] = updated;
        saveEvents(newEvents);
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const getTypeColor = (type) => {
        switch (type) {
            case 'match': return 'var(--error)';
            case 'training': return 'var(--success)';
            default: return 'var(--alive-teal)';
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="calendar-view" style={{ padding: '20px' }}>
            {/* HEADER */}
            <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-secondary" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                </div>
                <button className="btn btn-secondary" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
            </div>

            {/* GRID */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                    {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(d => (
                        <div key={d} style={{ padding: '10px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>{d}</div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: '110px', background: 'white' }}>
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} style={{ height: '110px', background: '#fcfcfc', borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}></div>
                    ))}

                    {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayEvents = events[dateStr] || [];
                        const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                        return (
                            <div
                                key={day}
                                onClick={() => handleDateClick(day)}
                                style={{
                                    height: '110px',
                                    minHeight: '110px',
                                    maxHeight: '110px',
                                    overflow: 'hidden',
                                    borderRight: '1px solid #eee',
                                    borderBottom: '1px solid #eee',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    background: isToday ? 'rgba(28, 181, 224, 0.05)' : 'white',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>{day}</span>
                                <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {dayEvents.map((ev, idx) => (
                                        <div key={idx} style={{ fontSize: '0.6rem', background: getTypeColor(ev.type), color: 'white', padding: '1px 3px', borderRadius: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {ev.time} {ev.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
                        <div className="glass-panel" style={{ width: '90%', maxWidth: '600px', background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <h3 style={{ color: '#107c75', margin: 0, fontSize: '1.4rem' }}>{selectedDate}</h3>
                                <div style={{ background: '#f0f0f0', borderRadius: '50%', padding: '5px', cursor: 'pointer' }} onClick={() => setShowModal(false)}>
                                    <X size={20} color="#666" />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                {(events[selectedDate] || []).map(ev => (
                                    <div key={ev.id} style={{ padding: '15px', border: '1px solid #eee', background: ev.type === 'match' ? '#f8fafc' : 'white', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ background: getTypeColor(ev.type), color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{ev.type === 'match' ? 'PARTIDO' : 'ENTRENO'}</span>
                                                <span style={{ color: '#333', fontWeight: 'bold' }}>{ev.time} - {ev.title}</span>
                                            </div>
                                            <Trash2 size={16} color="#e74c3c" cursor="pointer" onClick={() => handleDeleteEvent(ev.id)} />
                                        </div>

                                        {ev.boxscore && (
                                            <div style={{ marginTop: '15px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '15px', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>{ev.boxscore.homeTeam}</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>{ev.boxscore.homeScore}</div>
                                                    </div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#cbd5e1' }}>VS</div>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>{ev.boxscore.awayTeam}</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>{ev.boxscore.awayScore}</div>
                                                    </div>
                                                </div>

                                                <div style={{ overflowX: 'auto' }}>
                                                    <h4 style={{ fontSize: '0.9rem', color: '#107c75', marginBottom: '10px', borderLeft: '3px solid #107c75', paddingLeft: '8px' }}>BOX SCORE - {ev.boxscore.homeTeam}</h4>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginBottom: '15px' }}>
                                                        <thead>
                                                            <tr style={{ textAlign: 'left', background: '#f1f5f9', color: '#475569' }}>
                                                                <th style={{ padding: '6px' }}>#</th>
                                                                <th style={{ padding: '6px' }}>Jugador</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>PTS</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>FG</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>3PT</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>REB</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>AST</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(ev.boxscore.homePlayers || []).map(p => {
                                                                const s = ev.boxscore.playerStats[p.id] || { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0 };
                                                                return (
                                                                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                                        <td style={{ padding: '6px', fontWeight: 'bold' }}>{p.number}</td>
                                                                        <td style={{ padding: '6px' }}>{p.name}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{s.pts}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.fgm}-{s.fga}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s['3pm']}-{s['3pa']}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.reb}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.ast}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    <h4 style={{ fontSize: '0.9rem', color: '#e05d35', marginBottom: '10px', borderLeft: '3px solid #e05d35', paddingLeft: '8px' }}>BOX SCORE - {ev.boxscore.awayTeam}</h4>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                                                        <thead>
                                                            <tr style={{ textAlign: 'left', background: '#fef2f2', color: '#991b1b' }}>
                                                                <th style={{ padding: '6px' }}>#</th>
                                                                <th style={{ padding: '6px' }}>Jugador</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>PTS</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>FG</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>3PT</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>REB</th>
                                                                <th style={{ padding: '6px', textAlign: 'center' }}>AST</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(ev.boxscore.awayPlayers || []).map(p => {
                                                                const s = ev.boxscore.playerStats[p.id] || { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0 };
                                                                return (
                                                                    <tr key={p.id} style={{ borderBottom: '1px solid #fee2e2' }}>
                                                                        <td style={{ padding: '6px', fontWeight: 'bold' }}>{p.number}</td>
                                                                        <td style={{ padding: '6px' }}>{p.name}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>{s.pts}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.fgm}-{s.fga}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s['3pm']}-{s['3pa']}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.reb}</td>
                                                                        <td style={{ padding: '6px', textAlign: 'center' }}>{s.ast}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input className="glass-input" style={{ flex: 1, padding: '8px', background: '#f4f4f4', color: 'black' }} placeholder="Tarea..." value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                                <input type="time" className="glass-input" style={{ width: '80px', padding: '8px', background: '#f4f4f4', color: 'black' }} value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                                <button className="btn btn-primary" onClick={handleAddEvent}>+</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .glass-input { border: 1px solid #ddd; border-radius: 4px; outline: none; }
                .calendar-view { color: var(--text-main); }
            `}</style>
        </motion.div>
    );
};

export default Calendar;
