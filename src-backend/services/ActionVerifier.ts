import type { PlannedAction } from '../contracts/PlannedAction'
import type { VerificationResult } from '../contracts/VerificationResult'
import { DebugArtifacts } from '../utils/DebugArtifacts'

interface VerificationEvidence {
  contradiction?: boolean
  confirmed?: boolean
  traceId?: string
}

const withTrace = (evidence: string[], traceId?: string): string[] => {
  return traceId ? [...evidence, `trace:${traceId}`] : evidence
}

const withFailureArtifact = (evidence: string[], action: PlannedAction): string[] => {
  return [...evidence, `artifact:${DebugArtifacts.buildFailurePath('verify', action.id)}`]
}

const withSuccessArtifact = (evidence: string[], action: PlannedAction): string[] => {
  return [...evidence, `artifact:${DebugArtifacts.buildFailurePath('confirm', action.id)}`]
}

const withUncertainArtifact = (evidence: string[], action: PlannedAction): string[] => {
  return [...evidence, `artifact:${DebugArtifacts.buildFailurePath('uncertain', action.id)}`]
}

export class ActionVerifier {
  verify(action: PlannedAction, evidence: VerificationEvidence): VerificationResult {
    if (evidence.contradiction) {
      return {
        ok: false,
        confidence: 1,
        outcome: 'failed',
        evidence: withFailureArtifact(
          withTrace(['Observed state contradicted expected postconditions'], evidence.traceId),
          action
        ),
      }
    }

    if (evidence.confirmed) {
      return {
        ok: true,
        confidence: 1,
        outcome: 'confirmed',
        evidence: withSuccessArtifact(
          withTrace(['Observed state matched expected postconditions'], evidence.traceId),
          action
        ),
      }
    }

    return {
      ok: false,
      confidence: 0.5,
      outcome: 'uncertain',
      evidence: withUncertainArtifact(
        withTrace(['Observed state was inconclusive'], evidence.traceId),
        action
      ),
    }
  }
}
