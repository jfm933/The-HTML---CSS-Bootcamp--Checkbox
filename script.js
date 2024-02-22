import { htmlCssBottCampVideoData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const videoTitles = htmlCssBottCampVideoData;
  const videoList = document.getElementById("videoList");

  const courseKey = "htmlCssBootcampVideo";

  function createCheckbox(title, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `${courseKey}${index + 1}`;
    checkbox.checked =
      localStorage.getItem(`${courseKey}${index + 1}`) === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem(`${courseKey}${index + 1}`, checkbox.checked);
    });

    const label = document.createElement("label");
    label.htmlFor = `${courseKey}${index + 1}`;
    label.textContent = `Video ${index + 1}: ${title}`;

    const listItem = document.createElement("div");
    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
  }

  function checkVideos(start, end) {
    for (let i = 1; i <= videoTitles.length; i++) {
      const checkbox = document.getElementById(`${courseKey}${i}`);
      if (checkbox) {
        checkbox.checked = i >= start && i <= end;
        localStorage.setItem(`${courseKey}${i}`, checkbox.checked);
      }
    }
  }

  function clearLocalStorage() {
    // Loop through all keys and remove ones for this course
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith(courseKey)) {
        localStorage.removeItem(key);
      }
    }

    // Uncheck all checkboxes
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
  }

  videoTitles.forEach((title, index) => {
    videoList.appendChild(createCheckbox(title, index));
  });

  const clearLocalStorageBtn = document.getElementById("clearLocalStorageBtn");
  if (clearLocalStorageBtn) {
    clearLocalStorageBtn.addEventListener("click", clearLocalStorage);
  }

  const checkVideosBtn = document.getElementById("checkVideosBtn");
  if (checkVideosBtn) {
    checkVideosBtn.addEventListener("click", () => {
      const start = parseInt(document.getElementById("videoRangeStart").value);
      const end = parseInt(document.getElementById("videoRangeEnd").value);
      checkVideos(start, end);
    });
  }
});
