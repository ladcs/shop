export interface IModelPacks<T> {
  read(): Promise<T[]>,
  readOne(id: number): Promise<T[] | T | null>,
}
