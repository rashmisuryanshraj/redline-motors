
// REDLINE MOTORS - JavaScript

const cars = [
    {
        id: 1,
        brand: "Porsche",
        name: "911 Carrera",
        price: 18500000,
        year: 2023,
        fuel: "Petrol",
        km: "8,500 km",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
        description: "Premium sports car with iconic styling and outstanding performance."
    },
    {
        id: 2,
        brand: "BMW",
        name: "M4 Competition",
        price: 14200000,
        year: 2022,
        fuel: "Petrol",
        km: "12,000 km",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
        description: "High-performance luxury coupe with powerful engine."
    },
    {
        id: 3,
        brand: "Mercedes",
        name: "AMG C43",
        price: 9800000,
        year: 2023,
        fuel: "Petrol",
        km: "9,200 km",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
        description: "Luxury performance sedan with a premium interior."
    },
    {
        id: 4,
        brand: "Audi",
        name: "RS e-tron GT",
        price: 16500000,
        year: 2024,
        fuel: "Electric",
        km: "4,100 km",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
        description: "Futuristic electric performance car."
    },
    {
        id: 5,
        brand: "Tesla",
        name: "Model 3",
        price: 5200000,
        year: 2023,
        fuel: "Electric",
        km: "15,000 km",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=85",
        description: "Smart electric vehicle with modern technology."
    },
    {
        id: 6,
        brand: "BMW",
        name: "X5 M Sport",
        price: 9500000,
        year: 2024,
        fuel: "Diesel",
        km: "7,000 km",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
        description: "Premium SUV with space, luxury and performance."
    }
];

// ELEMENTS

const carGrid = document.getElementById("carGrid");
const search = document.getElementById("search");
const brandFilter = document.getElementById("brand");
const fuelFilter = document.getElementById("fuel");
const sortFilter = document.getElementById("sort");

const modal = document.getElementById("carModal");
const modalContent = document.getElementById("modalContent");

let favourites = JSON.parse(
    localStorage.getItem("redlineFavourites") || "[]"
);

let comparison = [];

// PRICE FORMAT

function formatPrice(price) {
    return "₹" + (price / 100000).toFixed(2) + " Lakh";
}

// DISPLAY CARS

function displayCars(list) {

    carGrid.innerHTML = "";

    document.getElementById("noResults").hidden = list.length !== 0;

    list.forEach(car => {

        const isFavourite = favourites.includes(car.id);

        const card = document.createElement("div");

        card.className = "car-card";

        card.innerHTML = `

            <div class="car-img">

                <img src="${car.image}"
                     alt="${car.brand} ${car.name}"
                     loading="lazy">

                <span class="badge">PREMIUM</span>

                <button class="fav-btn ${isFavourite ? "active" : ""}"
                    data-favourite="${car.id}">
                    ${isFavourite ? "♥" : "♡"}
                </button>

            </div>

            <div class="car-info">

                <h3>${car.brand} ${car.name}</h3>

                <div class="price">
                    ${formatPrice(car.price)}
                </div>

                <div class="details">
                    Year: ${car.year}<br>
                    Fuel: ${car.fuel}<br>
                    Driven: ${car.km}
                </div>

                <div class="card-buttons">

                    <button class="details-btn"
                        data-details="${car.id}">
                        VIEW DETAILS
                    </button>

                    <button class="compare-btn"
                        data-compare="${car.id}">
                        COMPARE
                    </button>

                </div>

            </div>
        `;

        carGrid.appendChild(card);

    });

}

// FILTER CARS

function filterCars() {

    let filtered = [...cars];

    const searchValue = search.value.toLowerCase();

    const brandValue = brandFilter.value;

    const fuelValue = fuelFilter.value;

    filtered = filtered.filter(car => {

        const matchesSearch =
            `${car.brand} ${car.name} ${car.year}`
            .toLowerCase()
            .includes(searchValue);

        const matchesBrand =
            !brandValue || car.brand === brandValue;

        const matchesFuel =
            !fuelValue || car.fuel === fuelValue;

        return matchesSearch && matchesBrand && matchesFuel;

    });

    if (sortFilter.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortFilter.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    displayCars(filtered);

}

// SEARCH AND FILTER EVENTS

search.addEventListener("input", filterCars);

brandFilter.addEventListener("change", filterCars);

fuelFilter.addEventListener("change", filterCars);

sortFilter.addEventListener("change", filterCars);

// FAVOURITE SYSTEM

carGrid.addEventListener("click", function(event) {

    const button = event.target.closest("[data-favourite]");

    if (!button) return;

    const id = Number(button.dataset.favourite);

    if (favourites.includes(id)) {

        favourites = favourites.filter(item => item !== id);

    } else {

        favourites.push(id);

    }

    localStorage.setItem(
        "redlineFavourites",
        JSON.stringify(favourites)
    );

    filterCars();

});

// CAR DETAILS MODAL

carGrid.addEventListener("click", function(event) {

    const button = event.target.closest("[data-details]");

    if (!button) return;

    const id = Number(button.dataset.details);

    const car = cars.find(item => item.id === id);

    modalContent.innerHTML = `

        <img src="${car.image}" alt="${car.name}">

        <h2>${car.brand} ${car.name}</h2>

        <div class="modal-price">
            ${formatPrice(car.price)}
        </div>

        <p>${car.description}</p>

        <br>

        <p>
            Manufacturing Year: ${car.year}<br>
            Fuel Type: ${car.fuel}<br>
            Kilometres Driven: ${car.km}
        </p>

        <br>

        <button class="primary-btn" id="enquireNow">
            ENQUIRE NOW ↗
        </button>
    `;

    modal.classList.add("show");

    document.getElementById("enquireNow")
        .addEventListener("click", function() {

            closeModal();

            document.getElementById("sell")
                .scrollIntoView({ behavior: "smooth" });

            document.getElementById("sellerCar").value =
                `${car.brand} ${car.name}`;

        });

});

// COMPARE CARS

carGrid.addEventListener("click", function(event) {

    const button = event.target.closest("[data-compare]");

    if (!button) return;

    const id = Number(button.dataset.compare);

    if (comparison.includes(id)) {

        comparison = comparison.filter(item => item !== id);

        button.textContent = "COMPARE";

        return;

    }

    if (comparison.length >= 2) {

        alert("You can compare only 2 cars at a time.");

        return;

    }

    comparison.push(id);

    button.textContent = "SELECTED";

    if (comparison.length === 2) {

        showComparison();

    }

});

function showComparison() {

    const first = cars.find(car => car.id === comparison[0]);

    const second = cars.find(car => car.id === comparison[1]);

    modalContent.innerHTML = `

        <h2>CAR COMPARISON</h2>

        <div class="modal-price">
            ${first.brand} VS ${second.brand}
        </div>

        <p>
            ${first.brand} ${first.name}
            &nbsp; VS &nbsp;
            ${second.brand} ${second.name}
        </p>

        <br>

        <p>
            <b>Price:</b>
            ${formatPrice(first.price)}
            VS
            ${formatPrice(second.price)}
        </p>

        <p>
            <b>Year:</b>
            ${first.year}
            VS
            ${second.year}
        </p>

        <p>
            <b>Fuel:</b>
            ${first.fuel}
            VS
            ${second.fuel}
        </p>

        <p>
            <b>Running:</b>
            ${first.km}
            VS
            ${second.km}
        </p>

        <br>

        <button class="primary-btn" id="clearCompare">
            CLEAR COMPARISON
        </button>
    `;

    modal.classList.add("show");

    document.getElementById("clearCompare")
        .addEventListener("click", function() {

            comparison = [];

            closeModal();

            filterCars();

        });

}

// CLOSE MODAL

function closeModal() {

    modal.classList.remove("show");

}

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function() {

    navMenu.classList.toggle("open");

});

navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {

        navMenu.classList.remove("open");

    });

});

// SELL CAR FORM

const sellForm = document.getElementById("sellForm");

sellForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("sellerName").value;

    const phone = document.getElementById("sellerPhone").value;

    const car = document.getElementById("sellerCar").value;

    const year = document.getElementById("sellerYear").value;

    const enquiry = {
        name: name,
        phone: phone,
        car: car,
        year: year,
        date: new Date().toLocaleString()
    };

    // Demo: save enquiry in browser storage

    let enquiries = JSON.parse(
        localStorage.getItem("redlineEnquiries") || "[]"
    );

    enquiries.push(enquiry);

    localStorage.setItem(
        "redlineEnquiries",
        JSON.stringify(enquiries)
    );

    document.getElementById("formMessage").textContent =
        "Thank you! Your enquiry has been saved in demo mode.";

    sellForm.reset();

});

// INITIAL LOAD

filterCars();

console.log("REDLINE MOTORS WEBSITE RUNNING SUCCESSFULLY!");
