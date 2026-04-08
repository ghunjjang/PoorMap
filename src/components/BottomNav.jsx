import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const navItems = [
  { path: '/', label: 'マップ', icon: '🗺️', activeIcon: '🗺️' },
  { path: '/community', label: '貧乏部屋', icon: '💬', activeIcon: '💬' },
  { path: '/deals', label: '激安情報', icon: '🔥', activeIcon: '🔥' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav glass" id="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'nav-item--active' : ''}`
          }
          id={`nav-${item.label}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          <span className="nav-indicator" />
        </NavLink>
      ))}
    </nav>
  );
}
