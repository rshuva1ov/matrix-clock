import { createContext, useContext } from "react";

import type { TMoscowTime, TMoscowTimeContextValue } from "./types";

export const MoscowTimeContext = createContext<TMoscowTimeContextValue | null>(null);

export const useMoscowTime = (): TMoscowTime => {
  const ctx = useContext(MoscowTimeContext);

  if (!ctx) {
    throw new Error("useMoscowTime must be used within MoscowTimeProvider");
  }

  return ctx.time;
};
