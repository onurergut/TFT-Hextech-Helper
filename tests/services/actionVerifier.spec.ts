import test from 'node:test'
import assert from 'node:assert/strict'
import { ActionVerifier } from '../../src-backend/services/ActionVerifier'

test('ActionVerifier returns failed when postconditions contradict observed state', () => {
  const verifier = new ActionVerifier()
  const result = verifier.verify(
    { id: 'buy-1', kind: 'buy', reason: 'test', risk: 'low', preconditions: [], postconditions: ['shop slot empty'], timeoutMs: 100 },
    { contradiction: true }
  )

  assert.equal(result.outcome, 'failed')
  assert.equal(result.ok, false)
})

test('ActionVerifier returns confirmed when observed state matches expected outcome', () => {
  const verifier = new ActionVerifier()
  const result = verifier.verify(
    { id: 'buy-1', kind: 'buy', reason: 'test', risk: 'low', preconditions: [], postconditions: ['shop slot empty'], timeoutMs: 100 },
    { confirmed: true }
  )

  assert.equal(result.outcome, 'confirmed')
  assert.equal(result.ok, true)
})
