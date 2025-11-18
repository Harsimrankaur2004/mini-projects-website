import {
  sidebar,
  close,
  hamburger,
  manageClass,
  toggleHmabrgerAndClose
} from "./global/global.js";
const projectBox = document.querySelectorAll(".project");

projectBox.forEach((project) => {
  project.addEventListener("click", () => {
    const projectId = project.dataset.projectId;
    console.log(projectId);
    window.location.href = `../project-page/index.html?id=${projectId}`;
  });
});

hamburger.addEventListener("click", () => {
  manageClass(sidebar, "add", "open-sidebar");
  toggleHmabrgerAndClose();
});

close.addEventListener("click", () => {
  manageClass(sidebar, "remove", "open-sidebar");
  toggleHmabrgerAndClose();
});

document.addEventListener("click", (e) => {
  if (
    manageClass(sidebar, "contains", "open-sidebar") &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    manageClass(sidebar, "remove", "open-sidebar");
   toggleHmabrgerAndClose();
  }
});
