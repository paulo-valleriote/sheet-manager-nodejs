interface ITemplateValue {
  id: string;
  value?: string;
}

interface ITextTemplateValue extends ITemplateValue {
  label: string;
  placeholder?: string;
}

interface IListTemplateValue extends ITemplateValue {
  items: Array<{ id: string; label: string; value?: string }>;
}

interface ISelectTemplateValue extends ITemplateValue {
  options: Array<{ id: string; label: string; value?: string; default?: boolean; selected?: boolean }>;
}

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