let products = document.querySelectorAll('.products')
let actualQuantity = document.querySelectorAll('.actualQuantity')
let selectedQuantity = document.querySelectorAll('.selectedQuantity')
let incQuantity = document.querySelectorAll('.incQuantity')
let decQuantity = document.querySelectorAll('.decQuantity')
let actualPrice = document.querySelectorAll('.actualPrice')
let totalPrice = document.querySelectorAll('.totalPrice')

products.forEach( (product, i)=>{
    incQuantity[i].addEventListener('click', ()=>{
        if(selectedQuantity[i].textContent < actualQuantity[i].textContent){
            selectedQuantity[i].textContent = selectedQuantity[i].textContent - -1;
            totalPrice[i].textContent = totalPrice[i].textContent - (-1*actualPrice[i].textContent);
        }
    })
    decQuantity[i].addEventListener('click', ()=>{
        if(selectedQuantity[i].textContent > 0){
            console.log("chal dec")
            selectedQuantity[i].textContent = selectedQuantity[i].textContent - 1;
            totalPrice[i].textContent = totalPrice[i].textContent - actualPrice[i].textContent;
        }
    })
})