const PRODUCT_CONTAINER = document.getElementById('product_list');
const IMGS_URL = 'https://s3-us-west-2.amazonaws.com/ib.image.';

// This function creates and displays the products on the page.
function renderProducts(products) {
    return products.map(function(product) {
        
        let card = document.createElement('div'),
            thumb = document.createElement('img'),
            info = document.createElement('div'),
            name = document.createElement('h5'),
            price = document.createElement('p'),
            brand = document.createElement('p');

        name.innerHTML = product.name;
        name.className = 'card-title';

        thumb.src = IMGS_URL + 'medium/m-' + product.photos[0];
        thumb.alt = product.name;
        thumb.className = 'card-img-top img-fluid';

        brand.innerHTML = product.brand;
        brand.className = 'card-subtitle text-secondary';

        price.innerHTML = 'R$' + formatPrice(product.pc[0].valid_price);
        price.className = 'card-text text-success price';

        info.className = 'card-body';
        info.appendChild(name);
        info.appendChild(brand);
        info.appendChild(price);

        card.className = 'card border-light col-sm-6 col-md-4 col-lg-3 product_card';
        card.appendChild(thumb);
        card.appendChild(info);
        
     PRODUCT_CONTAINER.appendChild(card);
    })
}

// This function formats the price to keep only two decimals.
function formatPrice(price) {
    formattedPrice = Number.parseFloat(price);
    formattedPrice = formattedPrice.toFixed(2);
    return formattedPrice;
}

const MY_URL = 'https://instabuy.com.br/apiv2_2/product.json/?subcategory_id=57eec92f072d415b67c24175';
const MY_REQUEST = new Request(MY_URL, {method: 'GET'});

fetch(MY_REQUEST)
.then(function(response) {
    return response.json();
})
.then(function(response) {
    let products = response.data;
    renderProducts(products);
})
.catch(function(error) {
    console.log(error);
})

