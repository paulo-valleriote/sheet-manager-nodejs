import type { IBaseNotification } from '../base-notification'
import type { IAlertTypes } from '../enums/alert-types'

export interface IAlertNotification extends IBaseNotification {
  alertType: IAlertTypes
}
