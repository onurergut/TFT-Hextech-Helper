export type VerificationOutcome = 'confirmed' | 'uncertain' | 'failed'
export type RefreshMode = 'none' | 'partial' | 'authoritative'

export interface RefreshDecision {
  mode: RefreshMode
  reason: string
}

const appendTrace = (reason: string, traceId?: string): string => {
  return traceId ? `${reason} [trace:${traceId}]` : reason
}

export class StateRefreshCoordinator {
  decideAfterVerification(outcome: VerificationOutcome, traceId?: string): RefreshDecision {
    switch (outcome) {
      case 'failed':
        return {
          mode: 'authoritative',
          reason: appendTrace('Verification failed, refresh authoritative state', traceId),
        }
      case 'uncertain':
        return {
          mode: 'authoritative',
          reason: appendTrace('Verification uncertain, rescan authoritative state', traceId),
        }
      case 'confirmed':
      default:
        return {
          mode: 'partial',
          reason: appendTrace('Verification confirmed, partial refresh is sufficient', traceId),
        }
    }
  }
}
