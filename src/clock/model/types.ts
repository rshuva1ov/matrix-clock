import { MutableRefObject } from "react";

export type TClockChar = string;
export type TFPS = { fps: number };
export type TUseMatrixRain = { canvasRef: MutableRefObject<HTMLCanvasElement | null> };

export type TMoscowTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TMoscowTimeContextValue = {
  time: TMoscowTime;
};
