export interface IAIProvider {
  ask(question: string): Promise<string>;
}
