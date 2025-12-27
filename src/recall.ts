// Input: invoice + memory
// Output: relevant memories
import { Invoice } from "./types";

// fetch vendor specific memories 
export function recallMemory(invoice: Invoice, memory: any) {
  return {
    vendorMemories: memory.vendorMemory[invoice.vendor] || [],
    correctionMemories: memory.correctionMemory
  };
}
 