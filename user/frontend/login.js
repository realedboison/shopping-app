const login = document.querySelector(".login");
const register = document.querySelector(".register");
const logout = document.querySelector(".logout");
const loggedUser = document.querySelector(".logged-user");

console.log(login, register, logout, loggedUser);

login.addEventListener("click", userLogin);

function userLogin(e) {
 e.preventDefault();
 const formDiv = document.createElement("div");
 formDiv.className = 'formData';

 const h2 = document.createElement('h2');
 h2.textContent = "Login Form";
 formDiv.appendChild(h2);

 const loginForm = document.createElement('form');
 loginForm.className = "login-form"; 
 const username = document.createElement('input');
 username.type = "text";
 username.name = "username";
 username.placeholder = "user name";

 const password = document.createElement('input');
 password.type = "password";
 password.name = "password";
 password.placeholder = "password";

 const submit = document.createElement('input');
 submit.type = "submit";
 submit.name = "Login";

 loginForm.appendChild(username);
 loginForm.appendChild(password);
 loginForm.appendChild(submit);
 formDiv.appendChild(loginForm);
 displayOverlay(formDiv);

}

function showHideIcon(icon, flag) {
 flag ? (icon.style.display = "none") : (icon.style.display = "block");
} 