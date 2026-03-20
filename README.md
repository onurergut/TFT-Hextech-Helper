# TFT Hextech Helper (Fork)

This repository is a personal fork of the original **TFT Hextech Helper** project.

## Origin

- Original project: [WJZ-P/TFT-Hextech-Helper](https://github.com/WJZ-P/TFT-Hextech-Helper)
- Fork owner: [onurergut](https://github.com/onurergut)

This fork keeps the original project as its base and is being used to improve maintainability, code quality, and long-term development safety.

## What This Project Is

TFT Hextech Helper is an Electron + React + TypeScript desktop app for Teamfight Tactics automation.
It connects to the game client, reads game state from the screen and client APIs, and automates repetitive in-game actions.

## What Has Been Added in This Fork

The first round of work in this fork focuses on **stabilization** rather than new gameplay features.

### Completed so far

- Fixed the local development/tooling baseline
- Cleaned up TypeScript issues so `typecheck` passes
- Cleaned up ESLint issues so `lint` passes
- Verified the project now builds successfully with `npm run build`
- Prepared the repository for isolated branch/worktree-based development
- Added planning/spec documents for a larger remediation effort

### Why these changes matter

Before adding larger improvements, the project needed a clean baseline.
A passing typecheck/lint/build pipeline makes future refactors safer and easier to review.

## What Is Planned Next

This fork is intended to continue with deeper improvements in stages.

### Planned roadmap

1. **Reliability hardening**
   - verified actions
   - safer state reconciliation
   - better execution flow control

2. **Architecture cleanup**
   - break up oversized files and responsibilities
   - improve boundaries between scanning, actions, and strategy logic

3. **Testing and dry-run support**
   - fixture-based recognition tests
   - strategy/state tests
   - safer simulation-oriented validation paths

4. **Documentation improvements**
   - clearer English documentation
   - better onboarding notes
   - explicit fork change log and roadmap

## Current Status

At the moment, this fork is mainly a **maintenance and cleanup fork**.
The goal is to turn the project into something easier to extend safely, not just to add quick patches.

## Development Commands

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

## Technical Stack

- Electron
- React
- TypeScript
- electron-vite
- MUI + styled-components
- OpenCV.js + Tesseract.js
- nut-js

## Notes

- This fork is based on the original upstream project and should be understood as a derivative maintenance branch.
- Feature ideas and roadmap items listed here are fork-specific and may differ from upstream.
- If you want the original experience and release stream, use the upstream repository.

## License and Attribution

Please review the original repository and its license terms:
- Upstream: [WJZ-P/TFT-Hextech-Helper](https://github.com/WJZ-P/TFT-Hextech-Helper)
- License file: `LICENSE`
