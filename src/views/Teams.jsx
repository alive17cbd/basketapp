import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Plus, ArrowLeft, Trash2, Edit2, Users, Shirt, UserPlus, Save, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { NBA_TEAMS } from '../data/defaultTeams';

const Teams = () => {
    // view: 'leagues' | 'teams_in_league' | 'edit_team' | 'edit_player'
    const [view, setView] = useState('leagues');
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [activeTeam, setActiveTeam] = useState(null);
    const [activePlayer, setActivePlayer] = useState(null);
    const [teams, setTeams] = useState([]);

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('basketApp_teams');
        if (saved) {
            setTeams(JSON.parse(saved));
        } else {
            setTeams(NBA_TEAMS);
            localStorage.setItem('basketApp_teams', JSON.stringify(NBA_TEAMS));
        }
    }, []);

    const saveTeams = (updatedTeams) => {
        setTeams(updatedTeams);
        localStorage.setItem('basketApp_teams', JSON.stringify(updatedTeams));
    };

    // Derived Leagues
    const leagues = Array.from(new Set(teams.map(t => t.league || 'Sin Liga'))).sort();

    // Handlers
    const handleAddLeague = () => {
        const name = prompt('Nombre de la nueva liga/categoría:');
        if (name) {
            // To create a league, we just need a name. It will appear when a team is added to it.
            // But if we want empty folders, we might need a separate 'leagues' state.
            // For now, let's just use the teams grouping. To show an empty folder, we'd need a temp team or a league list.
            // Let's add a dummy team for the new league if it doesn't exist? No, better use a leagues array.
        }
    };

    const handleCreateTeam = () => {
        const newTeam = {
            id: Date.now(),
            name: 'Nuevo Equipo',
            coach: '',
            coCoach: '',
            league: selectedLeague,
            color: '#107c75',
            players: []
        };
        const updated = [...teams, newTeam];
        saveTeams(updated);
        setActiveTeam(newTeam);
        setView('edit_team');
    };

    const handleSaveTeam = (team) => {
        const updated = teams.map(t => t.id === team.id ? team : t);
        if (!teams.find(t => t.id === team.id)) updated.push(team);
        saveTeams(updated);
        setActiveTeam(team);
    };

    const handleDeleteTeam = (id) => {
        if (confirm('¿Eliminar equipo definitivamente?')) {
            const updated = teams.filter(t => t.id !== id);
            saveTeams(updated);
            setView('teams_in_league');
        }
    };

    const handleSavePlayer = (player) => {
        const updatedPlayers = activeTeam.players.some(p => p.id === player.id)
            ? activeTeam.players.map(p => p.id === player.id ? player : p)
            : [...activeTeam.players, player];

        const updatedTeam = { ...activeTeam, players: updatedPlayers };
        handleSaveTeam(updatedTeam);
        setView('edit_team');
    };

    const handleDeletePlayer = (playerId) => {
        if (confirm('¿Eliminar jugador de la plantilla?')) {
            const updatedTeam = { ...activeTeam, players: activeTeam.players.filter(p => p.id !== playerId) };
            handleSaveTeam(updatedTeam);
        }
    };

    // --- LEAGUE FOLDERS VIEW ---
    if (view === 'leagues') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="teams-management" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', color: '#000851' }}>CENTRO DE EQUIPOS</h1>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Gestiona ligas, franquicias y plantillas oficiales.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => {
                        const name = prompt('Nueva Liga:');
                        if (name && !leagues.includes(name)) {
                            // Add a placeholder team to show the folder
                            const placeholder = { id: Date.now(), name: 'Equipo de Prueba', league: name, players: [], coach: '', color: '#94a3b8' };
                            saveTeams([...teams, placeholder]);
                        }
                    }}>
                        <Plus size={18} /> Nueva Liga
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px' }}>
                    {leagues.map(league => (
                        <motion.div
                            key={league}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => { setSelectedLeague(league); setView('teams_in_league'); }}
                            style={{
                                background: 'white',
                                padding: '30px 20px',
                                borderRadius: '24px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '15px',
                                border: '1px solid #f1f5f9'
                            }}
                        >
                            <div style={{ padding: '20px', background: '#f1f5f9', borderRadius: '20px', color: '#000851' }}>
                                <Folder size={48} fill="#000851" style={{ opacity: 0.1 }} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{league}</h3>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                                    {teams.filter(t => t.league === league).length} Equipos
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // --- TEAMS IN LEAGUE VIEW ---
    if (view === 'teams_in_league') {
        const leagueTeams = teams.filter(t => t.league === selectedLeague);
        return (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    <button className="btn btn-secondary" onClick={() => setView('leagues')} style={{ borderRadius: '12px' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>LIGA SELECCIONADA</div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', margin: 0, color: '#000851' }}>{selectedLeague}</h1>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <button className="btn btn-primary" onClick={handleCreateTeam}>
                            <Plus size={18} /> Añadir Equipo
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {leagueTeams.map(team => (
                        <div key={team.id} className="glass-panel" style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '20px',
                            border: `1px solid ${team.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }} onClick={() => { setActiveTeam(team); setView('edit_team'); }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        >
                            <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: team.color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {team.name.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{team.name}</h4>
                                <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>{team.players.length} Jugadores</p>
                            </div>
                            <ChevronRight size={20} color="#cbd5e1" />
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // --- TEAM EDITOR (Stats Style) ---
    if (view === 'edit_team') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                    <button className="btn btn-secondary" onClick={() => setView('teams_in_league')}><ArrowLeft size={20} /></button>
                    <div style={{ flex: 1 }}>
                        <input
                            value={activeTeam.name}
                            onChange={e => setActiveTeam({ ...activeTeam, name: e.target.value })}
                            onBlur={() => handleSaveTeam(activeTeam)}
                            style={{
                                fontSize: '2rem',
                                border: 'none',
                                background: 'transparent',
                                fontWeight: 'bold',
                                fontFamily: 'Oswald',
                                color: '#000851',
                                width: '100%',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', border: '2px solid white', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <input
                                type="color"
                                value={activeTeam.color || '#107c75'}
                                onChange={e => setActiveTeam({ ...activeTeam, color: e.target.value })}
                                style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', border: 'none', cursor: 'pointer' }}
                            />
                        </div>
                        <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDeleteTeam(activeTeam.id)}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '25px', borderRadius: '24px' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#94a3b8', textTransform: 'uppercase' }}>Configuración Staff</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Entrenador Principal</label>
                                <input
                                    className="glass-input"
                                    style={{ width: '100%', background: '#f8fafc' }}
                                    value={activeTeam.coach}
                                    onChange={e => setActiveTeam({ ...activeTeam, coach: e.target.value })}
                                    onBlur={() => handleSaveTeam(activeTeam)}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Asistente / Co-Coach</label>
                                <input
                                    className="glass-input"
                                    style={{ width: '100%', background: '#f8fafc' }}
                                    value={activeTeam.coCoach || ''}
                                    onChange={e => setActiveTeam({ ...activeTeam, coCoach: e.target.value })}
                                    onBlur={() => handleSaveTeam(activeTeam)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ background: 'white', padding: '25px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ padding: '20px', background: `${activeTeam.color}15`, borderRadius: '30%', color: activeTeam.color, marginBottom: '15px' }}>
                            <Users size={40} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{activeTeam.players.length}</h4>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Jugadores en Plantilla</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, fontFamily: 'Oswald', fontSize: '1.5rem' }}>PLANTILLA OFICIAL</h2>
                    <button className="btn btn-primary" onClick={() => {
                        setActivePlayer({ id: Date.now(), name: '', number: '', pos: 'Base' });
                        setView('edit_player');
                    }}>
                        <Plus size={18} /> Añadir Jugador
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                    {activeTeam.players.map(p => (
                        <div key={p.id} style={{
                            background: 'white',
                            padding: '15px 20px',
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                            border: '1px solid #f1f5f9'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    border: `2px solid ${activeTeam.color}`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {p.number}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.pos}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Edit2 size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setActivePlayer(p); setView('edit_player'); }} />
                                <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDeletePlayer(p.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // --- PLAYER EDITOR ---
    if (view === 'edit_player') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '30px', maxWidth: '500px', margin: '50px auto' }}>
                <div className="glass-panel" style={{ background: 'white', padding: '30px', borderRadius: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Oswald', marginBottom: '30px' }}>FICHA DE JUGADOR</h2>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '5px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                            <Shirt size={60} color={activeTeam.color} fill={`${activeTeam.color}20`} />
                            <span style={{ position: 'absolute', fontWeight: 'bold', fontSize: '1.2rem', color: activeTeam.color }}>{activePlayer.number || '00'}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Nombre Completo</label>
                            <input
                                className="glass-input"
                                style={{ width: '100%', background: '#f8fafc' }}
                                value={activePlayer.name}
                                onChange={e => setActivePlayer({ ...activePlayer, name: e.target.value })}
                                placeholder="Ej. Michael Jordan"
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Número</label>
                                <input
                                    className="glass-input"
                                    type="number"
                                    style={{ width: '100%', background: '#f8fafc' }}
                                    value={activePlayer.number}
                                    onChange={e => setActivePlayer({ ...activePlayer, number: e.target.value })}
                                    placeholder="23"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '5px', fontWeight: 'bold' }}>Posición</label>
                                <select
                                    className="glass-input"
                                    style={{ width: '100%', background: '#f8fafc' }}
                                    value={activePlayer.pos}
                                    onChange={e => setActivePlayer({ ...activePlayer, pos: e.target.value })}
                                >
                                    <option>Base</option>
                                    <option>Escolta</option>
                                    <option>Alero</option>
                                    <option>Ala-Pívot</option>
                                    <option>Pívot</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setView('edit_team')}>Cancelar</button>
                            <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => handleSavePlayer(activePlayer)}>
                                <Save size={18} /> Guardar Ficha
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return null;
};

export default Teams;
