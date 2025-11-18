import { projects } from "./data/projects.js";
import {
  sidebar,
  close,
  hamburger,
  manageClass,
  toggleHmabrgerAndClose,
  manageDropdown,
} from "../../global/global.js";

document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list");
  const projectIframe = document.getElementById("project-iframe");
  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-description");
  const codeButtons = document.querySelectorAll(".code-button");
  const codeBlocks = document.querySelectorAll(".code-block");
  const copyCodeBtns = document.querySelectorAll(".copy-code-btn");

  // Update and highlight code
  function updateCodeBlock(blockId, code, langClass) {
    const codeElement = document.getElementById(blockId).querySelector("code");
    codeElement.textContent = code;
    codeElement.className = langClass;
    if (typeof hljs !== "undefined") hljs.highlightElement(codeElement);
  }

  function loadProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectIframe.src = project.path;

    updateCodeBlock("html-code-block", project.code.html, "language-html");
    updateCodeBlock("css-code-block", project.code.css, "language-css");
    updateCodeBlock("js-code-block", project.code.js, "language-javascript");

    document
      .querySelectorAll("#project-list li")
      .forEach((item) => item.classList.remove("active"));

    const activeItem = document.querySelector(
      `#project-list li[data-project-id="${projectId}"]`
    );

    if (activeItem) activeItem.classList.add("active");

    localStorage.setItem("activeProjectId", projectId);

    codeButtons.forEach((btn) => btn.classList.remove("active"));
    codeBlocks.forEach((block) => block.classList.remove("active"));
    document.getElementById("show-html-btn").classList.add("active");
    document.getElementById("html-code-block").classList.add("active");
  }

  // Sidebar clicks
  projectList.addEventListener("click", (event) => {
    const listItem = event.target.closest("li");
    if (listItem && listItem.dataset.projectId)
      loadProject(listItem.dataset.projectId);
    manageClass(sidebar, "add", "close-sidebar");
    toggleHmabrgerAndClose();
  });

  // Code tab buttons
  codeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      codeButtons.forEach((btn) => btn.classList.remove("active"));
      codeBlocks.forEach((block) => block.classList.remove("active"));
      button.classList.add("active");
      const targetId = button.id
        .replace("show-", "")
        .replace("-btn", "-code-block");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Copy code buttons
  copyCodeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const codeElement = document
        .getElementById(button.dataset.target)
        .querySelector("code");
      navigator.clipboard.writeText(codeElement.innerText).then(() => {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = originalText), 1500);
      });
    });
  });

  const goFullScrnBtn = document.querySelector(".goFullScrn");
  goFullScrnBtn.addEventListener("click", () => {
    projectIframe.requestFullscreen();
  });

  hamburger.addEventListener("click", () => {
    manageClass(sidebar, "remove", "close-sidebar");
    toggleHmabrgerAndClose();
  });

  close.addEventListener("click", () => {
    manageClass(sidebar, "add", "close-sidebar");
    toggleHmabrgerAndClose();
  });

  manageDropdown();

  document.addEventListener("click", (e) => {
    // close sidebar if open and click is outside
    if (
      !manageClass(sidebar, "contains", "close-sidebar") &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      manageClass(sidebar, "add", "close-sidebar");
      toggleHmabrgerAndClose();
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get("id");

    if (urlId && projects[urlId]) {
      loadProject(urlId);

      params.delete("id");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    } else {
      const lastProjectId =
        localStorage.getItem("activeProjectId") || Object.keys(projects)[0];
      loadProject(lastProjectId);
    }
  });
});
