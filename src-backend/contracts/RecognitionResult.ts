export type RecognitionSource = 'ocr' | 'template' | 'derived'

export interface RecognitionResult<T> {
  value: T | null
  confidence: number
  source: RecognitionSource
  warnings?: string[]
}

export function createRecognitionResult<T>(
  value: T | null,
  confidence: number,
  source: RecognitionSource,
  warnings?: string[]
): RecognitionResult<T> {
  return { value, confidence, source, warnings }
}
