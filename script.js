document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnSignup = document.getElementById("btnSignup");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    // Initially, login is active => disable login button
    btnLogin.disabled = true;
    btnSignup.disabled = false;
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  
    // Toggle to Login
    btnLogin.addEventListener("click", () => {
      if (!btnLogin.disabled) {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        btnLogin.disabled = true;
        btnSignup.disabled = false;
      }
    });
  
    // Toggle to Sign Up
    btnSignup.addEventListener("click", () => {
      if (!btnSignup.disabled) {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        btnSignup.disabled = true;
        btnLogin.disabled = false;
      }
    });
  });
  