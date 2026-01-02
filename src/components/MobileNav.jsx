import React from 'react';
import { LayoutDashboard, Users, Calendar, Trophy, MessageCircle, Clipboard, Settings, BarChart3, Star } from 'lucide-react';

const MobileNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'calendar', label: 'Cal', icon: Calendar },
    { id: 'teams', label: 'Equipos', icon: Users },
    { id: 'messages', label: 'Staff', icon: MessageCircle },
    { id: 'stats', label: 'Live', icon: BarChart3 },
  ];

  return (
    <div className="mobile-nav">
      <div className="mobile-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
