import type React from "react";
import { PropsWithChildren, useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/core";

import { MoscowTimeContext, TMoscowTime } from "../../model";

export const MoscowTimeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [time, setTime] = useState<TMoscowTime>(() => ({
    hours: 0,
    minutes: 0,
    seconds: 0
  }));

  useEffect(() => {
    let isActive = true;

    const fetchTime = async (): Promise<void> => {
      try {
        const next = await invoke<TMoscowTime>("get_moscow_time");

        if (isActive) {
          setTime(next);
        }
      } catch (error) {
        // В режиме dev без Tauri или при ошибках RPC возвращаем локальное время
        const now = new Date();
        const fallbackTime: TMoscowTime = {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds()
        };

        if (isActive) {
          setTime(fallbackTime);
        }

        // eslint-disable-next-line no-console
        console.debug("Failed to fetch Moscow time via Tauri, using fallback", error);
      }
    };

    fetchTime();
    const id = setInterval(fetchTime, 1000);

    return () => {
      isActive = false;
      clearInterval(id);
    };
  }, []);

  return <MoscowTimeContext.Provider value={{ time }}>{children}</MoscowTimeContext.Provider>;
};
