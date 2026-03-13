import { invoke } from "@tauri-apps/api/core";
import type React from "react";
import { useEffect, useRef } from "react";

type TMatrixRainFrame = {
  columns: number[];
};

type TMatrixRainProps = {
  fps?: number;
};

const DEFAULT_FPS = 20;

export const MatrixRain: React.FC<TMatrixRainProps> = ({ fps = DEFAULT_FPS }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    let isActive = true;

    const drawFrame = (frame: TMatrixRainFrame): void => {
      const { width, height } = canvas;

      context.clearRect(0, 0, width, height);

      const columnWidth = Math.max(width / Math.max(frame.columns.length, 1), 6);

      frame.columns.forEach((intensity, index) => {
        const x = index * columnWidth;
        const columnHeight = height * intensity;

        const gradient = context.createLinearGradient(
          x,
          0,
          x,
          columnHeight
        );

        gradient.addColorStop(0, "rgba(0, 255, 127, 0)");
        gradient.addColorStop(0.2, "rgba(0, 255, 127, 0.4)");
        gradient.addColorStop(1, "rgba(0, 255, 127, 0.95)");

        context.fillStyle = gradient;
        context.fillRect(x, 0, columnWidth, columnHeight);
      });
    };

    const interval = 1000 / Math.max(fps, 5);

    const loop = async (): Promise<void> => {
      if (!isActive) {
        return;
      }

      try {
        const columns = Math.round(window.innerWidth / 18);

        const frame = await invoke<TMatrixRainFrame>("generate_matrix_rain_frame", {
          columns
        });

        if (isActive) {
          drawFrame(frame);
        }
      } catch (error) {
        // в режиме dev через чистый Vite invoke может быть недоступен — просто пропускаем кадр
        // eslint-disable-next-line no-console
        console.debug("MatrixRain frame skipped", error);
      }

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

  return <canvas ref={canvasRef} className="matrix-rain-canvas" />;
};

