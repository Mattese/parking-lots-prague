import Link from "next/link";
import styles from "./nav.module.scss";
import { FaHome, FaTable } from "react-icons/fa";

const ICON_SIZE = 30;

interface ComponentProps {
  sidePanelHidden: boolean;
}

const links = [
  {
    href: "https://github.com/themodernjavascript/create-next-app-cli",
    label: "Github",
    icon: <FaTable size={ICON_SIZE} />,
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav: React.FC<ComponentProps> = ({ sidePanelHidden }) => (
  <nav>
    <ul>
      <li className={styles.navItem}>
        <Link prefetch href="/">
          <a>
            {sidePanelHidden ? "" : <h2>Home</h2>}
            <FaHome size={ICON_SIZE} />
          </a>
        </Link>
      </li>
      {links.map((link, index) => (
        <li className={styles.navItem} key={index}>
          <Link href={link.href}>
            <a>
              {sidePanelHidden ? "" : <h2>{link.label}</h2>} {link.icon}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
