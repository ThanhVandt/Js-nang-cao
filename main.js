const tbody = document.querySelector("tbody")

fetch(`http://localhost:3000/products`)
.then((response)=>response.json())
.then((data)=>{
    showProduct(data)
    const btnRemoves = document.querySelectorAll("#btn-remove")
    for(let btn of btnRemoves){
        const id = btn.dataset.id
        btn.addEventListener("click",function(){
            return removeProduct(id)
        })
    }
    const btnUpdates = document.querySelectorAll("#btn-update")
    for(let btn of btnUpdates){
        const id = btn.dataset.id
        btn.addEventListener("click",function(){
            return updateProduct(id)
        })
    }
})
const showProduct = (data)=>{
    tbody.innerHTML= data.map((product,index)=>{
        return`
            <tr>
                <td>${index+1}</td>
                <td>${product.name}</td>
                <td>${product.des}</td>
                <td>
                    <button data-id="${product.id}" class="btn btn-danger" id="btn-remove">Xóa</button>
                    <button data-id="${product.id}" class="btn btn-warning" id="btn-update">Sửa</button>  
                </td>
            </tr>
        `
    }).join("")
}

const removeProduct = (id)=>{
    let isDelete = confirm("có chắc chắn xóa?")
    if(isDelete){
        fetch(`http://localhost:3000/products/${id}`,{
            method:"DELETE"
        })
        alert("xóa thành công")
    }
}

const addProduct = ()=>{
    document.querySelector("body").innerHTML=`
    <h2>Thêm sản phẩm</h2>
    <form action="">
        <div class="form-group">
            <label for="">name</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="">des</label>
            <input type="text" class="form-control" id="des">
        </div>
        <button id="btn-submit" class="btn btn-primary">Thêm</button>
    </form>
    `
    document.querySelector("#btn-submit").addEventListener("click",function(e){
        var name = document.querySelector("#name").value
        var des = document.querySelector("#des").value
        e.preventDefault()
        if(!name || !des){
            alert("Điền đầy đủ tên và mô tả")
        }
        else{
            const newProduct = {
                "name":name,
                "des":des
            }
            fetch(`http://localhost:3000/products`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newProduct)
            })
            alert("thêm thành công")
        }
        
    })
}
document.querySelector("#btn-add").addEventListener("click",addProduct)

const updateProduct=(id)=>{
    fetch(`http://localhost:3000/products/${id}`)
    .then((response)=>response.json())
    .then((data)=>{
        document.querySelector("body").innerHTML=`
        <h2>Sửa sản phẩm</h2>
        <form action="">
            <div class="form-group">
                <label for="">name</label>
                <input type="text" class="form-control" id="name" value="${data.name}">
            </div>
            <div class="form-group">
                <label for="">des</label>
                <input type="text" class="form-control" id="des" value="${data.des}">
            </div>
            <button id="btn-submit" class="btn btn-primary">sửa</button>
        </form>
        `
        document.querySelector("#btn-submit").addEventListener("click",function(e){
            var name = document.querySelector("#name").value
            var des = document.querySelector("#des").value
            e.preventDefault()
            if(!name || !des){
                alert("Điền đầy đủ tên và mô tả")
            }
            else{
                const newProduct = {
                    "name":name,
                    "des":des
                }
                fetch(`http://localhost:3000/products/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(newProduct)
                })
                alert("sửa thành công")
            }
            
        })
    })
}