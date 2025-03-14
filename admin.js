// Load existing categories and products from local storage
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// Add Category Form
document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const categoryName = document.getElementById('categoryName').value.trim();
  if (!categoryName) return alert('Category name is required!');

  // Check if category already exists
  if (categories.some(cat => cat.name === categoryName)) {
    return alert('Category already exists!');
  }

  categories.push({ name: categoryName });
  localStorage.setItem('categories', JSON.stringify(categories));
  alert('Category added successfully!');
  loadCategories(); // Refresh the category dropdown
  document.getElementById('categoryName').value = ''; // Clear the input field
});

// Add Product Form
document.getElementById('addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const productCategory = document.getElementById('productCategory').value;
  const productName = document.getElementById('productName').value.trim();
  const productPrice = document.getElementById('productPrice').value.trim();
  const productDescription = document.getElementById('productDescription').value.trim();
  const productLink = document.getElementById('productLink').value.trim();
  const productImage = document.getElementById('productImage').files[0];

  if (!productCategory || !productName || !productPrice || !productDescription || !productImage || !productLink) {
    return alert('All fields are required!');
  }
  // Convert image to Base64
  const reader = new FileReader();
  reader.onload = function (event) {
    const productImageBase64 = event.target.result;

    // Create product object
    const product = {
      category: productCategory,
      name: productName,
      price: productPrice,
      description: productDescription,
      link: productLink,
      image: productImageBase64,
    };

    // Save product to local storage
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    alert('Product added successfully!');
    document.getElementById('addProductForm').reset(); // Clear the form
  };
  reader.readAsDataURL(productImage); // Read the image file
});

// Load Categories into Select Dropdown
function loadCategories() {
  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

  // Load categories when the page loads
loadCategories();