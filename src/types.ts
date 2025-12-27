// Defines what an invoice MUST contain
export type Invoice = {
  invoiceId: string;
  vendor: string;
  fields: Record<string, any>;
  rawText: string;
  confidence: number;
};

// human feedback model
export type HumanCorrection = {
  invoiceId: string;
  vendor: string;
  corrections: {
    field: string;
    from: any;
    to: any;
    reason: string;
  }[];
  finalDecision: "approved" | "rejected";
};

export type VendorMemory = {
  type: "label_mapping";
  sourceLabel: string;
  targetField: string;
  confidence: number;
};

export type CorrectionMemory = {
  pattern: string;
  action: string;
  confidence: number;
};

export type ResolutionMemory = {
  pattern: string;
  approved: boolean;
};
