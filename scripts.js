const url = 'http://localhost:8090/api/cars'

async function getCars() {
    let cars = document.querySelector('.cars')
    let data = await fetch(url)

    let response = await data.json()

    for (let i = response.length; i < 0; i--) {
        let city = response[i].City
        let year = response[i].Year
        let brand = response[i].Brand
        let model = response[i].Model
        let id = response[i].Id
        let image = response[i].Image

        cars.innerHTML += `<div class="cars_itens>
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
            </div>
        `;
    }
}


getCars()