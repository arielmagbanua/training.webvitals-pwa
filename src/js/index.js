const getFeaturedType = async (type) => {
  const rawData = await fetch(`/api/products?featureType=${type}&_limit3`);
  return await rawData.json();
}

const createCarouselElement = (product, index) => {
  const carouselElement = document.createElement('div');
  carouselElement.classList.add('carousel-item');

  let textPosition = 'text-end';

  if (index === 0) {
    carouselElement.classList.add('active');
    textPosition = 'text-start';
  }

  // add the child element string
  carouselElement.innerHTML = `
     <img class="cover-photo" src="${product.imageUrl}">
     <div class="container">
       <div class="carousel-caption ${textPosition}">
         <h1>${product.name}</h1>
         <p>${product.description}</p>
         <p><a class="btn btn-lg btn-primary" href="${product.url}">Buy Now!</a></p>
       </div>
     </div>
  `;

  return carouselElement;
}

const createFeaturetteElement = (product) => {
  const featuretteElement = document.createElement('div');
  featuretteElement.classList.add('col');

  featuretteElement.innerHTML = `
    <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
       style="background-image: url('${product.imageUrl}');"
    >
      <a href="${product.url}">
        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
            ${product.description}
          </h2>
        </div>
      </a>
    </div>
  `;

  return featuretteElement;
}

const createNewArrivalElement = (product, index) => {
  const newArrivalElement = document.createElement('div');
  newArrivalElement.classList.add('new-arrival-item');

  let firstBlock = '';
  let secondBlock = '';

  let descriptionBlock = `
    <div class="col-md-7">
      <h2 class="featurette-heading">
        <span class="text-muted">${product.name}</span>
      </h2>
      <p class="lead">${product.description}</p>
    </div>
  `;

  const imageBlockBlock = `
     <div class="col-md-5 new-arrival-img-container">
        <img src="${product.imageUrl}" class="new-arrival-img img-fluid" alt="${product.name}">
      </div>
  `;

  if (index % 2 !== 1) {
    // odd must have unique arrangements of block
    firstBlock = descriptionBlock;
    secondBlock = imageBlockBlock;
  } else {
    firstBlock = imageBlockBlock;
    secondBlock = descriptionBlock;
  }

  newArrivalElement.innerHTML = `
    <hr class="featurette-divider">
    <div class="row featurette">
      ${firstBlock}
      ${secondBlock}
    </div>
  `;

  return newArrivalElement;
}

(() => {
  window.addEventListener('DOMContentLoaded', (event) => {
    // grab the featured product for carousel and create the carousel
    const carouselContainer = document.querySelector('#home-carousel .carousel-inner');
    getFeaturedType(1).then((products) => {
      for (let i = 0; i < products.length; i++) {
        const element = createCarouselElement(products[i], i);
        carouselContainer.appendChild(element);
      }
    });

    const featuretteContainer = document.querySelector('.featurette-container');
    getFeaturedType(2).then((products) => {
      products.forEach((product) => {
        const element = createFeaturetteElement(product);
        featuretteContainer.appendChild(element);
      });
    });

    const newArrivalContainer = document.querySelector('.new-arrival');
    getFeaturedType(3).then((products) => {
      products.forEach((product, index) => {
        const element = createNewArrivalElement(product, index);
        newArrivalContainer.appendChild(element);
      });
    });
  });
})();
