// High confidence → auto accept
// Low confidence → human review
// This prevents bad learning

export function decide(confidence: number) {
  return confidence < 0.8;
}


