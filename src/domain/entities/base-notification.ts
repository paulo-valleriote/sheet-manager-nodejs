import type { IBaseEntity } from './base-entity'
import type { INotificationTypes } from './enums/notification-types'

export interface IBaseNotification extends IBaseEntity {
  type: INotificationTypes
  viewedAt: Date | null
  title: string | null
  content: string | null
  from: string | null
  to: string | null
}
