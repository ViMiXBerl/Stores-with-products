"use strict";

let openStoreDetails = () => {
	let storesListWrapper = document.querySelector(".stores-list__wrapper");
	let mainStoreDetails = document.querySelector(".main-store-details");
	let notSelected = document.querySelector(".not-selected");

	storesListWrapper.addEventListener("click", (event) => {
		mainStoreDetails.classList.remove("js-display-type_none");
		notSelected.classList.add("js-display-type_none");

		let activeStore = event.target.closest("li");

		clearActiveClass();
		addActiveClass(activeStore);
		addContactDetails(activeStore);
		addProductAmount(activeStore);
	});
};

let showStoresList = () => {
	let storesListWrapper = document.querySelector(".stores-list__wrapper");

	storesListWrapper.innerHTML = "";

	Stores.forEach((item) => {
		storesListWrapper.innerHTML += `
        <li class="stores-list__item" data-store-id="${item.id}">
            <div class="store-info">
                <h4 class="store-info__title" title="${item.Name}">
                    ${item.Name}
                </h4>
                <span class="store-info__address">
                    ${item.Address}
                </span>
            </div>
            <div class="store-square">
                <span class="store-square__number">${item.FloorArea}</span>
                <span class="store-square__unit">sq.m</span>
            </div>
        </li>
        `;
	});

	openStoreDetails();
};

let checkExistenceOfStores = () => {
	let storeListWrapper = document.querySelector(".stores-list__wrapper");
	let notFoundStoresText = document.createElement("p");
	notFoundStoresText.innerText = "Stores not found";
	notFoundStoresText.classList.add("stores-list-not-foun");

	if (Stores.length === 0) {
		storeListWrapper.appendChild(notFoundStoresText);
	} else {
		showStoresList();
	}
};

checkExistenceOfStores();

let clearActiveClass = () => {
	let storeListItems = document.querySelectorAll(".stores-list__item");
	storeListItems.forEach((item) => {
		item.classList.remove("js-active");
	});
};

let addActiveClass = (activeStore) => {
	activeStore.classList.add("js-active");
};

let addContactDetails = (activeStore) => {
	let contactDetailsEmail = document.querySelector(
		".js-contact-details__email"
	);
	let contactDetailsNumber = document.querySelector(
		".js-contact-details__number"
	);
	let contactDetailsAddress = document.querySelector(
		".js-contact-details__address"
	);
	let contactDetailsEstablishedDate = document.querySelector(
		".js-contact-details__established-date"
	);
	let contactDetailsFloorArea = document.querySelector(
		".js-contact-details__floor-area"
	);

	Stores.forEach((item) => {
		if (item.id === Number(activeStore.dataset.storeId)) {
			contactDetailsEmail.innerText = `${item.Email}`;
			contactDetailsNumber.innerText = `${item.PhoneNumber}`;
			contactDetailsAddress.innerText = `${item.Address}`;
			contactDetailsEstablishedDate.innerText = `${item.Established}`;
			contactDetailsFloorArea.innerText = `${item.FloorArea}`;
		}
	});
};

let addProductAmount = (activeStore) => {
	let productAmount = document.querySelector(".js-products-filters-amount");

	let products = [];

	Stores.forEach((item) => {
		if (item.id === Number(activeStore.dataset.storeId)) {
			products = item.rel_Products;

			productAmount.innerText = `${item.rel_Products.length}`;
		}
	});

	addProductsFilters(products);
};

let addProductsFilters = (products) => {
	let productOk = document.querySelector(".js-products-filters-ok");
	let productStorage = document.querySelector(".js-products-filters-storage");
	let productOutOfStock = document.querySelector(
		".js-products-filters-out-of-stock"
	);

	let okProducts = products.filter((item) => {
		return item.Status === "OK";
	});

	let storageProducts = products.filter((item) => {
		return item.Status === "STORAGE";
	});

	let outOfStockProducts = products.filter((item) => {
		return item.Status === "OUT_OF_STOCK";
	});

	productOk.innerText = `${okProducts.length}`;
	productStorage.innerText = `${storageProducts.length}`;
	productOutOfStock.innerText = `${outOfStockProducts.length}`;

	addProductsTableAll(products);
};

let addProductsTableAll = (products) => {
	let productsTableBody = document.querySelector(".products-table__body");

	productsTableBody.innerHTML = "";

	products.forEach((item, index) => {
		productsTableBody.innerHTML += `
        
            <tr class="products-table__body_row-hover tr-style">
                <td class="products-table__text first-cell td-style">
                    <p class="products-table__text_type-bold"> ${item.Name} </p>
                    <p class="products-table__text_margin-top-number">${
											index + 1
										}</p>
                </td>
                <td align="right" class="products-table__text td-style">
                    <span class="products-table__text_big-number">${
											item.Price
										}</span>
                    <span>USD</span>
                </td>
                <td class="products-table__text text-hidden td-style" nowrap>
                    <p
                        title="${item.Specs}"
                        class="text-hidden"
                    >
                        ${item.Specs}
                    </p>
                </td>
                <td class="products-table__text text-hidden td-style" nowrap>
                    <p
                        title="${item.SupplierInfo}"
                        class="text-hidden"
                    >
                       ${item.SupplierInfo}
                    </p>
                </td>
                <td class="products-table__text td-style">${item.MadeIn}</td>
                <td class="products-table__text text-hidden td-style" nowrap>
                    <p title="${
											item.ProductionCompanyName
										}" class="text-hidden">
                        ${item.ProductionCompanyName}
                    </p>
                </td>
                <td class="td-style">
                    <figure class="products-table__rating">
                        <img
                        src="${
													item.Rating > 0
														? "./images/filled-star.svg"
														: "./images/star.svg"
												}"
                        alt="product rating"
                        class="products-table__rating-star"
                        />
                        <img
                        src="${
													item.Rating > 1
														? "./images/filled-star.svg"
														: "./images/star.svg"
												}"
                        alt="product rating"
                        class="products-table__rating-star"
                        />
                        <img
                        src="${
													item.Rating > 2
														? "./images/filled-star.svg"
														: "./images/star.svg"
												}"
                        alt="product rating"
                        class="products-table__rating-star"
                        />
                        <img
                        src="${
													item.Rating > 3
														? "./images/filled-star.svg"
														: "./images/star.svg"
												}"
                        alt="product rating"
                        class="products-table__rating-star"
                        />
                        <img
                        src="${
													item.Rating > 4
														? "./images/filled-star.svg"
														: "./images/star.svg"
												}"
                        alt="product rating"
                        class="products-table__rating-star"
                        />
                    </figure>
                </td>
                <td class="products-table__text td-style">
                    <figure class="products-table__details">
                        <img
                            src="./images/arrow.svg"
                            alt="product table details"
                            class="products-table__details-item"
                        />
                    </figure>
                </td>
            </tr>
       
        `;
	});
};

let inputVlue = () => {
	let searchFormInput = document.querySelector(".search-form__input");

	searchFormInput.oninput = () => {
		let textValue = searchFormInput.value.toLowerCase().trim();

		if (textValue != "") {
			clickLabelSearch(textValue);
		}

		resetInput();
	};
};

inputVlue();

let resetInput = () => {
	let labelClose = document.querySelector(".circle-close");
	let labelReload = document.querySelector(".label-reload");
	let searchForm = document.querySelector(".search-form");

	labelClose.addEventListener("click", (event) => {
		event.preventDefault();

		labelReload.classList.remove("js-display-type_none");
		labelClose.classList.add("js-display-type_none");

		searchForm.reset();
	});
};

let clickLabelSearch = (textValue) => {
	let labelSearch = document.querySelector(".label-search");
	let labelReload = document.querySelector(".label-reload");
	let labelClose = document.querySelector(".circle-close");

	labelSearch.addEventListener("click", (event) => {
		event.preventDefault();

		labelReload.classList.add("js-display-type_none");
		labelClose.classList.remove("js-display-type_none");
	});
};
