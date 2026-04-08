import { Link } from 'react-router-dom';
import './SimpleFooter.css';

export default function SimpleFooter() {
  return (
    <footer className="simple-footer">
      <div className="footer-links">
        <Link to="/terms" className="footer-link">利用規約</Link>
        <span className="footer-divider">|</span>
        <Link to="/privacy" className="footer-link">プライバシーポリシー</Link>
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} 貧乏マップ (Poor Map)
      </p>
    </footer>
  );
}
