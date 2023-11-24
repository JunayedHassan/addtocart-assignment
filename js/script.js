// Get the UI Elements
let productList = document.querySelector('#prdList');
let cartTbBody = document.querySelector('#cartTbBody');


// classes

// To render the UI
class UI {
    
    //display product from localStorage
    static showPrdonUI(){
    let productFetched = Shop.getProduct();

    // itarte products from LocalStorage
        productFetched.forEach(el => {
        let tbody = document.querySelector('#tbBody');
        
        let row = UI.tableRowCreate(el.name, el.price, "Add to Cart","");
        tbody = tbody.appendChild(row);
    });
        
    }

    //create Table Row for product and cart
    static tableRowCreate(name, price, value, classStyle){
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
        <td>${name}</td>
        <td>${price}</td>
        <td><input class="button-primary ${classStyle}" type="submit" value=${value}></td>
        </tr>`;
        return row;
    }


    //show selected products on Cart
    static showCartProduct(e){
        let productCart = Shop.LocalCartData();

        //  itarte products on cart
        if(productCart != []){
            productCart.forEach(el => UI.addToCart(el));
        }
    }


    // add to cart
    static addToCart(e){

        //Show on tables
        let cartTbBody = document.querySelector('#cartTbBody');
        let productName = e.prd;
        let productPrice = e.price;
        let row = UI.tableRowCreate(productName, productPrice, "remove", "delete");
        cartTbBody = cartTbBody.appendChild(row);
    }

    // remove from cart and localstorage
    static removeProduct(e){
        if(e.type =='submit'){

            //remove from cart UI
            e.parentElement.parentElement.remove();
            let productName = e.parentElement.previousElementSibling.previousElementSibling.textContent;
            // find the index of the item that needs to be removed
            let cartData = Shop.LocalCartData();
            const indexToRemove = cartData.findIndex(item => item.prd === productName);
            cartData.splice(indexToRemove, 1);

            localStorage.setItem('cartData', JSON.stringify(cartData));

        }

    }
}


// to make object for product data
class Product {
    constructor(prd, price){
        this.prd = prd;
        this.price = price;
    }
}



// for localstorage
class Shop {
    
    // to get prodcut data
    static getProduct() {

        // basic products Stored on Localstorage
        const statProList = [
            {name:"Item 1", price: 26},
            {name:"Item 2", price: 12},
            {name:"Item 3", price: 63},
            {name:"Item 4", price: 85},
            {name:"Item 5", price: 45},
            {name:"Item 6", price: 20},
        ]
        localStorage.setItem("statProList", JSON.stringify(statProList));
        const parsedProList = JSON.parse(localStorage.getItem('statProList'));
        return parsedProList;
    }

        
    // get CartData from localstorage
        static LocalCartData(){
            let cartData;
                
            if(localStorage.getItem('cartData') === null){
                cartData = [];
            } else{
                cartData = JSON.parse(localStorage.getItem('cartData'));
            }
            return cartData;
        }

    //update localstorage cartdata
        static cartData(e){
            if(e.type=='submit'){
                const itemName = e.parentElement.previousElementSibling.previousElementSibling.textContent.trim();
                const price = e.parentElement.previousElementSibling.textContent.trim();
                let product = new Product(itemName, price);
                let cartDatas = Shop.LocalCartData();
                cartDatas.push(product);

                localStorage.setItem('cartData', JSON.stringify(cartDatas));

                //Show on UI
                UI.addToCart(product);

            }
        }

}


// when site opens show product and cart data
UI.showPrdonUI();
UI.showCartProduct();

// Add Event Listener
productList.addEventListener('click', addBtn);
cartTbBody.addEventListener('click', deleteBtn);


// functions to listen for events

// to add product on cart
function addBtn(e) {
    Shop.cartData(e.target);
    e.preventDefault();
}

// to remove product from cart
function deleteBtn(e){
    UI.removeProduct(e.target);
    e.preventDefault();
}