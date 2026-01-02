import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ChevronRight, FileText, Info, AlertCircle, HelpCircle, Layout, Users, Shield, Zap, Box, List } from 'lucide-react';

const Fundamentals = () => {
    const [activeRule, setActiveRule] = useState('header');

    const sections = [
        { id: 'header', label: 'Portada', icon: FileText },
        { id: 'toc', label: 'Contenidos', icon: List },
        { id: 'rule1', label: 'Regla 1: El Juego', icon: Zap },
        { id: 'rule2', label: 'Regla 2: Cancha', icon: Layout },
        { id: 'rule3', label: 'Regla 3: Equipos', icon: Users },
        { id: 'rule4', label: 'Regla 4: Juego', icon: Zap },
        { id: 'rule5', label: 'Regla 5: Violaciones', icon: AlertCircle },
        { id: 'rule6', label: 'Regla 6: Faltas', icon: Shield },
        { id: 'rule7', label: 'Regla 7: Gral.', icon: Box },
        { id: 'rule8', label: 'Regla 8: Árbitros', icon: Users },
        { id: 'info', label: 'Info', icon: Info },
    ];

    const renderContent = () => {
        switch (activeRule) {
            case 'header':
                return (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <h1 style={{ color: '#d32f2f', fontSize: '4.5rem', fontFamily: 'Oswald', margin: '0' }}>2024</h1>
                        <h1 style={{ color: '#000851', fontSize: '3rem', fontFamily: 'Oswald', textTransform: 'uppercase', lineHeight: '1.1', margin: '10px 0' }}>
                            REGLAS OFICIALES<br />DE BALONCESTO
                        </h1>
                        <div style={{ fontSize: '1.4rem', color: '#666', marginTop: '20px', fontWeight: '500', letterSpacing: '2px' }}>
                            REGLAS DE BALONCESTO Y EQUIPAMIENTO
                        </div>
                        <div style={{ fontSize: '1.1rem', color: '#888', marginTop: '10px' }}>
                            Válidas desde el 1 de octubre de 2024
                        </div>
                        <div style={{ marginTop: '50px', padding: '30px', background: '#f8f9fa', borderRadius: '20px', border: '1px solid #eee', display: 'inline-block' }}>
                            <p style={{ margin: '0', color: '#333', fontSize: '1.1rem' }}>Aprobadas por el <strong>Consejo Central de FIBA</strong></p>
                            <p style={{ margin: '10px 0', color: '#333' }}>Mies, Suiza, 26 de abril de 2024</p>
                            <p style={{ margin: '0', color: '#d32f2f', fontWeight: 'bold' }}>Versión 1.0a</p>
                        </div>
                    </div>
                );
            case 'toc':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>TABLA DE CONTENIDOS</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '30px' }}>
                            {[
                                { title: 'REGLA UNO – EL JUEGO', page: 5, items: ['Art. 1 Definiciones'] },
                                { title: 'REGLA DOS – CANCHA Y EQUIPAMIENTO', page: 6, items: ['Art. 2 Cancha', 'Art. 3 Equipamiento'] },
                                { title: 'REGLA TRES – EQUIPOS', page: 12, items: ['Art. 4 Equipos', 'Art. 5 Lesiones', 'Art. 6 Capitán', 'Art. 7 Entrenadores'] },
                                { title: 'REGLA CUATRO – REGULACIONES DE JUEGO', page: 16, items: ['Art. 8-10 Tiempos y Estado', 'Art. 11-13 Ubicación y Salto', 'Art. 14-16 Control y Valor', 'Art. 17-21 Saque y Sustituciones'] },
                                { title: 'REGLA CINCO – VIOLACIONES', page: 29, items: ['Art. 22-25 Fuera y Pasos', 'Art. 26-31 Segundos y Reloj'] },
                                { title: 'REGLA SEIS – FALTAS', page: 37, items: ['Art. 32-35 Personales', 'Art. 36-39 Técnicas y Antideportivas'] },
                                { title: 'REGLA SIETE – DISPOSICIONES GRALES.', page: 49, items: ['Art. 40-44 Penalidades y Tiros Libres'] },
                                { title: 'REGLA OCHO – ÁRBITROS Y PODERES', page: 56, items: ['Art. 45-50 Deberes y Mesa'] },
                            ].map((item, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>{item.title}</span>
                                        <span style={{ color: '#999' }}>Pág. {item.page}</span>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                        {item.items.map((it, idx) => (
                                            <li key={idx} style={{ marginBottom: '4px' }}>• {it}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'rule1':
                return (
                    <div className="article" style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA UNO – EL JUEGO</h2>
                        <h3 style={{ color: '#000851', marginTop: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>Artículo 1: Definiciones</h3>

                        <div style={{ background: '#e3f2fd', borderLeft: '6px solid #2196f3', padding: '25px', borderRadius: '0 15px 15px 0', marginTop: '20px' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#1565c0', fontSize: '1.2rem' }}>1.1 Juego de baloncesto</h4>
                            <p style={{ margin: '0', fontSize: '1.1rem' }}>
                                El baloncesto es jugado por 2 equipos de 5 jugadores cada uno. El objetivo de cada equipo es anotar en la canasta del oponente y evitar que el otro equipo anote.
                                <br /><br />
                                El juego es conducido por los árbitros, oficiales de mesa y un comisionado, si está presente.
                            </p>
                        </div>

                        <div style={{ marginTop: '30px', background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
                            <h4 style={{ color: '#b71c1c', margin: '0 0 15px 0', fontSize: '1.2rem' }}>1.2 Responsabilidad de los participantes</h4>
                            <p style={{ fontSize: '1rem' }}>
                                Todos los participantes deben desempeñar un papel positivo en el buen desarrollo del juego y se espera que siempre demuestren comportamiento ético.
                                <br /><br />
                                Si toman conocimiento de una inexactitud (error corregible) en el registro de puntuación (marcador, faltas, tiempos fuera, cronometraje), deben notificar a los árbitros inmediatamente.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                            <div style={{ border: '2px dashed #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>1.3 Canasta: oponente/propia</h4>
                                <p style={{ margin: '0' }}>La atacada es del oponente. La defendida es la propia.</p>
                            </div>
                            <div style={{ border: '2px dashed #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>1.4 Ganador de un juego</h4>
                                <p style={{ margin: '0' }}>El equipo con mayor puntaje al finalizar el tiempo de juego.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'rule2':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA DOS – CANCHA</h2>
                        <h3 style={{ color: '#000851', marginTop: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>Artículo 2: Dimensiones y Líneas</h3>

                        <div style={{ margin: '20px 0', textAlign: 'center' }}>
                            <img
                                src="/canchafiba.png"
                                alt="Diagrama Cancha FIBA"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    border: '1px solid #eee'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            <div className="glass-panel" style={{ padding: '25px', textAlign: 'center', background: '#fff', border: '1px solid #eee' }}>
                                <div style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Dimensiones</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000851' }}>28x15 m</div>
                                <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Libre de obstrucciones</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '25px', textAlign: 'center', background: '#fff', border: '1px solid #eee' }}>
                                <div style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Líneas</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000851' }}>5 cm</div>
                                <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Mismo color (Blanco)</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '25px', textAlign: 'center', background: '#fff', border: '1px solid #eee' }}>
                                <div style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>Zona 3 Puntos</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000851' }}>6.75 m</div>
                                <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Radio desde el aro</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', background: '#fff3cd', borderLeft: '6px solid #ffc107', padding: '25px', borderRadius: '0 15px 15px 0' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#856404', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AlertCircle size={24} /> Áreas Específicas
                            </h4>
                            <p style={{ margin: '0' }}>
                                <strong>Zona de defensa:</strong> Canasta propia y tablero.<br />
                                <strong>Zona de ataque:</strong> Canasta oponente y tablero.<br />
                                <strong>Semicírculo sin carga:</strong> Radio de 1.30 m.
                            </p>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <h4 style={{ color: '#d32f2f', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Artículo 3: Equipamiento</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <ul style={{ margin: 0 }}>
                                    <li>Unidades de soporte trasero</li>
                                    <li>Tableros y Canastas (Aros/Redes)</li>
                                    <li>Balones Oficiales</li>
                                    <li>Reloj de Juego</li>
                                </ul>
                                <ul style={{ margin: 0 }}>
                                    <li>Marcador y Reloj de Lanzamiento</li>
                                    <li>Planilla de anotación</li>
                                    <li>Marcadores de faltas</li>
                                    <li>Flecha de posesión alterna</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'rule3':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA TRES – EQUIPOS</h2>
                        <h4 style={{ color: '#000851', marginTop: '20px' }}>Artículo 4: Composición</h4>
                        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginTop: '10px' }}>
                            <p><strong>Máximo 12 miembros</strong> con derecho a jugar, incluido el capitán.</p>
                            <p><strong>Entrenador principal</strong> y un primer entrenador asistente.</p>
                            <p>Máximo 8 miembros de la delegación acompañante.</p>
                        </div>
                        <h4 style={{ color: '#000851', marginTop: '25px' }}>Artículo 5-7: Deberes</h4>
                        <ul style={{ marginTop: '10px' }}>
                            <li><strong>Capitán:</strong> Representa al equipo en pista. Firma planilla al final si protesta.</li>
                            <li><strong>Entrenadores:</strong> Entregan lista 20 min antes del juego. Única persona autorizada a permanecer de pie durante el juego.</li>
                            <li><strong>Infortunios:</strong> Árbitros pueden detener juego por lesiones si el balón está muerto o el equipo lesionado tiene control.</li>
                        </ul>
                    </div>
                );
            case 'rule4':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA CUATRO – REGULACIONES</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                            <div style={{ background: '#fff', border: '1px solid #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>Tiempo de Juego</h4>
                                <p><strong>4 cuartos de 10 min.</strong> Intervalos de 2 min entre 1/2 y 3/4. Intervalo de 15 min al medio tiempo.</p>
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>Valor Canastas</h4>
                                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                    <li>Tiro Libre: <strong>1 punto</strong></li>
                                    <li>Zona Interior: <strong>2 puntos</strong></li>
                                    <li>Zona Exterior: <strong>3 puntos</strong></li>
                                </ul>
                            </div>
                        </div>
                        <h4 style={{ color: '#000851', marginTop: '25px' }}>Artículo 18: Tiempo Fuera</h4>
                        <p>Cada equipo tiene:</p>
                        <ul>
                            <li>2 tiempos fuera en la 1ra mitad.</li>
                            <li>3 tiempos fuera en la 2da mitad (max 2 en los últimos 2 min).</li>
                            <li>1 tiempo fuera por cada tiempo extra.</li>
                        </ul>
                    </div>
                );
            case 'rule5':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA CINCO – VIOLACIONES</h2>
                        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginTop: '20px' }}>
                            <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>Violaciones de Tiempo:</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', textAlign: 'center' }}>
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3s</div>
                                    <div style={{ fontSize: '0.8rem' }}>En zona restringida</div>
                                </div>
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>8s</div>
                                    <div style={{ fontSize: '0.8rem' }}>Para cruzar media</div>
                                </div>
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24s</div>
                                    <div style={{ fontSize: '0.8rem' }}>Lanzamiento al aro</div>
                                </div>
                            </div>
                        </div>
                        <h4 style={{ color: '#000851', marginTop: '25px' }}>Artículo 25: Pasos</h4>
                        <p>Movimiento ilegal de uno o ambos pies mas allá de los límites (generalmente más de 2 pasos tras drible).</p>
                        <h4 style={{ color: '#000851', marginTop: '15px' }}>Artículo 31: Interferencia</h4>
                        <p>Ocurre cuando un jugador toca el balón mientras va hacia la canasta y está por encima del nivel del aro.</p>
                    </div>
                );
            case 'rule6':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA SEIS – FALTAS</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f' }}>Antideportiva</h4>
                                <p>Contacto que no es un intento legítimo de jugar el balón directamente dentro del espíritu de las reglas.</p>
                            </div>
                            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '15px' }}>
                                <h4 style={{ color: '#d32f2f' }}>Técnica</h4>
                                <p>Falta de jugador o no jugador que no implica contacto, por conducta inapropiada o desobedecer reglas.</p>
                            </div>
                        </div>
                        <h4 style={{ color: '#000851', marginTop: '25px' }}>Artículo 38: Falta Descalificante</h4>
                        <p>Cualquier infracción antideportiva flagrante. El jugador debe abandonar el juego e ir al vestuario o fuera del edificio.</p>
                    </div>
                );
            case 'rule7':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA SIETE – DISPOSICIONES</h2>
                        <h4 style={{ color: '#000851', marginTop: '20px' }}>Artículo 40: Límites</h4>
                        <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '15px' }}>
                            <p>Un jugador que cometa <strong>5 faltas</strong> (personales y técnicas) debe abandonar el juego automáticamente.</p>
                        </div>
                        <h4 style={{ color: '#000851', marginTop: '25px' }}>Artículo 41: Faltas de Equipo</h4>
                        <p>Un equipo está en situación de penalización tras la <strong>4ta falta</strong> en un cuarto. Los siguientes contactos defensivos se penalizarán con 2 tiros libres.</p>
                    </div>
                );
            case 'rule8':
                return (
                    <div style={{ lineHeight: '1.8' }}>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>REGLA OCHO – ÁRBITROS</h2>
                        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginTop: '20px' }}>
                            <p>El equipo arbitral consiste en un árbitro principal y uno o dos árbitros adicionales. Son asistidos por oficiales de mesa y un comisionado.</p>
                            <h4 style={{ color: '#d32f2f', marginTop: '15px' }}>Oficiales de Mesa:</h4>
                            <ul>
                                <li>Anotador y Asistente</li>
                                <li>Cronometrador del juego</li>
                                <li>Operador del reloj de lanzamiento (24/14s)</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'info':
                return (
                    <div>
                        <h2 style={{ color: '#d32f2f', borderBottom: '3px solid #d32f2f', paddingBottom: '15px', fontFamily: 'Oswald', fontSize: '2rem' }}>INFORMACIÓN</h2>
                        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '20px', marginTop: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div>
                                    <h4 style={{ color: '#000851', marginBottom: '15px' }}>Detalles Técnicos</h4>
                                    <p><strong>FIBA version:</strong> 2024 v1.0a</p>
                                    <p><strong>Translator context:</strong> Español Latinoamericano</p>
                                    <p><strong>Key Update:</strong> Tácticas, equipamiento y disciplina.</p>
                                </div>
                                <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#1565c0', marginBottom: '10px' }}>Glosario FIBA</h4>
                                    <p>• <strong>Dribbling:</strong> Dribleo / Bote</p>
                                    <p>• <strong>Free throw:</strong> Tiro Libre</p>
                                    <p>• <strong>Jump ball:</strong> Balón al Aire / Salto</p>
                                    <p>• <strong>Period:</strong> Cuarto / Periodo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fiba-rules-view" style={{ minHeight: 'calc(100vh - 80px)', background: '#f4f7f9', padding: '0 0 60px 0' }}>

            {/* Horizontal Header Nav */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                gap: '4px',
                borderBottom: '2px solid #eee'
            }} className="no-scrollbar">
                <div style={{
                    padding: '18px 25px',
                    background: '#d32f2f',
                    color: 'white',
                    fontFamily: 'Oswald',
                    letterSpacing: '2px',
                    fontSize: '1rem',
                    marginRight: '20px',
                    borderRadius: '0 0 12px 12px'
                }}>
                    FIBA 2024
                </div>

                {sections.map(section => (
                    <div
                        key={section.id}
                        onClick={() => setActiveRule(section.id)}
                        style={{
                            padding: '18px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            borderBottom: activeRule === section.id ? '4px solid #d32f2f' : '4px solid transparent',
                            color: activeRule === section.id ? '#d32f2f' : '#475569',
                            fontWeight: activeRule === section.id ? '800' : '500',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase'
                        }}
                    >
                        <section.icon size={18} strokeWidth={activeRule === section.id ? 3 : 2} />
                        {section.label}
                    </div>
                ))}
            </div>

            {/* Reading Container */}
            <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 25px' }}>
                <div className="glass-panel" style={{
                    background: 'white',
                    borderRadius: '32px',
                    border: 'none',
                    padding: '60px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.07)',
                    minHeight: '800px',
                    position: 'relative'
                }}>
                    <motion.div
                        key={activeRule}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {renderContent()}
                    </motion.div>

                    {/* Watermark/Brand Info */}
                    <div style={{ position: 'absolute', bottom: '30px', right: '40px', opacity: 0.2, fontFamily: 'Oswald', fontSize: '0.8rem', pointerEvents: 'none' }}>
                        OFFICIAL REPOSITORY • ALIVE BASKET APP
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .article h3, .article h4 { font-family: 'Oswald', sans-serif; text-transform: uppercase; }
            `}</style>
        </motion.div>
    );
};

export default Fundamentals;
