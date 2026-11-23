import { Link } from 'react-router-dom';
import logo from '../../assets/logo-actumatic.webp';

function ActumaticHeaderLogo() {
  return (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        position: 'relative',
        left: 18,
      }}
    >
      <img
        src={logo}
        style={{ height: 'min(46px, max(7vw, 34px))' }}
        alt="website logo"
      />
    </Link>
  );
}

export default ActumaticHeaderLogo;
