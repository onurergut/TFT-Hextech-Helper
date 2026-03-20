import test from 'node:test'
import assert from 'node:assert/strict'
import { ActionTrace } from '../../src-backend/utils/ActionTrace'

test('ActionTrace creates unique trace ids', () => {
  const first = ActionTrace.create('buy')
  const second = ActionTrace.create('buy')

  assert.notEqual(first.id, second.id)
  assert.equal(first.kind, 'buy')
  assert.equal(second.kind, 'buy')
})
