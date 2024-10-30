const productModel = require('../models/productModel');
let addtocart = async (req, res)=>{
    //check either product is already added to cart or not
    let checkCart = req.user.cart.some( (element) => element == req.params.id);
    if(checkCart) {
        req.flash("error", "Product already added to cart");
        return res.redirect('/');
    }
    req.user.cart.push(req.params.id);
    await req.user.save();
    res.redirect('/');
}
module.exports.addtocart = addtocart;

let removeFromCart = async (req, res)=>{
    //check either product is already added to cart or not
    let checkCart = req.user.cart.some( (element) => element == req.params.id);
    if(checkCart) {
        let newUserCart;
        newUserCart = req.user.cart.filter( (item) => item != req.params.id );
        req.user.cart = newUserCart;
        await req.user.save();
        if(req.params.page == "cartPage")
            return res.redirect('/user/cart')
        return res.redirect('/');
    }
    req.flash("error", "Product already not added to cart");
    if(req.params.page == "cartPage")
        return res.redirect('/user/cart')
    res.redirect('/');
}
module.exports.removeFromCart = removeFromCart;