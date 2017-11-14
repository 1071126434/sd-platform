const BuyerApply = (resolve) => {
  import('@/components/money/buyerApply/buyerApply').then((module) => {
    resolve(module)
  })
}
const SellerRecharge = (resolve) => {
  import('@/components/money/sellerRecharge/sellerRecharge').then((module) => {
    resolve(module)
  })
}
const money = [{
  path: 'money/buyerApply',
  component: BuyerApply,
  name: 'buyerApply'
},
{
  path: 'money/sellerRecharge',
  component: SellerRecharge,
  name: 'sellerRecharge'
}
]
export default money
