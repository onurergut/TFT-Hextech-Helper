export interface VerificationResult {
  ok: boolean
  confidence: number
  outcome: 'confirmed' | 'uncertain' | 'failed'
  evidence: string[]
}

export function isVerificationConfirmed(result: VerificationResult): boolean {
  return result.ok && result.outcome === 'confirmed'
}
