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

let editProductPopup = document.querySelectorAll('.editProductPopup');
let editProduct = document.querySelectorAll('.editProduct');
editProduct.forEach((product, i)=>{
    let editProductClick = true;
    product.addEventListener('click', ()=>{
        if(editProductClick) 
            editProductPopup[i].style.display = "block";
        else
            editProductPopup[i].style.display = "none";

        editProductClick = !editProductClick;
    });
});
