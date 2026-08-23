import { YANDEX_METRIKA_ID } from "@/components/YandexMetrika";

export const metrikaGoals = {
  dikidi: "dikidi_click",
  yandex: "yandex_click",
  vk: "vk_click",
  instagram: "instagram_click",
  max: "max_click",
  vkMessage: "vk_message_click",
  telegram: "telegram_click",
} as const;

export type MetrikaGoalId = (typeof metrikaGoals)[keyof typeof metrikaGoals];

type YmReachGoal = (
  counterId: number,
  method: "reachGoal",
  target: string,
  params?: { placement: string },
) => void;

function getYm(): YmReachGoal | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const ym = window.ym;
  return typeof ym === "function" ? (ym as YmReachGoal) : undefined;
}

export function reachMetrikaGoal(
  goalId: MetrikaGoalId,
  params: { placement: string },
): void {
  const ym = getYm();
  if (!ym) {
    return;
  }

  try {
    ym(YANDEX_METRIKA_ID, "reachGoal", goalId, params);
  } catch {
    // Analytics must never interrupt the outbound click.
  }
}

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}
