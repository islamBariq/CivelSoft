import classes from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/man.png';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <FontAwesomeIcon
          icon={faBars}
          size='2x'
          color='#fff'
          className={classes.barICon}
        />
        <span className={classes.bar}></span>
        <Link to='/' className={classes.white}>
          <h2>CIVILSOFT</h2>
        </Link>
        <Link to='/'>
          {' '}
          <h4 className={classes.white}>HCMS</h4>
        </Link>{' '}
      </div>
      <div className={classes.right}>
        <FontAwesomeIcon
          icon={faBell}
          size='lg'
          color='#fff'
          className={classes.bellIcon}
        />
        <img src={avatar} alt='' />
        <h3 className={classes.white}>Amila udana</h3>
        <FontAwesomeIcon
          icon={faSortDown}
          size='sm'
          color='#fff'
          className={classes.bellIcon}
        />
      </div>
    </header>
  );
};

export default Header;
