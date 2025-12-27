// reject bad feedback
import { HumanCorrection } from "./types";

export function learnFromHuman(
  corrections: HumanCorrection[],
  memory: any,
  auditTrail: any[]
) {
  for (const entry of corrections) {
    for (const corr of entry.corrections) {
      // Vendor memory
      if (corr.reason.toLowerCase().includes("leistungsdatum")) {
        memory.vendorMemory[entry.vendor] ||= [];
        memory.vendorMemory[entry.vendor].push({
          type: "label_mapping",
          sourceLabel: "Leistungsdatum",
          targetField: corr.field,
          confidence: 0.6
        });
      }

      // Correction memory
      if (corr.reason.toLowerCase().includes("vat")) {
        memory.correctionMemory.push({
          pattern: "vat_included",
          action: "recompute_tax",
          confidence: 0.6
        });
      }

      // Resolution memory
      memory.resolutionMemory.push({
        pattern: corr.reason.toLowerCase(),
        approved: entry.finalDecision === "approved"
      });
    }

    auditTrail.push({
      step: "learn",
      timestamp: new Date().toISOString(),
      details: `Learned from ${entry.invoiceId}`
    });
  }
}


