# Phase 1 Remediation Baseline

Date: 2026-03-20
Branch: `phase1-reliability-hardening`

## Baseline verification

The branch starts from a clean static baseline:

- `npm run typecheck` ✅
- `npm run lint` ✅
- `npm run build` ✅

Non-blocking note:
- Build emits a `baseline-browser-mapping` staleness warning, but the build completes successfully.

## High-risk flow inventory

The current system has several high-risk flows where screen recognition, cached state, and side-effectful input automation interact.

### 1. Buy flow

Primary entry points:
- `electron/main.ts:660` → `IpcChannel.TFT_BUY_AT_SLOT`
- `src-backend/TftOperator.ts:603` → `buyAtSlot(slot)`
- `src-backend/services/StrategyService.ts:3471` → `autoBuyFromShop(...)`

Characteristics:
- Input side effect via mouse click
- Depends on accurate shop recognition and sufficient gold/bench state
- Currently not uniformly verified after execution

### 2. Refresh flow

Primary entry points:
- `src-backend/TftOperator.ts:624` → `refreshShop()`
- `src-backend/services/StrategyService.ts:1112` → `refreshGameState()`
- `src-backend/services/StrategyService.ts:2493` → `executeRollingLoop(...)`

Characteristics:
- Mixes OCR/template scanning with cached state updates
- Partial refreshes and local assumptions can drift from the actual game state

### 3. Experience / level-up flow

Primary entry points:
- `src-backend/TftOperator.ts:635` → `buyExperience()`
- `src-backend/services/StrategyService.ts` level-up strategy path

Characteristics:
- Economic state depends on OCR-derived level/xp/gold values
- Incorrect derived state can cascade into later decisions

### 4. Sell flow

Primary entry points:
- `src-backend/TftOperator.ts:1725` → `sellUnit(location)`
- `src-backend/services/StrategyService.ts` board cleanup / replacement / duplicate-removal logic

Characteristics:
- Destructive input action
- Can change both board state and equipment availability
- Needs post-action reconciliation to avoid stale state

### 5. Move flow

Primary entry points:
- `src-backend/TftOperator.ts:1764` → `moveBenchToBoard(...)`
- `src-backend/TftOperator.ts:1802` → `moveBoardToBoard(...)`
- `src-backend/TftOperator.ts:1832` → `moveBoardToBench(...)`
- `src-backend/services/StrategyService.ts:1556` → `optimizeBoard(...)`

Characteristics:
- Drag-and-drop side effects
- Vulnerable to source/target mismatch and cached state drift
- Strong candidate for verified-action wrappers

### 6. Equip flow

Primary entry points:
- `src-backend/TftOperator.ts:1919` → `equipToBoardUnit(...)`
- `src-backend/services/StrategyService.ts:2814` → `executeEquipStrategy()`

Characteristics:
- High-risk side effect because mistakes are expensive and hard to recover from
- Depends on reliable equipment scanning and target selection
- Currently lacks a dedicated verification contract

### 7. Rolling loop flow

Primary entry points:
- `src-backend/services/StrategyService.ts:2493` → `executeRollingLoop(...)`
- `src-backend/services/StrategyService.ts:3471` → `autoBuyFromShop(...)`
- `src-backend/services/StrategyService.ts:1556` → `optimizeBoard(...)`
- `src-backend/services/StrategyService.ts:2814` → `executeEquipStrategy()`

Characteristics:
- Multi-step composite flow
- Mixes buy / refresh / board / equip operations in one sequence
- Most exposed to execution overlap and stale state problems

## Current architectural hotspots

- `src-backend/services/StrategyService.ts` is still the main orchestration hotspot
- `src-backend/TftOperator.ts` still combines recognition and input responsibilities
- `electron/main.ts` still hosts a broad IPC registration surface

## Immediate Phase 1 targets

Based on the baseline, the first reliability-hardening targets should be:
1. explicit execution guard
2. explicit reconciliation policy
3. verified-action contracts for buy/sell/move/equip
4. observability hooks for action traces and evidence
5. narrower and better-scoped IPC entry points
