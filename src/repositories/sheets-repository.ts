import type { ISheet } from "@/domain/entities/Sheet";

export interface ISheetsRepository {
	create(data: any): Promise<void>
	delete(sheet_id: string): Promise<void>
	get(sheet_id: string): Promise<ISheet | null>
	list(user_id: string): Promise<ISheet[]>
	update(sheet_id: string, data: ISheet): Promise<void>
}
