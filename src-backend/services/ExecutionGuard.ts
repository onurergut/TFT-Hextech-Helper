export interface ExecutionContext {
  id: string
  reason: string
  cancelled: boolean
  cancel: () => void
  throwIfCancelled: () => void
}

export class ExecutionGuard {
  private currentContext: ExecutionContext | null = null
  private sequence = 0

  begin(reason: string): ExecutionContext {
    this.currentContext?.cancel()

    const context: ExecutionContext = {
      id: `exec-${++this.sequence}`,
      reason,
      cancelled: false,
      cancel: () => {
        context.cancelled = true
      },
      throwIfCancelled: () => {
        if (context.cancelled) {
          throw new Error(`Execution context cancelled: ${context.reason}`)
        }
      },
    }

    this.currentContext = context
    return context
  }

  current(): ExecutionContext | null {
    return this.currentContext
  }
}
