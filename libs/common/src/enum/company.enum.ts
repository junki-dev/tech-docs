export const CompanyEnum = {
  TOSS: 'toss',
};

export type CompanyEnumType = (typeof CompanyEnum)[keyof typeof CompanyEnum];
