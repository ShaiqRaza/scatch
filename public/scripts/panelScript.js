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
let editProductButton = document.querySelectorAll('.editProductButton');
editProductButton.forEach((button, i)=>{
    button.addEventListener('click', ()=>{
        editProductPopup[i].style.display = "block";
        editProductButton.forEach((anotherButton, j)=>{
            if(button != anotherButton)
                editProductPopup[j].style.display = "none";
        })
    });
});

let cancelEditButtons = document.querySelectorAll('.cancelEdit');
cancelEditButtons.forEach((button, i)=>{
    button.addEventListener('click', ()=>{
        editProductPopup[i].style.display = "none";
    })
})
