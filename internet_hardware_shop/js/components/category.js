import data from "../../data/products.js";
import { createProducts, sortProducts } from "../app.js";

window.addEventListener('DOMContentLoaded', () => {
    showCategoryProducts();
    addSortButtons(); 
});

function showCategoryProducts() {
    const container = document.querySelector(".container-div");
    const category = localStorage.getItem("category");

    const section = `
        <section class="category">
            <h1>${category}</h1>
            <div class="product-grid"></div>
        </section>
    `;
    container.innerHTML = ""; 
    container.insertAdjacentHTML("beforeend", section);

    const categoryProducts = data.products.filter(product => product.category === category);
    sortProducts(categoryProducts); 
    createProducts(categoryProducts, ".product-grid"); 
}
function addSortButtons() {
    const container = document.querySelector(".container-div");
    const sortButtonsContainer = document.createElement("div");
    sortButtonsContainer.className = "sort-buttons";

    const sortByPriceBtn = document.createElement("button");
    sortByPriceBtn.className = "sort-btn";
    sortByPriceBtn.innerText = "Сортувати за ціною";
    sortByPriceBtn.addEventListener("click", () => {
        const sortedProducts = [...data.products].sort((a, b) => a.price - b.price);
        createProducts(sortedProducts, ".product-grid");
    });

    const sortByNameBtn = document.createElement("button");
    sortByNameBtn.className = "sort-btn";
    sortByNameBtn.innerText = "Сортувати за назвою";
    sortByNameBtn.addEventListener("click", () => {
        const sortedProducts = [...data.products].sort((a, b) => a.title.localeCompare(b.title));
        createProducts(sortedProducts, ".product-grid");
    });

    sortButtonsContainer.append(sortByPriceBtn, sortByNameBtn);
    container.prepend(sortButtonsContainer); 
}