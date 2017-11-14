import task from '../task/task'
import order from '../order/order'
import money from '../money/money'
import account from '../account/account'
import complain from '../complain/complain'
const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}
const defaultHome = []
const home = [{
  path: '/home',
  component: Home,
  name: 'home',
  children: [...defaultHome, ...task, ...order, ...money, ...account, ...complain]
}]
export default home
