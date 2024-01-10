export type PricingPlanType = {
  price: number;
  priceBefore: number;
  daily: number;
  durationInMonths: number;
};

export const pricingPlans = {
  "6month": {
    price: 49.99,
    priceBefore: 199.0,
    daily: 0.28,
    durationInMonths: 6,
  },
  "3month": {
    price: 36.99,
    priceBefore: 150.0,
    daily: 0.67,
    durationInMonths: 3,
  },
  "1month": {
    price: 30.99,
    priceBefore: 150.0,
    daily: 0.99,
    durationInMonths: 1,
  },
} satisfies Record<string, PricingPlanType>;

export function getPlanByID(id: string): PricingPlanType | undefined {
  // @ts-ignore
  return pricingPlans[id];
}
