const CURRANCU_FORMATER =  new Intl.NumberFormat(undefined , {
    currency:"USD",
    style: 'currency',
})

export const formantCurrancy = (num)=>{
    return CURRANCU_FORMATER.format(num)
}
