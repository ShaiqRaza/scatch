let addProductPopup = document.querySelector('#addProductPopup');
let addProduct = document.querySelector('#addProduct');
let addProductClick = true;
addProduct.addEventListener('click', ()=>{
    if(addProductClick) 
        addProductPopup.style.display = "block";
    else
        addProductPopup.style.display = "none";

    addProductClick = !addProductClick;
});