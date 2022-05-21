import A from './nodes/A'
import B from './nodes/B'
import C from './nodes/C'
import D from './nodes/D'

// import './index.css'

// 暂时没有async C
function print() {
  const container = document.createElement('span');
  const root = {
    name: 'root',
    dep: [new A([new C(), new D(new B())]), new B()]
  }
  container.innerHTML = JSON.stringify(root);
  return container
}

document.body.appendChild(print());
