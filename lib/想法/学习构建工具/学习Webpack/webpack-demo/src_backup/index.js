import { sum } from './utils'
import './index.css'

function component() {
  // log: component fn called
  const element = document.createElement("div");
  element.innerHTML = `2 + 5 = ${sum(2, 5)}`;
  return element;
}

document.body.appendChild(component());
