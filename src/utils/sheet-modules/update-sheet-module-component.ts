import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import type { IModuleComponent } from '@/domain/entities/module-content'
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
  const parsedComponents = verifyAndParseComponents(originalSheetTemplate.id, JSON.parse(originalSheetTemplate.children))
  const updatedComponents: IModuleTemplateValue[] = []

  for (const newValue of newModuleValues) {
    for (const component of parsedComponents) {
      if (component.id === newValue.id) {
        updatedComponents.push(updateComponentByType(component, newValue))
      }
    }
  }

  return updatedComponents
}

function updateComponentByType(
  component: IModuleComponent,
  newValue: IModuleTemplateValue
): IModuleTemplateValue {
  switch (component.type) {
    case ISheetModuleTypes.TEXT:
      return updateTextComponent(component, newValue)
    case ISheetModuleTypes.LIST:
      return updateListComponent(component, newValue)
    case ISheetModuleTypes.SELECT:
      return updateSelectComponent(component, newValue)
    case ISheetModuleTypes.CONTAINER: 
      return updateContainerComponent(component, newValue)
  }
}


function isTextValue(value: IModuleTemplateValue): value is ITextTemplateValue {
  return value.type === ISheetModuleTypes.TEXT
}

function isListValue(value: IModuleTemplateValue): value is IListTemplateValue {
  return value.type === ISheetModuleTypes.LIST
}

function isSelectValue(value: IModuleTemplateValue): value is ISelectTemplateValue {
  return value.type === ISheetModuleTypes.SELECT
}

function isContainerValue(value: IModuleTemplateValue): value is IContainerTemplateValue {
  return value.type === ISheetModuleTypes.CONTAINER
}

/**
 * Update text module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateTextComponent(
  component: Extract<IModuleComponent, { type: ISheetModuleTypes.TEXT }>,
  newValue: IModuleTemplateValue,
) {
  if (isTextValue(newValue)) {
    return { ...component, ...newValue }
  }

  throw new Error('Invalid value type for TEXT component')
}

/**
 * Update list module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateListComponent(
  component: Extract<IModuleComponent, { type: ISheetModuleTypes.LIST }>,
  newValue: IModuleTemplateValue,
) {
  if (!isListValue(newValue)) {
    throw new Error('Invalid value type for LIST component')
  }

  return {
    ...component,
    items: newValue.items?.map((newItem) => {
      const existingItem = component.items?.find((item) => item.id === newItem.id)
      return existingItem ? { ...existingItem, ...newItem } : newItem
    }),
  }
}

/**
 * Update select module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateSelectComponent(
  component: Extract<IModuleComponent, { type: ISheetModuleTypes.SELECT }>,
  newValue: IModuleTemplateValue,
) {
  if (!isSelectValue(newValue)) {
    throw new Error('Invalid value type for SELECT component')
  }

  return {
    ...component,
    options: newValue.options?.map((newOption) => {
      const existingOption = component.options?.find((option) => option.id === newOption.id)
      return existingOption ? { ...existingOption, ...newOption } : newOption
    }),
  } as ISelectTemplateValue
}

/**
 * Update container module component
 * @param component - Component to be updated
 * @param newValue - New value for the component
 */
function updateContainerComponent(
  component: Extract<IModuleComponent, { type: ISheetModuleTypes.CONTAINER }>,
  newValue: IModuleTemplateValue,
) {
  if (!isContainerValue(newValue)) {
    throw new Error('Invalid value type for CONTAINER component')
  }

  return {
    ...component,
    children: newValue.children?.map((newChild) => {
      const existingChild = component.children.find((child) => child.id === newChild.id)
      return existingChild ? { ...existingChild, ...newChild } : newChild
    }),
  } as IContainerTemplateValue
}
