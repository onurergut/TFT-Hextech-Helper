export type ActionFailureType = 'precondition' | 'verification' | 'environment' | 'conflict'

export interface ActionResult {
  actionId: string
  ok: boolean
  failureType?: ActionFailureType
  message?: string
  needsReconcile: boolean
  evidence?: string[]
}
