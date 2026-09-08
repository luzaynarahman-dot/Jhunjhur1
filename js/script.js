/* =========================================================
   JHUNJHUR — Main JavaScript
   Location: js/script.js
   Complete Dynamic + LocalStorage CRUD
========================================================= */

// =========================================================
// DEFAULT PRODUCTS (Fallback)
// =========================================================

const DEFAULT_PRODUCTS = [
    // Bangles
    {
        id: 'bangles-1',
        category: 'bangles',
        name: 'Desi Churi Set',
        price: 450,
        image: 'assets/bangles1.jpg',
        description: 'দেশি সাজের জন্য সুন্দর traditional churi set.'
    },
    {
        id: 'bangles-2',
        category: 'bangles',
        name: 'Golden Churi Set',
        price: 480,
        image: 'assets/bangles2.jpg',
        description: 'Elegant golden churi set for festive and everyday desi looks.'
    },
    {
        id: 'bangles-3',
        category: 'bangles',
        name: 'Pearl Churi Set',
        price: 520,
        image: 'assets/bangles3.jpg',
        description: 'Soft pearl detailing with a classic desi finish.'
    },
    {
        id: 'bangles-4',
        category: 'bangles',
        name: 'Traditional Churi',
        price: 390,
        image: 'assets/bangles4.jpg',
        description: 'A classic traditional churi for a timeless desi look.'
    },
    // Earrings
    {
        id: 'earrings-1',
        category: 'earrings',
        name: 'Golden Jhumka',
        price: 350,
        image: 'assets/earrings1.jpg',
        description: 'Classic golden jhumka with an elegant desi finish.'
    },
    {
        id: 'earrings-2',
        category: 'earrings',
        name: 'Pearl Drop Earrings',
        price: 420,
        image: 'assets/earrings2.jpg',
        description: 'Elegant pearl drop earrings for a soft feminine look.'
    },
    {
        id: 'earrings-3',
        category: 'earrings',
        name: 'Desi Floral Earrings',
        price: 380,
        image: 'assets/earrings3.jpg',
        description: 'Floral inspired earrings with a beautiful desi touch.'
    },
    // Pendants
    {
        id: 'pendants-1',
        category: 'pendants',
        name: 'Classic Gold Pendant',
        price: 550,
        image: 'assets/pendants1.jpg',
        description: 'A minimal classic gold pendant for everyday elegance.'
    },
    {
        id: 'pendants-2',
        category: 'pendants',
        name: 'Floral Pendant',
        price: 620,
        image: 'assets/pendants2.jpg',
        description: 'A delicate floral pendant made for graceful styling.'
    },
    // Rings
    {
        id: 'rings-1',
        category: 'rings',
        name: 'Floral Pearl Ring',
        price: 450,
        image: 'assets/rings1.jpg',
        description: 'A floral pearl ring for a delicate everyday look.'
    },
    {
        id: 'rings-2',
        category: 'rings',
        name: 'Classic Gold Ring',
        price: 390,
        image: 'assets/rings2.jpg',
        description: 'A simple classic gold ring that goes with every look.'
    },
    // Others (replaces Tikli)
    {
        id: 'others-1',
        category: 'others',
        name: 'Antique Tikli',
        price: 350,
        image: 'assets/tikli1.jpg',
        description: 'Traditional antique-inspired tikli for a complete desi look.'
    },
    {
        id: 'others-2',
        category: 'others',
        name: 'Golden Floral Tikli',
        price: 320,
        image: 'assets/tikli2.jpg',
        description: 'Golden floral tikli with a delicate traditional touch.'
    },
    // Hair Accessories
    {
        id: 'hair-1',
        category: 'hair',
        name: 'Floral Hair Clip',
        price: 280,
        image: 'assets/hair1.jpg',
        description: 'A pretty floral hair clip for a soft desi hairstyle.'
    },
    {
        id: 'hair-2',
        category: 'hair',
        name: 'Desi Hair Band',
        price: 250,
        image: 'assets/hair2.jpg',
        description: 'A simple desi hair band for everyday styling.'
    }
];

// =========================================================
// REVIEWS DATA
// =========================================================

const DEFAULT_REVIEWS = [
    {
        name: 'Sohana Islam',
        text: 'চুড়িগুলো ছবির থেকেও বেশি সুন্দর! কোয়ালিটি অসাধারণ, খুব যত্ন নিয়ে প্যাক করা ছিল। ভালোবাসা রইলো ঝুনঝুর!',
        product: 'Desi Churi Set',
        image: 'assets/bangles1.jpg'
    },
    {
        name: 'Farhana Mim',
        text: 'প্রথমবার অর্ডার করেছিলাম, অভিজ্ঞতা দারুণ! ডেলিভারি ছিল দ্রুত এবং জুয়েলারিগুলো একদম পারফেক্ট।',
        product: 'Golden Jhumka',
        image: 'assets/earrings1.jpg'
    },
    {
        name: 'Nusrat Jahan',
        text: 'প্রতিটা কালেকশনই এত সুন্দর হয়! ঝুনঝুর মানেই ট্রাস্ট। সবসময় আমার ফেভারিট জায়গা এখানেই।',
        product: 'Classic Gold Pendant',
        image: 'assets/pendants1.jpg'
    }
];

// =========================================================
// CATEGORY CONFIG
// =========================================================

const CATEGORIES = [
    { id: 'all', label: 'All Products', icon: 'all.png' },
    { id: 'bangles', label: 'Bangles', icon: 'bangles.png' },
    { id: 'earrings', label: 'Earrings', icon: 'earrings.png' },
    { id: 'pendants', label: 'Pendants', icon: 'pendants.png' },
    { id: 'rings', label: 'Rings', icon: 'rings.png' },
    { id: 'others', label: 'Others', icon: 'tikli.png' },
    { id: 'hair', label: 'Hair Accessories', icon: 'hair-accessories.png' }
];

const CATEGORY_INFO = {
    all: { title: 'All Products', subtitle: 'সব ধরনের সুন্দর প্রোডাক্ট' },
    bangles: { title: 'Bangles', subtitle: 'দেশি সাজের চিরচেনা সৌন্দর্য' },
    earrings: { title: 'Earrings', subtitle: 'ছোট্ট দুলে সাজ হোক আরও সুন্দর' },
    pendants: { title: 'Pendants', subtitle: 'গলায় থাকুক ছোট্ট একটুকরো সৌন্দর্য' },
    rings: { title: 'Rings', subtitle: 'আপনার আঙুলের জন্য ছোট্ট সৌন্দর্য' },
    others: { title: 'Others', subtitle: 'নিত্য নতুন কিছু' },
    hair: { title: 'Hair Accessories', subtitle: 'চুলের সাজেও থাকুক Jhunjhur-এর ছোঁয়া' }
};

// =========================================================
// SAFE LOCALSTORAGE HELPERS (Fixed)
// =========================================================

function safeJSONParse(data, fallback = null) {
    if (!data) return fallback;
    try {
        return JSON.parse(data);
    } catch (e) {
        console.warn('⚠️ Invalid JSON data, using fallback:', e);
        return fallback;
    }
}

function getProducts() {
    const stored = localStorage.getItem('jhunjhurProducts');
    if (stored) {
        const parsed = safeJSONParse(stored, null);
        if (parsed) return parsed;
    }
    localStorage.setItem('jhunjhurProducts', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem('jhunjhurProducts', JSON.stringify(products));
}

function getCart() {
    const stored = localStorage.getItem('jhunjhurCart');
    return safeJSONParse(stored, []);
}

function saveCart(cart) {
    localStorage.setItem('jhunjhurCart', JSON.stringify(cart));
}

function getWishlist() {
    const stored = localStorage.getItem('jhunjhurWishlist');
    return safeJSONParse(stored, []);
}

function saveWishlist(wishlist) {
    localStorage.setItem('jhunjhurWishlist', JSON.stringify(wishlist));
}

function getOrders() {
    const stored = localStorage.getItem('jhunjhurOrders');
    return safeJSONParse(stored, []);
}

function saveOrders(orders) {
    localStorage.setItem('jhunjhurOrders', JSON.stringify(orders));
}

function getReviews() {
    const stored = localStorage.getItem('jhunjhurReviews');
    return safeJSONParse(stored, []);
}

function saveReviews(reviews) {
    localStorage.setItem('jhunjhurReviews', JSON.stringify(reviews));
}

function getCurrentUser() {
    const stored = localStorage.getItem('jhunjhurUser');
    return safeJSONParse(stored, null);
}

// =========================================================
// TOAST NOTIFICATION
// =========================================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <div class="toast-content">
            <strong>${message}</strong>
            <span>${type === 'success' ? '✓ Success' : '⚠️ Notice'}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 2500);
}

// =========================================================
// FORMAT HELPERS
// =========================================================

function formatPrice(price) {
    return `৳${Number(price).toLocaleString('en-BD')}`;
}

function getCategoryName(category) {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat ? cat.label : 'JHUNJHUR';
}

function getProduct(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function needsSize(product) {
    return ['bangles', 'rings'].includes(product.category);
}

// =========================================================
// RENDER CATEGORIES
// =========================================================

function renderCategories() {
    const bar = document.getElementById('categoryBar');
    if (!bar) return;
    
    bar.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-tab' + (cat.id === 'all' ? ' active' : '');
        btn.dataset.category = cat.id;
        btn.innerHTML = `
            <img src="assets/${cat.icon}" alt="${cat.label}" loading="lazy">
            <span>${cat.label}</span>
        `;
        bar.appendChild(btn);
    });
}

// =========================================================
// RENDER PRODUCTS (with Pagination)
// =========================================================

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let currentCategory = 'all';

function renderProducts(products, page = 1) {
    const grid = document.getElementById('productGrid');
    const count = document.getElementById('productCount');
    const pagination = document.getElementById('paginationContainer');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (!products || products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <i class="fa-solid fa-search" style="font-size:3rem; color:rgba(168,117,37,0.3);"></i>
                <h3 style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; color:#173c35; margin-top:15px;">
                    No products found
                </h3>
                <p style="color:#6c665b;">Try adjusting your search or filter.</p>
            </div>
        `;
        count.textContent = '0 Products';
        pagination.innerHTML = '';
        return;
    }
    
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageProducts = products.slice(start, end);
    
    const wishlist = getWishlist();
    
    pageProducts.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.image = product.image;
        card.dataset.description = product.description;
        
        const isWishlist = wishlist.includes(product.id);
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onerror="this.src='assets/placeholder.jpg'">
                <button class="wishlist-btn ${isWishlist ? 'active' : ''}" 
                        aria-label="${isWishlist ? 'Remove from' : 'Add to'} wishlist">
                    <i class="${isWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h4>${product.name}</h4>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-top:6px;">
                    <strong>${formatPrice(product.price)}</strong>
                    <span class="product-rating" style="font-size:0.6rem; color:#f1c40f; display:none;"></span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    count.textContent = `${products.length} Products`;
    renderPagination(totalPages, page);
    attachProductEvents();
}

function renderPagination(totalPages, current) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button ${current === 1 ? 'disabled' : ''} onclick="changePage(${current - 1})">
                <i class="fa-solid fa-chevron-left"></i>
            </button>`;
    
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(totalPages, current + 2);
    
    if (startPage > 1) {
        html += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) html += `<button disabled>...</button>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="${i === current ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<button disabled>...</button>`;
        html += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    html += `<button ${current === totalPages ? 'disabled' : ''} onclick="changePage(${current + 1})">
                <i class="fa-solid fa-chevron-right"></i>
            </button>`;
    
    container.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    applyFilters();
}

// =========================================================
// ATTACH PRODUCT EVENTS
// =========================================================

function attachProductEvents() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.wishlist-btn')) return;
            openProductModalWithReviews(this.dataset.id);
        });
    });
    
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            if (!card) return;
            toggleWishlist(card.dataset.id);
        });
    });
}

// =========================================================
// FILTER & SEARCH
// =========================================================

function applyFilters() {
    const category = currentCategory;
    const searchTerm = document.getElementById('searchInput')?.value?.trim().toLowerCase() || '';
    
    let products = getProducts();
    
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    if (searchTerm) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    const info = CATEGORY_INFO[category] || CATEGORY_INFO.all;
    document.getElementById('productHeading').textContent = info.title;
    document.getElementById('productSubheading').textContent = info.subtitle;
    
    renderProducts(products, currentPage);
}

function filterProducts(category) {
    currentCategory = category;
    currentPage = 1;
    applyFilters();
}

// =========================================================
// WISHLIST - FIXED
// =========================================================

function toggleWishlist(id) {
    let wishlist = getWishlist();
    const products = getProducts();
    const productExists = products.some(p => p.id === id);
    
    if (!productExists) {
        showToast('❌ Product not found!', 'error');
        return;
    }
    
    const index = wishlist.indexOf(id);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from Wishlist 💔', 'error');
    } else {
        wishlist.push(id);
        showToast('Added to Wishlist ❤️', 'success');
    }
    
    saveWishlist(wishlist);
    updateWishlistUI();
    updateDropdownCounts();
}

function updateWishlistUI() {
    const wishlist = getWishlist();
    const products = getProducts();
    
    // Count only products that actually exist
    const validWishlist = wishlist.filter(id => products.some(p => p.id === id));
    const count = validWishlist.length;
    
    // Update wishlist buttons on product cards
    document.querySelectorAll('.product-card .wishlist-btn').forEach(btn => {
        const card = btn.closest('.product-card');
        if (!card) return;
        const id = card.dataset.id;
        const active = validWishlist.includes(id);
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
        }
    });
    
    // Update all counters with actual count
    const mobileWishlistCount = document.getElementById('mobileWishlistCount');
    const drawerWishlistCount = document.getElementById('drawerWishlistCount');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const dropdownWishlistCount = document.getElementById('dropdownWishlistCount');
    
    if (mobileWishlistCount) mobileWishlistCount.textContent = count;
    if (drawerWishlistCount) drawerWishlistCount.textContent = count;
    if (wishlistBadge) wishlistBadge.textContent = count;
    if (dropdownWishlistCount) dropdownWishlistCount.textContent = count;
    
    renderWishlistDrawer();
}

function renderWishlistDrawer() {
    const container = document.getElementById('wishlistItems');
    const empty = document.getElementById('emptyWishlist');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    const wishlist = getWishlist();
    const products = getProducts();
    const validItems = wishlist.filter(id => products.some(p => p.id === id));
    
    if (validItems.length === 0) {
        if (empty) empty.style.display = 'flex';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    validItems.forEach(id => {
        const product = getProduct(id);
        if (!product) return;
        
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="wishlist-item-info">
                <h4>${product.name}</h4>
                <strong>${formatPrice(product.price)}</strong>
            </div>
            <div class="wishlist-item-actions">
                <button class="wishlist-remove-btn" data-remove-wishlist="${product.id}" aria-label="Remove from wishlist">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="wishlist-cart-btn" data-wishlist-cart="${product.id}">
                    ADD TO CART
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

// =========================================================
// WISHLIST EVENT DELEGATION - FIXED (Size product bug)
// =========================================================

document.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('[data-remove-wishlist]');
    if (removeBtn) {
        const id = removeBtn.dataset.removeWishlist;
        toggleWishlist(id);
        return;
    }
    
    const addBtn = e.target.closest('[data-wishlist-cart]');
    if (addBtn) {
        const id = addBtn.dataset.wishlistCart;
        const product = getProduct(id);
        if (!product) return;
        
        // For size products, open modal first, don't remove from wishlist yet
        if (needsSize(product)) {
            // Store that this came from wishlist
            window._addingFromWishlist = true;
            setTimeout(() => openProductModalWithReviews(id), 300);
            return;
        }
        
        // For non-size products, add to cart then remove from wishlist
        addToCart(id, 1, null);
        toggleWishlist(id);
        openBag('cart');
    }
});

// =========================================================
// CART - FIXED
// =========================================================

function addToCart(id, quantity = 1, size = null) {
    const product = getProduct(id);
    if (!product) {
        showToast('Product not found!', 'error');
        return;
    }
    
    if (needsSize(product) && !size) {
        openProductModalWithReviews(id);
        return;
    }
    
    let cart = getCart();
    const existing = cart.find(item => item.id === id && item.size === size);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, quantity, size });
    }
    
    saveCart(cart);
    
    // If this was from wishlist, remove from wishlist after successful add
    if (window._addingFromWishlist) {
        window._addingFromWishlist = false;
        const wishlist = getWishlist();
        if (wishlist.includes(id)) {
            const newWishlist = wishlist.filter(wid => wid !== id);
            saveWishlist(newWishlist);
            updateWishlistUI();
            updateDropdownCounts();
        }
    }
    
    // Force update UI
    updateCartUI();
    renderCartDrawer();
    
    showToast(`Added ${product.name} to Cart 🛍️`, 'success');
}

function removeFromCart(id, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart(cart);
    updateCartUI();
}

function changeCartQuantity(id, size, change) {
    let cart = getCart();
    const item = cart.find(item => item.id === id && item.size === size);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id, size);
        return;
    }
    if (item.quantity > 20) item.quantity = 20;
    
    saveCart(cart);
    updateCartUI();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProduct(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// =========================================================
// RENDER CART - FIXED
// =========================================================

function renderCartDrawer() {
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('emptyCart');
    const summary = document.getElementById('cartSummary');
    
    if (!container) {
        console.warn('⚠️ cartItems container not found!');
        return;
    }
    
    const cart = getCart();
    console.log('🛒 Rendering cart. Items:', cart.length);
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        if (empty) empty.style.display = 'flex';
        if (summary) summary.style.display = 'none';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (summary) summary.style.display = 'block';
    
    cart.forEach(item => {
        const product = getProduct(item.id);
        if (!product) {
            console.warn('⚠️ Product not found for ID:', item.id);
            return;
        }
        
        const element = document.createElement('div');
        element.className = 'bag-item';
        element.innerHTML = `
            <div class="bag-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="bag-item-info">
                <span>${getCategoryName(product.category)}</span>
                <h4>${product.name}</h4>
                ${item.size ? `<small>Size: ${item.size}</small>` : ''}
            </div>
            <strong class="bag-item-price">${formatPrice(product.price * item.quantity)}</strong>
            <div class="bag-item-actions">
                <div class="mini-quantity">
                    <button data-cart-minus data-id="${item.id}" data-size="${item.size || ''}">−</button>
                    <span>${item.quantity}</span>
                    <button data-cart-plus data-id="${item.id}" data-size="${item.size || ''}">+</button>
                </div>
                <button class="remove-item" data-cart-remove data-id="${item.id}" data-size="${item.size || ''}" aria-label="Remove item">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(element);
    });
}

function updateCartUI() {
    const count = getCartCount();
    const total = getCartTotal();
    
    console.log('🔄 Updating Cart UI. Count:', count, 'Total:', total);
    
    // Update all cart counters
    const bagCount = document.getElementById('bagCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const drawerCartCount = document.getElementById('drawerCartCount');
    const cartTotal = document.getElementById('cartTotal');
    const orderTotal = document.getElementById('orderTotal');
    
    if (bagCount) bagCount.textContent = count;
    if (mobileCartCount) mobileCartCount.textContent = count;
    if (drawerCartCount) drawerCartCount.textContent = count;
    if (cartTotal) cartTotal.textContent = formatPrice(total);
    if (orderTotal) orderTotal.textContent = formatPrice(total);
    
    // Re-render cart drawer
    renderCartDrawer();
}

// =========================================================
// CART EVENTS
// =========================================================

document.addEventListener('click', function(e) {
    const plus = e.target.closest('[data-cart-plus]');
    if (plus) {
        changeCartQuantity(plus.dataset.id, plus.dataset.size || null, 1);
        return;
    }
    
    const minus = e.target.closest('[data-cart-minus]');
    if (minus) {
        changeCartQuantity(minus.dataset.id, minus.dataset.size || null, -1);
        return;
    }
    
    const remove = e.target.closest('[data-cart-remove]');
    if (remove) {
        removeFromCart(remove.dataset.id, remove.dataset.size || null);
    }
});

// =========================================================
// PRODUCT MODAL
// =========================================================

const modalElements = {
    overlay: document.getElementById('productModal'),
    close: document.getElementById('modalClose'),
    image: document.getElementById('modalProductImage'),
    category: document.getElementById('modalProductCategory'),
    name: document.getElementById('modalProductName'),
    price: document.getElementById('modalProductPrice'),
    description: document.getElementById('modalProductDescription'),
    wishlistBtn: document.getElementById('modalWishlistBtn'),
    qty: document.getElementById('modalQty'),
    qtyMinus: document.getElementById('modalQtyMinus'),
    qtyPlus: document.getElementById('modalQtyPlus'),
    addCart: document.getElementById('modalAddCart'),
    sizeSection: document.getElementById('modalSizeSection'),
    selectedSizeText: document.getElementById('selectedSizeText')
};

let currentProductId = null;
let currentQuantity = 1;
let selectedSize = null;

function openProductModal(id) {
    const product = getProduct(id);
    if (!product) return;
    
    currentProductId = id;
    currentQuantity = 1;
    selectedSize = null;
    
    modalElements.image.src = product.image;
    modalElements.image.alt = product.name;
    modalElements.category.textContent = getCategoryName(product.category);
    modalElements.name.textContent = product.name;
    modalElements.price.textContent = formatPrice(product.price);
    modalElements.description.textContent = product.description;
    modalElements.qty.textContent = currentQuantity;
    
    const showSize = needsSize(product);
    modalElements.sizeSection.style.display = showSize ? 'block' : 'none';
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    modalElements.selectedSizeText.textContent = showSize ? 'Select a size' : 'Not applicable';
    modalElements.selectedSizeText.style.color = '#8b806e';
    
    updateModalWishlistState(id);
    
    modalElements.overlay.classList.add('active');
    modalElements.overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProductModal() {
    modalElements.overlay.classList.remove('active');
    modalElements.overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

modalElements.close?.addEventListener('click', closeProductModal);
modalElements.overlay?.addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

function updateModalWishlistState(id) {
    const wishlist = getWishlist();
    const active = wishlist.includes(id);
    modalElements.wishlistBtn.classList.toggle('active', active);
    const icon = modalElements.wishlistBtn.querySelector('i');
    icon.className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
}

modalElements.wishlistBtn?.addEventListener('click', function() {
    if (!currentProductId) return;
    toggleWishlist(currentProductId);
});

// =========================================================
// SIZE SELECTION
// =========================================================

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSize = this.dataset.size;
        modalElements.selectedSizeText.textContent = `Selected: ${selectedSize}`;
        modalElements.selectedSizeText.style.color = '#2e7d32';
    });
});

// =========================================================
// MODAL QUANTITY
// =========================================================

modalElements.qtyMinus?.addEventListener('click', function() {
    if (currentQuantity > 1) {
        currentQuantity--;
        modalElements.qty.textContent = currentQuantity;
    }
});

modalElements.qtyPlus?.addEventListener('click', function() {
    if (currentQuantity < 20) {
        currentQuantity++;
        modalElements.qty.textContent = currentQuantity;
    }
});

// =========================================================
// ADD TO CART FROM MODAL
// =========================================================

modalElements.addCart?.addEventListener('click', function() {
    if (!currentProductId) return;
    const product = getProduct(currentProductId);
    if (!product) return;
    
    if (needsSize(product) && !selectedSize) {
        modalElements.selectedSizeText.textContent = 'Please select a size';
        modalElements.selectedSizeText.style.color = '#c62828';
        return;
    }
    
    addToCart(currentProductId, currentQuantity, selectedSize);
    closeProductModal();
    openBag('cart');
});

// =========================================================
// BAG DRAWER
// =========================================================

const bagDrawer = document.getElementById('bagDrawer');
const bagOverlay = document.getElementById('bagOverlay');
const bagBtn = document.getElementById('bagBtn');
const bagClose = document.getElementById('bagClose');

function openBag(view = 'cart') {
    bagDrawer?.classList.add('active');
    bagOverlay?.classList.add('active');
    document.body.classList.add('modal-open');
    switchBagView(view);
}

function closeBag() {
    bagDrawer?.classList.remove('active');
    bagOverlay?.classList.remove('active');
    document.body.classList.remove('modal-open');
}

bagBtn?.addEventListener('click', () => openBag('cart'));
bagClose?.addEventListener('click', closeBag);
bagOverlay?.addEventListener('click', closeBag);

// =========================================================
// BAG TABS
// =========================================================

const bagTabs = document.querySelectorAll('.bag-tab');
const cartView = document.getElementById('cartView');
const wishlistView = document.getElementById('wishlistView');

function switchBagView(view) {
    bagTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.bagView === view);
    });
    if (cartView) cartView.classList.toggle('active', view === 'cart');
    if (wishlistView) wishlistView.classList.toggle('active', view === 'wishlist');
}

bagTabs.forEach(tab => {
    tab.addEventListener('click', () => switchBagView(tab.dataset.bagView));
});

// =========================================================
// MOBILE BAG / WISHLIST
// =========================================================

document.getElementById('mobileCartBtn')?.addEventListener('click', () => openBag('cart'));
document.getElementById('mobileWishlistBtn')?.addEventListener('click', () => openBag('wishlist'));

document.getElementById('continueShopping')?.addEventListener('click', () => {
    closeBag();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('continueWishlistShopping')?.addEventListener('click', () => {
    closeBag();
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
});

// =========================================================
// SEARCH MODAL
// =========================================================

const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchEmpty = document.getElementById('searchEmpty');

function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('active');
    document.body.classList.add('modal-open');
    setTimeout(() => searchInput?.focus(), 100);
    if (searchResults) searchResults.innerHTML = '';
    if (searchEmpty) searchEmpty.style.display = 'block';
    if (searchInput) searchInput.value = '';
}

function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

document.getElementById('searchBtn')?.addEventListener('click', openSearchModal);
document.getElementById('mobileSearchBtn')?.addEventListener('click', () => {
    closeMobileMenu();
    openSearchModal();
});

searchClose?.addEventListener('click', closeSearchModal);
searchModal?.addEventListener('click', function(e) {
    if (e.target === this) closeSearchModal();
});

searchInput?.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (!query) {
        if (searchEmpty) searchEmpty.style.display = 'block';
        return;
    }
    
    if (searchEmpty) searchEmpty.style.display = 'none';
    
    const products = getProducts();
    const results = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-empty">
                <i class="fa-solid fa-search"></i>
                <p>No products found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    results.forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
            <div class="search-result-info">
                <strong>${product.name}</strong>
                <span>${formatPrice(product.price)} • ${getCategoryName(product.category)}</span>
            </div>
        `;
        item.addEventListener('click', () => {
            closeSearchModal();
            openProductModalWithReviews(product.id);
        });
        searchResults.appendChild(item);
    });
});

// =========================================================
// ACCOUNT MODAL - REMOVED (Using dropdown instead)
// =========================================================

// Account button now only handles dropdown (no separate modal)
// The old account modal is disabled to avoid conflicts

// =========================================================
// CHECKOUT / ORDER - FIXED
// =========================================================

const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const orderClose = document.getElementById('orderClose');
const orderForm = document.getElementById('orderForm');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const orderSuccessClose = document.getElementById('orderSuccessClose');
const successMessage = document.getElementById('successMessage');
const successDetails = document.getElementById('successDetails');

function openOrderModal() {
    if (getCartCount() === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    if (!orderModal) return;
    orderModal.classList.add('active');
    document.body.classList.add('modal-open');
    document.getElementById('orderTotal').textContent = formatPrice(getCartTotal());
    
    // Reset transaction ID fields
    const bkashTrx = document.getElementById('bkashTrxId');
    const nagadTrx = document.getElementById('nagadTrxId');
    if (bkashTrx) { bkashTrx.value = ''; bkashTrx.style.borderColor = ''; bkashTrx.style.background = ''; }
    if (nagadTrx) { nagadTrx.value = ''; nagadTrx.style.borderColor = ''; nagadTrx.style.background = ''; }
}

function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

checkoutBtn?.addEventListener('click', openOrderModal);
orderClose?.addEventListener('click', closeOrderModal);
orderModal?.addEventListener('click', function(e) {
    if (e.target === this) closeOrderModal();
});

orderForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();
    const address = document.getElementById('customerAddress')?.value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    // Validate basic info
    if (!name) {
        showToast('❌ Please enter your name', 'error');
        document.getElementById('customerName')?.focus();
        return;
    }
    if (!phone || phone.length < 11) {
        showToast('❌ Please enter a valid phone number (11 digits)', 'error');
        document.getElementById('customerPhone')?.focus();
        return;
    }
    if (!address || address.length < 5) {
        showToast('❌ Please enter your full delivery address', 'error');
        document.getElementById('customerAddress')?.focus();
        return;
    }
    if (!paymentMethod) {
        showToast('❌ Please select a payment method', 'error');
        return;
    }
    
    const cart = getCart();
    if (cart.length === 0) {
        showToast('❌ Your cart is empty!', 'error');
        return;
    }
    
    // ===== TRANSACTION ID VALIDATION =====
    let trxId = null;
    
    if (paymentMethod === 'bkash') {
        trxId = document.getElementById('bkashTrxId')?.value.trim();
        if (!trxId) {
            showToast('❌ Please enter your bKash transaction ID', 'error');
            document.getElementById('bkashTrxId')?.focus();
            document.getElementById('bkashTrxId').style.borderColor = '#e74c3c';
            document.getElementById('bkashTrxId').style.background = 'rgba(231,76,60,0.05)';
            return;
        }
        if (trxId.length < 5) {
            showToast('❌ Please enter a valid bKash transaction ID (min 5 characters)', 'error');
            document.getElementById('bkashTrxId')?.focus();
            return;
        }
        document.getElementById('bkashTrxId').style.borderColor = '';
        document.getElementById('bkashTrxId').style.background = '';
        
    } else if (paymentMethod === 'nagad') {
        trxId = document.getElementById('nagadTrxId')?.value.trim();
        if (!trxId) {
            showToast('❌ Please enter your Nagad transaction ID', 'error');
            document.getElementById('nagadTrxId')?.focus();
            document.getElementById('nagadTrxId').style.borderColor = '#e74c3c';
            document.getElementById('nagadTrxId').style.background = 'rgba(231,76,60,0.05)';
            return;
        }
        if (trxId.length < 5) {
            showToast('❌ Please enter a valid Nagad transaction ID (min 5 characters)', 'error');
            document.getElementById('nagadTrxId')?.focus();
            return;
        }
        document.getElementById('nagadTrxId').style.borderColor = '';
        document.getElementById('nagadTrxId').style.background = '';
    }
    
    // Prepare order
    const orderItems = cart.map(item => {
        const product = getProduct(item.id);
        return {
            name: product ? product.name : 'Unknown',
            quantity: item.quantity,
            price: product ? product.price : 0,
            size: item.size || null
        };
    });
    
    // ===== PAYMENT STATUS - FIXED (Demo mode) =====
    // In real app, this would be verified with payment gateway
    const isPaid = paymentMethod !== 'cod' && trxId !== null;
    
    const orderData = {
        id: 'ORD-' + String(Date.now()).slice(-6),
        customer: name,
        phone: phone,
        address: address,
        items: orderItems,
        total: getCartTotal(),
        paymentMethod: paymentMethod,
        paymentStatus: isPaid ? 'paid' : 'pending',
        status: isPaid ? 'processing' : 'pending',
        date: new Date().toISOString(),
        trxId: trxId || null,
        // For demo: mark as "pending_verification" if bKash/Nagad
        verificationStatus: paymentMethod !== 'cod' ? 'pending_verification' : 'not_applicable'
    };
    
    // Save order
    const orders = getOrders();
    orders.push(orderData);
    saveOrders(orders);
    
    // Clear cart
    saveCart([]);
    updateCartUI();
    
    // Show success
    showOrderSuccess(orderData);
    
    // Reset form
    this.reset();
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        if (radio.value === 'cod') radio.checked = true;
    });
    const bkashTrx = document.getElementById('bkashTrxId');
    const nagadTrx = document.getElementById('nagadTrxId');
    if (bkashTrx) { bkashTrx.value = ''; bkashTrx.style.borderColor = ''; bkashTrx.style.background = ''; }
    if (nagadTrx) { nagadTrx.value = ''; nagadTrx.style.borderColor = ''; nagadTrx.style.background = ''; }
    
    closeOrderModal();
    closeBag();
    
    if (window.updateBadges) window.updateBadges();
    if (window.updateNavbarAuth) window.updateNavbarAuth();
    
    const paymentLabel = { 'cod': 'Cash on Delivery', 'bkash': 'bKash', 'nagad': 'Nagad' };
    showToast(`✅ Order placed successfully! (${paymentLabel[paymentMethod]})`, 'success');
});

// Transaction ID input cleanup
document.getElementById('bkashTrxId')?.addEventListener('input', function() {
    this.style.borderColor = '';
    this.style.background = '';
});
document.getElementById('nagadTrxId')?.addEventListener('input', function() {
    this.style.borderColor = '';
    this.style.background = '';
});

function showOrderSuccess(order) {
    const modal = document.getElementById('orderSuccessModal');
    const message = document.getElementById('successMessage');
    const details = document.getElementById('successDetails');
    
    if (!modal) return;
    
    const paymentLabels = {
        'cod': 'Cash on Delivery',
        'bkash': 'bKash',
        'nagad': 'Nagad'
    };
    
    let summary = `<strong>Order #${order.id}</strong><br><br>`;
    summary += `<strong>📦 Items:</strong><br>`;
    order.items.forEach(item => {
        const sizeText = item.size ? ` (Size: ${item.size})` : '';
        summary += `• ${item.name}${sizeText} × ${item.quantity} = ৳${(item.price * item.quantity).toLocaleString()}<br>`;
    });
    summary += `<br><strong>💰 Total:</strong> ৳${order.total.toLocaleString()}`;
    summary += `<br><strong>💳 Payment:</strong> ${paymentLabels[order.paymentMethod] || order.paymentMethod}`;
    
    if (order.paymentMethod === 'cod') {
        summary += `<br><strong>📌 Status:</strong> ⏳ Awaiting delivery (Pay on Delivery)`;
    } else if (order.trxId) {
        summary += `<br><strong>📌 Status:</strong> ⏳ Payment verification pending (Transaction ID: ${order.trxId})`;
        summary += `<br><span style="color:#f39c12; font-weight:600;">⏳ We'll verify your payment and confirm soon.</span>`;
    } else {
        summary += `<br><strong>📌 Status:</strong> ⏳ Pending payment`;
    }
    
    summary += `<br><br><strong>📬 Delivery Details:</strong><br>`;
    summary += `👤 ${order.customer}<br>`;
    summary += `📱 ${order.phone}<br>`;
    summary += `🏠 ${order.address}`;
    
    summary += `<br><br><span style="color:#2980b9; font-weight:600;">
        📞 We'll contact you to confirm the order.
    </span>`;
    
    if (message) {
        message.textContent = `Thank you, ${order.customer}! Your order has been placed successfully.`;
    }
    
    if (details) {
        details.innerHTML = summary;
    }
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeOrderSuccess() {
    if (!orderSuccessModal) return;
    orderSuccessModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    closeBag();
}

orderSuccessClose?.addEventListener('click', closeOrderSuccess);
orderSuccessModal?.addEventListener('click', function(e) {
    if (e.target === this) closeOrderSuccess();
});

// =========================================================
// PAYMENT SYSTEM
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const method = this.value;
            
            document.getElementById('codInstructions').style.display = 'none';
            document.getElementById('bkashInstructions').style.display = 'none';
            document.getElementById('nagadInstructions').style.display = 'none';
            
            if (method === 'cod') {
                document.getElementById('codInstructions').style.display = 'block';
            } else if (method === 'bkash') {
                document.getElementById('bkashInstructions').style.display = 'block';
                document.getElementById('bkashAmount').textContent = formatPrice(getCartTotal());
            } else if (method === 'nagad') {
                document.getElementById('nagadInstructions').style.display = 'block';
                document.getElementById('nagadAmount').textContent = formatPrice(getCartTotal());
            }
            
            document.querySelectorAll('#paymentCod, #paymentBkash, #paymentNagad').forEach(el => {
                el.style.borderColor = 'rgba(168,117,37,0.15)';
                el.style.background = 'rgba(168,117,37,0.03)';
            });
            
            const selected = document.getElementById(`payment${method.charAt(0).toUpperCase() + method.slice(1)}`);
            if (selected) {
                selected.style.borderColor = 'var(--gold)';
                selected.style.background = 'rgba(168,117,37,0.08)';
            }
        });
    });
    
    const defaultRadio = document.querySelector('input[name="paymentMethod"]:checked');
    if (defaultRadio) defaultRadio.dispatchEvent(new Event('change'));
});

// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
}

menuBtn?.addEventListener('click', function() {
    const isOpen = navLinks?.classList.toggle('active');
    if (mobileOverlay) mobileOverlay.classList.toggle('active', isOpen);
    this.setAttribute('aria-expanded', isOpen);
    const icon = this.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
    }
});

mobileOverlay?.addEventListener('click', closeMobileMenu);

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// =========================================================
// NAVBAR SCROLL
// =========================================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
}, { passive: true });

// =========================================================
// HERO PARALLAX
// =========================================================

const heroImage = document.getElementById('heroImage');
const hero = document.querySelector('.hero');

if (hero && heroImage && window.innerWidth > 768) {
    hero.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const moveX = (x - 0.5) * 6;
        const moveY = (y - 0.5) * 4;
        heroImage.style.transform = `scale(1.035) translate(${moveX}px, ${moveY}px)`;
    });
    
    hero.addEventListener('mouseleave', function() {
        heroImage.style.transform = 'scale(1.035) translate(0, 0)';
    });
}

// =========================================================
// REVIEW SLIDER
// =========================================================

let currentReview = 0;
let reviewInterval;

function renderReviews() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.getElementById('reviewDots');
    if (!track) return;
    
    const reviews = DEFAULT_REVIEWS;
    
    track.innerHTML = '';
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-avatar">
                <img src="${review.image}" alt="${review.name}" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="review-content">
                <div class="review-top">
                    <div class="stars">★★★★★</div>
                    <span class="quote-mark">“</span>
                </div>
                <p>${review.text}</p>
                <strong>— ${review.name}</strong>
                <span class="review-product">
                    <i class="fa-regular fa-gem"></i> ${review.product}
                </span>
            </div>
        `;
        track.appendChild(card);
    });
    
    if (dots) {
        dots.innerHTML = '';
        reviews.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'review-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Review ${i + 1}`);
            dot.addEventListener('click', () => goToReview(i));
            dots.appendChild(dot);
        });
    }
    
    updateReviewSlider();
    startReviewAutoPlay();
}

function updateReviewSlider() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.querySelectorAll('.review-dot');
    if (!track) return;
    
    const width = 100;
    track.style.transform = `translateX(-${currentReview * width}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentReview);
    });
}

function goToReview(index) {
    stopReviewAutoPlay();
    currentReview = index;
    updateReviewSlider();
    startReviewAutoPlay();
}

function nextReview() {
    const total = DEFAULT_REVIEWS.length;
    currentReview = (currentReview + 1) % total;
    updateReviewSlider();
}

function startReviewAutoPlay() {
    stopReviewAutoPlay();
    reviewInterval = setInterval(nextReview, 4000);
}

function stopReviewAutoPlay() {
    if (reviewInterval) {
        clearInterval(reviewInterval);
        reviewInterval = null;
    }
}

document.getElementById('reviewPrev')?.addEventListener('click', function() {
    stopReviewAutoPlay();
    const total = DEFAULT_REVIEWS.length;
    currentReview = (currentReview - 1 + total) % total;
    updateReviewSlider();
    startReviewAutoPlay();
});

document.getElementById('reviewNext')?.addEventListener('click', function() {
    stopReviewAutoPlay();
    nextReview();
    startReviewAutoPlay();
});

// =========================================================
// REVIEW SYSTEM - FIXED (Login bug fixed)
// =========================================================

let selectedRating = 0;
let currentReviewProductId = null;
let currentReviewProductName = '';

function setRating(rating) {
    selectedRating = rating;
    
    document.querySelectorAll('.review-star').forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        star.style.color = starRating <= rating ? '#f1c40f' : '#d4c5b5';
    });
    
    const display = document.getElementById('ratingDisplay');
    if (display) {
        display.textContent = rating + ' / 5 stars';
        display.style.color = '#173c35';
        display.style.fontWeight = '600';
    }
}

function submitReview() {
    if (!currentReviewProductId) {
        showToast('❌ Product not found!', 'error');
        return;
    }
    
    const user = getCurrentUser();
    if (!user) {
        updateReviewLoginState(false);
        showToast('🔐 Please login to leave a review', 'error');
        return;
    }
    
    if (selectedRating === 0) {
        showToast('⭐ Please select a rating (1-5 stars)', 'error');
        return;
    }
    
    const commentInput = document.getElementById('reviewComment');
    if (!commentInput) return;
    
    const comment = commentInput.value.trim();
    if (!comment || comment.length < 3) {
        showToast('✏️ Please write at least 3 characters', 'error');
        return;
    }
    
    const reviews = getReviews();
    const existing = reviews.find(r => r.productId === currentReviewProductId && r.userId === user.id);
    
    if (existing) {
        if (!confirm('📝 You already reviewed this product. Update it?')) return;
        const index = reviews.indexOf(existing);
        reviews.splice(index, 1);
    }
    
    const product = getProduct(currentReviewProductId);
    const newReview = {
        id: 'rev_' + Date.now(),
        productId: currentReviewProductId,
        productName: product ? product.name : 'Unknown Product',
        userId: user.id,
        userName: user.name || 'Customer',
        rating: selectedRating,
        comment: comment,
        date: new Date().toISOString()
    };
    
    reviews.push(newReview);
    saveReviews(reviews);
    resetReviewForm();
    updateReviewLoginState(true);
    showToast('✅ Review submitted successfully!', 'success');
    loadProductReviews(currentReviewProductId);
    updateReviewUI();
}

function resetReviewForm() {
    selectedRating = 0;
    document.querySelectorAll('.review-star').forEach(star => {
        star.style.color = '#d4c5b5';
    });
    const display = document.getElementById('ratingDisplay');
    if (display) {
        display.textContent = 'Select rating';
        display.style.color = '#70695d';
        display.style.fontWeight = '400';
    }
    const comment = document.getElementById('reviewComment');
    if (comment) {
        comment.value = '';
        // Don't change disabled state here - handled by updateReviewLoginState
    }
}

function updateReviewLoginState(isLoggedIn) {
    const prompt = document.getElementById('reviewLoginPrompt');
    const comment = document.getElementById('reviewComment');
    const stars = document.querySelectorAll('.review-star');
    
    if (!isLoggedIn) {
        if (prompt) prompt.style.display = 'block';
        if (comment) comment.disabled = true;
        stars.forEach(star => star.style.cursor = 'not-allowed');
    } else {
        if (prompt) prompt.style.display = 'none';
        if (comment) comment.disabled = false;
        stars.forEach(star => star.style.cursor = 'pointer');
    }
}

function loadProductReviews(productId) {
    const container = document.getElementById('productReviewsContainer');
    if (!container) return;
    
    const reviews = getReviews();
    const productReviews = reviews.filter(r => r.productId === productId);
    const avgRating = getProductRating(productId);
    
    let html = '';
    
    if (productReviews.length > 0) {
        const fullStars = Math.round(avgRating);
        const emptyStars = 5 - fullStars;
        const stars = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
        html += `
            <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid rgba(168,117,37,0.08); margin-bottom:10px;">
                <span style="font-size:1.1rem; color:#f1c40f;">${stars}</span>
                <span style="font-size:0.7rem; color:#70695d;">${avgRating.toFixed(1)} / 5 (${productReviews.length} reviews)</span>
            </div>
        `;
    }
    
    if (productReviews.length === 0) {
        html += `
            <div style="text-align:center; padding:20px 0;">
                <i class="fa-regular fa-star" style="font-size:1.5rem; color:#d4c5b5;"></i>
                <p style="font-size:0.75rem; color:#b0a694; margin-top:8px;">No reviews yet. Be the first to review!</p>
            </div>
        `;
    } else {
        productReviews.slice().reverse().forEach(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const dateStr = new Date(review.date).toLocaleDateString('en-BD', { 
                day: '2-digit', month: 'short', year: 'numeric' 
            });
            html += `
                <div style="padding:10px 0; border-bottom:1px solid rgba(168,117,37,0.06);">
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <strong style="font-size:0.75rem; color:var(--green);">${review.userName}</strong>
                        <span style="color:#f1c40f; font-size:0.65rem;">${stars}</span>
                    </div>
                    <p style="font-size:0.7rem; color:#6c665b; margin:4px 0; line-height:1.6;">${review.comment}</p>
                    <small style="font-size:0.5rem; color:#b0a694;">${dateStr}</small>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

function getProductRating(productId) {
    const reviews = getReviews();
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / productReviews.length;
}

function updateReviewUI() {
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        if (id) {
            const rating = getProductRating(id);
            const ratingEl = card.querySelector('.product-rating');
            if (ratingEl) {
                if (rating > 0) {
                    ratingEl.innerHTML = `<span style="color:#f1c40f;">★</span> ${rating.toFixed(1)}`;
                    ratingEl.style.display = 'inline';
                } else {
                    ratingEl.innerHTML = '';
                    ratingEl.style.display = 'none';
                }
            }
        }
    });
}

function openProductModalWithReviews(productId) {
    if (typeof openProductModal === 'function') {
        openProductModal(productId);
    }
    
    currentReviewProductId = productId;
    const product = getProduct(productId);
    currentReviewProductName = product ? product.name : '';
    
    setTimeout(() => {
        loadProductReviews(productId);
        
        const user = getCurrentUser();
        updateReviewLoginState(!!user);
        resetReviewForm();
    }, 300);
}

window.submitReview = submitReview;
window.setRating = setRating;

// =========================================================
// NAVBAR ACCOUNT DROPDOWN - FIXED (No duplicate events)
// =========================================================

let dropdownOpen = false;

// Only one account button listener - dropdown only
document.getElementById('accountBtn')?.addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    if (!dropdown) return;
    
    dropdownOpen = !dropdownOpen;
    dropdown.style.display = dropdownOpen ? 'block' : 'none';
    dropdown.style.opacity = dropdownOpen ? '1' : '0';
    dropdown.style.transform = dropdownOpen ? 'translateY(0)' : 'translateY(-8px)';
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.account-dropdown-wrapper');
    if (!wrapper) return;
    if (!wrapper.contains(e.target)) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-8px)';
            dropdownOpen = false;
        }
    }
});

function updateNavbarAuth() {
    const user = getCurrentUser();
    const isLoggedIn = !!user;
    
    const loginBtn = document.getElementById('dropdownLoginBtn');
    const logoutBtn = document.getElementById('dropdownLogoutBtn');
    const userInfo = document.getElementById('dropdownUserInfo');
    const userName = document.getElementById('dropdownUserName');
    const userEmail = document.getElementById('dropdownUserEmail');
    const accountIcon = document.getElementById('accountIcon');
    const userBadge = document.getElementById('userBadge');
    const mobileAccountBtn = document.getElementById('mobileAccountBtn');
    const mobileAccountText = document.getElementById('mobileAccountText');
    
    if (isLoggedIn) {
        if (userInfo) userInfo.style.display = 'block';
        if (userName) userName.textContent = user.name || 'User';
        if (userEmail) userEmail.textContent = user.email || 'user@email.com';
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (accountIcon) {
            accountIcon.className = 'fa-regular fa-circle-user';
            accountIcon.style.color = 'var(--gold)';
        }
        if (userBadge) userBadge.style.display = 'block';
        if (mobileAccountText) mobileAccountText.textContent = 'Account';
        if (mobileAccountBtn) {
            mobileAccountBtn.innerHTML = `<i class="fa-regular fa-circle-user"></i><span>Account</span>`;
        }
        updateDropdownCounts();
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (accountIcon) {
            accountIcon.className = 'fa-regular fa-user';
            accountIcon.style.color = 'var(--green)';
        }
        if (userBadge) userBadge.style.display = 'none';
        if (mobileAccountText) mobileAccountText.textContent = 'Login';
        if (mobileAccountBtn) {
            mobileAccountBtn.innerHTML = `<i class="fa-regular fa-user"></i><span>Login</span>`;
        }
    }
}

function updateDropdownCounts() {
    const orders = getOrders();
    const user = getCurrentUser();
    
    if (user) {
        const userOrders = orders.filter(o => 
            o.customer === user.name || o.phone === user.phone || o.email === user.email
        );
        const orderCountEl = document.getElementById('dropdownOrderCount');
        if (orderCountEl) orderCountEl.textContent = userOrders.length;
    }
    
    // Wishlist count - Count only valid products
    const wishlist = getWishlist();
    const products = getProducts();
    const validCount = wishlist.filter(id => products.some(p => p.id === id)).length;
    
    const wishlistCountEl = document.getElementById('dropdownWishlistCount');
    if (wishlistCountEl) wishlistCountEl.textContent = validCount;
    
    const badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = validCount;
}

function logoutUser() {
    if (!confirm('Are you sure you want to logout?')) return;
    localStorage.removeItem('jhunjhurUser');
    updateNavbarAuth();
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-8px)';
        dropdownOpen = false;
    }
    showToast('👋 Logged out successfully!', 'success');
    if (window.location.pathname.includes('account.html')) {
        setTimeout(() => { window.location.href = 'index.html'; }, 500);
    }
}

// Mobile account button - only one listener (redirect only)
document.getElementById('mobileAccountBtn')?.addEventListener('click', function() {
    const user = getCurrentUser();
    if (user) {
        window.location.href = 'account.html';
    } else {
        window.location.href = 'login.html';
    }
});

window.updateNavbarAuth = updateNavbarAuth;
window.logoutUser = logoutUser;
window.updateDropdownCounts = updateDropdownCounts;

// =========================================================
// KEYBOARD SHORTCUTS
// =========================================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
        closeOrderModal();
        closeOrderSuccess();
        closeSearchModal();
        closeBag();
        closeMobileMenu();
        
        // Close dropdown
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-8px)';
            dropdownOpen = false;
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🪄 Jhunjhur Initializing...');
    
    renderCategories();
    
    const products = getProducts();
    console.log(`📦 ${products.length} products loaded`);
    
    applyFilters();
    renderReviews();
    updateCartUI();
    updateWishlistUI();
    updateReviewUI();
    
    // Update navbar auth state
    setTimeout(() => {
        updateNavbarAuth();
        updateDropdownCounts();
    }, 100);
    
    // ===== WISHLIST FIX - Clean up invalid items on load =====
    setTimeout(function() {
        const wishlist = getWishlist();
        const products = getProducts();
        const validWishlist = wishlist.filter(id => products.some(p => p.id === id));
        
        if (validWishlist.length !== wishlist.length) {
            console.log('🧹 Cleaning up invalid wishlist items...');
            saveWishlist(validWishlist);
            updateWishlistUI();
            updateDropdownCounts();
        }
    }, 300);
    
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.category);
        });
    });
    
    // Storage event listener for wishlist changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'jhunjhurWishlist' || e.key === 'jhunjhurProducts') {
            console.log('📡 Storage changed:', e.key);
            setTimeout(function() {
                updateWishlistUI();
                updateDropdownCounts();
            }, 100);
        }
        if (e.key === 'jhunjhurUser') {
            updateNavbarAuth();
        }
    });
    
    console.log('✨ Jhunjhur — Desi Jewellery & Accessories');
    console.log(`❤️ ${getWishlist().length} items in wishlist`);
    console.log(`🛒 ${getCartCount()} items in cart`);
});

// =========================================================
// EXPOSE FOR ADMIN PANEL
// =========================================================

window.getProducts = getProducts;
window.saveProducts = saveProducts;
window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
window.reloadProducts = function() {
    applyFilters();
};