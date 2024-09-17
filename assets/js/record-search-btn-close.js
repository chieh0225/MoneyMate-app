document.addEventListener("DOMContentLoaded", function () {
  const inputGroup = document.querySelector(".input-group");
  const inputField = inputGroup.querySelector(".form-control");

  inputField.addEventListener("focus", function () {
    if (!inputGroup.querySelector(".btn-close")) {
      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "btn-close";
      closeButton.setAttribute("aria-label", "Close");
      inputGroup.appendChild(closeButton);
    }
  });

  inputField.addEventListener("blur", function () {
    const closeButton = inputGroup.querySelector(".btn-close");
    if (closeButton) {
      inputGroup.removeChild(closeButton);
    }
  });
});
