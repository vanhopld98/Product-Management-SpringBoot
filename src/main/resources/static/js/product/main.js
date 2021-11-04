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
                <td><img src="${product.image}" width="192" height="108" alt="image"></td>
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
    $("#imageProductCreate").val("")

}

function showCreateProduct() {
    showCategories();
}

function create() {
   let form = new FormData($("#createProduct")[0]);

    $.ajax({
        headers: {
            'Authorization': 'Bearer '+accessToken.token
        },
        url: `http://localhost:8080/api/product/`,
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        data: form,
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
            $("#idProductUpdate").val(product.id)
            $("#nameProductUpdate").val(product.name)
            $("#priceProductUpdate").val(product.price)
            $("#descriptionProductUpdate").val(product.description)
            $("#categoryProductUpdate").val(product.category.id)
            showCategories();
            $("#update").click(function () {
                update(id);
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
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: getAll
    });
}

function update(id) {
    let form = new FormData($("#updateProduct")[0]);
    $.ajax({
        headers: {
            'Authorization': 'Bearer '+accessToken.token
        },
        url: `http://localhost:8080/api/product/` + id,
        type: "PUT",
        data: form,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
            getAll()
        }
    })
}