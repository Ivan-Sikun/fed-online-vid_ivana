import data from "../../data/products.js";

window.addEventListener("DOMContentLoaded", () => {
    showProducts();
    addCategoryFilter();
});
function showProducts(filteredCategory = null) {
    const container = document.querySelector(".container-div");
    container.innerHTML = ""; 

    const categories = new Set(data.products.map(product => product.category));
    const productsToShow = filteredCategory 
        ? data.products.filter(product => product.category === filteredCategory) 
        : data.products;

    categories.forEach(category => {
        const sectionHTML = `
            <section class="category">
                <h1>${category}</h1>
                <div class="product-grid" id="${category}"></div>
            </section>
        `;
        container.insertAdjacentHTML("beforeend", sectionHTML);
        const categoryContainer = document.getElementById(category);

        productsToShow
            .filter(product => product.category === category)
            .forEach(product => renderProduct(product, categoryContainer));
    });
}

function renderProduct(product, categoryContainer) {
    const productHTML = `
        <div class="product">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}">
                <div class="overlay">
                    <p>${product.description}</p>
                </div>
            </div>
            <div class="product-info" id="product${product.id}">
                <h3>${product.title}</h3>
                <p>${product.price}$</p>
                <p class="rating">${'⭐'.repeat(product.rating || 4)}</p>
            </div>
        </div>
    `;
    categoryContainer.insertAdjacentHTML("beforeend", productHTML);

    const productInfo = document.getElementById(`product${product.id}`);
    const button = document.createElement("button");
    button.className = "btn";
    button.innerText = "Переглянути";
    button.id = product.title;
    button.addEventListener("click", () => {
        localStorage.setItem("showProduct", JSON.stringify(product));
        window.location.href = "../product.html";
    });
    productInfo.append(button);
}
function addCategoryFilter() {
    const filterContainer = document.querySelector(".filter-container");
    const categories = Array.from(new Set(data.products.map(product => product.category)));

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.className = "filter-btn";
        filterButton.innerText = category;
        filterButton.addEventListener("click", () => showProducts(category));
        filterContainer.append(filterButton);
    });

    const showAllButton = document.createElement("button");
    showAllButton.className = "filter-btn";
    showAllButton.innerText = "Все товары";
    showAllButton.addEventListener("click", () => showProducts());
    filterContainer.prepend(showAllButton);
}