import type React from "react";

import { type TClockChar, padTimeUnit, useMoscowTime } from "../../model";
import styles from "./index.module.scss";

export const MatrixClock: React.FC = () => {
  const { hours, minutes, seconds } = useMoscowTime();

  const timeString = `${padTimeUnit(hours)}:${padTimeUnit(minutes)}:${padTimeUnit(seconds)}`;

  return (
    <div className={styles.matrixClock}>
      {timeString.split("").map((char: TClockChar, index) => (
        <span key={`${char}-${index}`} className={styles.digit}>
          {char}
        </span>
      ))}
    </div>
  );
};
