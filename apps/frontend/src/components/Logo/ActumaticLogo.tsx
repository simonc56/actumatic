import { Link } from 'react-router-dom';
import logo from '../../assets/logo-actumatic-blue.png';

function ActumaticLogo() {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} height={28} />
    </Link>
  );
}

export default ActumaticLogo;
