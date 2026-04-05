/* TECHEXCELL - COMPLETE JAVASCRIPT */

const PRODUCTS = [
    { id: 1, name: "VXE Dragonfly R1", brand: "VXE", price: 4800, originalPrice: 6200, category: "mice", rating: 5, reviews: 328, tag: "hot", image: "https://via.placeholder.com/400x400?text=VXE+R1" },
    { id: 2, name: "Razer DeathAdder Pro", brand: "Razer", price: 5200, originalPrice: 7500, category: "mice", rating: 4.8, reviews: 256, tag: "new", image: "https://via.placeholder.com/400x400?text=Razer" },
    { id: 3, name: "Logitech G Pro X", brand: "Logitech", price: 3900, originalPrice: 5200, category: "mice", rating: 4.7, reviews: 189, image: "https://via.placeholder.com/400x400?text=Logitech" }
];

const TESTIMONIALS = [
    { name: "Ahmed Khan", location: "Dhaka", rating: 5, text: "Excellent quality!", avatar: "AK" },
    { name: "Sarah Chen", location: "Singapore", rating: 5, text: "Best gaming peripherals!", avatar: "SC" },
    { name: "Marcus Johnson", location: "USA", rating: 4.5, text: "Great products!", avatar: "MJ" }
];

class CartManager {
    constructor() { this.cartKey = 'techexcell_cart'; this.cart = this.loadCart(); }
    loadCart() { const saved = localStorage.getItem(this.cartKey); return saved ? JSON.parse(saved) : []; }
    saveCart() { localStorage.setItem(this.cartKey, JSON.stringify(this.cart)); this.updateCartUI(); }
    addItem(productId, quantity = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) { existingItem.quantity += quantity; } else { this.cart.push({ ...product, quantity }); }
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }
    removeItem(productId) { this.cart = this.cart.filter(item => item.id !== productId); this.saveCart(); }
    updateQuantity(productId, quantity) { const item = this.cart.find(item => item.id === productId); if (item) { item.quantity = Math.max(1, quantity); this.saveCart(); } }
    getTotal() { return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); }
    clear() { this.cart = []; this.saveCart(); }
    updateCartUI() { const countEl = document.getElementById('cart-count'); if (countEl) countEl.textContent = this.cart.length; }
    showNotification(message, type = 'info') {
        const toast = document.getElementById('notification-toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = `notification-toast show ${type}`;
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}

const cart = new CartManager();

function renderProducts(containerId, products = PRODUCTS) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.tag ? `<span class="product-tag ${product.tag}">${product.tag.toUpperCase()}</span>` : ''}
                <button class="product-wishlist" onclick="toggleWishlist(${product.id})" title="Add to wishlist">♡</button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div><span class="product-price">৳ ${product.price.toLocaleString()}</span></div>
                    <button class="add-cart-btn" onclick="cart.addItem(${product.id})" title="Add to cart">🛒</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;
    container.innerHTML = TESTIMONIALS.map(testi => `
        <div class="testi-card">
            <div class="testi-stars">${'★'.repeat(Math.floor(testi.rating))}</div>
            <p class="testi-text">"${testi.text}"</p>
            <div class="testi-author">
                <div class="testi-avatar">${testi.avatar}</div>
                <div><div class="testi-name">${testi.name}</div><div class="testi-loc">${testi.location}</div></div>
            </div>
        </div>
    `).join('');
}

function openCart() {
    const modal = document.getElementById('cart-modal');
    const itemsContainer = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const footer = document.getElementById('cart-footer');
    if (cart.cart.length === 0) { itemsContainer.innerHTML = ''; emptyState.style.display = 'block'; footer.style.display = 'none'; }
    else {
        emptyState.style.display = 'none';
        footer.style.display = 'block';
        itemsContainer.innerHTML = cart.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">৳ ${item.price.toLocaleString()}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <span class="cart-item-remove" onclick="cart.removeItem(${item.id}); openCart();">🗑️</span>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('cart-total').textContent = `৳ ${cart.getTotal().toLocaleString()}`;
    }
    modal.classList.add('open');
}

function closeCart() { document.getElementById('cart-modal').classList.remove('open'); }

function openAdminLogin() { document.getElementById('admin-modal').classList.add('open'); }

function closeAdminLogin() { document.getElementById('admin-modal').classList.remove('open'); }

function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    if (username === 'admin' && password === 'password') {
        cart.showNotification('✅ Admin login successful!', 'success');
        alert('🎉 Welcome to Admin Panel!\n\nCredentials work correctly!\n\nFeatures:\n- Manage Products\n- View Orders\n- Analytics');
        closeAdminLogin();
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
    } else {
        cart.showNotification('❌ Invalid! Use: admin / password', 'danger');
    }
}

function openSearch() { document.getElementById('search-modal').classList.add('open'); document.getElementById('search-input').focus(); }

function closeSearch() { document.getElementById('search-modal').classList.remove('open'); }

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (query.length < 2) { resultsContainer.innerHTML = ''; return; }
    const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()));
    if (results.length === 0) { resultsContainer.innerHTML = '<p style="color: var(--muted); text-align: center;">No products found</p>'; return; }
    resultsContainer.innerHTML = results.map(product => `
        <div class="search-result" onclick="addToCartAndClose(${product.id})">
            <div style="display: flex; justify-content: space-between;">
                <div><div style="font-weight: 600;">${product.name}</div><div style="font-size: 0.85rem; color: var(--blue);">${product.brand}</div></div>
                <div style="text-align: right; font-weight: 600;">৳ ${product.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

function addToCartAndClose(productId) { cart.addItem(productId); closeSearch(); document.getElementById('search-input').value = ''; }

function filterProducts(category) { const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category); renderProducts('products-grid', filtered); }

function sortProducts(sortBy) {
    let sorted = [...PRODUCTS];
    switch (sortBy) {
        case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
        case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
        default: sorted.sort((a, b) => b.id - a.id);
    }
    renderProducts('products-grid', sorted);
}

function heroColorSelect(element, color) {
    document.querySelectorAll('.hcs-dot').forEach(dot => dot.classList.remove('active'));
    element.classList.add('active');
    const colorNames = { 'black': 'Matte Black', 'white': 'Arctic White' };
    document.getElementById('hero-color-name').textContent = colorNames[color];
}

function addHeroToCart() { cart.addItem(1); }

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const statusEl = document.getElementById('newsletter-status');
    if (email) { statusEl.textContent = '✓ Thank you for subscribing!'; statusEl.style.color = '#2ecc71'; statusEl.style.display = 'block'; setTimeout(() => { document.getElementById('newsletter-form').reset(); statusEl.style.display = 'none'; }, 3000); }
}

function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('open'); }

function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

window.addEventListener('scroll', () => { const btn = document.getElementById('scroll-top-btn'); if (window.scrollY > 300) { btn.style.display = 'flex'; } else { btn.style.display = 'none'; } });

const wishlistKey = 'techexcell_wishlist';

function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    if (wishlist.includes(productId)) { wishlist = wishlist.filter(id => id !== productId); cart.showNotification('Removed from wishlist'); } else { wishlist.push(productId); cart.showNotification('Added to wishlist!', 'success'); }
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
}

function checkout() {
    if (cart.cart.length === 0) { alert('Your cart is empty!'); return; }
    const total = cart.getTotal();
    alert(`Proceeding to checkout...\n\nTotal: ৳ ${total.toLocaleString()}`);
    cart.clear();
    closeCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('products-grid', PRODUCTS);
    renderTestimonials();
    cart.updateCartUI();
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { document.getElementById('cart-modal')?.classList.remove('open'); document.getElementById('admin-modal')?.classList.remove('open'); document.getElementById('search-modal')?.classList.remove('open'); } });
    console.log('🚀 TechExcell loaded successfully!');
});
