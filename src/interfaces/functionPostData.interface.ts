export interface IFunctionPostData<T> {
  (data: T): Promise<object>;
}
