import data from "../../data/products.js";
import { createProducts, sortProducts } from "../app.js";

const [...nameInput] = document.querySelectorAll("#name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const registerBtn = document.getElementById("register-btn");

window.addEventListener("DOMContentLoaded", () => {
    nameInput.forEach(el => {
        el.addEventListener("focusout", (e) => checkName(e.target));
        el.addEventListener("input", (e) => checkName(e.target));
    });

    phoneInput.addEventListener("focusout", (e) => checkPhone(e.target));
    phoneInput.addEventListener("input", (e) => checkPhone(e.target));

    emailInput.addEventListener("focusout", (e) => checkEmail(e.target));
    emailInput.addEventListener("input", (e) => checkEmail(e.target));

    register();
});

function checkName(currentInput) {
    const checkNameValue = /^[а-я-їієА-Я-ЇІЄ]{2,20}$/;
    toggleWarning(currentInput, checkNameValue);
}

function checkPhone(currentInput) {
    const checkPhoneValue = /^\+380\d{9}$/;
    currentInput.value = "+380" + currentInput.value.slice(4).replace(/\D/g, '').slice(0, 9);
    toggleWarning(currentInput, checkPhoneValue);
}

function checkEmail(currentInput) {
    const checkEmailValue = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    toggleWarning(currentInput, checkEmailValue);
}

function toggleWarning(input, regex) {
    const isValid = regex.test(input.value);
    const warningElement = input.nextElementSibling;
    warningElement.classList.toggle("show", !isValid);
    input.classList.toggle("warned", !isValid);
    if (!isValid) {
        input.classList.add("shake"); 
        setTimeout(() => input.classList.remove("shake"), 300);
    }
}

function register() {
    registerBtn.addEventListener("click", () => {
        let warned = false;
        nameInput.forEach(el => checkName(el));
        checkPhone(phoneInput);
        checkEmail(emailInput);
        
        if (document.querySelectorAll(".warning.show").length === 0) {
            window.location = "../../end.html";
            document.querySelectorAll("input").forEach(input => input.value = ""); 
        }
    });
}