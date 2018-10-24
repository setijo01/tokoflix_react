const priceDeterminer = (rating) => {
    let price = 21250;
    if(rating < 9)
        price= 16350;
    if(rating < 7)
        price = 8250;
    if(rating < 4)
        price = 3500;

    return price


}

export default priceDeterminer;