import fs from "fs";
import { Invoice, HumanCorrection } from "./types";
import { loadMemory, saveMemory } from "./memory";
import { recallMemory } from "./recall";
import { applyMemory } from "./apply";
import { decide } from "./decide";
import { learnFromHuman } from "./learn";
import { buildReasoning } from "./reasoning";

function safeReadJSON<T>(path: string, defaultValue: T): T {
  if (!fs.existsSync(path)) {
    console.warn(`⚠️ File not found: ${path}. Using default.`);
    return defaultValue;
  }

  const raw = fs.readFileSync(path, "utf-8").trim();
  if (!raw) {
    console.warn(`⚠️ File empty: ${path}. Using default.`);
    return defaultValue;
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Invalid JSON in ${path}`);
    throw err;
  }
}

// -------------------
// Load Inputs Safely
// -------------------
const invoices: Invoice[] = safeReadJSON("data/invoices_extracted.json", []);

if (invoices.length === 0) {
  console.error("❌ No invoices found. Add at least one invoice JSON.");
  process.exit(1);
}

const invoice = invoices[0];

const humanCorrections: HumanCorrection[] = safeReadJSON(
  "data/human_corrections.json",
  []
);

// -------------------
const memory = loadMemory();
const auditTrail: any[] = [];

// Recall
const recalled = recallMemory(invoice, memory);

// Apply
const { normalizedInvoice, proposedCorrections, confidence } = applyMemory(
  invoice,
  recalled,
  auditTrail
);

// Decision
const requiresHumanReview = decide(confidence);
const reasoning = buildReasoning(
  invoice.invoiceId,
  proposedCorrections,
  confidence,
  requiresHumanReview
);

// Learn
if (humanCorrections.length > 0) {
  learnFromHuman(humanCorrections, memory, auditTrail);
}

// Save memory
saveMemory(memory);

// Output
console.log(
  JSON.stringify(
    {
      normalizedInvoice,
      proposedCorrections,
      requiresHumanReview,
      reasoning,
      confidenceScore: confidence,
      memoryUpdates: memory,
      auditTrail,
    },
    null,
    2
  )
);
