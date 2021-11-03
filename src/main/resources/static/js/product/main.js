let accessToken = JSON.parse(localStorage.getItem("user"));

$(document).ready(function () {
    getAll()
        $("#q").keypress(function (event) {
            if (event.keyCode === 13) {
                $("#search").click();
            }
        });
    }
)

function getAll() {
    $.ajax({
        url: "http://localhost:8080/api/product",
        type: "GET",
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        success: function (product) {
            if (product.content.length === 0) {
                $("#list").html(
                    ` <tr>
                        <th colspan=6 style="color: red ; text-align: center">Không có dữ liệu</th>
                      </tr>`
                )
            } else {
                let ct = ""
                for (let i = 0; i < product.content.length; i++) {
                    ct += getProduct(product.content[i])
                }
                $("#list").html(ct);
            }
        }
    })
}

function getProduct(product) {
    return ` <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.category.name}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="showEditProduct(${product.id})" data-bs-target="#modalEdit">
                        Edit
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDelete" onclick="showDeleteProduct(${product.id})">
                         Delete
                    </button>
                </td>
            </tr>`
}

function searchProductByName() {
    let search = $("#q").val();
    $.ajax({
        url: `http://localhost:8080/api/product` + `?q=${search}`,
        type: 'GET',
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        data: search,
        success: function (product) {
            if (product.content.length === 0) {
                $("#list").html(
                    ` <tr>
                        <th colspan=6 style="color: red ; text-align: center">Không có dữ liệu</th>
                      </tr>`
                )
            } else {
                let ct = ""
                for (let i = 0; i < product.content.length; i++) {
                    ct += getProduct(product.content[i])
                }
                $("#list").html(ct);
            }
        }
    })
}

function showCategory(category) {
    return `<option id="${category.id}" value="${category.id}">${category.name}</option>`
}

function showCategories() {
    $.ajax({
        url:"http://localhost:8080/api/category",
        type:'GET',
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        success:function (category) {
            let content = "";
            for (let i = 0; i < category.content.length; i++) {
                content += showCategory(category.content[i])
            }
            $(".category").html(content)
        }
    })
}

function clear() {
    $("#nameProductCreate").val("")
    $("#priceProductCreate").val("")
    $("#descriptionProductCreate").val("")
}

function showCreateProduct() {
    showCategories();
}

function create() {
    let name = $("#nameProductCreate").val()
    let price = $("#priceProductCreate").val()
    let description = $("#descriptionProductCreate").val()
    let category = $("#categoryProductCreate").val()
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken.token
        },
        url: `http://localhost:8080/api/product/`,
        type: 'POST',
        data: JSON.stringify(newProduct),
        success: function () {
            getAll();
            clear();
        }
    })
}

function showEditProduct(id) {
    $.ajax({
        url: `http://localhost:8080/api/product/` + id,
        type: "GET",
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        success: function (product) {
            $("#id").val(product.id)
            $("#name").val(product.name)
            $("#price").val(product.price)
            $("#description").val(product.description)
            $("#category").val(product.category.id)
            showCategories();
            $("#update").click(function () {
                update();
            })
        }
    })
}

function showDeleteProduct(id) {
    $.ajax({
        url: `http://localhost:8080/api/product/` + id,
        type: "GET",
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        success: function (product) {
            $("#idProductDelete").html(product.id)
            $("#nameProductDelete").html(product.name)
            $("#priceProductDelete").html(product.price)
            $("#descriptionProductDelete").html(product.description)
            $("#categoryProductDelete").html(product.category.name)
            $("#delete").click(function () {
                remove(id);
            })
        }
    })

}

function remove(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/product` + `/${id}`,
        headers:{
            'Authorization': 'Bearer '+accessToken.token
        },
        success: getAll
    });
}

function update() {
    let id = $("#id").val();
    let name = $("#name").val();
    let price = $("#price").val();
    let description = $("#description").val();
    let category = $("#category").val();
    let productUpdate = {
        id: id,
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken.token
        },
        url: `http://localhost:8080/api/product/` + id,
        type: "PUT",
        data: JSON.stringify(productUpdate),
        success: getAll
    })
}