import { useState } from "react";
import styles from "./layout.module.scss";
import Nav from "./nav";

export const Layout: React.FC = ({ children }) => {
  const [sidePanelHidden, setSidePanelHidden] = useState(false);
  return (
    <div className={styles.layoutWrapper}>
      <div
        className={sidePanelHidden ? styles.sidePanelHidden : styles.sidePanel}
      >
        <Nav sidePanelHidden={sidePanelHidden} />
        <div
          className={styles.sidePanelControlElement}
          onClick={() => {
            setSidePanelHidden((prevState) => !prevState);
          }}
        >
          {sidePanelHidden ? <h3>Open</h3> : <h3> Hide</h3>}
        </div>
      </div>
      <div className={styles.body}>
        <>{children}</>
      </div>
    </div>
  );
};
