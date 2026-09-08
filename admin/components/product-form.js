/* =========================================================
   PRODUCT FORM MODAL - Functionality
   Location: admin/components/product-form.js
========================================================= */

// State
let selectedImageData = null;
let editingProductId = null;

// =========================================================
// OPEN MODAL (Add New)
// =========================================================

function openProductForm() {
    // Reset form
    resetProductForm();
    
    // Set title
    document.getElementById('modalTitle').textContent = 'Add New Product';
    
    // Show modal
    document.getElementById('productFormModal').style.display = 'flex';
    
    // Focus first input
    setTimeout(() => document.getElementById('productName').focus(), 100);
}

// =========================================================
// OPEN MODAL (Edit)
// =========================================================

function openEditProductForm(productId) {
    const products = getAdminProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('❌ Product not found!', 'error');
        return;
    }
    
    // Reset form
    resetProductForm();
    
    // Set editing ID
    editingProductId = productId;
    
    // Fill form
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productName').value = product.name || '';
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productStock').value = product.stock || '';
    document.getElementById('productDiscountPrice').value = product.discountPrice || '';
    document.getElementById('productIsActive').checked = product.isActive !== false;
    document.getElementById('productDescription').value = product.description || '';
    
    // Show image if exists
    if (product.image && product.image !== '../assets/placeholder.jpg') {
        selectedImageData = product.image;
        showImagePreview(product.image);
    }
    
    // Show modal
    document.getElementById('productFormModal').style.display = 'flex';
}

// =========================================================
// CLOSE MODAL
// =========================================================

function closeProductForm() {
    document.getElementById('productFormModal').style.display = 'none';
    
    // Reset form
    resetProductForm();
}

// =========================================================
// RESET FORM
// =========================================================

function resetProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productDiscountPrice').value = '';
    document.getElementById('productIsActive').checked = true;
    document.getElementById('productDescription').value = '';
    
    // Reset image
    selectedImageData = null;
    editingProductId = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('previewImage').src = '';
}

// =========================================================
// IMAGE UPLOAD HANDLER
// =========================================================

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        showToast('❌ Please select a valid image (JPG, PNG, WEBP)', 'error');
        event.target.value = '';
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('❌ Image too large! Max 5MB', 'error');
        event.target.value = '';
        return;
    }
    
    // Convert to base64 for localStorage
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedImageData = e.target.result;
        showImagePreview(selectedImageData);
    };
    reader.readAsDataURL(file);
}

// =========================================================
// SHOW IMAGE PREVIEW
// =========================================================

function showImagePreview(imageSrc) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('previewImage');
    
    img.src = imageSrc;
    preview.style.display = 'block';
}

// =========================================================
// REMOVE IMAGE
// =========================================================

function removeImage() {
    selectedImageData = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('previewImage').src = '';
}

// =========================================================
// DRAG & DROP SUPPORT
// =========================================================

const dropArea = document.getElementById('imageDropArea');
if (dropArea) {
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    dropArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (!file) return;
        
        // Validate
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            showToast('❌ Please select a valid image', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showToast('❌ Image too large! Max 5MB', 'error');
            return;
        }
        
        // Convert to base64
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedImageData = e.target.result;
            showImagePreview(selectedImageData);
        };
        reader.readAsDataURL(file);
    });
}

// =========================================================
// SAVE PRODUCT
// =========================================================

function saveProduct(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    const discountPrice = document.getElementById('productDiscountPrice').value;
    const isActive = document.getElementById('productIsActive').checked;
    const description = document.getElementById('productDescription').value.trim();
    
    // Validate
    if (!name) {
        showToast('❌ Please enter product name', 'error');
        document.getElementById('productName').focus();
        return;
    }
    
    if (!category) {
        showToast('❌ Please select a category', 'error');
        document.getElementById('productCategory').focus();
        return;
    }
    
    if (!price || isNaN(price) || Number(price) <= 0) {
        showToast('❌ Please enter a valid price', 'error');
        document.getElementById('productPrice').focus();
        return;
    }
    
    if (!stock || isNaN(stock) || Number(stock) < 0) {
        showToast('❌ Please enter a valid stock quantity', 'error');
        document.getElementById('productStock').focus();
        return;
    }
    
    const products = getAdminProducts();
    
    if (editingProductId) {
        // UPDATE EXISTING PRODUCT
        const product = products.find(p => p.id === editingProductId);
        if (product) {
            product.name = name;
            product.category = category;
            product.price = Number(price);
            product.stock = Number(stock);
            product.discountPrice = discountPrice ? Number(discountPrice) : null;
            product.isActive = isActive;
            product.description = description;
            
            // Update image (only if new image selected)
            if (selectedImageData) {
                product.image = selectedImageData;
            }
            
            saveAdminProducts(products);
            showToast('✅ Product updated successfully!', 'success');
        }
    } else {
        // ADD NEW PRODUCT
        const newProduct = {
            id: category + '-' + Date.now(),
            name: name,
            category: category,
            price: Number(price),
            stock: Number(stock),
            discountPrice: discountPrice ? Number(discountPrice) : null,
            isActive: isActive,
            description: description,
            image: selectedImageData || '../assets/placeholder.jpg',
            createdAt: new Date().toISOString()
        };
        
        products.push(newProduct);
        saveAdminProducts(products);
        showToast('✅ Product added successfully!', 'success');
    }
    
    // Close modal and reload
    closeProductForm();
    loadProducts();
}

// =========================================================
// ESC KEY TO CLOSE MODAL
// =========================================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductForm();
    }
});