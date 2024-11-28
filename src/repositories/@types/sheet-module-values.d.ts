/**
 * Represents a text input template value
 * @interface ITextTemplateValue
 * @extends {ITemplateValue}
 * @property {string} id - Unique identifier for the template value
 * @property {string} [value] - Optional value for the text input
 * @property {string} label - Display label for the text input
 * @property {string} [placeholder] - Optional placeholder text
 */
interface ITextTemplateValue extends ITemplateValue {
  label: string;
  placeholder?: string;
}

/**
 * Represents a list template value containing multiple items
 * @interface IListTemplateValue
 * @extends {ITemplateValue}
 * @property {string} id - Unique identifier for the template value
 * @property {string} [value] - Optional value for the list
 * @property {Array<{id: string, label: string, value?: string}>} items - Array of list items
 */
interface IListTemplateValue extends ITemplateValue {
  items: Array<{ id: string; label: string; value?: string }>;
}

/**
 * Represents a select/dropdown template value with multiple options
 * @interface ISelectTemplateValue
 * @extends {ITemplateValue}
 * @property {string} id - Unique identifier for the template value
 * @property {string} [value] - Optional value for the select
 * @property {Array<{id: string, label: string, value?: string, default?: boolean, selected?: boolean}>} options - Array of select options
 */
interface ISelectTemplateValue extends ITemplateValue {
  options: Array<{ id: string; label: string; value?: string; default?: boolean; selected?: boolean }>;
}

/**
 * Represents a container template value that can hold other template values
 * @interface IContainerTemplateValue
 * @extends {ITemplateValue}
 * @property {string} id - Unique identifier for the template value
 * @property {string} [value] - Optional value for the container
 * @property {ITemplateValue[]} children - Array of child template values
 */
interface IContainerTemplateValue extends ITemplateValue {
  children: ITemplateValue[];
}

type IModuleTemplateValue =
  | ITextTemplateValue
  | IListTemplateValue
  | ISelectTemplateValue
  | IContainerTemplateValue;

export type { 
  ITextTemplateValue,
  IListTemplateValue,
  ISelectTemplateValue,
  IContainerTemplateValue,
  IModuleTemplateValue
 }