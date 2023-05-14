export interface IModelProduct<T> {
  read(): Promise<T[]>,
  readOne(id: number): Promise<T | null>,
  update(obj: T): Promise<T | null>,
}
