//selects all css-selectors of class 'menu.btn'(Add to cart)
let carts = document.querySelectorAll('.menu_btn');

//creating an object with all product details
let products = [
    {
        name: "Burger",
        tag: "burger",
        price: 50,
        inCart: 0
    },

    {
        name: "Pasta",
        tag: "pasta",
        price: 45,
        inCart: 0
    },
    {
        name: "Rolls",
        tag: "rolls",
        price: 20,
        inCart: 0
    },
    {
        name: "Drink",
        tag: "drinks",
        price: 30,
        inCart: 0
    },
    {
        name: "Samosa",
        tag: "samosa",
        price: 12,
        inCart: 0
    },
    {
        name: "Dosa",
        tag: "dosa",
        price: 60,
        inCart: 0
    },
    {
        name: "Juice",
        tag: "juice",
        price: 30,
        inCart: 0
    },
    {
        name: "Biryani",
        tag: "biryani",
        price: 60,
        inCart: 0
    },
    {
        name: "DairyMilk",
        tag: "dairymilk",
        price: 20,
        inCart: 0
    },
    {
        name: "SouthThali",
        tag: "souththali",
        price: 60,
        inCart: 0
    },
    {
        name: "DalRoti",
        tag: "dalroti",
        price: 50,
        inCart: 0
    },
    {
        name: "Sandwich",
        tag: "sandwich",
        price: 30,
        inCart: 0
    }

];

// calling the functions to set the cart number and total cost whenever an 'Add to cart' button is clicked
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })


}

// to retain the cartNumbers even if the page is reloaded by getting the value from local Storage
//called everytime the page is loaded
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;

    }
}

// to increase and display the number of product everytime a product is selected
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    // creates key value pairs of cartnumbers
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;

    }
    //calling the function to set details of the selected products
    setItems(product);
}

//function to set the selected product details in local storage
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {

        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    //creates a productInCart object in local storage to store details of selected products
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// function to calculate the total cost of selected items
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    //adds the cost of the selected item to the existing total cost and sets the new total
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    //set the cost of the first selected value in the local storage
    else {
        localStorage.setItem("totalCost", product.price);

    }
}

//function to display the stored details of selected products in /cart/
function displayCart() {
    // selecting html elements and obtaining the values from local storage
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product");
    let totalContainer = document.querySelector(".checkout");
    let cartCost = localStorage.getItem('totalCost');
    let cartnum = localStorage.getItem('cartNumbers');
    //displaying the details of the selected items in the html element
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `<div class="row">
           <div class="image-box">
              <img src="/static/images/order_img/${item.tag}.jpg">
            </div>
           <div class="about">
            <span class="title">${item.name}</span> 
            <div class="subtitle">Rs ${item.price}</div>
            </div>
            <div class="counter">
            <div type="button" onclick='increase(${JSON.stringify(item)})' class="btn">+</div>
            <span class="count">${item.inCart}</span>
            <div type="button" onclick='decrease(${JSON.stringify(item)})' class="btn">-</div>
            </div>
            <div class="prices">
            <div class="amount">
            Rs ${item.inCart * item.price}.00
            </div>
            <div type="button" onclick='removeItem(${JSON.stringify(item)})' class="remove">Remove</div>
            </div>
            </div>`
        });

        totalContainer.innerHTML = `
           <div class="total">
                <div>
                    <div class="Subtotal">Your Total</div>
                    <div class="items">${cartnum} items</div>
                </div>
        <div class="total-amount">Rs ${cartCost}.00 </div>
      </div>
      <a href="/checkout/">
      <button type="button" class="button">Checkout</button>
      </a>
      `;

    }

}

// function to decrease the quantity of selected item on the cart page and set the values accordingly in the local storage
function decrease(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems != null) {
        console.log(product.inCart);
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart -= 1;
        console.log(cartItems);
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price);
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
    if ((product.inCart - 1) == 0) {
        console.log("items are 0");
        removeItem(product);
    }
}

// function to increase the quantity of selected item on the cart page and set the values accordingly in the local storage
function increase(product) {
    cartNumbers(product);
    totalCost(product);
    displayCart();
}

// function to remove the selected item on the cart page and set the values accordingly in the local storage
function removeItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartCost = localStorage.getItem('totalCost');
    if (cartItems[product.tag]) {
        localStorage.setItem('cartNumbers', productNumbers - cartItems[product.tag].inCart);
        document.querySelector('.cart span').textContent = productNumbers - cartItems[product.tag].inCart;
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - (cartItems[product.tag].inCart * product.price));
        delete cartItems[product.tag];
        console.log(cartItems)
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
    }

}

//function to remove all the items from the cart and empty the local storage
function removeAll() {
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('cartNumbers');
    localStorage.removeItem('totalCost');
    document.querySelector('.product').textContent = '';
    document.querySelector('.checkout').textContent = '';
    document.querySelector('.cart span').textContent = 0;
}

//function to show the total cost from local storage on /checkout/
function showTotal() {
    let cost = localStorage.getItem('totalCost');
    document.querySelector('.total').textContent = "Rs " + cost + " /-";
}

//function to display the modal box when final checkout is clicked on /checkout/
function showModal() {
    document.getElementById('button').addEventListener("click", function () {
        document.querySelector('.bg-modal').style.display = "flex";
    });
    removeAll();
}

//function to empty the local storage when a user logs out
function newUser() {
    localStorage.clear();
    onLoadCartNumbers();
}


onLoadCartNumbers();
displayCart();
