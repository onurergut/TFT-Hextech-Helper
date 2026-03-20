import test from 'node:test'
import assert from 'node:assert/strict'

test('contracts smoke test loads remediation contracts', async () => {
  const mod = await import('../../src-backend/contracts/index')
  assert.ok(mod)
})
