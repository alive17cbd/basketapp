import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, Users, Trophy, MoreVertical, RotateCcw, BarChart2, Repeat, Shirt, Plus, Edit2, Trash2, Save, X, ArrowLeft, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// --- SOUND HELPER ---
const playSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Sound blocked by browser policy"));
};

// --- HELPER COMPONENTS ---

const JerseyIcon = ({ number, color, isSelected, onClick, label, size = 'normal' }) => {
    let scale = 1.0;
    if (size === 'large') scale = 1.4;
    if (size === 'starter') scale = 0.85;
    if (size === 'sub') scale = 0.65;

    return (
        <div
            onClick={() => { playSound(); onClick(); }}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                transform: `scale(${scale})`,
                transition: 'all 0.2s',
                margin: size === 'sub' ? '-5px -2px' : size === 'starter' ? '0 4px' : '0 8px',
                position: 'relative'
            }}
        >
            <div style={{
                position: 'relative',
                width: '55px', height: '55px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderRadius: '50%',
                border: isSelected ? `3px solid #ff9f43` : '3px solid transparent',
                boxShadow: isSelected ? '0 0 10px rgba(255, 159, 67, 0.5)' : 'none',
                background: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    <path d="M6 3L4 6V21H20V6L18 3H15C15 4.5 13.5 5.5 12 5.5C10.5 5.5 9 4.5 9 3H6Z" stroke="white" strokeWidth="1" />
                </svg>
                <span style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -35%)',
                    color: 'white', fontWeight: '900', fontSize: '24px',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}>
                    {number}
                </span>
            </div>
            <span style={{
                fontSize: size === 'sub' ? '1.05rem' : '1.2rem',
                color: '#333', marginTop: '6px', maxWidth: '100px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                fontWeight: isSelected ? 'bold' : '600',
                textAlign: 'center'
            }}>
                {label.split(' ')[1] || label}
            </span>
        </div>
    );
};

const ActionButton = ({ label, color, onClick, subLabel, crossed }) => (
    <button
        onClick={() => { playSound(); onClick(); }}
        style={{
            background: color, color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '100%', width: '100%', boxShadow: '0 3px 0 rgba(0,0,0,0.1)', cursor: 'pointer',
            position: 'relative', overflow: 'hidden'
        }}
    >
        {label}
        {crossed && (
            <div style={{ position: 'absolute', width: '120%', height: '2px', background: 'white', transform: 'rotate(-45deg)', opacity: 0.8 }}></div>
        )}
        {subLabel && <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>{subLabel}</span>}
    </button>
);

// --- BOX SCORE COMPONENT ---

const BoxScoreTable = ({ team, players, stats }) => {
    const totals = useMemo(() => {
        return players.reduce((acc, p) => {
            const s = stats[p.id] || { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0, to: 0, pf: 0 };
            return {
                pts: acc.pts + s.pts,
                fgm: acc.fgm + s.fgm,
                fga: acc.fga + s.fga,
                '3pm': acc['3pm'] + (s['3pm'] || 0),
                '3pa': acc['3pa'] + (s['3pa'] || 0),
                reb: acc.reb + s.reb,
                ast: acc.ast + s.ast,
                to: acc.to + s.to,
                pf: acc.pf + s.pf
            };
        }, { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0, to: 0, pf: 0 });
    }, [players, stats]);

    return (
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '0', borderRadius: '12px', border: 'none', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className="panel-header" style={{ background: team?.id?.includes('home') ? '#107c75' : '#e05d35', color: 'white', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', padding: '15px 20px' }}>
                <span style={{ fontSize: '1.4rem', fontFamily: 'Oswald', letterSpacing: '1px' }}>{team?.name || 'EQUIPO'} - ESTADÍSTICAS</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', color: '#555', borderBottom: '2px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '15px 20px', fontFamily: 'Oswald', fontSize: '1rem', color: '#888' }}>JUGADOR</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>MIN</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1.1rem', color: '#1cb5e0' }}>PTS</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>FG</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>3PT</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>REB</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>AST</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>TO</th>
                            <th style={{ padding: '15px 10px', textAlign: 'center', fontFamily: 'Oswald', fontSize: '1rem' }}>PF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p, i) => {
                            const s = stats[p.id] || { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0, to: 0, pf: 0 };
                            return (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f2f2f2', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '12px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#333' }}>#{p.number}</span>
                                            <span style={{ fontWeight: '500', fontSize: '1.1rem', color: '#444' }}>{p.name ? (p.name.split(' ').slice(-1)[0] || p.name) : '---'}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#999', textTransform: 'uppercase' }}>{p.pos ? p.pos.charAt(0) : ''}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', color: '#bdc3c7', fontSize: '1rem' }}>--</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '900', fontSize: '1.3rem', color: '#000851' }}>{s.pts || 0}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1rem', fontWeight: '500' }}>{(s.fgm || 0)}-{(s.fga || 0)}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1rem', fontWeight: '500' }}>{(s['3pm'] || 0)}-{(s['3pa'] || 0)}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>{s.reb || 0}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600' }}>{s.ast || 0}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1rem', color: '#e67e22' }}>{s.to || 0}</td>
                                    <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '1rem', color: (s.pf || 0) >= 4 ? '#e74c3c' : '#7f8c8d' }}>{s.pf || 0}</td>
                                </tr>
                            );
                        })}
                        {/* TOTALS ROW */}
                        <tr style={{ background: '#f8fafc', fontWeight: 'bold' }}>
                            <td style={{ padding: '15px 20px', fontSize: '1.1rem', color: '#2c3e50', fontFamily: 'Oswald' }}>TOTAL EQUIPO</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center' }}></td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontWeight: '900', fontSize: '1.5rem', color: '#000851' }}>{totals.pts}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.1rem' }}>{totals.fgm}-{totals.fga}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.1rem' }}>{totals['3pm']}-{totals['3pa']}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.2rem' }}>{totals.reb}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.2rem' }}>{totals.ast}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.1rem' }}>{totals.to}</td>
                            <td style={{ padding: '15px 10px', textAlign: 'center', fontSize: '1.1rem' }}>{totals.pf}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

// 1. SEASON STATS
const SeasonStats = () => {
    // Keeps existing logic
    const players = [
        { id: 1, name: 'M. Rossi', gp: 12, min: 28.5, pts: 18.2, reb: 4.5, ast: 6.2, stl: 1.8, blk: 0.2, fg: 45, three: 38, ft: 88, eff: 19.5 },
        { id: 2, name: 'D. Smith', gp: 11, min: 32.1, pts: 22.4, reb: 8.1, ast: 2.5, stl: 0.9, blk: 1.2, fg: 52, three: 33, ft: 75, eff: 23.1 },
    ];
    return (
        <div className="animate-fade-in"><div className="glass-panel" style={{ padding: '0', overflowX: 'auto' }}><div className="panel-header" style={{ background: '#2c3e50', color: 'white' }}>PROMEDIOS DE TEMPORADA</div><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}><thead><tr style={{ background: '#f8f9fa', color: '#555' }}><th style={{ padding: '10px' }}>JUGADOR</th><th style={{ padding: '10px' }}>PTS</th><th style={{ padding: '10px' }}>REB</th><th style={{ padding: '10px' }}>AST</th><th style={{ padding: '10px' }}>EFF</th></tr></thead><tbody>{players.map((p, i) => (<tr key={i} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '10px' }}>{p.name}</td><td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{p.pts}</td><td style={{ padding: '10px', textAlign: 'center' }}>{p.reb}</td><td style={{ padding: '10px', textAlign: 'center' }}>{p.ast}</td><td style={{ padding: '10px', textAlign: 'center' }}>{p.eff}</td></tr>))}</tbody></table></div></div>
    );
};

// 2. LIVE GAME TRACKER
const LiveTracker = ({ gameConfig, onExit, initialState }) => {
    const [gameTime, setGameTime] = useState(initialState?.gameTime ?? (gameConfig.periodDuration * 60));
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showBoxScore, setShowBoxScore] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showBench, setShowBench] = useState(false);
    const [quarter, setQuarter] = useState(initialState?.quarter ?? 1);

    // Core State
    const [events, setEvents] = useState(initialState?.events ?? []); // Single source of truth
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [substitutionMode, setSubstitutionMode] = useState(null); // { team: 'home'|'away', playerOutId: string }

    // Players on court (IDs) - initialized with first 5 or rescued state
    const [homeOnCourt, setHomeOnCourt] = useState(initialState?.homeOnCourt ?? gameConfig.homeTeam.players.slice(0, 5).map(p => p.id));
    const [awayOnCourt, setAwayOnCourt] = useState(initialState?.awayOnCourt ?? gameConfig.awayTeam.players.slice(0, 5).map(p => p.id));

    useEffect(() => {
        let interval;
        if (isTimerRunning && gameTime > 0) {
            interval = setInterval(() => setGameTime(t => t - 1), 1000);
        } else if (gameTime === 0 && isTimerRunning) {
            setIsTimerRunning(false);
            playSound();
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, gameTime]);

    const resetGameClock = () => {
        setGameTime(gameConfig.periodDuration * 60);
        setIsTimerRunning(false);
        playSound();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- PERSISTENCE (AUTO-SAVE) ---
    useEffect(() => {
        const gameState = {
            events,
            gameTime,
            quarter,
            homeOnCourt,
            awayOnCourt,
            gameConfig,
            lastUpdated: Date.now()
        };
        localStorage.setItem('basketApp_liveGame', JSON.stringify(gameState));
    }, [events, gameTime, quarter, homeOnCourt, awayOnCourt, gameConfig]);

    const handleAction = (type, value, detail = '') => {
        if (!selectedPlayer && type !== 'timeout' && type !== 'timer' && type !== 'quarter') {
            alert("Selecciona un jugador primero"); return;
        }
        const newEvent = {
            id: Date.now(),
            time: formatTime(gameTime),
            quarter,
            player: selectedPlayer,
            type,
            value,
            detail
        };
        setEvents([newEvent, ...events]);
        setSelectedPlayer(null);

        playSound();

        if (type === 'timeout') {
            setIsTimerRunning(false);
        }
    };

    const deleteEvent = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
            setEvents(events.filter(ev => ev.id !== id));
            playSound();
        }
    };

    const handleSubstitution = (playerIn) => {
        if (!substitutionMode) return;

        const { team, playerOutId } = substitutionMode;
        if (team === 'home') {
            setHomeOnCourt(prev => prev.map(id => id === playerOutId ? playerIn.id : id));
        } else {
            setAwayOnCourt(prev => prev.map(id => id === playerOutId ? playerIn.id : id));
        }

        handleAction('sub', 0, `IN: ${playerIn.number}, OUT: ${substitutionMode.playerOutNumber}`);
        setSubstitutionMode(null);
        setSelectedPlayer(null);
    };

    const handleSubstitutionDirect = (team, playerOutId, playerIn) => {
        const teamObj = team === 'home' ? gameConfig.homeTeam : gameConfig.awayTeam;
        const pOut = teamObj.players.find(p => p.id === playerOutId);

        if (team === 'home') {
            setHomeOnCourt(prev => prev.map(id => id === playerOutId ? playerIn.id : id));
        } else {
            setAwayOnCourt(prev => prev.map(id => id === playerOutId ? playerIn.id : id));
        }

        handleAction('sub', 0, `IN: ${playerIn.number}, OUT: ${pOut?.number}`);
        setSelectedPlayer(null);
    };

    // --- DERIVED STATS ---
    const { homeScore, awayScore, playerStats, homeQuarterFouls, awayQuarterFouls, homeTimeoutsUsed, awayTimeoutsUsed } = useMemo(() => {
        let hScore = 0;
        let aScore = 0;
        let hQFouls = 0;
        let aQFouls = 0;
        let hTO = 0;
        let aTO = 0;
        const pStats = {};

        const initP = (pid) => {
            if (!pStats[pid]) pStats[pid] = { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0, to: 0, pf: 0 };
        };

        [...events].reverse().forEach(ev => {
            if (ev.type === 'timeout') {
                const isFirstHalf = quarter <= 2;
                const evIsFirstHalf = ev.quarter <= 2;
                if (isFirstHalf === evIsFirstHalf) {
                    if (ev.detail === 'home') hTO++; else aTO++;
                }
                return;
            }

            if (!ev.player) return;
            initP(ev.player.id);
            const stats = pStats[ev.player.id];
            const isHome = ev.player.team === 'home';

            if (ev.type === 'score') {
                stats.pts += ev.value;
                if (isHome) hScore += ev.value; else aScore += ev.value;

                if (ev.detail === '3FG') { stats.fgm++; stats.fga++; stats['3pm']++; stats['3pa']++; }
                else if (ev.detail === '2FG') { stats.fgm++; stats.fga++; }
            } else if (ev.type === 'miss') {
                if (ev.detail === '3FG') { stats.fga++; stats['3pa']++; }
                else if (ev.detail === '2FG') { stats.fga++; }
            } else if (ev.type === 'reb') {
                stats.reb++;
            } else if (ev.type === 'ast') {
                stats.ast++;
            } else if (ev.type === 'to') {
                stats.to++;
            } else if (ev.type === 'foul') {
                stats.pf++;
                if (ev.quarter === quarter) {
                    if (isHome) hQFouls++; else aQFouls++;
                }
            }
        });

        return {
            homeScore: hScore,
            awayScore: aScore,
            playerStats: pStats,
            homeQuarterFouls: hQFouls,
            awayQuarterFouls: aQFouls,
            homeTimeoutsUsed: hTO,
            awayTimeoutsUsed: aTO
        };
    }, [events, quarter]);

    const finalizeGame = () => {
        if (!confirm("¿Deseas finalizar el partido y guardar el resultado en el calendario?")) return;

        const timestamp = new Date();
        const dateStr = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')}`;

        // Load existing calendar events
        let calendarEvents = {};
        try {
            const saved = localStorage.getItem('basket_calendar_events');
            if (saved) calendarEvents = JSON.parse(saved);
        } catch (e) { }

        const matchEvent = {
            id: Date.now(),
            type: 'match',
            title: `RESULTADO: ${gameConfig.homeTeam.name} ${homeScore} - ${awayScore} ${gameConfig.awayTeam.name}`,
            time: `${timestamp.getHours()}:${String(timestamp.getMinutes()).padStart(2, '0')}`,
            boxscore: {
                homeTeam: gameConfig.homeTeam.name,
                awayTeam: gameConfig.awayTeam.name,
                homeScore,
                awayScore,
                playerStats,
                homePlayers: gameConfig.homeTeam.players,
                awayPlayers: gameConfig.awayTeam.players
            }
        };

        const dayEvents = calendarEvents[dateStr] || [];
        calendarEvents[dateStr] = [...dayEvents, matchEvent];
        localStorage.setItem('basket_calendar_events', JSON.stringify(calendarEvents));

        // Clear live game save
        localStorage.removeItem('basketApp_liveGame');
        alert("Partido finalizado y guardado en el calendario.");
        onExit();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const timestamp = new Date().toLocaleString();

        // Header
        doc.setFontSize(22);
        doc.text("REPORTE DE PARTIDO - ALIVE BASKET", 105, 20, { align: "center" });
        doc.setFontSize(12);
        doc.text(`Fecha: ${timestamp}`, 105, 30, { align: "center" });
        doc.text(`${gameConfig.homeTeam.name} ${homeScore} - ${awayScore} ${gameConfig.awayTeam.name}`, 105, 40, { align: "center" });

        const prepareTableData = (team, players) => {
            const head = [['#', 'Nombre', 'PTS', 'FG', '3PT', 'REB', 'AST', 'TO', 'PF']];
            const body = players.map(p => {
                const s = playerStats[p.id] || { pts: 0, fgm: 0, fga: 0, '3pm': 0, '3pa': 0, reb: 0, ast: 0, to: 0, pf: 0 };
                return [
                    p.number,
                    p.name,
                    s.pts,
                    `${s.fgm}-${s.fga}`,
                    `${s['3pm']}-${s['3pa']}`,
                    s.reb,
                    s.ast,
                    s.to,
                    s.pf
                ];
            });
            return { head, body };
        };

        const homeData = prepareTableData(gameConfig.homeTeam, gameConfig.homeTeam.players);
        doc.text(`Estadísticas: ${gameConfig.homeTeam.name}`, 14, 55);
        doc.autoTable({
            head: homeData.head,
            body: homeData.body,
            startY: 60,
            theme: 'striped',
            headStyles: { fillColor: [16, 124, 117] }
        });

        const awayData = prepareTableData(gameConfig.awayTeam, gameConfig.awayTeam.players);
        const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 70) || 70;
        doc.text(`Estadísticas: ${gameConfig.awayTeam.name}`, 14, finalY + 15);
        doc.autoTable({
            head: awayData.head,
            body: awayData.body,
            startY: finalY + 20,
            theme: 'striped',
            headStyles: { fillColor: [224, 93, 53] }
        });

        doc.save(`partido_${gameConfig.homeTeam.name}_vs_${gameConfig.awayTeam.name}.pdf`);
        playSound('click');
    };

    const maxTimeouts = quarter <= 2 ? 2 : 3;
    const homeTOLeft = Math.max(0, maxTimeouts - homeTimeoutsUsed);
    const awayTOLeft = Math.max(0, maxTimeouts - awayTimeoutsUsed);

    const TEAL_MAIN = '#107c75';
    const TEAL_BTN = '#1e8e8e';
    const ORANGE_BTN = '#e05d35';
    const BLUE_BTN = '#76a9c9';

    return (
        <div className="live-tracker" style={{
            background: '#107c75',
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            position: 'relative'
        }}>

            {/* BOX SCORE OVERLAY */}
            <AnimatePresence>
                {showBoxScore && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: '#f4f6f9', zIndex: 50, color: '#333', display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '15px', background: 'white', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={exportToPDF} style={{ background: '#107c75', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Download size={16} /> PDF
                                </button>
                                <button onClick={finalizeGame} style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Trophy size={16} /> FINALIZAR PARTIDO
                                </button>
                                <h3 style={{ margin: 0, marginLeft: '10px' }}>Estadísticas</h3>
                            </div>
                            <button onClick={() => { playSound(); setShowBoxScore(false); }} style={{ background: 'none', border: 'none', padding: '5px' }}><X size={24} /></button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                <span style={{ color: '#2ecc71' }}>{gameConfig.homeTeam.name} {homeScore}</span>
                                <span style={{ margin: '0 10px', color: '#ccc' }}>-</span>
                                <span style={{ color: '#f1c40f' }}>{awayScore} {gameConfig.awayTeam.name}</span>
                            </div>

                            <BoxScoreTable team={gameConfig.homeTeam} players={gameConfig.homeTeam.players} stats={playerStats} />
                            <BoxScoreTable team={gameConfig.awayTeam} players={gameConfig.awayTeam.players} stats={playerStats} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PLAY-BY-PLAY OVERLAY */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: '#f4f6f9', zIndex: 60, color: '#333', display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '15px', background: 'white', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ margin: 0 }}>Historial del Partido</h3>
                            <button onClick={() => { playSound(); setShowHistory(false); }} style={{ background: 'none', border: 'none', padding: '5px' }}><X size={24} /></button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                            {events.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>No hay eventos registrados</div>
                            ) : (
                                events.map((ev) => (
                                    <div key={ev.id} style={{
                                        padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '8px',
                                        display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{ fontWeight: 'bold', color: '#107c75', fontSize: '0.8rem', minWidth: '45px' }}>{ev.time}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#888', background: '#eee', padding: '2px 5px', borderRadius: '4px' }}>{ev.quarter}Q</div>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontWeight: 'bold' }}>{ev.player ? `${ev.player.name} (#${ev.player.number})` : 'Sistema'}</span>
                                            <div style={{ fontSize: '0.85rem' }}>
                                                {ev.type.toUpperCase()}: {ev.detail || ''} {ev.value !== 0 ? `(${ev.value})` : ''}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteEvent(ev.id)}
                                            style={{ background: 'none', border: 'none', color: '#e74c3c', padding: '5px', cursor: 'pointer', opacity: 0.7 }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER / SCOREBOARD */}
            <div style={{
                padding: '10px 15px',
                background: '#0a4d49',
                borderBottom: '2px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ChevronLeft onClick={() => { playSound(); onExit(); }} style={{ cursor: 'pointer' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.8 }}>ALIVE GAME TRACKER</div>
                    <MoreVertical size={20} onClick={() => playSound()} style={{ cursor: 'pointer', opacity: 0.8 }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px' }}>
                    {/* HOME SCORE */}
                    <div style={{ textAlign: 'left', flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '2px', color: '#ced4da' }}>{gameConfig.homeTeam.name.toUpperCase()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: 1, fontFamily: 'monospace', color: '#fff' }}>{homeScore}</div>
                            <div
                                onClick={() => { playSound(); if (homeTOLeft > 0 && confirm("¿Tiempo muerto para " + gameConfig.homeTeam.name + "?")) handleAction('timeout', 1, 'home'); }}
                                style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold', gap: '2px' }}
                            >
                                <span style={{ color: homeQuarterFouls >= 5 ? '#ff4757' : '#fff', background: homeQuarterFouls >= 5 ? 'rgba(255,71,87,0.2)' : 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '3px' }}>F: {homeQuarterFouls}</span>
                                <span style={{ color: '#f1c40f', background: 'rgba(241,196,15,0.1)', padding: '1px 4px', borderRadius: '3px' }}>TO: {homeTOLeft}</span>
                            </div>
                        </div>
                    </div>

                    {/* RELOJ CENTRAL Y CUARTO */}
                    <div style={{ flex: '0 0 auto', textAlign: 'center', margin: '0 10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '-5px' }}>RELOJ</div>
                            <div style={{ fontSize: '2.8rem', fontWeight: '900', fontFamily: 'monospace', color: isTimerRunning ? '#2ecc71' : '#ff4757' }}>
                                {formatTime(gameTime)}
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                playSound();
                                const nextQ = quarter < 4 ? quarter + 1 : 1;
                                setQuarter(nextQ);
                                resetGameClock();
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.14)',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                fontWeight: '900',
                                fontSize: '1.4rem',
                                cursor: 'pointer',
                                border: '1px solid rgba(255,255,255,0.2)',
                                alignSelf: 'center',
                                marginTop: '5px'
                            }}
                        >
                            {quarter}Q
                        </div>
                    </div>

                    {/* AWAY SCORE */}
                    <div style={{ textAlign: 'right', flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '2px', color: '#ced4da' }}>{gameConfig.awayTeam.name.toUpperCase()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                            <div
                                onClick={() => { playSound(); if (awayTOLeft > 0 && confirm("¿Tiempo muerto para " + gameConfig.awayTeam.name + "?")) handleAction('timeout', 1, 'away'); }}
                                style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', textAlign: 'right', cursor: 'pointer', fontWeight: 'bold', gap: '2px' }}
                            >
                                <span style={{ color: awayQuarterFouls >= 5 ? '#ff4757' : '#fff', background: awayQuarterFouls >= 5 ? 'rgba(255,71,87,0.2)' : 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '3px' }}>F: {awayQuarterFouls}</span>
                                <span style={{ color: '#f1c40f', background: 'rgba(241,196,15,0.1)', padding: '1px 4px', borderRadius: '3px' }}>TO: {awayTOLeft}</span>
                            </div>
                            <div style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: 1, fontFamily: 'monospace', color: '#fff' }}>{awayScore}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHITE CARD CONTAINER */}
            <div style={{
                background: '#f8f9fa',
                flex: 1,
                width: '100%',
                borderTopLeftRadius: '25px',
                borderTopRightRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                padding: '15px 10px',
                overflowY: 'auto',
                color: '#333',
                boxShadow: '0 -5px 15px rgba(0,0,0,0.1)'
            }}>

                <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 10px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>EN CANCHA</div>
                        <button
                            onClick={() => { playSound(); setShowBench(!showBench); }}
                            style={{
                                background: showBench ? '#e05d35' : '#1e8e8e',
                                color: 'white', border: 'none', borderRadius: '20px',
                                padding: '6px 15px', fontSize: '0.8rem', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <Users size={16} />
                            {showBench ? 'OCULTAR BANCA' : 'VER BANCA / CAMBIOS'}
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '10px' }}>
                        {gameConfig.homeTeam.players.filter(p => homeOnCourt.includes(p.id)).map(p => (
                            <JerseyIcon
                                key={p.id} number={p.number} label={p.name} color={gameConfig.homeTeam.color || "#2ecc71"} size="starter"
                                isSelected={selectedPlayer?.id === p.id}
                                onClick={() => {
                                    playSound();
                                    if (substitutionMode?.team === 'home') {
                                        // If already in sub mode and clicking another starter, change the target
                                        setSubstitutionMode({ team: 'home', playerOutId: p.id, playerOutNumber: p.number });
                                    } else {
                                        setSelectedPlayer({ ...p, team: 'home' });
                                    }
                                }}
                            />
                        ))}
                    </div>
                    {/* BENCH HOME - CONDITIONAL BUT WRAPPABLE */}
                    {showBench && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', marginTop: '10px', padding: '10px 5px', background: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed #ccc' }}>
                            {gameConfig.homeTeam.players.filter(p => !homeOnCourt.includes(p.id)).map(p => (
                                <JerseyIcon
                                    key={p.id}
                                    number={p.number}
                                    label={p.name}
                                    color={gameConfig.homeTeam.color || "#2ecc71"}
                                    size="sub"
                                    isSelected={false}
                                    onClick={() => {
                                        playSound();
                                        if (substitutionMode?.team === 'home') handleSubstitution(p);
                                        else {
                                            if (selectedPlayer?.team === 'home') {
                                                handleSubstitutionDirect('home', selectedPlayer.id, p);
                                            }
                                        }
                                    }}
                                />
                            ))}
                            {/* SUB Toggle Button */}
                            <div
                                onClick={() => { playSound(); setSubstitutionMode({ team: 'home', playerOutId: selectedPlayer.id, playerOutNumber: selectedPlayer.number }); }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: substitutionMode?.team === 'home' ? '#e05d35' : '#fff',
                                    width: '45px', height: '45px', borderRadius: '50%', border: '1px solid #ddd', cursor: 'pointer', flexShrink: 0, alignSelf: 'center', marginLeft: '5px'
                                }}
                            >
                                <Repeat size={18} color={substitutionMode?.team === 'home' ? 'white' : '#777'} />
                            </div>
                        </div>
                    )}
                </div>

                {/* ACTION GRID */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'repeat(5, 1fr)', gap: '8px', padding: '5px 0' }}>
                    <ActionButton label="+3" color={TEAL_BTN} onClick={() => handleAction('score', 3, '3FG')} />
                    <ActionButton label="2" color={TEAL_BTN} onClick={() => handleAction('score', 2, '2FG')} />
                    <ActionButton label="+TL" color={TEAL_BTN} onClick={() => handleAction('score', 1, 'FT')} />

                    <div style={{ position: 'relative' }}><ActionButton label="3" color={ORANGE_BTN} crossed onClick={() => handleAction('miss', 3, '3FG')} /></div>
                    <div style={{ position: 'relative' }}><ActionButton label="2" color={ORANGE_BTN} crossed onClick={() => handleAction('miss', 2, '2FG')} /></div>
                    <div style={{ position: 'relative' }}><ActionButton label="TL" color={ORANGE_BTN} crossed onClick={() => handleAction('miss', 1, 'FT')} /></div>

                    <ActionButton label="TO" color="#f39c12" onClick={() => {
                        playSound();
                        if (confirm("¿Pedir tiempo muerto?")) {
                            const team = prompt("¿Qué equipo? (h/v)", "h") === 'h' ? 'home' : 'away';
                            handleAction('timeout', 1, team);
                        }
                    }} />

                    <div onClick={() => { playSound(); setIsTimerRunning(!isTimerRunning); }} style={{ gridColumn: '2', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <div style={{
                            background: isTimerRunning ? '#2ecc71' : '#ff4757',
                            color: 'white', border: '3px solid white', borderRadius: '12px',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                            height: '100%', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            padding: '5px'
                        }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', fontFamily: 'monospace', lineHeight: 1 }}>
                                {formatTime(gameTime)}
                            </div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginTop: '2px', opacity: 0.9 }}>
                                {gameConfig.homeTeam.name.charAt(0)} {homeScore} - {awayScore} {gameConfig.awayTeam.name.charAt(0)}
                            </div>
                        </div>
                    </div>

                    <ActionButton label="PÉR" color={BLUE_BTN} onClick={() => handleAction('to', 1)} />

                    <ActionButton label="RBO" color={BLUE_BTN} onClick={() => handleAction('reb', 1, 'OFF')} />
                    <ActionButton label="RBD" color={BLUE_BTN} onClick={() => handleAction('reb', 1, 'DEF')} />
                    <ActionButton label="AST" color={BLUE_BTN} onClick={() => handleAction('ast', 1)} />

                    <ActionButton label="TAP" color={BLUE_BTN} onClick={() => handleAction('blk', 1)} />
                    <ActionButton label="ROB" color={BLUE_BTN} onClick={() => handleAction('stl', 1)} />
                    <ActionButton
                        label={`FAL (${selectedPlayer?.team === 'home' ? homeQuarterFouls : awayQuarterFouls})`}
                        color="#e74c3c"
                        onClick={() => handleAction('foul', 1)}
                    />
                </div>

                {/* AWAY PLAYERS */}
                <div style={{ marginTop: '15px' }}>
                    {/* BENCH AWAY - CONDITIONAL BUT WRAPPABLE */}
                    {showBench && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', marginBottom: '10px', padding: '10px 5px', background: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed #ccc' }}>
                            <div
                                onClick={() => { playSound(); setSubstitutionMode({ team: 'away', playerOutId: selectedPlayer.id, playerOutNumber: selectedPlayer.number }); }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: substitutionMode?.team === 'away' ? '#e05d35' : '#fff',
                                    width: '45px', height: '45px', borderRadius: '50%', border: '1px solid #ddd', cursor: 'pointer', flexShrink: 0, alignSelf: 'center', marginRight: '5px'
                                }}
                            >
                                <Repeat size={18} color={substitutionMode?.team === 'away' ? 'white' : '#777'} />
                            </div>
                            {gameConfig.awayTeam.players.filter(p => !awayOnCourt.includes(p.id)).map(p => (
                                <JerseyIcon
                                    key={p.id}
                                    number={p.number}
                                    label={p.name}
                                    color={gameConfig.awayTeam.color || "#f1c40f"}
                                    size="sub"
                                    isSelected={false}
                                    onClick={() => {
                                        playSound();
                                        if (substitutionMode?.team === 'away') handleSubstitution(p);
                                        else {
                                            if (selectedPlayer?.team === 'away') {
                                                handleSubstitutionDirect('away', selectedPlayer.id, p);
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '5px' }}>
                        {gameConfig.awayTeam.players.filter(p => awayOnCourt.includes(p.id)).map(p => (
                            <JerseyIcon
                                key={p.id} number={p.number} label={p.name} color={gameConfig.awayTeam.color || "#f1c40f"} size="starter"
                                isSelected={selectedPlayer?.id === p.id}
                                onClick={() => {
                                    playSound();
                                    if (substitutionMode?.team === 'away') {
                                        setSubstitutionMode({ team: 'away', playerOutId: p.id, playerOutNumber: p.number });
                                    } else {
                                        setSelectedPlayer({ ...p, team: 'away' });
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div style={{ background: '#107c75', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1, cursor: 'pointer' }} onClick={() => { playSound(); setShowHistory(true); }}>
                        <RotateCcw size={20} color="white" />
                        <span style={{ fontSize: '0.6rem' }}>Historial</span>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.7rem', color: 'white', maxWidth: '120px', textAlign: 'center' }}>
                        {events.length > 0 ? `${events[0].player?.name.split(' ')[1] || events[0].player?.name || '---'} ${events[0].type}` : 'Esperando...'}
                    </div>
                    <div
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1, cursor: 'pointer' }}
                        onClick={() => { setShowBoxScore(true); playSound(); }} // Open Box Score
                    >
                        <BarChart2 size={20} color="white" />
                        <span style={{ fontSize: '0.6rem' }}>Stats</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. TEAM MANAGER (CRUD)
// --- PERSISTENCE HELPERS ---
// --- NBA 2025-2026 ROSTERS (FOR TESTING) ---
const NBA_TEAMS = [
    {
        id: 'nba_atl', name: 'Atlanta Hawks', coach: 'Quin Snyder', color: '#E03A3E',
        players: [
            { id: 'atl1', number: 11, name: 'Trae Young', pos: 'Base' },
            { id: 'atl2', number: 1, name: 'Zaccharie Risacher', pos: 'Alero' },
            { id: 'atl3', number: 13, name: 'Bogdan Bogdanovic', pos: 'Escolta' },
            { id: 'atl4', number: 41, name: 'Saddiq Bey', pos: 'Alero' },
            { id: 'atl5', number: 15, name: 'Clint Capela', pos: 'Pívot' },
            { id: 'atl6', number: 17, name: 'Onyeka Okongwu', pos: 'Pívot' },
            { id: 'atl7', number: 4, name: 'Kobe Bufkin', pos: 'Base' },
            { id: 'atl8', number: 8, name: 'Patty Mills', pos: 'Base' }
        ]
    },
    {
        id: 'nba_bos', name: 'Boston Celtics', coach: 'Joe Mazzulla', color: '#007A33',
        players: [
            { id: 'bos1', number: 0, name: 'Jayson Tatum', pos: 'Alero' },
            { id: 'bos2', number: 7, name: 'Jaylen Brown', pos: 'Escolta' },
            { id: 'bos3', number: 8, name: 'Kristaps Porzingis', pos: 'Pívot' },
            { id: 'bos4', number: 4, name: 'Jrue Holiday', pos: 'Base' },
            { id: 'bos5', number: 9, name: 'Derrick White', pos: 'Escolta' },
            { id: 'bos6', number: 42, name: 'Al Horford', pos: 'Ala-Pívot' },
            { id: 'bos7', number: 11, name: 'Payton Pritchard', pos: 'Base' },
            { id: 'bos8', number: 30, name: 'Sam Hauser', pos: 'Alero' }
        ]
    },
    {
        id: 'nba_bkn', name: 'Brooklyn Nets', coach: 'Jordi Fernandez', color: '#000000',
        players: [
            { id: 'bkn1', number: 24, name: 'Cam Thomas', pos: 'Escolta' },
            { id: 'bkn2', number: 28, name: 'Dorian Finney-Smith', pos: 'Alero' },
            { id: 'bkn3', number: 33, name: 'Nic Claxton', pos: 'Pívot' },
            { id: 'bkn4', number: 2, name: 'Cameron Johnson', pos: 'Alero' },
            { id: 'bkn5', number: 17, name: 'Dennis Schroder', pos: 'Base' },
            { id: 'bkn6', number: 20, name: 'Day\'Ron Sharpe', pos: 'Pívot' },
            { id: 'bkn7', number: 8, name: 'Lonnie Walker IV', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_cha', name: 'Charlotte Hornets', coach: 'Charles Lee', color: '#1D1160',
        players: [
            { id: 'cha1', number: 1, name: 'LaMelo Ball', pos: 'Base' },
            { id: 'cha2', number: 24, name: 'Brandon Miller', pos: 'Alero' },
            { id: 'cha3', number: 0, name: 'Miles Bridges', pos: 'Ala-Pívot' },
            { id: 'cha4', number: 4, name: 'Nick Richards', pos: 'Pívot' },
            { id: 'cha5', number: 23, name: 'Tre Mann', pos: 'Base' },
            { id: 'cha6', number: 10, name: 'Grant Williams', pos: 'Ala-Pívot' },
            { id: 'cha7', number: 31, name: 'Seth Curry', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_chi', name: 'Chicago Bulls', coach: 'Billy Donovan', color: '#CE1141',
        players: [
            { id: 'chi1', number: 8, name: 'Zach LaVine', pos: 'Escolta' },
            { id: 'chi2', number: 2, name: 'Lonzo Ball', pos: 'Base' },
            { id: 'chi3', number: 9, name: 'Nikola Vucevic', pos: 'Pívot' },
            { id: 'chi4', number: 0, name: 'Coby White', pos: 'Base' },
            { id: 'chi5', number: 17, name: 'Josh Giddey', pos: 'Base' },
            { id: 'chi6', number: 44, name: 'Patrick Williams', pos: 'Ala-Pívot' },
            { id: 'chi7', number: 3, name: 'Matas Buzelis', pos: 'Alero' }
        ]
    },
    {
        id: 'nba_cle', name: 'Cleveland Cavaliers', coach: 'Kenny Atkinson', color: '#860038',
        players: [
            { id: 'cle1', number: 45, name: 'Donovan Mitchell', pos: 'Escolta' },
            { id: 'cle2', number: 10, name: 'Darius Garland', pos: 'Base' },
            { id: 'cle3', number: 4, name: 'Evan Mobley', pos: 'Ala-Pívot' },
            { id: 'cle4', number: 31, name: 'Jarrett Allen', pos: 'Pívot' },
            { id: 'cle5', number: 35, name: 'Isaac Okoro', pos: 'Alero' },
            { id: 'cle6', number: 3, name: 'Caris LeVert', pos: 'Escolta' },
            { id: 'cle7', number: 20, name: 'Georges Niang', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_dal', name: 'Dallas Mavericks', coach: 'Jason Kidd', color: '#00538C',
        players: [
            { id: 'dal1', number: 77, name: 'Luka Doncic', pos: 'Base' },
            { id: 'dal2', number: 11, name: 'Kyrie Irving', pos: 'Escolta' },
            { id: 'dal3', number: 31, name: 'Klay Thompson', pos: 'Escolta' },
            { id: 'dal4', number: 2, name: 'Dereck Lively II', pos: 'Pívot' },
            { id: 'dal5', number: 21, name: 'Daniel Gafford', pos: 'Pívot' },
            { id: 'dal6', number: 25, name: 'P.J. Washington', pos: 'Ala-Pívot' },
            { id: 'dal7', number: 0, name: 'Dante Exum', pos: 'Base' },
            { id: 'dal8', number: 5, name: 'Quentin Grimes', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_den', name: 'Denver Nuggets', coach: 'Michael Malone', color: '#0E2240',
        players: [
            { id: 'den1', number: 15, name: 'Nikola Jokic', pos: 'Pívot' },
            { id: 'den2', number: 27, name: 'Jamal Murray', pos: 'Base' },
            { id: 'den3', number: 1, name: 'Michael Porter Jr.', pos: 'Alero' },
            { id: 'den4', number: 50, name: 'Aaron Gordon', pos: 'Ala-Pívot' },
            { id: 'den5', number: 4, name: 'Russell Westbrook', pos: 'Base' },
            { id: 'den6', number: 8, name: 'Peyton Watson', pos: 'Alero' },
            { id: 'den7', number: 0, name: 'Christian Braun', pos: 'Escolta' },
            { id: 'den8', number: 9, name: 'Dario Saric', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_det', name: 'Detroit Pistons', coach: 'J.B. Bickerstaff', color: '#C8102E',
        players: [
            { id: 'det1', number: 2, name: 'Cade Cunningham', pos: 'Base' },
            { id: 'det2', number: 23, name: 'Jaden Ivey', pos: 'Escolta' },
            { id: 'det3', number: 0, name: 'Jalen Duren', pos: 'Pívot' },
            { id: 'det4', number: 12, name: 'Tobias Harris', pos: 'Ala-Pívot' },
            { id: 'det5', number: 5, name: 'Ausar Thompson', pos: 'Alero' },
            { id: 'det6', number: 7, name: 'Tim Hardaway Jr.', pos: 'Escolta' },
            { id: 'det7', number: 28, name: 'Isaiah Stewart', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_gsw', name: 'Golden State Warriors', coach: 'Steve Kerr', color: '#1D428A',
        players: [
            { id: 'gsw1', number: 30, name: 'Stephen Curry', pos: 'Base' },
            { id: 'gsw2', number: 23, name: 'Draymond Green', pos: 'Ala-Pívot' },
            { id: 'gsw3', number: 22, name: 'Andrew Wiggins', pos: 'Alero' },
            { id: 'gsw4', number: 0, name: 'Jonathan Kuminga', pos: 'Ala-Pívot' },
            { id: 'gsw5', number: 7, name: 'Buddy Hield', pos: 'Escolta' },
            { id: 'gsw6', number: 1, name: 'Kyle Anderson', pos: 'Ala-Pívot' },
            { id: 'gsw7', number: 32, name: 'Trayce Jackson-Davis', pos: 'Pívot' },
            { id: 'gsw8', number: 3, name: 'Brandin Podziemski', pos: 'Escolta' },
            { id: 'gsw9', number: 5, name: 'Kevon Looney', pos: 'Pívot' }
        ]
    },
    {
        id: 'nba_hou', name: 'Houston Rockets', coach: 'Ime Udoka', color: '#CE1141',
        players: [
            { id: 'hou1', number: 4, name: 'Jalen Green', pos: 'Escolta' },
            { id: 'hou2', number: 28, name: 'Alperen Sengun', pos: 'Pívot' },
            { id: 'hou3', number: 1, name: 'Amen Thompson', pos: 'Escolta' },
            { id: 'hou4', number: 10, name: 'Jabari Smith Jr.', pos: 'Ala-Pívot' },
            { id: 'hou5', number: 5, name: 'Fred VanVleet', pos: 'Base' },
            { id: 'hou6', number: 9, name: 'Dillon Brooks', pos: 'Alero' },
            { id: 'hou7', number: 0, name: 'Jalen Green', pos: 'Escolta' },
            { id: 'hou8', number: 7, name: 'Cam Whitmore', pos: 'Alero' }
        ]
    },
    {
        id: 'nba_ind', name: 'Indiana Pacers', coach: 'Rick Carlisle', color: '#002D62',
        players: [
            { id: 'ind1', number: 0, name: 'Tyrese Haliburton', pos: 'Base' },
            { id: 'ind2', number: 43, name: 'Pascal Siakam', pos: 'Ala-Pívot' },
            { id: 'ind3', number: 33, name: 'Myles Turner', pos: 'Pívot' },
            { id: 'ind4', number: 0, name: 'Bennedict Mathurin', pos: 'Escolta' },
            { id: 'ind5', number: 2, name: 'Andrew Nembhard', pos: 'Guard' },
            { id: 'ind6', number: 23, name: 'Aaron Nesmith', pos: 'Alero' },
            { id: 'ind7', number: 1, name: 'Obi Toppin', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_lac', name: 'LA Clippers', coach: 'Tyronn Lue', color: '#C8102E',
        players: [
            { id: 'lac1', number: 2, name: 'Kawhi Leonard', pos: 'Alero' },
            { id: 'lac2', number: 1, name: 'James Harden', pos: 'Base' },
            { id: 'lac3', number: 40, name: 'Ivica Zubac', pos: 'Pívot' },
            { id: 'lac4', number: 7, name: 'Derrick Jones Jr.', pos: 'Alero' },
            { id: 'lac5', number: 5, name: 'Nicolas Batum', pos: 'Ala-Pívot' },
            { id: 'lac6', number: 24, name: 'Norman Powell', pos: 'Escolta' },
            { id: 'lac7', number: 14, name: 'Terance Mann', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_lal', name: 'LA Lakers', coach: 'JJ Redick', color: '#552583',
        players: [
            { id: 'lal1', number: 23, name: 'LeBron James', pos: 'Alero' },
            { id: 'lal2', number: 3, name: 'Anthony Davis', pos: 'Pívot' },
            { id: 'lal3', number: 28, name: 'Rui Hachimura', pos: 'Ala-Pívot' },
            { id: 'lal4', number: 15, name: 'Austin Reaves', pos: 'Escolta' },
            { id: 'lal5', number: 1, name: 'D\'Angelo Russell', pos: 'Base' },
            { id: 'lal6', number: 4, name: 'Dalton Knecht', pos: 'Escolta' },
            { id: 'lal7', number: 9, name: 'Bronny James', pos: 'Base' },
            { id: 'lal8', number: 10, name: 'Max Christie', pos: 'Escolta' },
            { id: 'lal9', number: 2, name: 'Jarred Vanderbilt', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_mem', name: 'Memphis Grizzlies', coach: 'Taylor Jenkins', color: '#5D76A9',
        players: [
            { id: 'mem1', number: 12, name: 'Ja Morant', pos: 'Base' },
            { id: 'mem2', number: 13, name: 'Jaren Jackson Jr.', pos: 'Pívot' },
            { id: 'mem3', number: 22, name: 'Desmond Bane', pos: 'Escolta' },
            { id: 'mem4', number: 36, name: 'Marcus Smart', pos: 'Base' },
            { id: 'mem5', number: 7, name: 'Zach Edey', pos: 'Pívot' },
            { id: 'mem6', number: 45, name: 'G.G. Jackson', pos: 'Alero' },
            { id: 'mem7', number: 10, name: 'Luke Kennard', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_mia', name: 'Miami Heat', coach: 'Erik Spoelstra', color: '#98002E',
        players: [
            { id: 'mia1', number: 22, name: 'Jimmy Butler', pos: 'Alero' },
            { id: 'mia2', number: 13, name: 'Bam Adebayo', pos: 'Pívot' },
            { id: 'mia3', number: 14, name: 'Tyler Herro', pos: 'Escolta' },
            { id: 'mia4', number: 2, name: 'Terry Rozier', pos: 'Base' },
            { id: 'mia5', number: 11, name: 'Jaime Jaquez Jr.', pos: 'Alero' },
            { id: 'mia6', number: 5, name: 'Nikola Jovic', pos: 'Ala-Pívot' },
            { id: 'mia7', number: 55, name: 'Duncan Robinson', pos: 'Escolta' },
            { id: 'mia8', number: 7, name: 'Kel\'el Ware', pos: 'Pívot' }
        ]
    },
    {
        id: 'nba_mil', name: 'Milwaukee Bucks', coach: 'Doc Rivers', color: '#00471B',
        players: [
            { id: 'mil1', number: 34, name: 'Giannis Antetokounmpo', pos: 'Ala-Pívot' },
            { id: 'mil2', number: 0, name: 'Damian Lillard', pos: 'Base' },
            { id: 'mil3', number: 22, name: 'Khris Middleton', pos: 'Alero' },
            { id: 'mil4', number: 11, name: 'Brook Lopez', pos: 'Pívot' },
            { id: 'mil5', number: 9, name: 'Bobby Portis', pos: 'Ala-Pívot' },
            { id: 'mil6', number: 21, name: 'Gary Trent Jr.', pos: 'Escolta' },
            { id: 'mil7', number: 5, name: 'Taurean Prince', pos: 'Alero' },
            { id: 'mil8', number: 16, name: 'Delon Wright', pos: 'Base' }
        ]
    },
    {
        id: 'nba_min', name: 'Minnesota Timberwolves', coach: 'Chris Finch', color: '#0C2340',
        players: [
            { id: 'min1', number: 5, name: 'Anthony Edwards', pos: 'Escolta' },
            { id: 'min2', number: 30, name: 'Julius Randle', pos: 'Ala-Pívot' },
            { id: 'min3', number: 27, name: 'Rudy Gobert', pos: 'Pívot' },
            { id: 'min4', number: 10, name: 'Mike Conley', pos: 'Base' },
            { id: 'min5', number: 0, name: 'Donte DiVincenzo', pos: 'Escolta' },
            { id: 'min6', number: 11, name: 'Naz Reid', pos: 'Ala-Pívot' },
            { id: 'min7', number: 3, name: 'Jaden McDaniels', pos: 'Alero' },
            { id: 'min8', number: 15, name: 'Rob Dillingham', pos: 'Base' }
        ]
    },
    {
        id: 'nba_nop', name: 'New Orleans Pelicans', coach: 'Willie Green', color: '#002B5C',
        players: [
            { id: 'nop1', number: 1, name: 'Zion Williamson', pos: 'Ala-Pívot' },
            { id: 'nop2', number: 14, name: 'Brandon Ingram', pos: 'Alero' },
            { id: 'nop3', number: 5, name: 'Dejounte Murray', pos: 'Base' },
            { id: 'nop4', number: 3, name: 'C.J. McCollum', pos: 'Escolta' },
            { id: 'nop5', number: 2, name: 'Herbert Jones', pos: 'Alero' },
            { id: 'nop6', number: 25, name: 'Trey Murphy III', pos: 'Alero' },
            { id: 'nop7', number: 21, name: 'Yves Missi', pos: 'Pívot' }
        ]
    },
    {
        id: 'nba_nyk', name: 'New York Knicks', coach: 'Tom Thibodeau', color: '#006BB6',
        players: [
            { id: 'nyk1', number: 11, name: 'Jalen Brunson', pos: 'Base' },
            { id: 'nyk2', number: 32, name: 'Karl-Anthony Towns', pos: 'Pívot' },
            { id: 'nyk3', number: 3, name: 'Josh Hart', pos: 'Escolta' },
            { id: 'nyk4', number: 25, name: 'Mikal Bridges', pos: 'Alero' },
            { id: 'nyk5', number: 8, name: 'OG Anunoby', pos: 'Alero' },
            { id: 'nyk6', number: 1, name: 'Cameron Payne', pos: 'Base' },
            { id: 'nyk7', number: 5, name: 'Precious Achiuwa', pos: 'Ala-Pívot' },
            { id: 'nyk8', number: 2, name: 'Miles McBride', pos: 'Base' }
        ]
    },
    {
        id: 'nba_okc', name: 'Oklahoma City Thunder', coach: 'Mark Daigneault', color: '#007AC1',
        players: [
            { id: 'okc1', number: 2, name: 'Shai Gilgeous-Alexander', pos: 'Base' },
            { id: 'okc2', number: 7, name: 'Chet Holmgren', pos: 'Pívot' },
            { id: 'okc3', number: 8, name: 'Jalen Williams', pos: 'Alero' },
            { id: 'okc4', number: 55, name: 'Isaiah Hartenstein', pos: 'Pívot' },
            { id: 'okc5', number: 9, name: 'Alex Caruso', pos: 'Escolta' },
            { id: 'okc6', number: 5, name: 'Luguentz Dort', pos: 'Escolta' },
            { id: 'okc7', number: 11, name: 'Isaiah Joe', pos: 'Escolta' },
            { id: 'okc8', number: 6, name: 'Jaylin Williams', pos: 'Ala-Pívot' }
        ]
    },
    {
        id: 'nba_orl', name: 'Orlando Magic', coach: 'Jamahl Mosley', color: '#0077C0',
        players: [
            { id: 'orl1', number: 5, name: 'Paolo Banchero', pos: 'Ala-Pívot' },
            { id: 'orl2', number: 22, name: 'Franz Wagner', pos: 'Alero' },
            { id: 'orl3', number: 4, name: 'Jalen Suggs', pos: 'Base' },
            { id: 'orl4', number: 3, name: 'Kentavious Caldwell-Pope', pos: 'Escolta' },
            { id: 'orl5', number: 34, name: 'Wendell Carter Jr.', pos: 'Pívot' },
            { id: 'orl6', number: 21, name: 'Moritz Wagner', pos: 'Pívot' },
            { id: 'orl7', number: 0, name: 'Anthony Black', pos: 'Base' },
            { id: 'orl8', number: 50, name: 'Cole Anthony', pos: 'Base' }
        ]
    },
    {
        id: 'nba_phi', name: 'Philadelphia 76ers', coach: 'Nick Nurse', color: '#006BB6',
        players: [
            { id: 'phi1', number: 21, name: 'Joel Embiid', pos: 'Pívot' },
            { id: 'phi2', number: 0, name: 'Tyrese Maxey', pos: 'Base' },
            { id: 'phi3', number: 8, name: 'Paul George', pos: 'Alero' },
            { id: 'phi4', number: 18, name: 'Caleb Martin', pos: 'Alero' },
            { id: 'phi5', number: 7, name: 'Kyle Lowry', pos: 'Base' },
            { id: 'phi6', number: 20, name: 'Eric Gordon', pos: 'Escolta' },
            { id: 'phi7', number: 1, name: 'Reggie Jackson', pos: 'Base' },
            { id: 'phi8', number: 17, name: 'Andre Drummond', pos: 'Pívot' }
        ]
    },
    {
        id: 'nba_phx', name: 'Phoenix Suns', coach: 'Mike Budenholzer', color: '#1D1160',
        players: [
            { id: 'phx1', number: 1, name: 'Devin Booker', pos: 'Escolta' },
            { id: 'phx2', number: 35, name: 'Kevin Durant', pos: 'Alero' },
            { id: 'phx3', number: 3, name: 'Bradley Beal', pos: 'Escolta' },
            { id: 'phx4', number: 20, name: 'Jusuf Nurkic', pos: 'Pívot' },
            { id: 'phx5', number: 21, name: 'Tyus Jones', pos: 'Base' },
            { id: 'phx6', number: 0, name: 'Royce O\'Neale', pos: 'Alero' },
            { id: 'phx7', number: 8, name: 'Grayson Allen', pos: 'Escolta' },
            { id: 'phx8', number: 22, name: 'Mason Plumlee', pos: 'Pívot' }
        ]
    },
    {
        id: 'nba_por', name: 'Portland Trail Blazers', coach: 'Chauncey Billups', color: '#E03A3E',
        players: [
            { id: 'por1', number: 0, name: 'Scoot Henderson', pos: 'Base' },
            { id: 'por2', number: 17, name: 'Shaedon Sharpe', pos: 'Escolta' },
            { id: 'por3', number: 1, name: 'Anfernee Simons', pos: 'Escolta' },
            { id: 'por4', number: 2, name: 'Deandre Ayton', pos: 'Pívot' },
            { id: 'por5', number: 33, name: 'Donovan Clingan', pos: 'Pívot' },
            { id: 'por6', number: 21, name: 'Jerami Grant', pos: 'Ala-Pívot' },
            { id: 'por7', number: 4, name: 'Matisse Thybulle', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_sac', name: 'Sacramento Kings', coach: 'Mike Brown', color: '#5A2D81',
        players: [
            { id: 'sac1', number: 5, name: 'De\'Aaron Fox', pos: 'Base' },
            { id: 'sac2', number: 10, name: 'Domantas Sabonis', pos: 'Pívot' },
            { id: 'sac3', number: 10, name: 'DeMar DeRozan', pos: 'Alero' },
            { id: 'sac4', number: 13, name: 'Keegan Murray', pos: 'Ala-Pívot' },
            { id: 'sac5', number: 9, name: 'Kevin Huerter', pos: 'Escolta' },
            { id: 'sac6', number: 0, name: 'Malik Monk', pos: 'Escolta' },
            { id: 'sac7', number: 15, name: 'Keon Ellis', pos: 'Base' }
        ]
    },
    {
        id: 'nba_sas', name: 'San Antonio Spurs', coach: 'Gregg Popovich', color: '#C4CED4',
        players: [
            { id: 'sas1', number: 1, name: 'Victor Wembanyama', pos: 'Pívot' },
            { id: 'sas2', number: 3, name: 'Chris Paul', pos: 'Base' },
            { id: 'sas3', number: 10, name: 'Jeremy Sochan', pos: 'Ala-Pívot' },
            { id: 'sas4', number: 24, name: 'Devin Vassell', pos: 'Escolta' },
            { id: 'sas5', number: 40, name: 'Harrison Barnes', pos: 'Alero' },
            { id: 'sas6', number: 22, name: 'Stephon Castle', pos: 'Base' },
            { id: 'sas7', number: 33, name: 'Tre Jones', pos: 'Base' },
            { id: 'sas8', number: 0, name: 'Keldon Johnson', pos: 'Alero' }
        ]
    },
    {
        id: 'nba_tor', name: 'Toronto Raptors', coach: 'Darko Rajakovic', color: '#CE1141',
        players: [
            { id: 'tor1', number: 4, name: 'Scottie Barnes', pos: 'Ala-Pívot' },
            { id: 'tor2', number: 5, name: 'Immanuel Quickley', pos: 'Base' },
            { id: 'tor3', number: 9, name: 'RJ Barrett', pos: 'Alero' },
            { id: 'tor4', number: 19, name: 'Jakob Poeltl', pos: 'Pívot' },
            { id: 'tor5', number: 11, name: 'Gradey Dick', pos: 'Escolta' },
            { id: 'tor6', number: 3, name: 'Kelly Olynyk', pos: 'Pívot' },
            { id: 'tor7', number: 1, name: 'Bruce Brown', pos: 'Escolta' }
        ]
    },
    {
        id: 'nba_uta', name: 'Utah Jazz', coach: 'Will Hardy', color: '#002B5C',
        players: [
            { id: 'uta1', number: 23, name: 'Lauri Markkanen', pos: 'Ala-Pívot' },
            { id: 'uta2', number: 2, name: 'Collin Sexton', pos: 'Base' },
            { id: 'uta3', number: 20, name: 'John Collins', pos: 'Ala-Pívot' },
            { id: 'uta4', number: 0, name: 'Keyonte George', pos: 'Base' },
            { id: 'uta5', number: 24, name: 'Walker Kessler', pos: 'Pívot' },
            { id: 'uta6', number: 0, name: 'Jordan Clarkson', pos: 'Escolta' },
            { id: 'uta7', number: 10, name: 'Cody Williams', pos: 'Alero' }
        ]
    },
    {
        id: 'nba_was', name: 'Washington Wizards', coach: 'Brian Keefe', color: '#002B5C',
        players: [
            { id: 'was1', number: 24, name: 'Alex Sarr', pos: 'Pívot' },
            { id: 'was2', number: 13, name: 'Jordan Poole', pos: 'Escolta' },
            { id: 'was3', number: 0, name: 'Kyle Kuzma', pos: 'Ala-Pívot' },
            { id: 'was4', number: 20, name: 'Jonas Valanciunas', pos: 'Pívot' },
            { id: 'was5', number: 8, name: 'Bub Carrington', pos: 'Base' },
            { id: 'was6', number: 15, name: 'Corey Kispert', pos: 'Alero' },
            { id: 'was7', number: 1, name: 'Bilal Coulibaly', pos: 'Escolta' }
        ]
    }
];

const loadTeams = () => {
    try {
        const saved = localStorage.getItem('basketApp_teams');
        return saved ? JSON.parse(saved) : NBA_TEAMS;
    } catch (e) { return NBA_TEAMS; }
};

const saveTeams = (teams) => {
    localStorage.setItem('basketApp_teams', JSON.stringify(teams));
};

// 3. TEAM MANAGER (CRUD - FULL UI REPLICA)
const TeamManager = ({ onBack }) => {
    const [teams, setTeams] = useState(loadTeams());
    const [view, setView] = useState('list'); // list, editTeam, editPlayer
    const [activeTeam, setActiveTeam] = useState(null);
    const [activePlayer, setActivePlayer] = useState(null);

    // Save whenever teams change
    useEffect(() => {
        saveTeams(teams);
    }, [teams]);

    // --- HANDLERS ---
    const handleSaveTeamDetails = (updatedTeam) => {
        const newTeams = teams.map(t => t.id === updatedTeam.id ? updatedTeam : t);
        if (!teams.find(t => t.id === updatedTeam.id)) newTeams.push(updatedTeam);
        setTeams(newTeams);
        setActiveTeam(updatedTeam); // Keep editing
    };

    const handleDeleteTeam = (id) => {
        if (confirm('¿Eliminar equipo?')) {
            setTeams(teams.filter(t => t.id !== id));
        }
    };

    const handleSavePlayer = (player) => {
        // Add or Update player in activeTeam
        const updatedPlayers = activeTeam.players.some(p => p.id === player.id)
            ? activeTeam.players.map(p => p.id === player.id ? player : p)
            : [...activeTeam.players, player];

        const updatedTeam = { ...activeTeam, players: updatedPlayers };
        handleSaveTeamDetails(updatedTeam);
        setView('editTeam');
    };

    const handleDeletePlayer = (playerId) => {
        if (confirm('¿Eliminar jugador?')) {
            const updatedTeam = { ...activeTeam, players: activeTeam.players.filter(p => p.id !== playerId) };
            handleSaveTeamDetails(updatedTeam);
        }
    };

    const createNewTeam = () => {
        const newTeam = { id: Date.now(), name: 'Equipo Nuevo', coach: '', players: [], color: '#3498db' };
        setActiveTeam(newTeam);
        setView('editTeam');
    };

    const createNewPlayer = () => {
        setActivePlayer({ id: Date.now(), name: '', number: '', age: '', height: '', pos: 'Base' });
        setView('editPlayer');
    };

    // --- VIEWS ---

    // A. PLAYER EDITOR
    if (view === 'editPlayer') {
        return (
            <div className="animate-fade-in" style={{ background: '#f4f6f9', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#107c75', padding: '15px', color: 'white', display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => { playSound(); setView('editTeam'); }} style={{ background: 'white', border: 'none', borderRadius: '8px', padding: '5px' }}><ChevronLeft color="#107c75" /></button>
                    <h2 style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '1.2rem' }}>Jugador</h2>
                    <div style={{ width: '32px' }}></div>
                </div>

                <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                    {/* Jersey Preview */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <div style={{ position: 'relative', width: '100px', height: '100px', background: '#e0e6ed', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <Shirt size={60} color="#2ecc71" fill="#2ecc71" />
                            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)', color: 'white', fontWeight: 'bold', fontSize: '24px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                {activePlayer.number || '00'}
                            </span>
                            <div style={{ position: 'absolute', bottom: '-10px', background: '#7f8c8d', borderRadius: '50%', padding: '5px', border: '2px solid white' }}>
                                <Edit2 size={12} color="white" />
                            </div>
                        </div>
                    </div>

                    <label style={{ fontWeight: 'bold', color: '#2c3e50', display: 'block', marginBottom: '5px' }}>Nombre</label>
                    <input className="glass-input" style={{ width: '100%', padding: '15px', background: 'white', marginBottom: '20px' }}
                        value={activePlayer.name} onChange={e => setActivePlayer({ ...activePlayer, name: e.target.value })} placeholder="Ej. Michael Jordan" />

                    <label style={{ fontWeight: 'bold', color: '#2c3e50', display: 'block', marginBottom: '5px' }}>Número de camiseta</label>
                    <input className="glass-input" type="number" style={{ width: '100%', padding: '15px', background: 'white', marginBottom: '20px' }}
                        value={activePlayer.number} onChange={e => setActivePlayer({ ...activePlayer, number: e.target.value })} placeholder="23" />

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: 'bold', color: '#2c3e50', display: 'block', marginBottom: '5px' }}>Edad</label>
                            <input className="glass-input" type="number" style={{ width: '100%', padding: '15px', background: 'white' }}
                                value={activePlayer.age} onChange={e => setActivePlayer({ ...activePlayer, age: e.target.value })} placeholder="" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: 'bold', color: '#2c3e50', display: 'block', marginBottom: '5px' }}>Tamaño (cm)</label>
                            <input className="glass-input" type="number" style={{ width: '100%', padding: '15px', background: 'white' }}
                                value={activePlayer.height} onChange={e => setActivePlayer({ ...activePlayer, height: e.target.value })} placeholder="" />
                        </div>
                    </div>

                    <label style={{ fontWeight: 'bold', color: '#2c3e50', display: 'block', marginBottom: '5px' }}>Posición estándar</label>
                    <select className="glass-input" style={{ width: '100%', padding: '15px', background: 'white', marginBottom: '20px' }}
                        value={activePlayer.pos} onChange={e => setActivePlayer({ ...activePlayer, pos: e.target.value })}>
                        <option>Base</option>
                        <option>Escolta</option>
                        <option>Alero</option>
                        <option>Ala-Pívot</option>
                        <option>Pívot</option>
                    </select>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '15px', marginTop: '10px' }} onClick={() => { playSound(); handleSavePlayer(activePlayer); }}>GUARDAR JUGADOR</button>
                </div>
            </div>
        );
    }

    // B. TEAM EDITOR
    if (view === 'editTeam') {
        return (
            <div className="animate-fade-in" style={{ background: '#f4f6f9', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: activeTeam.color || '#107c75', padding: '15px', color: 'white', display: 'flex', alignItems: 'center', transition: 'background 0.3s' }}>
                    <button onClick={() => { playSound(); setView('list'); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '5px' }}><ChevronLeft color="white" /></button>
                    <input
                        value={activeTeam.name}
                        onChange={(e) => setActiveTeam({ ...activeTeam, name: e.target.value })}
                        onBlur={() => handleSaveTeamDetails(activeTeam)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', flex: 1, outline: 'none' }}
                    />
                    <div style={{ position: 'relative', width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '2px solid white', cursor: 'pointer' }}>
                        <input
                            type="color"
                            value={activeTeam.color || '#107c75'}
                            onChange={(e) => setActiveTeam({ ...activeTeam, color: e.target.value })}
                            style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', padding: 0, border: 'none', cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {/* Coach Info */}
                    <div style={{ background: 'white', padding: '20px', margin: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span style={{ color: '#555' }}>Entrenador</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ fontWeight: 'bold' }}>{activeTeam.coach || 'Nombre'}</span>
                                <Edit2 size={14} color="#107c75" style={{ cursor: 'pointer' }} onClick={() => {
                                    playSound();
                                    const n = prompt('Nombre Entrenador:', activeTeam.coach);
                                    if (n !== null) setActiveTeam({ ...activeTeam, coach: n });
                                }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#555' }}>Co-entrenador</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ fontWeight: 'bold' }}>{activeTeam.coCoach || 'Nombre'}</span>
                                <Edit2 size={14} color="#107c75" style={{ cursor: 'pointer' }} onClick={() => {
                                    playSound();
                                    const n = prompt('Nombre Co-Entrenador:', activeTeam.coCoach);
                                    if (n !== null) setActiveTeam({ ...activeTeam, coCoach: n });
                                }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', color: '#555', marginBottom: '10px' }}>En el campo ({activeTeam.players.length})</div>

                    {/* Players List */}
                    <div style={{ padding: '0 20px 80px 20px' }}>
                        {activeTeam.players.map(p => (
                            <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #333', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                        {p.number}
                                    </div>
                                    <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{p.name}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Edit2 size={18} color="#bdc3c7" style={{ cursor: 'pointer' }} onClick={() => { playSound(); setActivePlayer(p); setView('editPlayer'); }} />
                                    <Trash2 size={18} color="#bdc3c7" style={{ cursor: 'pointer' }} onClick={() => { playSound(); handleDeletePlayer(p.id); }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Action */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'transparent', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div style={{ position: 'relative', width: '100%', height: '50px' }}>
                        <div style={{
                            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                            pointerEvents: 'auto', background: '#e05d35', width: '60px', height: '60px', borderRadius: '50%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(224, 93, 53, 0.4)', cursor: 'pointer'
                        }} onClick={() => { playSound(); createNewPlayer(); }}>
                            <Plus size={30} color="white" />
                        </div>
                        <div style={{ textAlign: 'center', position: 'absolute', bottom: '0', width: '100%', fontSize: '0.8rem', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Agregar jugador</div>
                    </div>
                </div>
            </div>
        );
    }

    // C. TEAM LIST (Default)
    return (
        <div style={{ background: '#f4f6f9', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ background: '#107c75', padding: '20px', color: 'white', paddingBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={() => { playSound(); onBack(); }} style={{ background: 'white', border: 'none', borderRadius: '8px', padding: '5px' }}><ArrowLeft color="#107c75" /></button>
                    <span style={{ fontWeight: 'bold' }}>Administra tus equipos</span>
                    <MoreVertical size={20} onClick={() => playSound()} style={{ cursor: 'pointer' }} />
                </div>
                {/* Tabs */}
                <div style={{ background: 'white', borderRadius: '8px', padding: '2px', display: 'flex', gap: '5px' }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#e05d35', color: 'white', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => playSound()}>Equipos</div>
                    <div
                        style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#3498db', color: 'white', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                        onClick={() => {
                            if (confirm("¿Cargar las 30 plantillas NBA 2025-26? Se mantendrán tus equipos actuales.")) {
                                const merged = [...teams, ...NBA_TEAMS.filter(nba => !teams.some(t => t.id === nba.id))];
                                setTeams(merged);
                                playSound();
                            }
                        }}
                    >
                        Importar NBA
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px', marginTop: '-20px' }}>
                {teams.map(t => (
                    <div key={t.id} style={{ background: 'white', borderRadius: '12px', padding: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Users size={20} color={t.color || "#333"} />
                            </div>
                            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>{t.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Edit2 size={18} color="#7f8c8d" style={{ cursor: 'pointer' }} onClick={() => { playSound(); setActiveTeam(t); setView('editTeam'); }} />
                            <Trash2 size={18} color="#7f8c8d" style={{ cursor: 'pointer' }} onClick={() => { playSound(); handleDeleteTeam(t.id); }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* FAB */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', background: '#107c75', borderTopLeftRadius: '30% 20px', borderTopRightRadius: '30% 20px', marginTop: 'auto' }}>
                <div style={{
                    background: '#e05d35', width: '60px', height: '60px', borderRadius: '50%', margin: '-50px auto 10px auto',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(224, 93, 53, 0.4)', cursor: 'pointer'
                }} onClick={() => { playSound(); createNewTeam(); }}>
                    <Plus size={30} color="white" />
                </div>
            </div>
            <div style={{ background: '#107c75', textAlign: 'center', paddingBottom: '20px', color: 'white', fontSize: '0.9rem' }}>Añadir nuevo equipo</div>
        </div>
    );
};

// 4. SETUP WIZARD (Consumes Persisted Teams)
const GameSetup = ({ onStart, onCancel, onManageTeams }) => {
    const [step, setStep] = useState(1);
    const [teams, setTeams] = useState([]);
    const [config, setConfig] = useState({ homeTeam: null, awayTeam: null, periodDuration: 10 });

    useEffect(() => {
        setTeams(loadTeams());
    }, []);

    const findTeam = (name) => teams.find(t => t.name === name);

    return (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configurar Partido</h2>

            {step === 1 && (
                <div className="animate-fade-in" style={{ flex: 1 }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                            <label style={{ fontWeight: 'bold' }}>Equipos</label>
                            <button onClick={() => { playSound(); onManageTeams(); }} style={{ fontSize: '0.75rem', color: '#1cb5e0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Plus size={12} /> Crear/Editar En Equipos
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>LOCAL</div>
                                <select className="glass-input" style={{ width: '100%' }} onChange={(e) => setConfig({ ...config, homeTeam: findTeam(e.target.value) })}>
                                    <option value="">Seleccionar</option>
                                    {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                </select>
                            </div>
                            <div style={{ fontWeight: 'bold' }}>VS</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>VISITA</div>
                                <select className="glass-input" style={{ width: '100%' }} onChange={(e) => setConfig({ ...config, awayTeam: findTeam(e.target.value) })}>
                                    <option value="">Seleccionar</option>
                                    {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Duración por Cuarto (minutos)</label>
                        <input
                            type="number"
                            className="glass-input"
                            style={{ width: '100%', background: 'white' }}
                            value={config.periodDuration}
                            onChange={(e) => setConfig({ ...config, periodDuration: parseInt(e.target.value) || 10 })}
                        />
                    </div>
                </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-secondary" onClick={() => { playSound(); onCancel(); }}>Cancelar</button>
                <button className="btn btn-primary" onClick={() => { playSound(); onStart(config); }} disabled={!config.homeTeam || !config.awayTeam}>INICIAR JUEGO</button>
            </div>
        </div>
    );
};

// --- MAIN CONTAINER ---
const Stats = () => {
    const [view, setView] = useState('home');
    const [gameConfig, setGameConfig] = useState(null);
    const [savedGame, setSavedGame] = useState(null);
    const [isResuming, setIsResuming] = useState(false);

    // Initial load: Check for saved game
    useEffect(() => {
        try {
            const saved = localStorage.getItem('basketApp_liveGame');
            if (saved) {
                setSavedGame(JSON.parse(saved));
            }
        } catch (e) { }
    }, [view]); // Re-check when coming back to home

    const resumeGame = () => {
        if (savedGame) {
            setGameConfig(savedGame.gameConfig);
            setIsResuming(true);
            setView('live');
            playSound();
        }
    };

    const startGame = (config) => {
        // Fallback mocks if user didn't select or create teams fully
        if (!config.homeTeam) config.homeTeam = { name: 'Local', color: '#2ecc71', players: [] };
        if (!config.awayTeam) config.awayTeam = { name: 'Visita', color: '#f1c40f', players: [] };

        // Auto-fill players if empty (just for demo reliability)
        if (!config.homeTeam.players || config.homeTeam.players.length === 0)
            config.homeTeam.players = Array.from({ length: 5 }, (_, i) => ({ id: `h${i}`, number: i + 4, name: `L${i}` }));
        if (!config.awayTeam.players || config.awayTeam.players.length === 0)
            config.awayTeam.players = Array.from({ length: 5 }, (_, i) => ({ id: `a${i}`, number: i + 10, name: `V${i}` }));

        setIsResuming(false);
        setGameConfig(config);
        setView('live');
    };

    if (view === 'live' && gameConfig) return (
        <LiveTracker
            gameConfig={gameConfig}
            onExit={() => { setView('home'); setIsResuming(false); }}
            initialState={isResuming ? savedGame : null}
        />
    );
    if (view === 'setup') return <GameSetup onStart={startGame} onCancel={() => setView('home')} onManageTeams={() => setView('teams')} />;
    if (view === 'teams') return <TeamManager onBack={() => setView('setup')} />;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stats-view" style={{ paddingBottom: '80px' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem', background: '#107c75', color: 'white' }}>
                <Trophy size={48} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Match Tracker Pro</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '1rem' }}>
                    <button className="btn" onClick={() => { playSound(); setView('setup'); }} style={{ background: 'white', color: '#107c75', fontWeight: 'bold', padding: '12px 25px', borderRadius: '30px', border: 'none' }}>+ NUEVO PARTIDO</button>
                    {savedGame && (
                        <button className="btn" onClick={resumeGame} style={{ background: '#e05d35', color: 'white', fontWeight: 'bold', padding: '12px 25px', borderRadius: '30px', border: 'none' }}>REANUDAR {savedGame.gameConfig.homeTeam.name.charAt(0)} vs {savedGame.gameConfig.awayTeam.name.charAt(0)}</button>
                    )}
                </div>
            </div>
            <SeasonStats />
        </motion.div>
    );
};

export default Stats;
