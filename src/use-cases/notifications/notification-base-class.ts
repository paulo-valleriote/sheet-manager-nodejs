export interface IBaseNotification<Request, Response> {
  Request: Request
  Response: Response
}

export abstract class NotificationBaseClass<
  TCreate extends IBaseNotification<unknown, unknown>,
  TGet extends IBaseNotification<unknown, unknown>,
  TList extends IBaseNotification<unknown, unknown>,
  TUpdate extends IBaseNotification<unknown, unknown>,
  TDelete extends IBaseNotification<unknown, unknown>,
> {
  abstract create(params: TCreate['Request']): Promise<TCreate['Response']>
  abstract get(params: TGet['Request']): Promise<TGet['Response']>
  abstract list(params?: TList['Request']): Promise<TList['Response']>
  abstract update(params: TUpdate['Request']): Promise<TUpdate['Response']>
  abstract delete(params: TDelete['Request']): Promise<TDelete['Response']>
}
