import type React from "react";

import { useMoscowTime } from "@app/providers/moscow-time";

import styles from "./index.module.scss";

const pad = (value: number): string => value.toString().padStart(2, "0");

export const MatrixClock: React.FC = () => {
  const { hours, minutes, seconds } = useMoscowTime();

  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return (
    <div className={styles.matrixClock}>
      {timeString.split("").map((char, index) => (
        <span key={`${char}-${index}`} className={styles.digit}>
          {char}
        </span>
      ))}
    </div>
  );
};
