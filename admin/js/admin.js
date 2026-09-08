/* =========================================================
   JHUNJHUR — Admin Panel JavaScript (LocalStorage Version)
   Location: admin/js/admin.js
   Created: September 2026
========================================================= */

// =========================================================
// ADMIN AUTHENTICATION
// =========================================================

// Check if admin is logged in
function checkAdminAuth() {
    const admin = localStorage.getItem('adminUser');
    if (!admin) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get current admin user
function getAdminUser() {
    const admin = localStorage.getItem('adminUser');
    return admin ? JSON.parse(admin) : null;
}

// Logout admin
function logoutAdmin() {
    if (!confirm('Are you sure you want to logout?')) return;
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// =========================================================
// TOAST NOTIFICATION
// =========================================================

function showToast(message, type = 'success') {
    // Remove existing toasts
    const existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 24px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        font-family: "Montserrat", sans-serif;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 400);
    }, 3000);
}

// =========================================================
// LOCALSTORAGE HELPERS
// =========================================================

function safeJSONParse(data, fallback = null) {
    if (!data) return fallback;
    try {
        return JSON.parse(data);
    } catch (e) {
        console.warn('⚠️ Invalid JSON:', e);
        return fallback;
    }
}

// =========================================================
// PRODUCTS DATA (Admin Side)
// =========================================================

// Default admin products (fallback)
const ADMIN_DEFAULT_PRODUCTS = [
    {
        id: 'bangles-1',
        name: 'Desi Churi Set',
        category: 'bangles',
        price: 450,
        stock: 12,
        image: '../assets/bangles1.jpg',
        description: 'দেশি সাজের জন্য সুন্দর traditional churi set.'
    },
    {
        id: 'bangles-2',
        name: 'Golden Churi Set',
        category: 'bangles',
        price: 480,
        stock: 8,
        image: '../assets/bangles2.jpg',
        description: 'Elegant golden churi set for festive and everyday desi looks.'
    },
    {
        id: 'bangles-3',
        name: 'Pearl Churi Set',
        category: 'bangles',
        price: 520,
        stock: 15,
        image: '../assets/bangles3.jpg',
        description: 'Soft pearl detailing with a classic desi finish.'
    },
    {
        id: 'bangles-4',
        name: 'Traditional Churi',
        category: 'bangles',
        price: 390,
        stock: 3,
        image: '../assets/bangles4.jpg',
        description: 'A classic traditional churi for a timeless desi look.'
    },
    {
        id: 'earrings-1',
        name: 'Golden Jhumka',
        category: 'earrings',
        price: 350,
        stock: 20,
        image: '../assets/earrings1.jpg',
        description: 'Classic golden jhumka with an elegant desi finish.'
    },
    {
        id: 'earrings-2',
        name: 'Pearl Drop Earrings',
        category: 'earrings',
        price: 420,
        stock: 6,
        image: '../assets/earrings2.jpg',
        description: 'Elegant pearl drop earrings for a soft feminine look.'
    },
    {
        id: 'earrings-3',
        name: 'Desi Floral Earrings',
        category: 'earrings',
        price: 380,
        stock: 10,
        image: '../assets/earrings3.jpg',
        description: 'Floral inspired earrings with a beautiful desi touch.'
    },
    {
        id: 'pendants-1',
        name: 'Classic Gold Pendant',
        category: 'pendants',
        price: 550,
        stock: 4,
        image: '../assets/pendants1.jpg',
        description: 'A minimal classic gold pendant for everyday elegance.'
    },
    {
        id: 'pendants-2',
        name: 'Floral Pendant',
        category: 'pendants',
        price: 620,
        stock: 7,
        image: '../assets/pendants2.jpg',
        description: 'A delicate floral pendant made for graceful styling.'
    },
    {
        id: 'rings-1',
        name: 'Floral Pearl Ring',
        category: 'rings',
        price: 450,
        stock: 9,
        image: '../assets/rings1.jpg',
        description: 'A floral pearl ring for a delicate everyday look.'
    },
    {
        id: 'rings-2',
        name: 'Classic Gold Ring',
        category: 'rings',
        price: 390,
        stock: 11,
        image: '../assets/rings2.jpg',
        description: 'A simple classic gold ring that goes with every look.'
    },
    {
        id: 'tikli-1',
        name: 'Antique Tikli',
        category: 'others',
        price: 350,
        stock: 5,
        image: '../assets/tikli1.jpg',
        description: 'Traditional antique-inspired tikli for a complete desi look.'
    },
    {
        id: 'tikli-2',
        name: 'Golden Floral Tikli',
        category: 'others',
        price: 320,
        stock: 14,
        image: '../assets/tikli2.jpg',
        description: 'Golden floral tikli with a delicate traditional touch.'
    },
    {
        id: 'hair-1',
        name: 'Floral Hair Clip',
        category: 'hair',
        price: 280,
        stock: 18,
        image: '../assets/hair1.jpg',
        description: 'A pretty floral hair clip for a soft desi hairstyle.'
    },
    {
        id: 'hair-2',
        name: 'Desi Hair Band',
        category: 'hair',
        price: 250,
        stock: 2,
        image: '../assets/hair2.jpg',
        description: 'A simple desi hair band for everyday styling.'
    }
];

// Get admin products from localStorage
function getAdminProducts() {
    const stored = localStorage.getItem('adminProducts');
    if (stored) {
        const parsed = safeJSONParse(stored, null);
        if (parsed) return parsed;
    }
    // Initialize with defaults if not exists
    localStorage.setItem('adminProducts', JSON.stringify(ADMIN_DEFAULT_PRODUCTS));
    return ADMIN_DEFAULT_PRODUCTS;
}

// Save admin products to localStorage
function saveAdminProducts(products) {
    localStorage.setItem('adminProducts', JSON.stringify(products));
}

// =========================================================
// ORDERS DATA (Admin Side)
// =========================================================

// Default admin orders (fallback)
const ADMIN_DEFAULT_ORDERS = [
    {
        id: 'ORD-001',
        customer: 'Sohana Islam',
        phone: '01712345678',
        address: 'Mirpur, Dhaka',
        items: [
            { name: 'Desi Churi Set', quantity: 1, price: 450 },
            { name: 'Golden Jhumka', quantity: 2, price: 350 }
        ],
        total: 1150,
        status: 'delivered',
        date: '2026-01-15T14:30:00'
    },
    {
        id: 'ORD-002',
        customer: 'Farhana Mim',
        phone: '01812345678',
        address: 'Banani, Dhaka',
        items: [
            { name: 'Pearl Churi Set', quantity: 1, price: 520 },
            { name: 'Antique Tikli', quantity: 1, price: 350 }
        ],
        total: 870,
        status: 'processing',
        date: '2026-01-16T11:15:00'
    },
    {
        id: 'ORD-003',
        customer: 'Nusrat Jahan',
        phone: '01912345678',
        address: 'Uttara, Dhaka',
        items: [
            { name: 'Floral Pendant', quantity: 1, price: 620 },
            { name: 'Classic Gold Ring', quantity: 1, price: 390 },
            { name: 'Desi Hair Band', quantity: 1, price: 250 }
        ],
        total: 1260,
        status: 'pending',
        date: '2026-01-14T18:45:00'
    }
];

// Get admin orders from localStorage
function getAdminOrders() {
    const stored = localStorage.getItem('adminOrders');
    if (stored) {
        const parsed = safeJSONParse(stored, null);
        if (parsed) return parsed;
    }
    // Initialize with defaults if not exists
    localStorage.setItem('adminOrders', JSON.stringify(ADMIN_DEFAULT_ORDERS));
    return ADMIN_DEFAULT_ORDERS;
}

// Save admin orders to localStorage
function saveAdminOrders(orders) {
    localStorage.setItem('adminOrders', JSON.stringify(orders));
}

// =========================================================
// CUSTOMERS DATA (Derived from Orders)
// =========================================================

function getAdminCustomers() {
    const orders = getAdminOrders();
    const customerMap = new Map();
    
    orders.forEach(order => {
        if (!customerMap.has(order.phone)) {
            customerMap.set(order.phone, {
                name: order.customer,
                phone: order.phone,
                email: order.email || '',
                orders: [],
                totalSpent: 0,
                lastOrder: order.date
            });
        }
        
        const customer = customerMap.get(order.phone);
        customer.orders.push(order.id);
        customer.totalSpent += order.total;
        
        if (new Date(order.date) > new Date(customer.lastOrder)) {
            customer.lastOrder = order.date;
        }
    });
    
    return Array.from(customerMap.values());
}

// =========================================================
// PRODUCTS CRUD OPERATIONS
// =========================================================

// Load all products
function loadProducts() {
    const products = getAdminProducts();
    renderProductsTable(products);
    document.getElementById('productBadge').textContent = products.length;
}

// Render products table
function renderProductsTable(products) {
    const tbody = document.querySelector('#productsTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!products || products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#999;">No products found</td></tr>`;
        return;
    }
    
    products.forEach(product => {
        const stockStatus = product.stock > 10 ? 'in-stock' : (product.stock > 0 ? 'low-stock' : 'out-stock');
        const stockLabel = product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image || '../assets/placeholder.jpg'}" alt="${product.name}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;background:#eee2d0;"></td>
            <td><strong>${product.name}</strong></td>
            <td><span style="text-transform:uppercase; font-size:0.6rem; color:#a87525;">${product.category}</span></td>
            <td>৳${product.price.toLocaleString()}</td>
            <td><span class="stock-badge ${stockStatus}">${stockLabel} (${product.stock})</span></td>
            <td>
                <button class="btn-edit" onclick="editProduct('${product.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add new product
function addNewProduct() {
    const name = prompt('Product Name:');
    if (!name || !name.trim()) return;
    
    const category = prompt('Category (bangles/earrings/pendants/rings/others/hair):', 'bangles');
    if (!category || !category.trim()) return;
    
    const price = prompt('Price (৳):', '100');
    if (!price || isNaN(price) || Number(price) <= 0) return;
    
    const stock = prompt('Stock Quantity:', '10');
    if (!stock || isNaN(stock) || Number(stock) < 0) return;
    
    const image = prompt('Image URL:', '../assets/placeholder.jpg');
    if (!image || !image.trim()) return;
    
    const description = prompt('Description:', 'Beautiful desi jewellery.');
    
    const newProduct = {
        id: category + '-' + Date.now(),
        category: category.trim().toLowerCase(),
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        image: image.trim(),
        description: description || 'Beautiful desi jewellery.'
    };
    
    const products = getAdminProducts();
    products.push(newProduct);
    saveAdminProducts(products);
    loadProducts();
    showToast('✅ Product added successfully!', 'success');
}

// Edit product
function editProduct(id) {
    const products = getAdminProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
        showToast('❌ Product not found!', 'error');
        return;
    }
    
    const newName = prompt('Product Name:', product.name);
    if (newName !== null && newName.trim()) {
        product.name = newName.trim();
    }
    
    const newPrice = prompt('Product Price (৳):', product.price);
    if (newPrice !== null && !isNaN(newPrice) && Number(newPrice) > 0) {
        product.price = Number(newPrice);
    }
    
    const newStock = prompt('Stock Quantity:', product.stock);
    if (newStock !== null && !isNaN(newStock) && Number(newStock) >= 0) {
        product.stock = Number(newStock);
    }
    
    const newCategory = prompt('Category:', product.category);
    if (newCategory !== null && newCategory.trim()) {
        product.category = newCategory.trim().toLowerCase();
    }
    
    saveAdminProducts(products);
    loadProducts();
    showToast('✅ Product updated successfully!', 'success');
}

// Delete product
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    let products = getAdminProducts();
    products = products.filter(p => p.id !== id);
    saveAdminProducts(products);
    loadProducts();
    showToast('🗑️ Product deleted!', 'success');
}

// Filter products
function filterProducts() {
    const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const stock = document.getElementById('stockFilter')?.value || 'all';
    
    let products = getAdminProducts();
    
    if (search) {
        products = products.filter(p => p.name.toLowerCase().includes(search));
    }
    
    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }
    
    if (stock === 'in-stock') {
        products = products.filter(p => p.stock > 10);
    } else if (stock === 'low-stock') {
        products = products.filter(p => p.stock > 0 && p.stock <= 10);
    } else if (stock === 'out-stock') {
        products = products.filter(p => p.stock <= 0);
    }
    
    renderProductsTable(products);
}

// =========================================================
// ORDERS CRUD OPERATIONS
// =========================================================

// Load all orders
function loadOrders() {
    const orders = getAdminOrders();
    renderOrdersTable(orders);
    document.getElementById('orderBadge').textContent = orders.length;
}

// Render orders table
function renderOrdersTable(orders) {
    const tbody = document.getElementById('ordersBody');
    const empty = document.getElementById('emptyOrders');
    const count = document.getElementById('orderCount');
    
    if (!tbody) return;
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        if (count) count.textContent = '0 orders';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (count) count.textContent = `${orders.length} orders`;
    
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const date = new Date(order.date);
        const dateStr = date.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit' });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span style="font-weight:600; color:#a87525;">#${order.id}</span></td>
            <td><strong>${order.customer}</strong><br><small style="color:#999;">${order.phone}</small></td>
            <td>${order.items.length} items</td>
            <td>৳${order.total.toLocaleString()}</td>
            <td>
                <select class="status ${order.status}" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${dateStr}<br><small style="color:#999;">${timeStr}</small></td>
            <td>
                <button onclick="deleteOrder('${order.id}')" style="padding:5px 12px; background:rgba(231,76,60,0.12); color:#e74c3c; border-radius:4px; font-size:0.55rem; border:none; cursor:pointer; transition:all 0.25s;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Expandable rows
    orders.forEach(order => {
        const detailRow = document.createElement('tr');
        detailRow.className = 'order-detail-row';
        detailRow.id = `detail-${order.id}`;
        
        let itemsHtml = order.items.map(item => `
            <div style="display:flex; align-items:center; gap:12px; padding:8px 14px; background:white; border-radius:8px; border:1px solid #e8e0d6; margin-bottom:8px;">
                <div style="flex:1;">
                    <strong style="font-size:0.72rem;">${item.name}</strong>
                    <small style="font-size:0.6rem; color:#999; display:block;">× ${item.quantity}</small>
                </div>
                <span style="font-size:0.7rem; font-weight:600; color:#a87525;">৳${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');
        
        detailRow.innerHTML = `
            <td colspan="7" style="padding:20px 25px; background:rgba(247,238,225,0.4);">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:15px;">
                    <div>
                        <strong style="font-size:0.7rem; color:#999; text-transform:uppercase;">DELIVERY ADDRESS</strong>
                        <p style="font-size:0.85rem; margin-top:4px;">${order.address}</p>
                    </div>
                    <div>
                        <strong style="font-size:0.7rem; color:#999; text-transform:uppercase;">CONTACT</strong>
                        <p style="font-size:0.85rem; margin-top:4px;">${order.phone}</p>
                    </div>
                </div>
                <strong style="font-size:0.7rem; color:#999; text-transform:uppercase;">ORDER ITEMS</strong>
                <div style="margin-top:10px;">
                    ${itemsHtml}
                </div>
                <div style="margin-top:15px; padding-top:15px; border-top:1px solid #e8e0d6; display:flex; justify-content:space-between; font-weight:600; color:#173c35;">
                    <span>Total</span>
                    <span>৳${order.total.toLocaleString()}</span>
                </div>
            </td>
        `;
        tbody.appendChild(detailRow);
    });
    
    // Expandable click events
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.order;
            const detailRow = document.getElementById(`detail-${orderId}`);
            if (detailRow) {
                detailRow.classList.toggle('open');
                this.classList.toggle('rotated');
            }
        });
    });
    
    // Click on order ID to expand
    document.querySelectorAll('.order-id-link').forEach(el => {
        el.addEventListener('click', function() {
            const orderId = this.dataset.order;
            const btn = document.querySelector(`.expand-btn[data-order="${orderId}"]`);
            if (btn) btn.click();
        });
    });
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    let orders = getAdminOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveAdminOrders(orders);
        loadOrders();
        showToast(`✅ Order ${orderId} status updated to ${newStatus}`, 'success');
    }
}

// Delete order
function deleteOrder(orderId) {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    
    let orders = getAdminOrders();
    orders = orders.filter(o => o.id !== orderId);
    saveAdminOrders(orders);
    loadOrders();
    showToast('🗑️ Order deleted!', 'success');
}

// Filter orders
function filterOrders() {
    const search = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const status = document.getElementById('statusFilter')?.value || 'all';
    const dateRange = document.getElementById('dateFilter')?.value || 'all';
    
    let orders = getAdminOrders();
    
    if (search) {
        orders = orders.filter(o => 
            o.id.toLowerCase().includes(search) || 
            o.customer.toLowerCase().includes(search) ||
            o.phone.includes(search)
        );
    }
    
    if (status !== 'all') {
        orders = orders.filter(o => o.status === status);
    }
    
    if (dateRange !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        orders = orders.filter(o => {
            const orderDate = new Date(o.date);
            if (dateRange === 'today') {
                return orderDate >= today;
            } else if (dateRange === 'week') {
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                return orderDate >= weekAgo;
            } else if (dateRange === 'month') {
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return orderDate >= monthAgo;
            }
            return true;
        });
    }
    
    renderOrdersTable(orders);
}

// =========================================================
// CUSTOMERS
// =========================================================

function loadCustomers() {
    const customers = getAdminCustomers();
    renderCustomersTable(customers);
    document.getElementById('customerBadge').textContent = customers.length;
}

function renderCustomersTable(customers) {
    const tbody = document.getElementById('customersBody');
    const empty = document.getElementById('emptyCustomers');
    const count = document.getElementById('customerCount');
    
    if (!tbody) return;
    
    if (!customers || customers.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        if (count) count.textContent = '0 customers';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    if (count) count.textContent = `${customers.length} customers`;
    
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const lastOrder = new Date(customer.lastOrder);
        const dateStr = lastOrder.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:40px; height:40px; border-radius:50%; background:#a87525; color:white; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:0.8rem;">${initials}</div>
                    <div>
                        <div style="font-weight:600; color:#2d2a25;">${customer.name}</div>
                    </div>
                </div>
            </td>
            <td>${customer.phone}</td>
            <td>${customer.orders.length}</td>
            <td>৳${customer.totalSpent.toLocaleString()}</td>
            <td style="font-size:0.7rem;">${dateStr}</td>
            <td>
                <button onclick="viewCustomerOrders('${customer.phone}')" style="padding:4px 12px; background:#173c35; color:white; border-radius:4px; font-size:0.55rem; border:none; cursor:pointer; transition:all 0.25s;">
                    <i class="fa-solid fa-eye"></i> Orders
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// View customer orders
function viewCustomerOrders(phone) {
    const orders = getAdminOrders();
    const customerOrders = orders.filter(o => o.phone === phone);
    
    if (customerOrders.length === 0) {
        showToast('❌ No orders found for this customer!', 'error');
        return;
    }
    
    let msg = `📦 Orders for ${phone}:\n\n`;
    customerOrders.forEach(o => {
        msg += `#${o.id} — ${o.items.length} items — ৳${o.total.toLocaleString()} — ${o.status}\n`;
    });
    msg += `\nTotal: ${customerOrders.length} orders`;
    alert(msg);
}

// Filter customers
function filterCustomers() {
    const search = document.getElementById('customerSearch')?.value.toLowerCase() || '';
    let customers = getAdminCustomers();
    
    if (search) {
        customers = customers.filter(c => 
            c.name.toLowerCase().includes(search) || 
            c.phone.includes(search)
        );
    }
    
    renderCustomersTable(customers);
}

// =========================================================
// DASHBOARD STATS
// =========================================================

function loadDashboardStats() {
    const orders = getAdminOrders();
    const products = getAdminProducts();
    const customers = getAdminCustomers();
    
    // Calculate total revenue (delivered + processing orders)
    const totalRevenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);
    
    // Update stats cards
    const statOrders = document.querySelector('.stat-orders .stat-number');
    const statRevenue = document.querySelector('.stat-revenue .stat-number');
    const statCustomers = document.querySelector('.stat-customers .stat-number');
    const statProducts = document.querySelector('.stat-products .stat-number');
    
    if (statOrders) statOrders.textContent = orders.length;
    if (statRevenue) statRevenue.textContent = `৳${totalRevenue.toLocaleString()}`;
    if (statCustomers) statCustomers.textContent = customers.length;
    if (statProducts) statProducts.textContent = products.length;
    
    // Load recent orders
    const recentOrders = orders.slice().reverse().slice(0, 5);
    renderRecentOrders(recentOrders);
}

// Render recent orders in dashboard
function renderRecentOrders(orders) {
    const tbody = document.querySelector('.recent-section .admin-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!orders || orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#999;">No recent orders</td></tr>`;
        return;
    }
    
    orders.forEach(order => {
        const date = new Date(order.date);
        const dateStr = date.toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit' });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span style="font-weight:600; color:#a87525;">#${order.id}</span></td>
            <td><strong>${order.customer}</strong></td>
            <td>${order.items.length} items</td>
            <td>৳${order.total.toLocaleString()}</td>
            <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td>${dateStr}, ${timeStr}</td>
        `;
        tbody.appendChild(row);
    });
}

// =========================================================
// BADGE UPDATES
// =========================================================

function updateBadges() {
    const orders = getAdminOrders();
    const products = getAdminProducts();
    const customers = getAdminCustomers();
    
    const orderBadge = document.getElementById('orderBadge');
    const productBadge = document.getElementById('productBadge');
    const customerBadge = document.getElementById('customerBadge');
    
    if (orderBadge) orderBadge.textContent = orders.length;
    if (productBadge) productBadge.textContent = products.length;
    if (customerBadge) customerBadge.textContent = customers.length;
}

// =========================================================
// SETTINGS
// =========================================================

function loadSettings() {
    const settings = safeJSONParse(localStorage.getItem('adminSettings'), {});
    
    // General Settings
    if (settings.storeName) document.getElementById('storeName').value = settings.storeName;
    if (settings.storeTagline) document.getElementById('storeTagline').value = settings.storeTagline;
    if (settings.storeEmail) document.getElementById('storeEmail').value = settings.storeEmail;
    if (settings.storePhone) document.getElementById('storePhone').value = settings.storePhone;
    if (settings.storeAddress) document.getElementById('storeAddress').value = settings.storeAddress;
    if (settings.storeCurrency) document.getElementById('storeCurrency').value = settings.storeCurrency;
    
    // Shipping Settings
    if (settings.shippingFee !== undefined) document.getElementById('shippingFee').value = settings.shippingFee;
    if (settings.freeShipping !== undefined) document.getElementById('freeShipping').value = settings.freeShipping;
    if (settings.deliveryTime !== undefined) document.getElementById('deliveryTime').value = settings.deliveryTime;
    
    // Payment Methods
    if (settings.paymentMethods) {
        document.querySelectorAll('.payment-checkbox input').forEach(cb => {
            cb.checked = settings.paymentMethods.includes(cb.value);
        });
    }
    
    // Store Status
    if (settings.storeStatus !== undefined) {
        document.getElementById('storeStatus').checked = settings.storeStatus;
        updateStatusUI(settings.storeStatus);
    }
    if (settings.maintenanceMsg) {
        document.getElementById('maintenanceMsg').value = settings.maintenanceMsg;
    }
    
    // Notifications
    if (settings.notifications) {
        document.getElementById('notifEmail').checked = settings.notifications.email !== false;
        document.getElementById('notifSMS').checked = settings.notifications.sms !== false;
        document.getElementById('notifOrder').checked = settings.notifications.order !== false;
        document.getElementById('notifLowStock').checked = settings.notifications.lowStock === true;
    }
}

function saveGeneralSettings() {
    const settings = safeJSONParse(localStorage.getItem('adminSettings'), {});
    
    settings.storeName = document.getElementById('storeName').value.trim();
    settings.storeTagline = document.getElementById('storeTagline').value.trim();
    settings.storeEmail = document.getElementById('storeEmail').value.trim();
    settings.storePhone = document.getElementById('storePhone').value.trim();
    settings.storeAddress = document.getElementById('storeAddress').value.trim();
    settings.storeCurrency = document.getElementById('storeCurrency').value;
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showToast('✅ General settings saved successfully!', 'success');
}

function saveShippingSettings() {
    const settings = safeJSONParse(localStorage.getItem('adminSettings'), {});
    
    settings.shippingFee = parseFloat(document.getElementById('shippingFee').value) || 0;
    settings.freeShipping = parseFloat(document.getElementById('freeShipping').value) || 0;
    settings.deliveryTime = parseInt(document.getElementById('deliveryTime').value) || 3;
    
    const paymentMethods = [];
    document.querySelectorAll('.payment-checkbox input:checked').forEach(cb => {
        paymentMethods.push(cb.value);
    });
    settings.paymentMethods = paymentMethods;
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showToast('✅ Shipping & Payment settings saved!', 'success');
}

function saveStoreStatus() {
    const settings = safeJSONParse(localStorage.getItem('adminSettings'), {});
    
    settings.storeStatus = document.getElementById('storeStatus').checked;
    settings.maintenanceMsg = document.getElementById('maintenanceMsg').value.trim();
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    updateStatusUI(settings.storeStatus);
    showToast('✅ Store status updated!', 'success');
}

function updateStatusUI(isOpen) {
    const label = document.getElementById('statusLabel');
    const badge = document.getElementById('statusBadge');
    const subtext = document.getElementById('statusSubtext');
    
    if (isOpen) {
        if (label) label.textContent = 'Open';
        if (badge) badge.textContent = '🟢 Open';
        if (subtext) subtext.textContent = 'Customers can place orders';
    } else {
        if (label) label.textContent = 'Closed';
        if (badge) badge.textContent = '🔴 Closed';
        if (subtext) subtext.textContent = 'Store is temporarily closed';
    }
}

function saveNotificationSettings() {
    const settings = safeJSONParse(localStorage.getItem('adminSettings'), {});
    
    settings.notifications = {
        email: document.getElementById('notifEmail').checked,
        sms: document.getElementById('notifSMS').checked,
        order: document.getElementById('notifOrder').checked,
        lowStock: document.getElementById('notifLowStock').checked
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showToast('✅ Notification preferences saved!', 'success');
}

// =========================================================
// DATA MANAGEMENT (Settings Page)
// =========================================================

function clearAllData() {
    if (!confirm('⚠️ Are you sure you want to delete ALL admin data?')) return;
    if (!confirm('⚠️ REALLY? This includes products, orders, and customers!')) return;
    
    localStorage.removeItem('adminProducts');
    localStorage.removeItem('adminOrders');
    localStorage.removeItem('adminSettings');
    
    showToast('🗑️ All admin data cleared!', 'error');
    setTimeout(() => location.reload(), 1000);
}

function exportData() {
    const data = {
        products: getAdminProducts(),
        orders: getAdminOrders(),
        settings: safeJSONParse(localStorage.getItem('adminSettings'), {}),
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jhunjhur-admin-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('📥 Data exported successfully!', 'success');
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.products) saveAdminProducts(data.products);
            if (data.orders) saveAdminOrders(data.orders);
            if (data.settings) localStorage.setItem('adminSettings', JSON.stringify(data.settings));
            
            showToast('✅ Data imported successfully!', 'success');
            setTimeout(() => location.reload(), 1000);
        } catch(err) {
            showToast('❌ Invalid JSON file format!', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetSettings() {
    if (!confirm('Reset all settings to default?')) return;
    
    localStorage.removeItem('adminSettings');
    showToast('🔄 Settings reset to default', 'info');
    setTimeout(() => location.reload(), 500);
}

function viewAllData() {
    const data = {
        products: getAdminProducts(),
        orders: getAdminOrders(),
        customers: getAdminCustomers(),
        settings: safeJSONParse(localStorage.getItem('adminSettings'), {})
    };
    
    console.log('📊 All Admin Data:', data);
    alert('📊 Data logged to console. Press F12 to view.');
    showToast('📊 Data logged to console', 'info');
}

// =========================================================
// SIDEBAR TOGGLE (Mobile)
// =========================================================

document.getElementById('sidebarToggle')?.addEventListener('click', function() {
    document.getElementById('adminSidebar').classList.toggle('open');
});

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check auth
    if (!checkAdminAuth()) return;
    
    const path = window.location.pathname;
    
    // Load data based on page
    if (path.includes('dashboard.html')) {
        loadDashboardStats();
    } else if (path.includes('products.html')) {
        loadProducts();
    } else if (path.includes('orders.html')) {
        loadOrders();
    } else if (path.includes('customers.html')) {
        loadCustomers();
    } else if (path.includes('settings.html')) {
        loadSettings();
    }
    
    // Update user info in header
    const admin = getAdminUser();
    if (admin) {
        const profileName = document.querySelector('.admin-profile strong');
        const profileEmail = document.querySelector('.admin-profile small');
        if (profileName) profileName.textContent = admin.name || 'Admin';
        if (profileEmail) profileEmail.textContent = admin.email || 'admin@jhunjhur.com';
    }
    
    // Logout button
    document.getElementById('adminLogout')?.addEventListener('click', function(e) {
        e.preventDefault();
        logoutAdmin();
    });
    
    // Update badges
    updateBadges();
    
    console.log('🪄 Jhunjhur Admin Panel Loaded');
});

// =========================================================
// EXPOSE FUNCTIONS FOR HTML ONCLICK
// =========================================================

window.checkAdminAuth = checkAdminAuth;
window.getAdminUser = getAdminUser;
window.logoutAdmin = logoutAdmin;
window.showToast = showToast;

window.loadProducts = loadProducts;
window.addNewProduct = addNewProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.filterProducts = filterProducts;

window.loadOrders = loadOrders;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.filterOrders = filterOrders;

window.loadCustomers = loadCustomers;
window.viewCustomerOrders = viewCustomerOrders;
window.filterCustomers = filterCustomers;

window.loadDashboardStats = loadDashboardStats;
window.updateBadges = updateBadges;

window.loadSettings = loadSettings;
window.saveGeneralSettings = saveGeneralSettings;
window.saveShippingSettings = saveShippingSettings;
window.saveStoreStatus = saveStoreStatus;
window.saveNotificationSettings = saveNotificationSettings;
window.updateStatusUI = updateStatusUI;

window.clearAllData = clearAllData;
window.exportData = exportData;
window.handleImport = handleImport;
window.resetSettings = resetSettings;
window.viewAllData = viewAllData;
