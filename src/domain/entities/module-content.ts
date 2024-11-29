import { ISheetModuleTypes } from './enums/sheet-module-types'

/**
 * Root module entity
 * @description Base module application entity
 * @property {string} id - Module id
 * @property {string} parentId - Parent module id
 */
interface IBaseModule {
  id: string
  parentId: string
}

/**
 * Item for list module
 * @description Item for list module
 * @property {string} id - Item id
 * @property {string} label - Item label
 * @property {string} value - Item value
 */
interface IListModuleItem {
  id: string
  label: string
  value: string
}

/**
 * ModuleTextComponent entity
 * @description Module text component application entity, used to create text fields
 * @property {string} label - Label
 * @property {string} placeholder - Placeholder
 * @property {string} value - Value
 */
export interface IModuleTextComponent extends IBaseModule {
  type: ISheetModuleTypes.TEXT
  label?: string
  placeholder?: string
  value?: string
}

/**
 * ModuleListComponent entity
 * @description Module list component application entity, used to create lists
 * @property {object[]} items - List items
 */
export interface IModuleListComponent extends IBaseModule {
  type: ISheetModuleTypes.LIST
  items?: IListModuleItem[]
}

/**
 * ModuleSelectComponent entity
 * @description Module select component application entity
 */
export interface IModuleSelectComponent extends IBaseModule {
  type: ISheetModuleTypes.SELECT
  options?: {
    id: string
    default: boolean
    selected: boolean
    value: string
  }[]
}

/**
 * ModuleContainerComponent entity
 * @description Module container component application entity, used to create containers allowing to group modules
 * @property {object[]} children - Children modules
 */
export interface IModuleContainerComponent extends IBaseModule {
  type: ISheetModuleTypes.CONTAINER
  children: IModuleComponent[]
}

export type IModuleComponent =
  | IModuleTextComponent
  | IModuleListComponent
  | IModuleSelectComponent
  | IModuleContainerComponent

export class HandleModuleContentGuardType {
  isTextComponent(content: IModuleComponent): content is IModuleTextComponent {
    return content.type === ISheetModuleTypes.TEXT
  }

  isSelectComponent(content: IModuleComponent): content is IModuleSelectComponent {
    return content.type === ISheetModuleTypes.SELECT
  }

  isListComponent(content: IModuleComponent): content is IModuleListComponent {
    return content.type === ISheetModuleTypes.LIST
  }

  isContainerComponent(content: IModuleComponent): content is IModuleContainerComponent {
    return content.type === ISheetModuleTypes.CONTAINER
  }
}
