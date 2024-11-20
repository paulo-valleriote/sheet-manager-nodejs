import type { ISheetModuleTypes } from './enums/sheet-module-types'

interface IBaseModule {
  id: string
  parentId: string
}

export interface IModuleTextComponent extends IBaseModule {
  type: ISheetModuleTypes.TEXT
  label?: string
  placeholder?: string
  value?: string
}

export interface IModuleListComponent extends IBaseModule {
  type: ISheetModuleTypes.LIST
  items?: {
    label: string
    value: string
  }[]
}

export interface IModuleSelectComponent extends IBaseModule {
  type: ISheetModuleTypes.SELECT
  options?: {
    label: string
    value: string
  }[]
}

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
    return 'label' in content || 'placeholder' in content || 'value' in content
  }

  isSelectComponent(content: IModuleComponent): content is IModuleSelectComponent {
    return 'options' in content
  }

  isListComponent(content: IModuleComponent): content is IModuleListComponent {
    return 'items' in content
  }

  isContainerComponent(content: IModuleComponent): content is IModuleContainerComponent {
    return 'children' in content
  }
}
