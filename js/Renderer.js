import { parseHTMLToVDOM } from "./Parser.js"
import { isChanged } from "./Diff.js";

export default class Renderer {
  constructor(rootId) {
    this.root = document.getElementById(rootId); // 렌더링할 루트 요소
    this.virtualDOM = null; // 이전 Virtual DOM 저장
  }

  // ✅ 1. 새 Virtual DOM을 받아서 렌더링
  render(htmlString) {
    const newVDOM = parseHTMLToVDOM(htmlString); // HTML → Virtual DOM 변환

    if (!this.virtualDOM) {
      this.root.appendChild(this.createElement(newVDOM)); // 처음 렌더링
    } else {
      this.updateElement(this.root, newVDOM, this.virtualDOM); // 변경 사항 반영
    }

    this.virtualDOM = newVDOM; // 현재 Virtual DOM 저장
  }

  // ✅ 2. Virtual DOM을 실제 DOM 요소로 변환
  createElement(node) {
    if (typeof node === "string") {
      return document.createTextNode(node);
    }

    const element = document.createElement(node.tag);
    if (node.attrs) {
      Object.entries(node.attrs).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    (node.children || []).forEach((child) =>
      element.appendChild(this.createElement(child))
    );

    return element;
  }

  // ✅ 3. 기존 Virtual DOM과 비교하여 변경 사항만 업데이트
  updateElement(parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
      parent.appendChild(this.createElement(newNode));
    } else if (!newNode) {
      parent.removeChild(parent.childNodes[index]);
    } else if (isChanged(newNode, oldNode)) {
      parent.replaceChild(this.createElement(newNode), parent.childNodes[index]);
    } else if (newNode.children) {
      newNode.children.forEach((child, i) =>
        this.updateElement(parent.childNodes[index], child, oldNode.children[i], i)
      );
    }
  }
}
