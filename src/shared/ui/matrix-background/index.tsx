import type React from "react";
import type { PropsWithChildren } from "react";

import { MatrixRain } from "../matrix-rain";
import styles from "./index.module.scss";

export const MatrixBackground: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.root}>
      <MatrixRain fps={20} />
      <div className={styles.overlay}>{children}</div>
    </div>
  );
};
