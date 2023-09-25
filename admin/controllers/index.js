



//--------------------------------------HÀM AXIOS LÀ HÀM BÊN SERVER NÊN KHÔNG CHO CƠ CHÊ IMPORT,EXPORT CỦA ES6 NÊN MUỐN XÀI CỦA FILE KIA THÌ CHỈ CÒN CÁCH NHÚNG BÊN HTML

//==========>MỐT BÊN REACT SẼ CÓ CÁCH LÀM KHÁC VỚI AXIOS ĐỂ LẤY DỮ LIỆU


//----------hàm lấy sp
function getProduct(){

    apiGetProduct().then((response)=>( display(response.data))).catch((error) => (error));

    

}

getProduct();
//-------------hàm lấy sp bằng id
function getProductById(productId){

    apiGetProductById(productId).then((response)=>{console.log(response.data);}).catch((error) => {console.log(error);});
   
   
   }
   
   //getProductById(1)


   
// Hàm Hiển thị dữ liệu


function display(products){
       let html= products.reduce((result,value,index)=>{

        let product= new Product(value.id, value.name, value.price,value.screen,value.backCamera,value.frontCamera,value.img,value.desc,value.type)
        
        return(

        result+
// chỗ này phải nhận index+1 của hàm reduce thì lúc render sort thì mới đúng
        `
        
         <tr>

                 <td id="producctId">${index+1}</td>
                 <td id="productName">${product.name}</td>
                 <td id="productPrice">${product.price}</td>

                 <td id="productPhoto"><img src="${product.img}" /></td>
                 <td id="productDis">${product.desc}</td>
                 <td id="productAction">
                      <button id="edit" onclick="selectProduct(${product.id})"> <i class="fa-solid fa-edit "></i> Edit</button>
                      <button class="delete" onclick="deleteProduct(${product.id})">  <i class="fa-solid fa-dumpster"></i>Delete</button>
                 
                 
                 </td>
        



        </tr>

        
        
        `


        );
       

      },"")
      





       document.getElementById("productList").innerHTML=html



}

//-----------------------------------Xóa sản phẩm---------------------------------------------------


function deleteProduct(productId){




              apiDeleteProduct(productId);
              getProduct();


}
//---------------------------thêm sản phẩm---------------------



// tạo ham truoc onclick

function getEle(ele){


    let getEle =document.querySelector(`${ele}`);
    return getEle;

}


//----------tạo modal
// truoc ham onclick phai la mot ham thi moi gan function dc
getEle('#them').onclick = () => {

    getEle("#nameSP").value="";
    getEle("#priceSP").value="";
    getEle("#screenSP").value="";
    getEle("#backCameraSP").value="";
    getEle("#frontCameraSP").value="";
    getEle("#photoSP").value="";
    getEle("#desSP").value="";
    getEle("#typeSP").value="";


// thêm headertitle và 2 nút vào modal
getEle('.modal-header').innerHTML=`<h5 class="modal-title" id="modalTitleId">Thêm sản phẩm</h5>`
    
getEle('.modal-footer').innerHTML=`
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
    <button type="button" class="btn btn-primary" onclick="createProduct()">Thêm</button>
    `
}
//---------Hàm thêm sp

// thêm dữ liệu bằng api thì nên cung cấp đủ dữ liệu như chang như bên api trả về json ,chỉ không cần nhập id--> nếu call theo kiểu cũ ko dc request POST, DELETE,... mà nó cứ request GET thì chuyển qua kiểu đang dùng

function createProduct(){

     let newProduct= {
          
          name: getEle("#nameSP").value,
          price: +getEle('#priceSP').value,
          screen:getEle("#screenSP").value,
          backCamera:getEle("#backCameraSP").value,
          frontCamera:getEle("#frontCameraSP").value,
          img: getEle('#photoSP').value,
          desc: getEle('#desSP').value,
          type:getEle("#typeSP").value,


     }

     



// Đặt biến cờ hiệu isValid dùng để tạo đối tượng new staff
let isValid = true;
  

//Điều kiện xác thực cho tên
if (!isRequired(newProduct.name)) {
  isValid = false;
  getEle("#spanName").innerHTML = "Tên không được để trống";
}
//  else if (!isName(newProduct.name)) {
//   isValid = false;
//   getEle("#spanName").innerHTML = "Tên không hợp lệ";
// }
 
//Điều kiện xác thực cho giá


if (isRequired(newProduct.price)) {
  isValid = false;
  getEle("#spanPrice").innerHTML = "Giá không được để trống";
} 
//else if (isPrice(+newProduct.price)) {                       // ép kiểu để tính đúng 
//   isValid = false;
//   getEle("#spanPrice").innerHTML = "Giá không hợp lệ";
// }
//Điều kiện xác thực cho màn hình
if (!isRequired(newProduct.screen)) {
  isValid = false;
  getEle("#spanScreen").innerHTML = "Màn hình không được để trống";
}

//Điều kiện xác thực cho Camera sau
if (!isRequired(newProduct.backCamera)) {
  isValid = false;
  getEle("#spanBackCamera").innerHTML = "Camera sau không được để trống";
}


//Điều kiện xác thực cho Camera trước
if (!isRequired(newProduct.frontCamera)) {
  isValid = false;
  getEle("#spanfrontCamera").innerHTML = "Camera trước không được để trống";
}

//Điều kiện xác thực cho hình
if (!isRequired(newProduct.img)) {
  isValid = false;
  getEle("#spanPhoto").innerHTML = "Hình không được để trống";
}
//Điều kiện xác thực cho mô tả
if (!isRequired(newProduct.img)) {
  isValid = false;
  getEle("#spanDesc").innerHTML = "Mô tả không được để trống";
}









// // Tất cả các xác thực đều đúng ==> trả kết quả



// if (isValid) {
//   // Form hợp lệ, gọi API để tạo ra và trả về đối tượng newProduct
//     //  let newProduct= {
          
//     //       name: getEle("#nameSP").value,
//     //       price: +getEle('#priceSP').value,
//     //       screen:getEle("#screenSP").value,
//     //       backCamera:getEle("#backCameraSP").value,
//     //       frontCamera:getEle("#frontCameraSP").value,
//     //       img: getEle('#photoSP').value,
//     //       desc: getEle('#desSP').value,
//     //       type:getEle("#typeSP").value,


//     //  }


  return apiCreateProduct(newProduct).then((response) => {getProduct();}).catch((error) => {console.log(error)});}

  // Form không hợp lệ => Không tạo đối tượng student
  // return undefined;
// }



//---------Hàm xóa sp

function deleteProduct(productId){


    return apiDeleteProduct(productId).then((response) => {
        return (response.data)
    }).then((response)=>{

        getProduct();

    })
    .catch((error) => {
        console.log(error)
    });



}
//---------Hàm update sp





// hàm bật tắt modal và thêm headertitle ,footer và 2 nút vào modal và lấy dữ liệu từ API để show vào khung chuẩn bị update

//==============>BỞI VÌ DỮ LIỆU LẤY VỀ TỪ API KHÔNG THỂ LẤY KHỎI HÀM .THEN NÊN PHAI GOM CHUNG TẤT CẢ XỬ LÝ VÔ 1 HÀM NHƯ VẦY
async function selectProduct(productId) {

//CHÚ Ý: CÁCH BẬT TẮT MODAL BOOTSTRAP VỚI METHOD CỦA NÓ
$("#modalId").modal("show");

    
// thêm headertitle ,footer và 2 nút vào modal để người dùng bấm cập nhật
getEle('.modal-header').innerHTML=`<h5 class="modal-title" id="modalTitleId">Cập nhật sản phẩm</h5>`
 // ở đây phải có truyền giá trị như vầy thì ra ngoài hàm mới DOM được 
 // chú ý: productId ở đây mà hàm    selectProduct(productId) nhận được mà truyền xuống cho hàm ở trong updateProduct(productId) thì productId là nhận giá trị trực tiếp của cha selectProduct(productId) còn mà hàm updateProduct(productId) viết ngoài hàm selectProduct(productId) thì productId chỉ là một biến tượng trưng không có giá trị gì cả, muốn đặt tên gì thì đặt có thể updateProduct(value), updateProduct(giatri),...
getEle('.modal-footer').innerHTML=`
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
     
     <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateProduct(${productId})">Cập nhật</button>
     `
             

 // Xử lý dữ liệu ở đây

// gọi hàm apiGetProductById để lấy lại mảng sản phẩm của API trả về rồi gán vào biến selectedProduct
    try {
       
      const selectedProduct = await apiGetProductById(productId).then((response)=>{ return response.data});
      
                  
// DOM object vừa nhận được vào lại các input của modal cho người dùng xem trước khi bấm cập nhật
//----------- đến lúc này thì dữ liệu đang nằm trên input của html nên có thể .value để mang ra ngoài hàm này mà dùng chứ để trong hàm này thì không làm nút bấm cập nhật được        

                  getEle("#nameSP").value=selectedProduct.name;
                  getEle("#priceSP").value=selectedProduct.price;
                  getEle("#screenSP").value=selectedProduct.screen;
                  getEle("#backCameraSP").value=selectedProduct.backCamera;
                  getEle("#frontCameraSP").value=selectedProduct.frontCamera;
                  getEle("#photoSP").value=selectedProduct.img;
                  getEle("#desSP").value=selectedProduct.desc;
                  getEle("#typeSP").value=selectedProduct.type;

           
                 

            
                 // console.log(selectedProduct)







    } catch (error) {
      // Xử lý lỗi ở đây
    }
  }
  // viết hàm updateProduct để tạo đối tượng mới và DOM mấy giá trị đang hiện ở input vào rồi goi hàm apiUpdateProduct lên server
 const updateProduct=(productId)=>{


// sau khi người dùng cập nhật  xong nội dung cần cập nhật thì tiến hành lấy lại dữ liệu từ mấy input của modal --> rồi cho mấy dữ liệu này vào  một object tự tạo bằng object new Product của Constructor Product hoặc tạo một object mới hoàn toàn có cấu trúc giống với object của server -->gọi tiếp hàm apiUpdateProduct để update lên server-->gọi hàm getProduct
// nhớ tạo object đúng thứ tự bên server nó mới update được------------------------
       
let updateProduct = {


                    
    name:getEle("#nameSP").value,
    price:getEle("#priceSP").value,
    screen:getEle("#backCameraSP").value,
    backCamera: getEle("#backCameraSP").value,
    frontCamera:getEle("#frontCameraSP").value,
    desc:getEle("#desSP").value,
    type:getEle("#typeSP").value,

}



//console.log(updateProduct)

apiUpdateProduct(productId,updateProduct).then((response) => {
    return (response.data)
}).then((response)=>{

    getProduct();

})
.catch((error) => {
    console.log(error)
});

 }


 //-----------------------------------------------------Tìm sản phẩm -----------------------------------------------------

 getEle("#searchName").onkeypress = (event) => {
    if (event.key !== "Enter") {
      return;
    }
  
    apiGetProduct(event.target.value)
      .then((response) => {
        display(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

//----------------------------------- Phần xác thực---------------------------------------------------------------------

// Hàm dùng kiểm tra giá trị có rỗng hay không
function isRequired(value) {
    if (!value) {
      // Chuỗi rỗng
      return false;
    }
    return true;
  }
 
//   // Hàm dùng kiểm tra tên: phải là chữ
//   function isName(value) {
//                                           // Hàm test dùng để kiểm tra
//    let regex =/^[0-9]/;
//    let regex2=/^[!&%\\/()=\?\^\*\+\]\[#><;:,\._-|@]/;
//    if(!isNaN(value)){
         
//     return  false;
      
//     }
//     if(regex.test(value)){
         
//       return  false;  
       
//      }
//      if(regex2.test(value)){                                               // Hàm test dùng để kiểm tra
         
//       return  false;  
       
//      }
     
//     return value;
  
//   }
   
// // Hàm dùng kiểm tra giá có hợp lệ hay không
// function isPrice(value) {
//   if (isNaN(value)) {
//     return true;
//   }
  
//   return false;
// }

  
// //--------------------------------------Nhập để biến mất lỗi khi  người dùng đã nhập vào input với event------------------------------------------------



// Biến kiểm tra xem form đã được submit hay chưa
let isSubmitted = false;


  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện


// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  tên


document.getElementById("nameSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let nameSpan = document.getElementById("spanName");
  if (isRequired(event.target.value)) {
    nameSpan.innerHTML = "";
  } else {
    nameSpan.innerHTML = "Họ và Tên không được để trống";
  }
};

// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  giá


document.getElementById("priceSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let priceSpan = document.getElementById("spanPrice");
  if (isRequired(event.target.value)) {
    priceSpan.innerHTML = "";
  } else {
    priceSpan.innerHTML = "Email không được để trống";
  }
};

// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  màn hình


document.getElementById("screenSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let screenSpan = document.getElementById("spanScreen");
  if (isRequired(event.target.value)) {
    screenSpan.innerHTML = "";
  } else {
    screenSpan.innerHTML = "Mật khẩu không được để trống";
  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  cammera sau


document.getElementById("backCameraSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let backCameraSpan = document.getElementById("spanBackCamera");
  if (isRequired(event.target.value)) {
    backCameraSpan.innerHTML = "";
  } else {
    backCameraSpan.innerHTML = "Cammera sau không được để trống";
  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  cammera trước


document.getElementById("frontCameraSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let frontCameraSpan = document.getElementById("spanfrontCamera");
  if (isRequired(event.target.value)) {
    frontCameraSpan.innerHTML = "";
  } 
  else{

    frontCameraSpan.innerHTML = "Cammera trước không được để trống";

  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  hình


document.getElementById("photoSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let photoSpan = document.getElementById("spanPhoto");
  if (isRequired(event.target.value)) {
    photoSpan.innerHTML = "";
  } 
  else{

    photoSpan.innerHTML = "Hình không được để trống";

  }
};
// Nhập để biến mất lỗi khi  người dùng đã nhập vào input  mô tả


document.getElementById("desSP").oninput = (event) => {
  if (!isSubmitted) return;

  // Tất cả sự kiện trong Javascript đều nhận được đối tượng event
  // event.target: phần tử html phát sinh sự kiện
  let descSpan = document.getElementById("spanDesc");
  if (isRequired(event.target.value)) {
    descSpan.innerHTML = "";
  } 
  else{

    descSpan.innerHTML = "Hình không được để trống";

  }
};
    
    
    
  //-------------------------Sắp xếp sản phẩm---------------------------------------------


 //--------------- sắp xếp thấp tới cao
const sortAcs= ()=>{



  apiSortProductAsc().then((response) => {
    
    
    display(response.data);
    //return (response.data)
})
.catch((error) => {
    console.log(error)
});

}


 //--------------- sắp xếp  cao tới thấp
 const sortDecs= ()=>{



  apiSortProductDesc().then((response) => {
    
    
    display(response.data);
    //return (response.data)
})
.catch((error) => {
    console.log(error)
});

}
 
 
  