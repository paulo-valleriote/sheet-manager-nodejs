import type { ICreateAlertParams } from '@/repositories/@types/alert-notifications'
import type { IAlertNotificationsRepository } from '@/repositories/alert-notifications-repository'

interface IEmitAlertParams extends ICreateAlertParams {}

export class EmitAlertUseCase {
  constructor(private readonly alertRepository: IAlertNotificationsRepository) {}

  async execute(params: IEmitAlertParams): Promise<void> {
    await this.alertRepository.create(params)
  }
}
