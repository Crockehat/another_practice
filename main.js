$(document).ready(function () {
  const STORAGE_SESSION_KEY = 'auth_app_current_user';
  const STORAGE_USERS_KEY = 'auth_app_users';
  const STORAGE_ORDERS_KEY = 'auth_app_orders';
  const STORAGE_PRODUCTS_KEY = 'store_products';

  const defaultProducts = [
    { id: 101, name: "Классическая кружка", price: 350, description: "Белая фарфоровая кружка", img: "img/классическая кружка.jpg", category: "Кружки", material: "Фарфор", manufacturer: "Imperial Porcelain", country: "Россия", details: "Объем: 350 мл", composition: ["Высококачественный фарфор", "Ручная роспись"] },
    { id: 102, name: "Кружка с надписью", price: 450, description: "Керамика, оригинальный дизайн", img: "img/кружка с надписью.jpg", category: "Кружки", material: "Керамика", manufacturer: "CeramicArt", country: "Россия", details: "Объем: 400 мл", composition: ["Керамика", "Термостойкая глазурь"] },
    { id: 103, name: "Керамическая кружка", price: 550, description: "Ручная работа", img: "img/керамическая кружка.jpg", category: "Кружки", material: "Керамика", manufacturer: "HandMade Studio", country: "Россия", details: "Объем: 300 мл", composition: ["Натуральная глина", "Безопасная глазурь"] },
    { id: 104, name: "Чайный сервиз 'Уют'", price: 3500, description: "6 персон, фарфор", img: "img/медея.jpg", category: "Чайный сервиз", material: "Костяной фарфор", manufacturer: "Midori", country: "Китай", details: "6 персон, 23 предмета", composition: ["Костяной фарфор", "Золотое напыление"] },
    { id: 105, name: "Сервиз 'Восточный'", price: 4200, description: "Роспись подглазурная", img: "img/восточный.jpg", category: "Чайный сервиз", material: "Фарфор", manufacturer: "OrientalTea", country: "Китай", details: "6 персон, 18 предметов", composition: ["Твердый фарфор", "Подглазурная роспись"] },
    { id: 106, name: "Эспрессо чашка", price: 280, description: "Классическая форма", img: "img/чашка.jpg", category: "Чашки для кофе", material: "Фарфор", manufacturer: "CoffeeLover", country: "Польша", details: "Объем: 80 мл", composition: ["Тонкостенный фарфор"] },
    { id: 107, name: "Капучино чашка", price: 320, description: "Объем 250 мл", img: "img/чашка2.jpg", category: "Чашки для кофе", material: "Керамика", manufacturer: "CoffeeLover", country: "Польша", details: "Объем: 250 мл", composition: ["Керамика", "Толстые стенки"] },
    { id: 108, name: "Детский набор 'Зверята'", price: 890, description: "Тарелка, кружка, ложка", img: "img/зверята.jpg", category: "Детская посуда", material: "Маламиновая пластмасса", manufacturer: "KidsJoy", country: "Китай", details: "3 предмета", composition: ["Безопасная пластмасса", "Рисунки зверят"] },
    { id: 109, name: "Детская кружка с крышкой", price: 420, description: "Небьющаяся, с трубочкой", img: "img/детский.jpg", category: "Детская посуда", material: "Пластик", manufacturer: "KidsJoy", country: "Китай", details: "Объем: 200 мл", composition: ["Пищевой пластик", "Силиконовая трубочка"] },
    { id: 110, name: "Подарочный набор 'Вечерний чай'", price: 2850, description: "2 кружки, чай, конфеты", img: "img/подарочный набор.jpg", category: "Наборы", material: "Фарфор", manufacturer: "GiftMaster", country: "Россия", details: "2 кружки + чай + конфеты", composition: ["Фарфор", "Цейлонский чай", "Шоколадные конфеты"] },
    { id: 111, name: "Набор для кофе", price: 1950, description: "2 чашки, кофе, ложки", img: "img/кофейный набор.jpg", category: "Наборы", material: "Керамика", manufacturer: "GiftMaster", country: "Россия", details: "2 чашки + кофе + ложки", composition: ["Керамика", "Молотый кофе", "Металлические ложки"] },
    { id: 112, name: "Сувенирная кружка 'Горы'", price: 590, description: "С 3D эффектом", img: "img/кружка горы.jpg", category: "Сувенирная посуда", material: "Керамика", manufacturer: "SouvenirShop", country: "Китай", details: "Объем: 350 мл", composition: ["Керамика", "3D-печать"] },
    { id: 113, name: "Кружка-хамелеон", price: 680, description: "Меняет цвет от температуры", img: "img/кружка хамелеон.jpg", category: "Сувенирная посуда", material: "Керамика", manufacturer: "MagicMug", country: "Китай", details: "Объем: 300 мл", composition: ["Термочувствительная краска", "Керамика"] },
    { id: 114, name: "Термокружка 500мл", price: 1250, description: "Нержавеющая сталь", img: "img/термокружка.jpg", category: "Термосы", material: "Нержавеющая сталь", manufacturer: "ThermoKing", country: "Китай", details: "Объем: 500 мл, двойные стенки", composition: ["Нержавеющая сталь 304", "Вакуумная изоляция"] },
    { id: 115, name: "Термос 1л", price: 1890, description: "Двойные стенки", img: "img/термос.webp", category: "Термосы", material: "Нержавеющая сталь", manufacturer: "ThermoKing", country: "Китай", details: "Объем: 1 л, двойные стенки", composition: ["Нержавеющая сталь 304", "Вакуумная изоляция"] }
  ];

  function getProducts() {
    const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(defaultProducts));
      return [...defaultProducts];
    }
    try {
      return JSON.parse(raw);
    } catch(e) {
      return [...defaultProducts];
    }
  }

  function saveProducts(products) {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  }

  let products = getProducts();

  function refreshProducts() {
    products = getProducts();
    if ($("#productsContainer").length) {
      applyFiltersAndRender();
    }
    if ($(".big-product-card").length) {
      renderProductPage();
    }
  }

  function getCurrentSession() {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch(e) { return null; }
  }
  
  function getCurrentUserEmail() {
    const session = getCurrentSession();
    return session ? session.email : null;
  }
  
  function getCurrentUserRole() {
    const session = getCurrentSession();
    return session ? session.role : null;
  }
  
  function isAuthenticated() {
    return getCurrentSession() !== null;
  }
  
  function getUserOrders(email) {
    if (!email) return [];
    const key = `${STORAGE_ORDERS_KEY}_${email}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch(e) { return []; }
  }
  
  function saveUserOrder(email, order) {
    if (!email) return;
    const key = `${STORAGE_ORDERS_KEY}_${email}`;
    const existingOrders = getUserOrders(email);
    existingOrders.push(order);
    localStorage.setItem(key, JSON.stringify(existingOrders));
  }
  
  function getUserDataKey(email, dataType) {
    return `user_${email}_${dataType}`;
  }
  
  function getUserCart(email) {
    if (!email) return [];
    const key = getUserDataKey(email, 'cart');
    const raw = localStorage.getItem(key);
    try { return raw ? JSON.parse(raw) : []; } catch(e) { return []; }
  }
  
  function saveUserCart(email, cart) {
    if (!email) return;
    const key = getUserDataKey(email, 'cart');
    localStorage.setItem(key, JSON.stringify(cart));
  }
  
  function getUserFavorites(email) {
    if (!email) return [];
    const key = getUserDataKey(email, 'favorites');
    const raw = localStorage.getItem(key);
    try { return raw ? JSON.parse(raw) : []; } catch(e) { return []; }
  }
  
  function saveUserFavorites(email, favorites) {
    if (!email) return;
    const key = getUserDataKey(email, 'favorites');
    localStorage.setItem(key, JSON.stringify(favorites));
  }
  
  function requireAuth(actionName, callback) {
    if (!isAuthenticated()) {
      showNotification('Пожалуйста, войдите в аккаунт, чтобы ' + actionName, 'warning');
      setTimeout(() => { window.location.href = 'авторизация.html'; }, 1500);
      return false;
    }
    if (callback) callback();
    return true;
  }
  
  let cart = [];
  let favorites = [];
  let activeCategories = new Set();
  
  function loadUserData() {
    const email = getCurrentUserEmail();
    if (email) {
      cart = getUserCart(email);
      favorites = getUserFavorites(email);
    } else {
      cart = [];
      favorites = [];
    }
    updateCartUI();
    updateFavoritesUI();
  }
  
  function saveCurrentUserData() {
    const email = getCurrentUserEmail();
    if (email) {
      saveUserCart(email, cart);
      saveUserFavorites(email, favorites);
    }
  }
  
  function getFilteredProducts() {
    if (activeCategories.size === 0) return [...products];
    return products.filter(product => activeCategories.has(product.category));
  }
  
  function updateFilterUI() {
    const filtersInfoDiv = $("#activeFiltersInfo");
    const filtersListDiv = $("#filtersList");
    if (activeCategories.size > 0) {
      let filtersHtml = '';
      activeCategories.forEach(cat => {
        filtersHtml += `<span class="filter-badge">${cat} <span class="remove-filter" data-category="${cat}" style="cursor:pointer;">✖</span></span>`;
      });
      if (filtersListDiv.length) filtersListDiv.html(filtersHtml);
      $(".remove-filter").off("click").on("click", function() {
        const category = $(this).data("category");
        activeCategories.delete(category);
        $(`#filtersCheckboxes input[value="${category}"]`).prop("checked", false);
        applyFiltersAndRender();
      });
    }
  }
  
  function applyFiltersAndRender() {
    const filtered = getFilteredProducts();
    renderProducts(filtered);
    updateFilterUI();
  }
  
  function initFilters() {
    if ($("#filtersCheckboxes").length) {
      $("#filtersCheckboxes input[type='checkbox']").off("change").on("change", function() {
        const category = $(this).val();
        if ($(this).is(":checked")) activeCategories.add(category);
        else activeCategories.delete(category);
        applyFiltersAndRender();
      });
    }
  }
  
  function renderProducts(productsToRender) {
    const container = $("#productsContainer");
    if (!container.length) return;
    container.empty();
    productsToRender.forEach(product => {
      const isFavorite = favorites.includes(product.id.toString());
      const card = `
        <div class="col-md-3 mb-4 ml-2 mr-2">
          <div class="product-card" data-id="${product.id}">
            <a href="product_card.html?id=${product.id}" class="product-link" style="text-decoration: none; color: inherit;">
              <img class="product-image" src="${product.img}" alt="${product.name}">
              <div class="card-body text-center">
                <h3 class="light-color less-marg">${product.name}</h3>
                <p class="light-color less-marg">${product.description}</p>
                <div class="price-tag">${product.price} ₽</div>
              </div>
            </a>
            <div class="card-body text-center">
              <button class="btn btn-primary mb-2 btn-custom add-to-cart" data-id="${product.id}"><i class="fa-solid fa-bag-shopping"></i> В корзину</button>
              <button class="btn btn-outline-danger btn-custom add-to-fav ${isFavorite ? 'active' : ''}" data-id="${product.id}">
                <i class="fas ${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart me-2"></i>${isFavorite ? 'В избранном' : 'В избранное'}
              </button>
            </div>
          </div>
        </div>
      `;
      container.append(card);
    });
    if (productsToRender.length === 0) {
      container.html(`<div class="col-12 text-center py-5"><div class="empty-state"><i class="fas fa-filter fa-3x"></i><p>Товары не найдены</p></div></div>`);
    }
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  function renderProductPage() {
    if (!productId) return;
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) { window.location.href = 'index.html'; return; }
    const isFavorite = favorites.includes(product.id.toString());
    $('#productImg').attr('src', product.img);
    $('#productName').text(product.name);
    $('#productPrice').text(product.price + ' ₽');
    $('#productCategory').text(product.category);
    $('#productDetails').text(product.details || product.description);
    if (product.composition && product.composition.length) {
      $('#productComposition').html(product.composition.map(comp => `<li>${comp}<span class="value"></span></li>`).join(''));
    } else {
      $('#productComposition').html('<li>Информация отсутствует</li>');
    }
    $('#productMaterial').html(`Материал: ${product.material || 'Не указан'}`);
    $('#productManufacturer').html(`Производитель: ${product.manufacturer || 'Не указан'}`);
    $('#productCountry').html(`Страна: ${product.country || 'Не указана'}`);
    $('#addToCartBtn').attr('data-id', product.id);
    $('#addToFavBtn').attr('data-id', product.id);
    if (isFavorite) {
      $('#addToFavBtn').addClass('active').html('<i class="fas fa-solid fa-heart me-2"></i>В избранном');
    } else {
      $('#addToFavBtn').removeClass('active').html('<i class="fas fa-regular fa-heart me-2"></i>В избранное');
    }
  }
  
  function updateCartUI() {
    saveCurrentUserData();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $("#cartCount").text(totalItems);
    renderCartItems();
  }
  
  function renderCartItems() {
    const container = $("#cartItemsContainer");
    if (!container.length) return;
    if (cart.length === 0) {
      container.html(`<div class="empty-state"><i class="fas fa-shopping-cart"></i><p>Корзина пуста</p></div>`);
      $("#cartTotal").text("0 ₽");
      return;
    }
    let itemsHtml = "", total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;
      total += product.price * item.quantity;
      itemsHtml += `
        <div class="cart-item" data-id="${product.id}">
          <div class="d-flex justify-content-between align-items-start">
            <div><h6>${product.name}</h6><p>${product.price} ₽ × ${item.quantity}</p></div>
            <span class="remove-item" data-id="${product.id}"><i class="fas fa-times-circle fa-lg"></i></span>
          </div>
          <div class="quantity-control">
            <button class="quantity-btn decrease-qty" data-id="${product.id}"><i class="fas fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase-qty" data-id="${product.id}"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      `;
    });
    container.html(itemsHtml);
    $("#cartTotal").text(total + " ₽");
  }
  
  function updateFavoritesUI() {
    saveCurrentUserData();
    $("#favoritesCount").text(favorites.length);
    if ($("#productsContainer").length) {
      const current = getFilteredProducts();
      current.forEach(product => {
        const isFav = favorites.includes(product.id.toString());
        const btn = $(`.add-to-fav[data-id="${product.id}"]`);
        if (btn.length) {
          if (isFav) btn.addClass("active").html('<i class="fas fa-solid fa-heart me-2"></i>В избранном');
          else btn.removeClass("active").html('<i class="fas fa-regular fa-heart me-2"></i>В избранное');
        }
      });
    }
    if (productId && $("#addToFavBtn").length) {
      const isFav = favorites.includes(productId);
      if (isFav) $('#addToFavBtn').addClass('active').html('<i class="fas fa-solid fa-heart me-2"></i>В избранном');
      else $('#addToFavBtn').removeClass('active').html('<i class="fas fa-regular fa-heart me-2"></i>В избранное');
    }
    renderFavoritesItems();
  }
  
  function renderFavoritesItems() {
    const container = $("#favoritesItemsContainer");
    if (!container.length) return;
    if (favorites.length === 0) {
      container.html(`<div class="empty-state"><i class="fas fa-heart"></i><p>Избранное пусто</p></div>`);
      return;
    }
    let html = "";
    favorites.forEach(favId => {
      const product = products.find(p => p.id === parseInt(favId));
      if (!product) return;
      html += `
        <div class="favorite-item" data-id="${product.id}">
          <div class="d-flex justify-content-between align-items-start">
            <div><h6>${product.name}</h6><p>${product.description}</p><p class="fw-bold">${product.price} ₽</p></div>
            <span class="remove-item" data-id="${product.id}"><i class="fas fa-times-circle fa-lg"></i></span>
          </div>
          <button class="btn btn-sm btn-outline-primary w-100 mt-2 add-to-cart-from-fav" data-id="${product.id}"><i class="fas fa-cart-plus me-2"></i>В корзину</button>
        </div>
      `;
    });
    container.html(html);
  }
  
  function addToCart(productId) {
    if (!requireAuth('добавить товар')) return;
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: productId, quantity: 1 });
    updateCartUI();
    showNotification(`${product.name} добавлен в корзину`);
  }
  
  function addToFavorites(productId) {
    if (!requireAuth('добавить в избранное')) return;
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    const idStr = productId.toString();
    if (favorites.includes(idStr)) {
      favorites = favorites.filter(id => id !== idStr);
      showNotification(`${product.name} удален из избранного`, "warning");
    } else {
      favorites.push(idStr);
      showNotification(`${product.name} добавлен в избранное`, "success");
    }
    updateFavoritesUI();
  }
  
  function placeOrder() {
    if (!requireAuth('оформить заказ')) return;
    if (cart.length === 0) { showNotification("Корзина пуста!", "warning"); return; }
    const email = getCurrentUserEmail();
    const total = cart.reduce((sum, item) => {
      const p = products.find(pr => pr.id === item.id);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
    const orderItems = cart.map(item => {
      const p = products.find(pr => pr.id === item.id);
      return { id: p.id, name: p.name, price: p.price, quantity: item.quantity, img: p.img };
    });
    const order = { id: Date.now(), date: new Date().toLocaleString('ru-RU'), total, items: orderItems, status: 'Оплачен' };
    saveUserOrder(email, order);
    cart = [];
    updateCartUI();
    $("#cartSidebar").removeClass("open");
    $("#sidebarOverlay").removeClass("open");
    showNotification(`Заказ оформлен! Сумма: ${total} ₽`, "success");
  }
  
  $(document).on("click", ".add-to-cart", function(e) {
    e.preventDefault(); e.stopPropagation();
    const id = parseInt($(this).data("id"));
    if (!isNaN(id)) addToCart(id);
  });
  $(document).on("click", ".add-to-fav", function(e) {
    e.preventDefault(); e.stopPropagation();
    const id = $(this).data("id");
    addToFavorites(id);
  });
  $(document).on("click", ".add-to-cart-from-fav", function(e) {
    e.preventDefault();
    const id = parseInt($(this).data("id"));
    addToCart(id);
  });
  $(document).on("click", ".increase-qty", function() {
    if (!requireAuth('изменить количество')) return;
    const id = parseInt($(this).data("id"));
    const item = cart.find(i => i.id === id);
    if (item) { item.quantity += 1; updateCartUI(); }
  });
  $(document).on("click", ".decrease-qty", function() {
    if (!requireAuth('изменить количество')) return;
    const id = parseInt($(this).data("id"));
    const item = cart.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) item.quantity -= 1;
      else cart = cart.filter(i => i.id !== id);
      updateCartUI();
    }
  });
  $(document).on("click", ".cart-item .remove-item", function() {
    if (!requireAuth('удалить')) return;
    const id = parseInt($(this).data("id"));
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
  });
  $(document).on("click", ".favorite-item .remove-item", function() {
    if (!requireAuth('удалить')) return;
    const id = $(this).data("id").toString();
    favorites = favorites.filter(f => f !== id);
    updateFavoritesUI();
  });
  $("#clearCartBtn").on("click", function() {
    if (!requireAuth('очистить корзину')) return;
    if (cart.length && confirm("Очистить корзину?")) { cart = []; updateCartUI(); }
  });
  $("#clearFavoritesBtn").on("click", function() {
    if (!requireAuth('очистить избранное')) return;
    if (favorites.length && confirm("Очистить избранное?")) { favorites = []; updateFavoritesUI(); }
  });
  $("#cartBtn").on("click", function() {
    if (!requireAuth('просмотреть корзину')) return;
    $("#cartSidebar").addClass("open"); $("#sidebarOverlay").addClass("open");
    renderCartItems();
  });
  $("#favoritesBtn").on("click", function() {
    if (!requireAuth('просмотреть избранное')) return;
    $("#favoritesSidebar").addClass("open"); $("#sidebarOverlay").addClass("open");
    renderFavoritesItems();
  });
  $("#closeCartBtn, #closeFavoritesBtn, #sidebarOverlay").on("click", function() {
    $("#cartSidebar, #favoritesSidebar").removeClass("open");
    $("#sidebarOverlay").removeClass("open");
  });
  $("#checkoutBtn").on("click", placeOrder);
  $(".nav-buttons:has(.fa-user), .btn-footer:contains('Аккаунт')").on("click", function() {
    window.location.href = 'авторизация.html';
  });
  
  function showNotification(message, type = "success") {
    const bg = type === "success" ? "#4CAF50" : "#ff4757";
    const notif = $(`<div style="position:fixed;bottom:20px;right:20px;background:${bg};color:white;padding:15px 25px;border-radius:50px;z-index:10000;">${message}</div>`);
    $("body").append(notif);
    setTimeout(() => notif.fadeOut(() => notif.remove()), 2000);
  }
  
  loadUserData();
  if ($("#productsContainer").length) {
    initFilters();
    applyFiltersAndRender();
  } else if ($(".big-product-card").length) {
    renderProductPage();
  }
  updateCartUI();
  updateFavoritesUI();
  
  setInterval(() => {
    const newProducts = getProducts();
    if (JSON.stringify(products) !== JSON.stringify(newProducts)) {
      products = newProducts;
      if ($("#productsContainer").length) applyFiltersAndRender();
      if ($(".big-product-card").length) renderProductPage();
      const currentIds = products.map(p => p.id);
      cart = cart.filter(item => currentIds.includes(item.id));
      favorites = favorites.filter(favId => currentIds.includes(parseInt(favId)));
      saveCurrentUserData();
      updateCartUI();
      updateFavoritesUI();
    }
  }, 2000);
});

