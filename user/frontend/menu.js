function requestCategories() {
 // Make a fetch call to "menu.php" and handle the response with responseCategories function
 fetchCall("menu.php", responseCategories);

 // Callback function to handle the response from the fetch call
 function responseCategories(data) {
     // Select the navigation element where categories will be appended
     const nav = document.querySelector('.navigation');

     // Check if the response contains categories
     if (data.categories) {
         // Create an unordered list element to hold the category items
         const ul = document.createElement('ul');

         // Iterate over each category in the response data
         data.categories.forEach(cat => {
             // Create a list item element for each category
             const li = document.createElement('li');

             // Set the class name and text content of the list item to the category name
             li.className = cat;
             li.textContent = cat;

             // Add a click event listener to the list item to handle category clicks.. also passing the reference
             li.addEventListener('click', getCategoryProducts.bind(cat));


             // Append the list item to the unordered list
             ul.appendChild(li);
         });

         // Append the unordered list to the navigation element
         nav.append(ul);
     }  
 }  
}

function getCategoryProducts() {
 // console.log("category clicked", this);
  const cat = this;
  const main = document.querySelector('main')
 //  console.log("cat");
  setActiveCategory(cat);
  fetchCall(`product.php?category=${cat}`, responseCategoryProducts);
  function responseCategoryProducts(data){
     // clg data of returned 
     // console.log(data);
     if(data.products){
         main.innerHTML = "";
         populateCatalogue(data.products, main);
     }
  }
}
// active navs for the pages
function setActiveCategory(cat) {
 
 // returns node list of all the nav items
 const categoryList = document.querySelectorAll(".navigation li")
 const root = document.querySelector(":root");
 const btnColor = window
 .getComputedStyle(root)
 .getPropertyValue("--btnColor");
 // console.log(btnColor);

 categoryList.forEach((category) => {
     if(category.classList.contains(cat)){
         category.style.color = btnColor;
     } else category.style.color= "white";
     
 });
}
