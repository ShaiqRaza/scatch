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