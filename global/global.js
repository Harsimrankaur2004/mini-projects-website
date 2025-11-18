export const sidebar = document.querySelector(".sidebar");
export const hamburger = document.querySelector(".hamburger");
export const close = document.querySelector(".close");
const navLinks = document.querySelector(".nav-links");
const labelDropdown = document.querySelector(".label-dropdown");

export function styles(el, displayStyle) {
  return (el.style.display = displayStyle);
}

export function manageClass(el, action, className) {
  return el.classList[action](className);
}

export function toggleHmabrgerAndClose() {
  if (
    manageClass(sidebar, "contains", "close-sidebar") ||
    (!manageClass(sidebar, "contains", "open-sidebar") &&
      close.style.display === "block")
  ) {
    styles(close, "none");
    styles(hamburger, "block");
  } else {
    styles(close, "block");
    styles(hamburger, "none");
  }
}

export function manageDropdown() {
  labelDropdown.addEventListener("click", () => {
    manageClass(navLinks, "toggle", "open-navlinks");
  });

  document.addEventListener("click", (e) => {
    // close dropdown if open and click is outside
    if (
      manageClass(navLinks, "contains", "open-navlinks") &&
      !labelDropdown.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      manageClass(navLinks, "remove", "open-navlinks");
    }
  });
}

// footer
document.querySelector(".footer").innerHTML = `
   <div class="social-links">
    <a href="https://github.com/Harsimrankaur2004" target="_blank"
      >GitHub</a>
    <a
      href="http://linkedin.com/in/harsimran-kaur2004/"
      target="_blank"
      >LinkedIn</a>
    <a href="mailto:harsimrankaur29483@gmail.com">Email</a>
  </div>
  <p>&copy; 2025 Harsimran's Mini Projects</p>`;
