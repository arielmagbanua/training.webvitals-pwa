const allProducts = async () => {
  const rawData = await fetch(`/api/products`);
  return await rawData.json();
}

const createCardElement = (product) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card-container');
  cardElement.classList.add('col-xl-3');
  cardElement.classList.add('col-lg-4');
  cardElement.classList.add('col-md-6');
  cardElement.classList.add('col-sm-12');

  cardElement.innerHTML = `
    <div class="card product-list-card hover-elevated m-1 p-0 col-12">
      <img src="${product.images.small}" class="card-img-top" alt="bag">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <div class="card-text-container">
          <p class="card-text">${product.description}</p>
        </div>
        <div class="row">
          <div class="col-6">
            <a href="${product.url}" class="btn btn-primary col-12">Learn more</a>
          </div>
          <div class="col-6">
            <a href="#" class="btn btn-primary col-12">Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  `;

  return cardElement;
}

(() => {
  window.addEventListener('DOMContentLoaded', (event) => {
    // get the grid to be populated by products
    const productsGrid = document.getElementById('products');

    if (productsGrid) {
      allProducts().then((products) => {
        products.forEach((product) => {
          const element = createCardElement(product);
          productsGrid.appendChild(element);
        });
      });
    }
  });
})();
