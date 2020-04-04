declare module 'rc-form' {
  import * as React from 'react'

  type ValidationRule = {
    message?: React.ReactNode
    type?: string
    required?: boolean
    whitespace?: boolean
    len?: number
    min?: number
    max?: number
    enum?: string | string[]
    pattern?: RegExp
    transform?: (value: any) => any
    validator?: (rule: any, value: any, callback: any, source?: any, options?: any) => any
  }

  export type GetFieldDecoratorOptions = {
    valuePropName?: string
    initialValue?: any
    trigger?: string
    validateTrigger?: string | string[]
    rules?: ValidationRule[]
    exclusive?: boolean
    validateFirst?: boolean
    hidden?: boolean
    preserve?: boolean
    getValueFromEvent?(...args: any[]): any
    getValueProps?(value): object
    normalize?(value: any, prevValue: any, allValues: any): any
  }

  type ValidateCallback = (errors: any, values: any) => void

  type formShape = {
    getFieldsValue(fieldNames?: string[]): object
    getFieldValue(fieldName: string): any
    setFieldsValue(obj: object): void
    setFields(obj: object): void
    validateFields(fieldNames: string[], options: object, callback: ValidateCallback): void
    validateFields(fieldNames: string[], callback: ValidateCallback): void
    validateFields(options: object, callback: ValidateCallback): void
    validateFields(callback: ValidateCallback): void
    validateFields(): void
    validateFieldsAndScroll(fieldNames?: string[], options?: object, callback?: ValidateCallback): void
    validateFieldsAndScroll(fieldNames?: string[], callback?: ValidateCallback): void
    validateFieldsAndScroll(options?: object, callback?: ValidateCallback): void
    validateFieldsAndScroll(callback?: ValidateCallback): void
    validateFieldsAndScroll(): void
    getFieldError(name: string): string[] | undefined
    getFieldsError(names?: string[]): object
    isFieldValidating(name: string): boolean
    isFieldsValidating(names: string[]): boolean
    isFieldTouched(name: string): boolean
    isFieldsTouched(names?: string[]): boolean
    resetFields(names?: string[]): void
    getFieldDecorator<T extends object = {}>(id: keyof T, options?: GetFieldDecoratorOptions):
      (node: React.ReactNode) => React.ReactNode
  }

  export type FormComponentProps = { form: formShape }

  export function createForm(): (node: React.ComponentType<any>) => React.ComponentType<any & FormComponentProps>
}
