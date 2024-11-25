/**
 * This is a utility type to make optional properties in an object.
 * 
 * @example
 * ``` typescript
 * type Post {
 * id: string
 * title: string
 * body: string
 * }
 *
 * type MaybePost = Optional<Post, 'id' | 'email'>
 * ```
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>