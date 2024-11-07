// for add product popup //
let addProductPopup = document.querySelector('#addProductPopup');
let addProductPopup_reverse = document.querySelector('#addProductPopup_reverse');
let addProduct = document.querySelector('#addProduct');
let cancelCreationButton = document.querySelector('#cancelCreation');
let addProductClick = true;
addProduct.addEventListener('click', ()=>{
    if(addProductClick) 
        addProductPopup.style.display = "block";
    else
        addProductPopup.style.display = "none";

    addProductClick = !addProductClick;
});
addProduct.addEventListener('click', ()=>{
    if(addProductPopup_reverse){
        if(!addProductClick) 
            addProductPopup_reverse.style.display = "block";
        else
        addProductPopup_reverse.style.display = "none";
    
        addProductClick = !addProductClick;
    }
});
cancelCreationButton.addEventListener('click', ()=>{
    if(addProductPopup_reverse){
        addProductPopup_reverse.style.display = "none";
        addProductClick = !addProductClick;
    }
});
cancelCreationButton.addEventListener('click', ()=>{
    addProductPopup.style.display = "none";
    addProductClick = !addProductClick;
});
// for edit product popup //
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

// for delete product option 
let products = document.querySelectorAll('#product') ;
products.forEach( product=>{
    product.addEventListener('mouseover', ()=>{

    })
    product.addEventListener('mouseout', ()=>{
        
    })
} )