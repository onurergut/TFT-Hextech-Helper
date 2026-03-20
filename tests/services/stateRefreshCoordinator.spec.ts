import test from 'node:test'
import assert from 'node:assert/strict'
import { StateRefreshCoordinator } from '../../src-backend/services/StateRefreshCoordinator'

test('StateRefreshCoordinator requests authoritative refresh after contradiction', () => {
  const coordinator = new StateRefreshCoordinator()
  const result = coordinator.decideAfterVerification('failed')

  assert.equal(result.mode, 'authoritative')
})

test('StateRefreshCoordinator allows partial refresh after isolated success', () => {
  const coordinator = new StateRefreshCoordinator()
  const result = coordinator.decideAfterVerification('confirmed')

  assert.equal(result.mode, 'partial')
})
