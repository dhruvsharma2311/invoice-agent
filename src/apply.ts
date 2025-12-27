import { Invoice, VendorMemory, CorrectionMemory } from "./types";

export function applyMemory(
  invoice: Invoice,
  recalled: { vendorMemories: VendorMemory[]; correctionMemories: CorrectionMemory[] },
  auditTrail: any[]
) {
    // start with extracted fields
    const normalizedInvoice = { ...invoice.fields };
    const proposedCorrections: string[] = [];
    let confidence = invoice.confidence;
    // Vendor memory
    for (const mem of recalled.vendorMemories) {
        if (invoice.rawText.includes(mem.sourceLabel)) {
            // apply learned correction
            normalizedInvoice[mem.targetField] = "EXTRACTED_FROM_RAW_TEXT";
            confidence += mem.confidence;
            proposedCorrections.push(`Vendor memory: ${mem.sourceLabel} → ${mem.targetField}`);
        }
    }
      // Correction memory
    for (const corr of recalled.correctionMemories) {
        if (corr.pattern === "vat_included" && invoice.rawText.toLowerCase().includes("vat")) {
        proposedCorrections.push("Correction memory: VAT included → recompute tax");
        confidence += corr.confidence;
        }
    }

  auditTrail.push({
    step: "apply",
    timestamp: new Date().toISOString(),
    details: proposedCorrections.join("; ")
  });

  return { normalizedInvoice, proposedCorrections, confidence };
}


