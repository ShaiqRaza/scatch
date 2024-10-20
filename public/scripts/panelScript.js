let addProductPopup = document.querySelector('#addProductPopup');
let addProductPopup_reverse = document.querySelector('#addProductPopup_reverse');
let addProduct = document.querySelector('#addProduct');
let addProductClick = true;
addProduct.addEventListener('click', ()=>{
    if(addProductClick) 
        addProductPopup.style.display = "block";
    else
        addProductPopup.style.display = "none";

    addProductClick = !addProductClick;
});
addProduct.addEventListener('click', ()=>{
    if(!addProductClick) 
        addProductPopup_reverse.style.display = "block";
    else
    addProductPopup_reverse.style.display = "none";

    addProductClick = !addProductClick;
});