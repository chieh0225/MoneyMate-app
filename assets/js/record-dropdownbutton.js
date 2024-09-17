const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownButton = document.getElementById("record-dropdownbutton");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    dropdownButton.firstChild.textContent = this.textContent;
  });
});
