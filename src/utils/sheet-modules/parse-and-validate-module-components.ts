import { randomUUID } from 'node:crypto'
import { ISheetModuleTypes } from '@/domain/entities/enums/sheet-module-types'
import { HandleModuleContentGuardType } from '@/domain/entities/sheet/module-content'
import type { IModuleComponent } from '@/domain/entities/sheet/module-content'
import { InvalidBodyIntoModuleComponentError } from '@/use-cases/_errors/extended/sheet/invalid-body-into-module-component'
import { z } from 'zod'

/**
 * Verify and parse components of sheet template to ensure validation
 * @param parentId - Parent ID
 * @param components - Components
 * @param skipContainerValidation - Skip "container" type validation
 * @returns Formatted components
 */
export function verifyAndParseComponents(
  parentId: string,
  components: IModuleComponent[],
  skipContainerValidation = false,
) {
  const typeGuardHandler = new HandleModuleContentGuardType()
  const formattedComponents: IModuleComponent[] = []

  for (const component of components) {
    component.parentId = parentId

    if (typeGuardHandler.isTextComponent(component)) {
      const parsedComponent = parseAndValidateModuleComponent(component, parseTextComponent, ISheetModuleTypes.TEXT)
      formattedComponents.push(parsedComponent)
    }

    if (typeGuardHandler.isListComponent(component)) {
      const parsedComponent = parseAndValidateModuleComponent(component, parseListComponent, ISheetModuleTypes.LIST)
      formattedComponents.push(parsedComponent)
    }

    if (typeGuardHandler.isSelectComponent(component)) {
      const parsedComponent = parseAndValidateModuleComponent(component, parseSelectComponent, ISheetModuleTypes.SELECT)
      formattedComponents.push(parsedComponent)
    }

    if (typeGuardHandler.isContainerComponent(component) && !skipContainerValidation) {
      const containerComponent = parseContainerComponent(component)
      formattedComponents.push(containerComponent)
    }
  }

  return formattedComponents
}

function parseAndValidateModuleComponent<T>(
  component: IModuleComponent,
  parseFunction: (component: IModuleComponent) => z.SafeParseReturnType<IModuleComponent, T>,
  moduleType: ISheetModuleTypes,
): T {
  const safeParseResult = parseFunction(component)

  if (!safeParseResult.success) {
    throw new InvalidBodyIntoModuleComponentError(moduleType)
  }

  return safeParseResult.data
}

function parseTextComponent(component: IModuleComponent) {
  const textComponentSchema = z.object({
    id: z.string().default(() => randomUUID()),
    parentId: z.string(),
    type: z.literal(ISheetModuleTypes.TEXT),
    label: z.string().min(1),
    placeholder: z.string().optional(),
    value: z.string().min(1),
  })

  return textComponentSchema.safeParse(component)
}

function parseListComponent(component: IModuleComponent) {
  const listComponentSchema = z.object({
    id: z.string().default(() => randomUUID()),
    parentId: z.string(),
    type: z.literal(ISheetModuleTypes.LIST),
    items: z.array(
      z.object({
        id: z.string().default(() => randomUUID()),
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    ),
  })

  return listComponentSchema.safeParse(component)
}

function parseSelectComponent(component: IModuleComponent) {
  const selectComponentSchema = z.object({
    id: z.string().default(() => randomUUID()),
    parentId: z.string(),
    type: z.literal(ISheetModuleTypes.SELECT),
    options: z.array(
      z.object({
        id: z.string().default(() => randomUUID()),
        default: z.boolean().default(false),
        selected: z.boolean().default(false),
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    ),
  })

  return selectComponentSchema.safeParse(component)
}

function parseContainerComponent(component: IModuleComponent) {
  const containerComponentSchema = z.object({
    id: z.string(),
    parentId: z.string(),
    type: z.literal(ISheetModuleTypes.CONTAINER),
    children: z.array(z.any()),
  })

  const containerSafeParse = containerComponentSchema.safeParse(component)

  if (!containerSafeParse.success) {
    throw new InvalidBodyIntoModuleComponentError(ISheetModuleTypes.CONTAINER)
  }

  const _data = containerSafeParse.data

  return {
    ..._data,
    children: verifyAndParseComponents(_data.id, _data.children, true),
  }
}
