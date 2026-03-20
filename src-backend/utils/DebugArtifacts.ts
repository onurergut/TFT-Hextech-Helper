export class DebugArtifacts {
  static buildFailurePath(category: string, actionId: string): string {
    return `debug-artifacts/${category}/${actionId}.json`
  }
}
