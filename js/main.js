function toggleProject(element) {
  const body = element.nextElementSibling;
  const icon = element.querySelector("span");

  if (body.style.display === "block") {
    body.style.display = "none";
    icon.textContent = "+";
  } else {
    body.style.display = "block";
    icon.textContent = "−";
  }
}
