const Error = (resolve) => {
  import('@/components/error/error').then((module) => {
    resolve(module)
  })
}
const error = [{
  path: '/error',
  component: Error,
  name: 'error'
}]
export default error
