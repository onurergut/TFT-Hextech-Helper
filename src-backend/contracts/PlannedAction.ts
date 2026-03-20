export type PlannedActionKind =
  | 'buy'
  | 'sell'
  | 'move'
  | 'equip'
  | 'refresh'
  | 'buy_xp'
  | 'reset_position'

export interface PlannedAction {
  id: string
  kind: PlannedActionKind
  reason: string
  risk: 'low' | 'medium' | 'high'
  preconditions: string[]
  postconditions: string[]
  timeoutMs: number
}
