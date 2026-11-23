import { Link } from 'react-router-dom';
import logoActumaticFlat from '../../assets/logo-actumatic-flat.png';
import logoRobot from '../../assets/logo-robot.webp';

function ActumaticFlatLogo({ greyscale = false, icon = true }) {
  const style = { filter: 'grayscale(1) brightness(3)', marginLeft: 90 };
  if (greyscale) {
    style.filter = 'grayscale(1) brightness(1.5)';
  }
  if (!icon) {
    style.marginLeft = 0;
  }
  return (
    <Link
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        position: 'relative',
      }}
    >
      {icon && (
        <img
          src={logoRobot}
          height={50}
          style={{ position: 'absolute', left: 18, bottom: -13 }}
          alt="website logo"
        />
      )}
      <img
        src={logoActumaticFlat}
        height={28}
        style={style}
        alt="website logo"
      />
    </Link>
  );
}

export default ActumaticFlatLogo;
