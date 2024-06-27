// utility functions remain here
document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanners);
document.addEventListener("DOMContentLoaded", requestFeatured);
document.addEventListener("DOMContentLoaded", requestNewArrivals);


function populateCatalogue(products, catalogueParent){
    if(products) {
        // const featuredSection = document.querySelector(".featured-products");
        const catalogue = document.createElement("div");
        catalogue.className="catalogue";

        products.forEach((prod) => {
            const card = document.createElement('div');
            card.className = 'card';

            card.addEventListener("click", getProductDetails.bind(prod))
            const imgDiv = document.createElement("div");
            imgDiv.className="card-img";
            const descDiv = document.createElement("div")
            descDiv.className="card-description";
            card.appendChild(imgDiv);
            card.appendChild(descDiv);
            const img = document.createElement('img');
            img.src = `http://localhost:8081${prod.image}`;
            imgDiv.appendChild(img); 
            const nameP = document.createElement('p');
            nameP.className = 'product-name';
            nameP.textContent = prod.name;
            const priceP = document.createElement('p');
            priceP.className= 'product-price';
            priceP.textContent = `₵${prod.price}`;
            
            descDiv.appendChild(nameP);
            descDiv.appendChild(priceP);
            
            catalogue.appendChild(card)
            // console.log(card);
            // console.log(img);
        });
        catalogueParent.appendChild(catalogue);
    }
}


// Function to make a fetch call to the server
function fetchCall(resource, callBack, method = "GET") {
    // Define the base URL for the server
    const url = "http://localhost:8081/user/backend/";

    // Make a fetch request to the server with the specified resource and method
    fetch(url + resource, {
        method: method,
    })
    .then((res) => res.json()) // Parse the response as JSON
    .then((data) => {
        // Call the callback function with the parsed data
        callBack(data);
    })
    .catch((err) => console.log(err)); 
  
}
function displayOverlay(modal){
    const main = document.querySelector('main');
    const overlay = document.createElement('div');
    overlay.className = "overlay";
    overlay.addEventListener('click', removeOverlay)
    main.appendChild(overlay);
    const modalContainer = document.createElement('div');
    modalContainer.className = "modal-container";
    modalContainer.appendChild(modal);
    main.appendChild(modalContainer);
}

function getProductDetails(){

 fetchCall(`inventory.php?id=${this.id}`, responseInventory.bind(this));
 function responseInventory(data){

    const stock = +data.stock;
    const modal = document.createElement('div');
    modal.className = "modal";

    // modalContainer.appendChild(modal);
    // main.appendChild(modalContainer);

    const img = document.createElement('img');
    // console.log(img);
    img.src = `http://localhost:8081${this.image}`;
    modal.appendChild(img);
    // console.log(img.src);

    const modalDesc = document.createElement('div');
    modalDesc.className="modal-desc";
    modal.appendChild(modalDesc);

    const title = document.createElement('div');
    title.textContent = this.name 
    modalDesc.appendChild(title);

    const desc = document.createElement('div');
    desc.textContent = this.description;
    modalDesc.appendChild(desc);

    const price = document.createElement('div');
    price.textContent = `₵${this.price}`;
    modalDesc.appendChild(price);

    const stockDiv = document.createElement('div');
    switch(true){
        case stock > 10:
            stockDiv.textContent = "In Stock";
            stockDiv.style.color = "green";
            break;
        case stock > 0 && stock <= 10:
            stockDiv.textContent = `Only ${stock} left`;
            stockDiv.style.color = "goldenrod";
            break;
            // && stock < 0
        case stock == 0: 
            stockDiv.textContent = "Out of Stock";
            stockDiv.style.color = "red";
            break;
        default:
            stockDiv.textContent = "Not Sure";
            break;    
    }

    modalDesc.appendChild(stockDiv);
    const select = document.createElement("select");
    if(stock == 0){
        select.disabled = true;
    } else {
        const counter = stock > 10 ? 10 : stock;
        for(let i = 1; i <= counter; i++){
            const option = document.createElement("option");
            option.value = i;  
            option.textContent = i;
            select.appendChild(option);
        }
    }
    modalDesc.appendChild(select);
    const addToCart = document.createElement('button');
    addToCart.className = 'add-to-cart';
    addToCart.textContent = "Add to Cart"
    modalDesc.appendChild(addToCart);
    displayOverlay(modal);

    // console.log(overlay);
    // console.log(modal);
 }
}

function removeOverlay() {
    // const main = document.querySelector('.main');
    const overlay = document.querySelector('.overlay');
    const modalContainer = document.querySelector('.modal-container');

    if(overlay){
        overlay.remove()
    } 

    if(modalContainer){
        modalContainer.remove()
    } 
}