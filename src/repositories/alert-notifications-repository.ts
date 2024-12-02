import type {
  ICreateAlertParams,
  ICreateAlertResponse,
  IDeleteAlertParams,
  IGetAlertParams,
  IGetAlertResponse,
  IListAlertsParams,
  IListAlertsResponse,
  IUpdateAlertParams,
} from '@/repositories/@types/alert-notifications'

export interface IAlertNotificationsRepository {
  create(data: ICreateAlertParams): Promise<ICreateAlertResponse>
  findAll(params?: IListAlertsParams): Promise<IListAlertsResponse>
  findById(params: Pick<IGetAlertParams, 'alertId'>): Promise<IGetAlertResponse>
  update(params: IUpdateAlertParams, id: string): Promise<void>
  delete(params: Pick<IDeleteAlertParams, 'alertId'>): Promise<void>
}
