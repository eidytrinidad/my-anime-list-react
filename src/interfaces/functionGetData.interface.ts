export interface IFunctionGetData<T> {
  (params?: any): Promise<T>;
}
