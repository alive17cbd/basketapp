import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Construction } from 'lucide-react';

const Chat = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="chat-view"
            style={{
                height: 'calc(100vh - 120px)',
                maxWidth: '900px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                background: '#f8fafc',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
            }}
        >
            {/* Header */}
            <div style={{
                padding: '20px 30px',
                background: 'linear-gradient(135deg, #000851 0%, #1cb5e0 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '15px',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px' }}>AI COACH ADVISOR</h2>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center'
            }}>
                <motion.div
                    animate={{
                        rotate: [0, -5, 5, -5, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ marginBottom: '2rem', color: '#1cb5e0' }}
                >
                    <Construction size={100} strokeWidth={1.5} />
                </motion.div>

                <h1 style={{
                    fontSize: '2.5rem',
                    color: '#000851',
                    marginBottom: '1rem',
                    fontFamily: 'Oswald'
                }}>
                    MÓDULO EN CONSTRUCCIÓN
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: '#64748b',
                    maxWidth: '450px',
                    lineHeight: '1.6'
                }}>
                    Estamos optimizando el motor de IA para ofrecerte el mejor asesoramiento táctico FIBA. Muy pronto podrás chatear con tu asistente deportivo.
                </p>

                <div style={{
                    marginTop: '2rem',
                    padding: '10px 20px',
                    background: 'rgba(28, 181, 224, 0.1)',
                    borderRadius: '12px',
                    color: '#1cb5e0',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    ALIVE DIGITAL - SPORTS DIVISION
                </div>
            </div>
        </motion.div>
    );
};

export default Chat;
