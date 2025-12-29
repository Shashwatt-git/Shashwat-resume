function toggleProject(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector("span");

  body.classList.toggle("open");
  icon.textContent = body.classList.contains("open") ? "−" : "+";
}
