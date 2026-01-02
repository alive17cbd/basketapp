import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import Teams from './views/Teams';
import Tactics from './views/Tactics';
import Chat from './views/Chat';
import Stats from './views/Stats';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from './views/Calendar';
import Fundamentals from './views/Fundamentals';
import Login from './components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('basket_auth') === 'true');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'teams': return <Teams />;
      case 'fundamentals': return <Fundamentals />;
      case 'calendar': return <Calendar />;
      case 'tactics': return <Tactics />;
      case 'stats': return <Stats />;
      case 'messages': return <Chat />;
      case 'admin': return <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}><h1>Administración</h1><p>Próximamente...</p></div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container" style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content" style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--border)', marginBottom: 'var(--mobile-nav-height)' }}>
        &copy; 2025 Basket Pro Management System.
      </footer>
    </div>
  );
}

export default App;
