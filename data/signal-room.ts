// Card copy for the Signal Room. All numbers on these cards are illustrative.

export type View = "exec" | "analyst";

export type CardMeta = {
  id: string;
  index: string;
  title: string;
  question: string;
  // Desktop column span on the 12-column bento grid.
  span: 4 | 5 | 7 | 8 | 12;
  refreshed: string;
  exec: string;
  analyst: {
    logic: string[];
    segment: string;
    assumption: string;
  };
};

export const cards: CardMeta[] = [
  {
    id: "cohorts",
    index: "01",
    title: "Retention cohorts",
    question: "Which cohorts stay, and when do they leave?",
    span: 8,
    refreshed: "06:00 WAT",
    exec: "March signups stay longest. Most users leave in month one.",
    analyst: {
      logic: ["SELECT signup_month, months_since, COUNT(DISTINCT user_id)", "FROM monthly_active GROUP BY 1, 2"],
      segment: "All signups, January to June",
      assumption: "Active means one transaction in the month",
    },
  },
  {
    id: "funnel",
    index: "02",
    title: "Activation funnel",
    question: "Where do new users stop?",
    span: 4,
    refreshed: "06:00 WAT",
    exec: "Funding the wallet is where most new users stop.",
    analyst: {
      logic: ["reached(step) / reached(sign_up)", "steps counted in order only"],
      segment: "New users, first 30 days",
      assumption: "A skipped step counts as a drop",
    },
  },
  {
    id: "reactivation",
    index: "03",
    title: "Reactivation campaign",
    question: "Did the win-back email move users back?",
    span: 5,
    refreshed: "07:30 WAT",
    exec: "The win-back email brought about one in five users back.",
    analyst: {
      logic: ["daily_active 14 days before vs after send", "WHERE days_inactive >= 20"],
      segment: "Inactive 20+ days who got the email",
      assumption: "No holdout group, so read it as directional",
    },
  },
  {
    id: "savings",
    index: "04",
    title: "Savings calculator",
    question: "Same money, three savings products.",
    span: 7,
    refreshed: "Live",
    exec: "Same money. The 15% product earns nearly double the 8% one.",
    analyst: {
      logic: ["interest = P * ((1 + r / 365) ^ days - 1)"],
      segment: "One deposit, no top-ups",
      assumption: "Daily accrual, 365-day year, before tax",
    },
  },
  {
    id: "automation",
    index: "05",
    title: "Lifecycle automation",
    question: "The rule behind a retention email.",
    span: 7,
    refreshed: "05:45 WAT",
    exec: "Idle for 21 days? One email, then a human follows up.",
    analyst: {
      logic: ["IF funded AND no_txn(21d) THEN send(email)", "IF no_txn(7d after email) THEN escalate"],
      segment: "Users with a funded wallet",
      assumption: "One email per user every 30 days",
    },
  },
  {
    id: "qa",
    index: "06",
    title: "Release QA",
    question: "Nothing ships unchecked.",
    span: 5,
    refreshed: "08:15 WAT",
    exec: "One failed check blocks the release until it is fixed.",
    analyst: {
      logic: ["release.blocked = checks.some(c => c.status === 'fail')"],
      segment: "iOS and Android release builds",
      assumption: "Mock release. Real tools, invented results",
    },
  },
  {
    id: "schema",
    index: "07",
    title: "Schema viewer",
    question: "Structured data that search engines read.",
    span: 12,
    refreshed: "Static",
    exec: "Search engines read the price, location, and rating directly.",
    analyst: {
      logic: ['{ "@type": "Product", "offers": { "@type": "Offer" } }'],
      segment: "One real estate listing",
      assumption: "The search preview is a mock",
    },
  },
];
