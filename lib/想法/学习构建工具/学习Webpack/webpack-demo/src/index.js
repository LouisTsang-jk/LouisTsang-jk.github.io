function component() {
  // log: component fn called
  const element = document.createElement("div");
  element.innerHTML = "Hello World";
  return element;
}
document.body.appendChild(component());
