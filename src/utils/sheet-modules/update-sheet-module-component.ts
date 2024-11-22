import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import type { IModuleComponent, IModuleContainerComponent, IModuleListComponent, IModuleSelectComponent } from '@/domain/entities/module-content'
import type { ISheetTemplate } from '@/domain/entities/sheet-template'
import type {
  IContainerTemplateValue,
  IListTemplateValue,
  IModuleTemplateValue,
  ISelectTemplateValue,
  ITextTemplateValue,
} from '@/repositories/@types/sheet-module-values'
import { verifyAndParseComponents } from '@/utils/sheet-modules/parse-and-validate-module-components'

/**
 * Update sheet module components with new values by each type of component
 * @param newModuleValues - New module values
 * @param originalSheetTemplate - Original sheet template
 */
export async function updateSheetModuleComponent(
  newModuleValues: IModuleTemplateValue[],
  originalSheetTemplate: ISheetTemplate,
) {
  const updatedComponents: IModuleTemplateValue[] = []

  for (const newValue of newModuleValues) {
    const parsedComponents = verifyAndParseComponents(newValue.id, JSON.parse(originalSheetTemplate.children))

    const updatedComponentsForModule: IModuleTemplateValue[] = []

    for (const component of parsedComponents) {
      if (component.id === newValue.id) {
        switch (component.type) {
          case ISheetModuleTypes.TEXT:
            updatedComponentsForModule.push(updateTextComponent(component, newValue as ITextTemplateValue))
            break
          case ISheetModuleTypes.LIST:
            updatedComponentsForModule.push(updateListComponent(component, newValue as IListTemplateValue))
            break
          case ISheetModuleTypes.SELECT:
            updatedComponentsForModule.push(updateSelectComponent(component, newValue as ISelectTemplateValue))
            break
          case ISheetModuleTypes.CONTAINER:
            updatedComponentsForModule.push(updateContainerComponent(component, newValue as IContainerTemplateValue))
            break
        }
      }
    }

    updatedComponents.push(...updatedComponentsForModule)
  }

  return updatedComponents
}

/**
 * Update text module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateTextComponent(component: IModuleComponent, newValue: ITextTemplateValue) {
  return { ...component, ...newValue } as ITextTemplateValue
}

/**
 * Update list module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateListComponent(component: IModuleComponent, newValue: IListTemplateValue) {
  const castedComponent = component as IModuleListComponent

  return {
    ...castedComponent,
    items: newValue.items?.map((newItem) => {
      const existingItem = castedComponent.items?.find((item) => item.id === newItem.id)
      return existingItem ? { ...existingItem, ...newItem } : newItem
    }),
  }
}

/**
 * Update select module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateSelectComponent(component: IModuleComponent, newValue: ISelectTemplateValue) {
  const castedComponent = component as IModuleSelectComponent

  return {
    ...castedComponent,
    options: newValue.options?.map((newOption) => {
      const existingOption = castedComponent.options?.find((option) => option.id === newOption.id)
      return existingOption ? { ...existingOption, ...newOption } : newOption
    }),
  } as ISelectTemplateValue
}

/**
 * Update container module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateContainerComponent(component: IModuleComponent, newValue: IContainerTemplateValue) {
  const castedComponent = component as IModuleContainerComponent

  return {
    ...castedComponent,
    children: newValue.children?.map((newChild) => {
      const existingChild = castedComponent.children.find((child) => child.id === newChild.id)
      return existingChild ? { ...existingChild, ...newChild } : newChild
    }),
  } as IContainerTemplateValue
}
