import Link from 'next/link';
import styles from './nav.module.scss';
import { FaHome, FaTable, FaLinkedin, FaGithub } from 'react-icons/fa';

const ICON_SIZE = 30;

interface ComponentProps {
  sidePanelHidden: boolean;
}

const links = [
  {
    href: 'https://github.com/Mattese',
    label: 'Github',
    icon: <FaGithub size={ICON_SIZE} />,
    key: '',
  },
  {
    href: 'https://www.linkedin.com/in/martin-reichl-48468994/',
    label: 'LinkedIn',
    icon: <FaLinkedin size={ICON_SIZE} />,
    key: '',
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav: React.FC<ComponentProps> = ({ sidePanelHidden }) => (
  <nav>
    <ul>
      <li className={sidePanelHidden ? styles.navItemHidden : styles.navItem}>
        <Link prefetch href="/">
          <a>
            <h2>Home</h2>
            <FaHome size={ICON_SIZE} />
          </a>
        </Link>
      </li>
      {links.map((link, index) => (
        <li className={sidePanelHidden ? styles.navItemHidden : styles.navItem} key={index}>
          <Link href={link.href}>
            <a>
              <h2>{link.label}</h2> {link.icon}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
