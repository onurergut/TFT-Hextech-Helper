import test from 'node:test'
import assert from 'node:assert/strict'
import { ActionVerifier } from '../../src-backend/services/ActionVerifier'
import { StateRefreshCoordinator } from '../../src-backend/services/StateRefreshCoordinator'
import { DebugArtifacts } from '../../src-backend/utils/DebugArtifacts'

test('ActionVerifier includes trace and artifact evidence for failed verification', () => {
  const verifier = new ActionVerifier()
  const result = verifier.verify(
    { id: 'buy-1', kind: 'buy', reason: 'test', risk: 'low', preconditions: [], postconditions: ['shop slot empty'], timeoutMs: 100 },
    { contradiction: true, traceId: 'trace-1' }
  )

  assert.equal(result.outcome, 'failed')
  assert.ok(result.evidence.some(item => item.includes('trace-1')))
  assert.ok(result.evidence.some(item => item.includes(DebugArtifacts.buildFailurePath('verify', 'buy-1'))))
})

test('StateRefreshCoordinator returns reconcile evidence for failed verification', () => {
  const coordinator = new StateRefreshCoordinator()
  const result = coordinator.decideAfterVerification('failed', 'trace-2')

  assert.equal(result.mode, 'authoritative')
  assert.match(result.reason, /trace-2/)
})
