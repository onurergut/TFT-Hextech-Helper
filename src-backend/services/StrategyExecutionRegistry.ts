import { ExecutionGuard, type ExecutionContext } from './ExecutionGuard'

export class StrategyExecutionRegistry {
  private readonly guard = new ExecutionGuard()

  begin(reason: string): ExecutionContext {
    return this.guard.begin(reason)
  }

  current(): ExecutionContext | null {
    return this.guard.current()
  }
}
