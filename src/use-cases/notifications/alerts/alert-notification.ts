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
import type { IAlertNotificationsRepository } from '@/repositories/alert-notifications-repository'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { type IBaseNotification, NotificationBaseClass } from '../notification-base-class'

interface IAlertNotificationsUpdateParams extends IUpdateAlertParams {
  alertId: string
}

interface ICreateAlert extends IBaseNotification<ICreateAlertParams, ICreateAlertResponse> {}
interface IGetAlert extends IBaseNotification<IGetAlertParams, IGetAlertResponse> {}
interface IListAlerts extends IBaseNotification<IListAlertsParams, IListAlertsResponse> {}
interface IUpdateAlert extends IBaseNotification<IAlertNotificationsUpdateParams, void> {}
interface IDeleteAlert extends IBaseNotification<IDeleteAlertParams, void> {}

export class AlertNotification extends NotificationBaseClass<ICreateAlert, IGetAlert, IListAlerts, IUpdateAlert, IDeleteAlert> {
  constructor(private readonly alertRepository: IAlertNotificationsRepository) {
    super()
  }

  async create(params: ICreateAlertParams): Promise<ICreateAlertResponse> {
    return this.alertRepository.create(params)
  }

  async get(params: IGetAlertParams): Promise<IGetAlertResponse> {
    const alert = await this.alertRepository.findById(params)

    if (!alert) {
      throw new ResourceNotFoundError()
    }

    return alert
  }

  async list(params?: IListAlertsParams): Promise<IListAlertsResponse> {
    return this.alertRepository.findAll(params)
  }

  async update(params: IAlertNotificationsUpdateParams): Promise<void> {
    const { alertId, ...updateParams } = params

    return this.alertRepository.update(updateParams, alertId)
  }

  async delete(params: IDeleteAlertParams): Promise<void> {
    return this.alertRepository.delete(params)
  }
}
