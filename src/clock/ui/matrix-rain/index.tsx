import type React from "react";

import { TFPS } from "clock/model/types";

import { useMatrixRain } from "../../model";
import styles from "./index.module.scss";

export const MatrixRain: React.FC<TFPS> = ({ fps = 20 }) => {
  const { canvasRef } = useMatrixRain({ fps });
  return <canvas ref={canvasRef} className={styles.canvas} />;
};
