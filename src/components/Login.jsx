import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // --- CONFIGURACIÓN DE USUARIOS ---
    const USERS = {
        'admin': 'basket2025',
        'coach': 'entrenador123',
        'staff': 'equipo2025'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = credentials;

        if (USERS[username] && USERS[username] === password) {
            sessionStorage.setItem('basket_auth', 'true');
            sessionStorage.setItem('basket_user', username); // Guardamos quién entró
            onLogin();
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #000851 0%, #1cb5e0 100%)',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="glass-panel" style={{
                width: '90%',
                maxWidth: '400px',
                padding: '2.5rem',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏀</div>
                <h2 style={{ color: '#000851', marginBottom: '0.5rem', fontSize: '1.8rem' }}>BASKET APP</h2>
                <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Gestión Profesional de Equipos</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000851', display: 'block', marginBottom: '5px' }}>USUARIO</label>
                        <input
                            type="text"
                            placeholder="Ingrese usuario"
                            className="glass-input"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000851', display: 'block', marginBottom: '5px' }}>CONTRASEÑA</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="glass-input"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }}
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>

                    {error && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '5px' }}>{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '12px', marginTop: '1rem', borderRadius: '8px', fontSize: '1rem' }}
                    >
                        INICIAR SESIÓN
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.7rem', color: '#999' }}>
                    &copy; 2025 ALIVE DIGITAL MANAGEMENT
                </p>
            </div>
        </div>
    );
};

export default Login;
