import { Link } from 'react-router-dom';
import logo from '../../assets/logo-actumatic-blue.png';

function ActumaticLogo({ greyscale = false }) {
  const style = greyscale ? { filter: 'grayscale(1) brightness(1.5)' } : {};
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} height={28} style={style} alt="website logo" />
    </Link>
  );
}

export default ActumaticLogo;
