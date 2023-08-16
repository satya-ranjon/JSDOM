// Get references to elements
const formContainer = document.getElementById("form_container");
const form = document.getElementById("myForm");
const loginBtn = document.getElementById("login_btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logout_btn");
const bankContainer = document.getElementById("bank_container");
const depositDisplay = document.getElementById("deposit_display");
const withdrawDisplay = document.getElementById("withdraw_display");
const balanceDisplay = document.getElementById("balance_display");
const depositInput = document.getElementById("deposit_input");
const depositBtn = document.getElementById("deposit_btn");
const withdrawInput = document.getElementById("withdraw_input");
const withdrawBtn = document.getElementById("withdraw_btn");

// Validation functions
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
const isValidPassword = (password) => password.length >= 4;

// Object to track input validity
const inputIsValid = {
  email: false,
  password: false,
  deposit: false,
  withdraw: false,
};

// Update input validity and handle input changes
const updateInputValidity = () => {
  inputIsValid.email = isValidEmail(emailInput.value);
  inputIsValid.password = isValidPassword(passwordInput.value);
  handleInput();
};

// Update login button state based on input validity
const handleInput = () => {
  loginBtn.disabled = !(inputIsValid.email && inputIsValid.password);
};

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password) {
    localStorage.setItem("login", true);
    formContainer.style.display = "none";
    bankContainer.style.display = "block";
  }

  handleLogout();
  // Reset input validity and form
  inputIsValid.email = false;
  inputIsValid.password = false;
  handleInput();
  form.reset();
});

// Attach event listeners to input elements
emailInput.addEventListener("keyup", updateInputValidity);
passwordInput.addEventListener("keyup", updateInputValidity);

function handleLogout() {
  const userLoggedIn = localStorage.getItem("login") === "true";
  formContainer.style.display = userLoggedIn ? "none" : "block";
  logoutBtn.style.display = userLoggedIn ? "block" : "none";
  bankContainer.style.display = userLoggedIn ? "block" : "none";
}

// Attach click event listener to the logout button
logoutBtn.addEventListener("click", function () {
  localStorage.setItem("login", false);
  handleLogout();
});

// Initial call to handleLogout to set the initial state
handleLogout();

// Bank functionality

// Validation function for deposit and withdraw inputs
const isValidDepositAndWithdraw = (value) => {
  return /^[0-9]+$/.test(value) && value > 0;
};

// Update deposit and withdraw input validity
const updateDepositAndWithdrawValidity = () => {
  inputIsValid.deposit = isValidDepositAndWithdraw(depositInput.value);
  inputIsValid.withdraw = isValidDepositAndWithdraw(withdrawInput.value);
  depositBtn.disabled = !inputIsValid.deposit;
  withdrawBtn.disabled = !inputIsValid.withdraw;

  // console.log(!inputIsValid.deposit);
};

function depositDisplayHandler() {
  const oldDeposit = localStorage.getItem("deposit");
  depositDisplay.innerText = oldDeposit ? `$${oldDeposit}` : "$00";
}

function withdrawDisplayHandler() {
  const oldWithdraw = localStorage.getItem("withdraw");
  withdrawDisplay.innerText = oldWithdraw ? `$${oldWithdraw}` : "$00";
}

function balanceDisplayHandler() {
  const balance = localStorage.getItem("balance");
  balanceDisplay.innerText = balance ? `$${balance}` : "$00";
}

// Handle deposit button click
function depositBtnHandler() {
  localStorage.setItem("deposit", depositInput.value);
  const oldBalance = localStorage.getItem("balance");
  const setBalance = (parseInt(oldBalance) || 0) + parseInt(depositInput.value);

  localStorage.setItem("balance", setBalance);
  depositDisplayHandler();
  balanceDisplayHandler();
  depositInput.value = null;
  inputIsValid.deposit = false;
  depositBtn.disabled = true;
}

// Handle Withdraw button click

function withdrawBtnHandler() {
  localStorage.setItem("withdraw", withdrawInput.value);
  const oldBalance = localStorage.getItem("balance");
  const setBalance =
    (parseInt(oldBalance) || 0) - parseInt(withdrawInput.value);

  localStorage.setItem("balance", setBalance);
  balanceDisplayHandler();
  withdrawDisplayHandler();
  withdrawInput.value = null;
  inputIsValid.withdraw = false;
  withdrawBtn.disabled = true;
}

depositDisplayHandler();
balanceDisplayHandler();
withdrawDisplayHandler();
// Attach event listeners to deposit and withdraw inputs
depositBtn.addEventListener("click", depositBtnHandler);
withdrawBtn.addEventListener("click", withdrawBtnHandler);
depositInput.addEventListener("keyup", updateDepositAndWithdrawValidity);
withdrawInput.addEventListener("keyup", updateDepositAndWithdrawValidity);
