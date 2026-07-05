export const WORKFORCE_STATUS = {
  waiting: "Waiting for Verification",
  active: "Active",
  suspended: "Suspended",
} as const;

export type WorkforceStatus =
  (typeof WORKFORCE_STATUS)[keyof typeof WORKFORCE_STATUS];
