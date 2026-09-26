// Illustrative data. New users reaching each step within 30 days of signup.

export type FunnelStep = { label: string; users: number };

export const funnel: FunnelStep[] = [
  { label: "Sign up", users: 10000 },
  { label: "Fund wallet", users: 4200 },
  { label: "First transaction", users: 3500 },
  { label: "Second transaction", users: 2300 },
];

export const funnelSummary =
  "Activation funnel for 10,000 new users. 42% fund their wallet, 35% make a first transaction, and 23% make a second. The largest drop is from sign up to fund wallet, where 58% of users stop.";
