"use strict";
let basket = {}; //Создадим пустой объект корзины, где будет храниться количество каждого товара
let buttonCart = document.querySelector('.cartIcon'); //объект кнопки корзины в верхнем правом углу
let cart = document.querySelector('.cart'); // объект корзины
buttonCart.addEventListener('click',function () {
    cart.classList.toggle('hidden'); // по нажатию на кнопку корзины, корзина будет отображаться или скрываться
})
let productName = document.querySelectorAll('.featuredName');//название товара на сайте
let productPrice = document.querySelectorAll('.featuredPrice');//Цена товара на сайте

let counter = document.querySelector('.counter'); //объект счетчика товаров в красном кружочке в верхнем правом углу
let buttonAdd = document.querySelectorAll('button[data-productId]'); //объект кнопки добавления товара в корзину

buttonAdd.forEach(function (button) {
    button.addEventListener('click', addToCart);
})

/**
 * Функция срабатывает, когда просходит клик по кнопке "Add to Cart"
 * @param event
 */
function addToCart(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    changeOfCounter(productId);//изменяется счетчик товаров в корзине на 1
    changeButtonStyle(productId);//изменяется стиль кнопки добавления товара
    addInObject(productId); //добавляет конкретный товар в объект корзины {0: 9шт, 1:3шт}
    renderProductsInCard(productId); //отрисовывает объект корзины в виде списка товаров
    calculateTotalSumm(); //подсчитывает суммарную стоимость всей корзины (всех видов товаров в выбранном количестве)
}

/**
 * Функция изменения счетчика товаров на 1
 */
function changeOfCounter() {
    counter.textContent++;
}

/**
 * Функция изменяет стиль кноки: становится зеленой, меняется текст, добавляется другая иконка
 * @param productId
 */
function changeButtonStyle(productId) {
    buttonAdd[productId].style.border = "1px solid green";
    buttonAdd[productId].textContent = "Added to Cart";
    buttonAdd[productId].style.color = "green";
    buttonAdd[productId].insertAdjacentHTML('afterbegin',`<i class="fas fa-check"></i>`);
}

/**
 * Функция добавляет товар, по которому кликнули, в объект корзины
 * @param productId
 */
function addInObject(productId) {
    if (!(productId in basket)){  //если нет этого свойства productId(число кнопки id),
                                    //там создаем свойство productId в объекте корзины и значение пишем 1;
        basket[productId]=1;
    } else {
        basket[productId]++; //Если у нас в корзине уже будет число с таким айдишником, то мы просто количество увеличиваем на 1
    }

}

/**
 * Функция отрисовывает объект корзины в виде списка с количеством, ценами, и окончательной стоимостью
 * @param productId
 */
function renderProductsInCard(productId) {
    let renderProduct = document.querySelector(`.product_number[id="${productId}"]`); //поиск элементов с классом количеством продуктов
    if (renderProduct){ //если такие элементы есть, то
        increaseProductsCount(productId); // увеличить количество повторного товара
        recalculateCartSum(productId); // пересчитать итоговую сумму за вид товара
    } else { //если таких элементов нет, то
        renderNewProductInCard(productId); //отрисовать новый продукт в корзине
    }

}

/**
 * Функция отрисовывает новый продукт, если в корзине такого продукта еще не было
 * @param productId
 */
function renderNewProductInCard(productId) {

    let cartSumm = document.querySelector('.cart_summ');
    let markup = `
        <div class="newProduct">
            <span class="cart_part" id="${productId}">${productName[productId].textContent}</span>
            <span class="cart_part" ><span class="product_number" id="${productId}">1</span>шт.</span>
            <span class="cart_part" id="${productId}"><span class="product_price">${productPrice[productId].textContent}</span></span>
            <span class="cart_part" id="${productId}">$<span class="summOfRow" id="${productId}">${productPrice[productId].textContent.trim().slice(1)}</span></span>
        </div>
    `;
    cartSumm.insertAdjacentHTML('beforebegin', markup);
}

/**
 * Функция увелчивает количество товаров на 1, если на него нажали повторный раз
 * @param productId
 */
function increaseProductsCount(productId) {
    let productsCount = document.querySelector(`.product_number[id="${productId}"]`);//шаблонный литерал обязательно
    productsCount.textContent++;
}

/**
 * Функция пересчитывает стоимость нескольких экземпляров одного и того же товара
 * @param productId
 */
function recalculateCartSum(productId) {
 let sumOfKind = document.querySelector(`.summOfRow[id="${productId}"]`); //сумма за 1 вид товара
 let productsCount = document.querySelector(`.product_number[id="${productId}"]`);//Количество шт. в 1 виде товара
 let sum = (productsCount.textContent * productPrice[productId].textContent.trim().slice(1)).toFixed(2);
 sumOfKind.textContent = sum;

}

/**
 * Функция считает итоговую стоимость за все товары корзины
 */
function calculateTotalSumm() {
    let totalSumm = 0;
    for (let id in basket){
        totalSumm += basket[id] * productPrice[id].textContent.trim().slice(1);
    }
    let basketSumm = document.querySelector('.basket_summ');
    basketSumm.textContent = totalSumm.toFixed(2);
}