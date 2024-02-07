export type PricingPlanType = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceBefore: number;
  daily: number;
  dailyBefore: number;
  durationInMonths: number;
};

export const pricingPlans = {
  digital: {
    id: "digital",
    title: "Digital Edition (PDF)",
    subtitle: "Instant delivered to your email",
    price: 34,
    priceBefore: 69,
    daily: 0.28,
    dailyBefore: 1.11,
    durationInMonths: 6,
  },
  hardcover: {
    id: "printed",
    title: "Hardcover Book (+ PDF)",
    subtitle: "Delivered to your address",
    price: 69,
    priceBefore: 116,
    daily: 0.43,
    dailyBefore: 1.25,
    durationInMonths: 3,
  },
} satisfies Record<string, PricingPlanType>;

export function getPlanByID(id: string): PricingPlanType | undefined {
  // @ts-ignore
  return pricingPlans[id];
}
