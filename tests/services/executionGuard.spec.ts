import test from 'node:test'
import assert from 'node:assert/strict'
import { ExecutionGuard } from '../../src-backend/services/ExecutionGuard'

test('ExecutionGuard replaces stale execution contexts', () => {
  const guard = new ExecutionGuard()
  const first = guard.begin('stage-1')
  const second = guard.begin('stage-2')

  assert.equal(first.cancelled, true)
  assert.equal(second.cancelled, false)
  assert.equal(guard.current(), second)
})

test('ExecutionGuard throws when a cancelled context is used', () => {
  const guard = new ExecutionGuard()
  const first = guard.begin('stage-1')
  guard.begin('stage-2')

  assert.throws(() => first.throwIfCancelled(), /cancelled/i)
})
