import test from 'node:test'
import assert from 'node:assert/strict'
import { DebugArtifacts } from '../../src-backend/utils/DebugArtifacts'

test('DebugArtifacts builds deterministic failure artifact paths', () => {
  const path = DebugArtifacts.buildFailurePath('verify', 'buy-1')

  assert.match(path, /verify/)
  assert.match(path, /buy-1/)
})
