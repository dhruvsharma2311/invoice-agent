export function buildReasoning(
  invoiceId: string,
  proposedCorrections: string[],
  confidence: number,
  requiresHumanReview: boolean
): string {
  if (proposedCorrections.length === 0) {
    return `Invoice ${invoiceId}: No known patterns matched. Confidence remained low, requiring human review.`;
  }

  const actions = proposedCorrections.join("; ");

  if (requiresHumanReview) {
    return `Invoice ${invoiceId}: The system detected the following issues — ${actions}. Confidence (${confidence.toFixed(
      2
    )}) was insufficient for auto-approval, so human review is required.`;
  }

  return `Invoice ${invoiceId}: The system applied learned memory patterns — ${actions}. High confidence (${confidence.toFixed(
    2
  )}) allowed auto-processing without human review.`;
}
