import data from "../../data/products.js";
import { createProducts, sortProducts } from "../app.js";

window.addEventListener("DOMContentLoaded", () => {
    showFilteredProducts();
});

function showFilteredProducts() {
    const container = document.querySelector(".container-div");
    container.innerHTML = ""; 

    const section = `
        <section class="category">
            <div class="product-grid"></div>
        </section>
    `;
    container.insertAdjacentHTML("beforeend", section);
    const category = document.querySelector(".category");

    const filteredProducts = data.products.filter(e => {
        return e.title.toLowerCase().includes(localStorage.getItem("search").toLowerCase());
    });

    if (filteredProducts.length !== 0) {
        category.insertAdjacentHTML("afterbegin", `<h1>Товари за запитом "${localStorage["search"]}"</h1>`);
        sortProducts(filteredProducts);
        createProducts(filteredProducts, ".product-grid");
    } else {
        document.querySelector(".product-grid").insertAdjacentHTML("beforeend", `<h1 class="no-results">Товарів за запитом "${localStorage["search"]}" не знайдено</h1>`);
    }
}