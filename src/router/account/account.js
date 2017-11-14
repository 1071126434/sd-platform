const BuyerAccount = (resolve) => {
  import('@/components/account/buyerAccount/buyerAccount').then((module) => {
    resolve(module)
  })
}
const SellerAccount = (resolve) => {
  import('@/components/account/sellerAccount/sellerAccount').then((module) => {
    resolve(module)
  })
}
const account = [{
  path: 'account/buyerAccount',
  component: BuyerAccount,
  name: 'buyerAccount'
}, {
  path: 'account/sellerAccount',
  component: SellerAccount,
  name: 'sellerAccount'
}]
export default account
