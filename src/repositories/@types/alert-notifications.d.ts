import type { IAlertNotification } from '@/domain/entities/notifications/alert-notification'
import type { Optional } from '@/domain/types/optional'

interface IAlertNotificationReadonlyOperationParams {
  alertId: string
  userId: string
}

/** Parameters for retrieving a specific party
 * @property {string} alertId - Unique identifier of the alert
 * @property {string} userId - Unique identifier of the user
 */
interface IGetAlertParams extends IAlertNotificationReadonlyOperationParams {}

/** Parameters for listing all alerts
 * @property {string} userId - Unique identifier of the user
 */
interface IListAlertsParams extends Pick<IAlertNotificationReadonlyOperationParams, 'userId'> {}

/** Parameters for creating a new alert
 * @property {string} title - Title of the alert
 * @property {string} content - Content of the alert
 * @property {string} alertType - Type of the alert
 * @property {string} userId - Unique identifier of the user
 */
interface ICreateAlertParams extends Optional<IAlertNotification, 'id' | 'createdAt' | 'viewedAt'> {}

/** Parameters for updating an existing alert
 * @property {string} userId - Unique identifier of the user
 * @property {string} [title] - New title for the alert
 * @property {string} [content] - New content for the alert
 * @property {string} [alertType] - New type for the alert
 */
interface IUpdateAlertParams extends Omit<IAlertNotificationReadonlyOperationParams, 'alertId'> {
  title?: string
  content?: string
  alertType?: string
}

/** Parameters for deleting a alert
 * @property {string} alertId - Unique identifier of the alert to delete
 * @property {string} userId - Unique identifier of the user
 */
interface IDeleteAlertParams extends IAlertNotificationReadonlyOperationParams {}

interface ICreateAlertResponse {
  data: Pick<IAlertNotification, 'id'>
}

/** Response structure for getting a single alert
 * @property {IAlertNotification | null} data - The retrieved alert data or null if not found
 */
interface IGetAlertResponse {
  data: IAlertNotification | null
}

/** Response structure for listing alerts
 * @property {IAlertNotification[]} data - Array of alert data
 */
interface IListAlertsResponse {
  data: IAlertNotification[]
}

export type {
  IGetAlertParams,
  IGetAlertResponse,
  IListAlertsParams,
  IListAlertsResponse,
  ICreateAlertParams,
  ICreateAlertResponse,
  IUpdateAlertParams,
  IDeleteAlertParams,
}
