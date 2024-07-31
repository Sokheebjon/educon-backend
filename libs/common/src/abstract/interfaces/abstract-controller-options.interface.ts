export interface AbstractControllerOptions<T, C, V> {
  model: { new (doc?: any): T }
  createDto: { new (doc?: any): C }
  updateDto: { new (doc?: any): V }
  name: string,
  include?:any
}
