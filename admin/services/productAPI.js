
// lấy dữ liệu
function apiGetProduct (searchValue){

     return(


        axios({
             url:"https://64c8736aa1fe0128fbd5d081.mockapi.io/products",
             methol:"GET",
             params:{name: searchValue || undefined}



        })


     );



}
// lấy dữ liệu từ id 

function apiGetProductById(productId){

   return(

       axios({

                url:`https://64c8736aa1fe0128fbd5d081.mockapi.io/products/${productId}`,
                methol:"GET",
                data:productId



       })




   )




}
// update dữ liệu

function apiUpdateProduct(productId,newProduct){


    return(
            //  axios({

            //            url:`https://64c8736aa1fe0128fbd5d081.mockapi.io/products/${productId}`,
            //            methol: "PUT",
            //            data:newProduct


            //  })

             axios.put(`https://64c8736aa1fe0128fbd5d081.mockapi.io/products/${productId}`, newProduct)

    )



}

// tạo dữ liệu mới


function apiCreateProduct(newProduct){


           return (

            axios.post('https://64c8736aa1fe0128fbd5d081.mockapi.io/products/', newProduct)
        
        
        
           )



}

//Xóa dữ liệu

function apiDeleteProduct(productId){


         return(
            axios.delete(`https://64c8736aa1fe0128fbd5d081.mockapi.io/products/${productId}`)
                    //   axios({

                    //                  url:`https://64c8736aa1fe0128fbd5d081.mockapi.io/products/${productId}`,
                    //                  methol:"DELETE",

                                    


                    //   })



         )


}
// sắp dữ liệu từ thấp đến cao theo giá

function apiSortProductAsc (){



   return axios.get('https://64c8736aa1fe0128fbd5d081.mockapi.io/products?sortBy=price&order=asc')
   




}
// sắp dữ liệu từ cao đến thấptheo giá

function apiSortProductDesc (){



   return axios.get('https://64c8736aa1fe0128fbd5d081.mockapi.io/products?sortBy=price&order=desc')
   




}