        // Cart functionality
        const cartItems = [];
        const cartOverlay = document.getElementById('cart-overlay');
        const cartToggle = document.getElementById('cart-toggle');
        const closeCart = document.getElementById('close-cart');
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartTotal = document.getElementById('cart-total');

        // Toggle cart visibility
        cartToggle.addEventListener('click', () => cartOverlay.classList.remove('hidden'));
        closeCart.addEventListener('click', () => cartOverlay.classList.add('hidden'));

        // Add to cart functionality
        function addToCart(productName, price) {
            const existingItem = cartItems.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: productName, price: price, quantity: 1 });
            }
            updateCart();
        }

        // Update cart UI
        function updateCart() {
            // Update count
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            if (cartItems.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartItemsContainer.innerHTML = '';
            } else {
                emptyCartMessage.classList.add('hidden');
                let html = '';
                let total = 0;
                
                cartItems.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    html += `
                        <div class="flex justify-between items-center mb-4 pb-4 border-b">
                            <div>
                                <h4 class="font-medium">${item.name}</h4>
                                <p class="text-gray-600">${item.price.toLocaleString()} x ${item.quantity}</p>
                            </div>
                            <div class="flex items-center">
                                <span class="font-bold mr-4">${itemTotal.toLocaleString()}</span>
                                <button class="text-red-500 hover:text-red-700 remove-item" data-name="${item.name}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                cartItemsContainer.innerHTML = html;
                cartTotal.textContent = `${total.toLocaleString()}`;
                
                // Add event listeners to remove buttons
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', () => {
                        const name = button.getAttribute('data-name');
                        const index = cartItems.findIndex(item => item.name === name);
                        if (index !== -1) {
                            if (cartItems[index].quantity > 1) {
                                cartItems[index].quantity--;
                            } else {
                                cartItems.splice(index, 1);
                            }
                            updateCart();
                        }
                    });
                });
            }
        }

        // Add "Add to cart" buttons to products
        document.addEventListener('DOMContentLoaded', function() {
            // Existing code...

            // Add to cart buttons
            const products = [
                { name: "Desinfectante Multiusos Pro", price: 89900 },
                { name: "Toallas Desinfectantes", price: 24900 },
                { name: "Kit Profesional Limpieza", price: 149900 }
            ];

            document.querySelectorAll('.product-card').forEach((card, index) => {
                const button = document.createElement('button');
                button.className = 'bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium text-sm mt-4 w-full transition duration-300 add-to-cart';
                button.textContent = 'Añadir al carrito';
                button.dataset.product = products[index].name;
                button.dataset.price = products[index].price;
                
                button.addEventListener('click', () => {
                    addToCart(products[index].name, products[index].price);
                });

                const buttonContainer = card.querySelector('.flex.items-center');
                if (buttonContainer) {
                    buttonContainer.parentNode.insertBefore(button, buttonContainer.nextSibling);
                    // Change the "Ver más" text to be more subtle
                    const viewButton = card.querySelector('.flex.items-center button');
                    if (viewButton) {
                        viewButton.className = 'text-teal-600 hover:text-teal-800 text-sm flex items-center';
                        viewButton.innerHTML = '<i class="fas fa-eye mr-1"></i> Detalles';
                    }
                }
            });
        });
        // Simple JavaScript para funcionalidad básica
        document.addEventListener('DOMContentLoaded', function() {
            // Aquí podrías agregar interactividad más avanzada
            console.log('Sitio web de PureClean cargado');
            
            // Ejemplo: Smooth scroll para anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
