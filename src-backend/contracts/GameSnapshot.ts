import type { RecognitionResult } from './RecognitionResult'

export interface SnapshotConfidence {
  stage: number
  shop: number
  bench: number
  board: number
  equips: number
  level: number
  gold: number
  overall: number
}

export interface GameSnapshot {
  observedAt: number
  stageText: string
  stageType: string
  isFighting: boolean
  shopUnits: Array<RecognitionResult<unknown>>
  benchUnits: Array<RecognitionResult<unknown>>
  boardUnits: Array<RecognitionResult<unknown>>
  equipments: Array<RecognitionResult<unknown>>
  levelInfo: RecognitionResult<{ level: number; currentXp: number; totalXp: number }>
  gold: RecognitionResult<number>
  confidence: SnapshotConfidence
  authority: {
    shop: 'observed'
    bench: 'observed'
    board: 'observed'
    equips: 'observed' | 'derived'
    level: 'observed' | 'derived'
    gold: 'observed' | 'derived'
  }
}
