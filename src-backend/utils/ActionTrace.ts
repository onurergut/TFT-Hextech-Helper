export interface ActionTraceRecord {
  id: string
  kind: string
}

export class ActionTrace {
  static create(kind: string): ActionTraceRecord {
    return {
      id: `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind,
    }
  }
}
