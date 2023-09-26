export interface IAIProvider {
  ask(question: string): Promise<string>;
  draw(): Promise<any>;
}
