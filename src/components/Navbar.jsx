import React from 'react';
import { LayoutDashboard, Users, Calendar as CalendarIcon, Trophy, MessageCircle, Clipboard, Settings, BarChart3, Star, FileText } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
        { id: 'teams', label: 'Equipos', icon: Users },
        { id: 'calendar', label: 'Calendario', icon: CalendarIcon },
        { id: 'fundamentals', label: 'PDF & Files', icon: FileText },
        { id: 'tactics', label: 'Pizarra', icon: Clipboard },
        { id: 'stats', label: 'Stats', icon: BarChart3 },
        { id: 'messages', label: 'Staff Chat', icon: MessageCircle },
    ];

    return (
        <nav className="nav-bar" style={{
            height: '60px',
            background: 'linear-gradient(to right, #000851, #1cb5e0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            color: 'white'
        }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>
                <div style={{ background: 'white', color: '#000851', width: '30px', height: '30px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>A</div>
                <span>ALIVE MANAGER 25</span>
            </div>

            <div className="nav-links" style={{ display: 'flex', gap: '5px' }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                                border: 'none',
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.85rem',
                                fontWeight: isActive ? '600' : 'normal',
                                textTransform: 'uppercase',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Icon size={16} />
                            <span className="hide-tablet">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{sessionStorage.getItem('basket_user') || 'Coach Mendoza'}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, background: '#27ae60', padding: '1px 5px', borderRadius: '3px', display: 'inline-block' }}>EN LÍNEA</div>
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '4px', border: '2px solid white', overflow: 'hidden' }}>
                    <img src={`https://ui-avatars.com/api/?name=${sessionStorage.getItem('basket_user') || 'Coach'}&background=fff&color=000`} alt="U" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
            <style>{`
                @media (max-width: 1024px) {
                    .hide-tablet { display: none; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
