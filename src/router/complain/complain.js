const SellerComplain = (resolve) => {
  import('@/components/complain/sellerComplain/sellerComplain').then((module) => {
    resolve(module)
  })
}
const SellerComplainDetail = (resolve) => {
  import('@/components/complain/sellerComplain/sellerComplainDetail').then((module) => {
    resolve(module)
  })
}
const complain = [{
  path: 'complain/sellerComplain',
  component: SellerComplain,
  name: 'sellerComplain'
}, {
  path: 'complain/sellerComplainDetail',
  component: SellerComplainDetail,
  name: 'sellerComplainDetail'
}]
export default complain
