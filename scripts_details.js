const urlParams = new URLSearchParams(window.location.search)
const getId = urlParams.get('id')
const url = 'http://localhost:8090/api/cars/' + getId


function updateFields() {
    var updatedCar = {
        id: getId,
        brand: "VW",
        year: 2000,
        model: "Kombi",
        city: "Ipatinga",
        Image: "http"
    }

    var xhhtp = new XMLHttpRequest()

    xhhtp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 204) {
                alert("Carro foi atualizado com suceeso!")
            }
            else {
                alert("Erro ao atualizar o carro. Status:" + this.status)
            }
        }
    }

    xhhtp.open("PATCH", "http://localhost:8090/api/cars/")
    xhhtp.setRequestHeader("content-type", "application/json")

    xhhtp.send(JSON.stringify(updatedCar))

}


async function getCar() {
    let cars = document.querySelector('.cars')
    let data = await fetch(url)

    let response = await data.json()
    let i = 0
    let city = response[i].City
    let year = response[i].Year
    let brand = response[i].Brand
    let model = response[i].Model
    let id = response[i].Id
    let image = response[i].Image

    cars.innerHTML += `<div class="cars_itens px-4 justify-content: center">
            <img src="${image}" alt="Não foi carregada corretamente" class "car-img">
            <div class="cars-area">
                <h2 class="car-title">
                    ${brand.length > 10 ? brand.substring(0, 10).concat("...") : brand}
                <h/2>
                <p class="car-desc">
                    ${city.length > 20 ? city.substring(0, 20).concat("...") : city}
                </p>
                <p>${brand}</p>
            </div>
            <p class="price-cars">
            ${year}
            </p>
            <button class="add-cart">
                <a href="details.html?id=${id}"><img src="https://cdn.onlinewebfonts.com/svg/img_216744.png" alt="Não carregou" class="cart-icon">
                </a>
            </button>
            <button calss="add-cart" onClick = "updateFields()">
                <img src="https://th.bing.com/th/id/OIP.d1sTN41laBxAg-Uy_pXvmgHaHx?id=ImgDet&rs=1" alt="" class="cart-icon">
            </button>
            </div>
        `;

}


getCar()