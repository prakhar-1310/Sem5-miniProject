const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleBtn.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "dark");
  }
});
