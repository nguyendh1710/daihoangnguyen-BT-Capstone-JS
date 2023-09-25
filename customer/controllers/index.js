let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;
// get data from file json
fetch('https://64c8736aa1fe0128fbd5d081.mockapi.io/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        checkCart();
        addCartToHTML();
        add_CartToHTML();
        clearListCart ();
        deleteProduct(id);
})

//show datas product in list 
function addDataToHTML(){
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';
      
    // add new datas
    if(products != null) // if has data
    {
        products.forEach(products => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${products.img}" alt="">
            <div class="productDetails">
            <h2>${products.name}</h2>
            <p class="price">Giá:${products.price}</p>
            <p class="screen">Màn hình: ${products.screen}</p>
            <p class="backCamera">Camera sau:${products.backCamera}</p>
            <p class="frontCamera">Cammera trước:${products.frontCamera}</p>
            <p class="desc">Mô tả:${products.desc}</p>
            <p class="type">Kiểu:${products.type}</p>

            
            
            </div>
            
            <button onclick="addCart(${products.id})"><img src="./../assets/images/icon.png"></button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}
//use cookie so the cart doesn't get lost on refresh page


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
    
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(products => products.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
    
}
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    
    let totalHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(products => {
            if(products){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${products.img}">
                    <div class="content">
                        <div class="name">${products.name}</div>
                        <div class="price">$${products.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${products.id}, '-')">-</button>
                        <span class="value">${products.quantity}</span>
                        <button onclick="changeQuantity(${products.id}, '+')">+</button>
                    </div>
                    <button class="btn btn-danger" onclick="deleteProduct(${products.id})"> Xoá </button>
                    <div class="returnPrice"><span>Tổng:${products.price * products.quantity}</span></div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + products.quantity;
                totalPrice = totalPrice + (products.price * products.quantity);
            }
        })
    }
    totalHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Thanh toán: $' + totalPrice;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}


/////////////////////phần thanh toán


// function checkCart(){
//     var cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('listCart='));
//     if(cookieValue){
//         listCart = JSON.parse(cookieValue.split('=')[1]);
//     }
// }
checkCart();



// click button THANH TOAN to clear listCart

// Hàm xóa giỏ hàng khi ấn thanh toán
function clearListCart (){
let arr=[];
listCart = arr;



addCartToHTML();

}


/////////////////////Xóa sản phẩm khỏi giỏ hàng



function deleteProduct($idProduct){
    
           
            //console.log(listCart[$idProduct]);
                delete listCart[$idProduct];
                addCartToHTML(); 
           
    }
/////////////////////Lọc sản phẩm

//Hàm Lọc sp
// let arrsamsung=[];
// let arriphone=[];
// function filterProduct () {

//          let chon=document.getElementById("chon");
//          let Samsung=document.getElementById("Samsung");
//          let iphone=document.getElementById("iphone");
         
       
//          if (chon.selected) {
//             //document.getElementById("mes").innerHTML='<p class="text-danger"> Vui lòng chọn hãng</p>' ;
//             //document.getElementById("mes").innerHTML='<p class="text-danger"> </p>' ;
//           }

//          if(Samsung.selected){


//             for( let i=0; i < products.length; i++ ){

//                    if(products[i].type==="Samsung"){
                           
//                     //arrsamsung=products.push(products[i]);
                     
//                      arrsamsung.push(products[i]);
//                       //console.log(arrsamsung);
//                       addDataToHTML();
                      


//                    }
//                    if(products[i].type==="iphone"){
                           
//                     //arrsamsung=products.push(products[i]);
                     
//                      arriphone.push(products[i]);
//                       //console.log(arrsamsung);
//                       addDataToHTML();
                    




//                    }



//             }
            
          
//          }
       

//          }

        
///////////////////////////////////////////////////////////////

function apiGetProducts(searchValue){

    return (axios({url:`https://64c8736aa1fe0128fbd5d081.mockapi.io/products`, method:"GET", params:{name: searchValue || undefined}}));



}

// Hàm lấy thẻ nâng cao bằng query selector
function getElement(selector) {
    return document.querySelector(selector);
  }
  // ---------------------------------------------------Lọc sp--------------------------------------------------------------
  
  //Hàm Lọc sp
  
  getElement("#select").onchange = (event) => {
    if (event.selected == "") {
      return;
    }
  
    apiGetProducts(event.target.value)
      .then((response) => {
        display(response.data);
      })
      ;
  };

      
  // Hàm hiển thị sản phẩm 
 function display(products) {
    let html = products.reduce((result, value, index) => {
      let product = new Product(
        value.id,
        value.name,
        value.price,
        value.screen,
        value.backCamera,
        value.frontCamera,
        value.img,
        value.desc,
        value.type,
      );
  
      return (
        result +
        `


    
      <div class="item">
      <img src="${product.img}" alt="">
      <div class="productDetails">
      <h2>${product.name}</h2>
      <p class="price">Giá:${product.price}</p>
      <p class="screen">Màn hình: ${product.screen}</p>
      <p class="backCamera">Camera sau:${product.backCamera}</p>
      <p class="frontCamera">Cammera trước:${product.frontCamera}</p>
      <p class="desc">Mô tả:${product.desc}</p>
      <p class="type">Kiểu:${product.type}</p>

      
      
      </div>
      
      <button onclick="addCart(${product.id})"><img src="./../assets/images/icon.png"></button>
       
      </div>
    
        `
      );
    }, "");
    document.getElementById("danhSachSp").innerHTML = html;
}

