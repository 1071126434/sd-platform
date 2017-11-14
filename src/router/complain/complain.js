const SellerComplain = (resolve) => {
  import('@/components/complain/sellerComplain/sellerComplain').then((module) => {
    resolve(module)
  })
}
const complain = [{
  path: 'complain/sellerComplain',
  component: SellerComplain,
  name: 'sellerComplain'
}]
export default complain
