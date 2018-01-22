const OrderManger = (resolve) => {
  import('@/components/order/orderManger/orderManger').then((module) => {
    resolve(module)
  })
}
const OrderFind = (resolve) => {
  import('@/components/order/orderFind/orderFind').then((module) => {
    resolve(module)
  })
}
const OrderRegectDetail = (resolve) => {
  import('@/components/order/orderRegectDetail/orderRegectDetail').then((module) => {
    resolve(module)
  })
}
const OrderEvaluteRegect = (resolve) => {
  import('@/components/order/orderEvaluteRegect/orderEvaluteRegect').then((module) => {
    resolve(module)
  })
}
const TaskPackage = (resolve) => {
  import('@/components/order/taskPackage/taskPackage').then((module) => {
    resolve(module)
  })
}
const order = [{
  path: 'order/orderManger',
  component: OrderManger,
  name: 'orderManger'
},
{
  path: 'order/orderFind',
  component: OrderFind,
  name: 'orderFind'
},
{
  path: 'order/orderRegectDetail',
  component: OrderRegectDetail,
  name: 'orderRegectDetail'
},
{
  path: 'order/orderEvaluteRegect',
  component: OrderEvaluteRegect,
  name: 'orderEvaluteRegect'
},
{
  path: 'order/taskPackage',
  component: TaskPackage,
  name: 'taskPackage',
  meta: { title: '派单管理' }
}
]
export default order
