import test from 'node:test'
import assert from 'node:assert/strict'
import { StrategyExecutionRegistry } from '../../src-backend/services/StrategyExecutionRegistry'

test('StrategyExecutionRegistry cancels previous execution context when a new one begins', () => {
  const registry = new StrategyExecutionRegistry()

  const first = registry.begin('stage-1')
  const second = registry.begin('stage-2')

  assert.equal(first.cancelled, true)
  assert.equal(second.cancelled, false)
  assert.equal(registry.current(), second)
})
