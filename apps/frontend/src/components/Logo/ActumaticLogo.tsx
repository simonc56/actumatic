import { Link } from 'react-router-dom';
import logo from '../../assets/logo-actumatic-blue.png';
import logoRobot from '../../assets/logo-robot.webp';

function ActumaticLogo({ greyscale = false, icon = true }) {
  const style = {filter: 'grayscale(1) brightness(3)', marginLeft: 90};
  if (greyscale) {
    style.filter = 'grayscale(1) brightness(1.5)';
  }
  if (!icon) {
    style.marginLeft = 0;
  }
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
      {icon && <img src={logoRobot} height={50} style={{position: 'absolute', left: 18, bottom: -13}} alt="website logo" />}
      <img src={logo} height={28} style={style} alt="website logo" />
    </Link>
  );
}

export default ActumaticLogo;
