export const CompanyEnum = {
  TOSS: 'toss',
  INFLEARN: 'inflearn',
};

export type CompanyEnumType = (typeof CompanyEnum)[keyof typeof CompanyEnum];
