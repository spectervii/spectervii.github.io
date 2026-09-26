// Illustrative data. Share of each signup cohort still active N months after signup.

export type Cohort = { month: string; retention: number[] };

export const cohorts: Cohort[] = [
  { month: "Jan", retention: [100, 58, 31, 26, 23, 21] },
  { month: "Feb", retention: [100, 55, 29, 24, 22] },
  { month: "Mar", retention: [100, 64, 45, 40, 37] },
  { month: "Apr", retention: [100, 57, 30, 25] },
  { month: "May", retention: [100, 54, 28] },
  { month: "Jun", retention: [100, 52] },
];

export const cohortMonths = 6;

// The cell the card opens on. It carries the story: March holds best at month 2.
export const cohortHighlight = { row: 2, col: 2 };

export const cohortSummary =
  "Retention by signup month, January to June. Every cohort loses 36% to 48% of users in the first month. March holds best, with 45% still active at month 2 against about 30% for the rest.";
