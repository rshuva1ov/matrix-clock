import type React from "react";
import { useEffect, useRef } from "react";

import styles from "./index.module.scss";

type TMatrixRainProps = {
  fps?: number;
};

const DEFAULT_FPS = 20;
const FONT_SIZE = 18;
const FADE_STRENGTH = 0.08;

const CHAR_SET =
  "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЬЭЮЯ" + // кириллица
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + // латиница
  "0123456789" + // цифры
  "你好世界雨电矩阵代码" + // базовый набор китайских иероглифов
  "あいうえおかきくけこさしすせそなにぬねの" + // японская хирагана
  "アイウエオカキクケコサシスセソナニヌネノ" + // японская катакана
  "日月火水木金土"; // японские кандзи (дни недели)

const pickRandomChar = (): string => {
  const index = Math.floor(Math.random() * CHAR_SET.length);
  return CHAR_SET[index] ?? " ";
};

export const MatrixRain: React.FC<TMatrixRainProps> = ({ fps = DEFAULT_FPS }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let columnsCount = Math.floor(width / FONT_SIZE);
    let drops: number[] = Array.from({ length: columnsCount }, () => Math.random() * -20);

    const resize = (): void => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const nextColumnsCount = Math.floor(width / FONT_SIZE);

      if (nextColumnsCount !== columnsCount) {
        const nextDrops: number[] = Array.from(
          { length: nextColumnsCount },
          (_, index) => drops[index] ?? Math.random() * -20
        );

        columnsCount = nextColumnsCount;
        drops = nextDrops;
      }
    };

    resize();

    window.addEventListener("resize", resize);

    let isActive = true;

    const interval = 1000 / Math.max(fps, 5);

    const drawFrame = (): void => {
      context.fillStyle = `rgba(0, 0, 0, ${FADE_STRENGTH})`;
      context.fillRect(0, 0, width, height);

      context.font = `${FONT_SIZE}px "Fira Code", monospace`;
      context.textBaseline = "top";

      drops.forEach((dropY, index) => {
        const x = index * FONT_SIZE;
        const y = dropY * FONT_SIZE;

        context.fillStyle = "rgba(0, 255, 127, 0.8)";
        context.fillText(pickRandomChar(), x, y);

        const isAtBottom = y > height && Math.random() > 0.975;
        drops[index] = isAtBottom ? 0 : dropY + 1;
      });
    };

    const loop = (): void => {
      if (!isActive) {
        return;
      }

      drawFrame();

      if (isActive) {
        setTimeout(loop, interval);
      }
    };

    void loop();

    return () => {
      isActive = false;
      window.removeEventListener("resize", resize);
    };
  }, [fps]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};
