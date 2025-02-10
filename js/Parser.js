export function parseHTMLToVDOM(htmlString) {
  const template = document.createElement("template"); // 임시 DOM 생성
  template.innerHTML = htmlString.trim();
  return convertElementToVDOM(template.content.firstChild);
}

// ✅ 1. 실제 DOM 요소를 Virtual DOM(JSON)으로 변환하는 함수
function convertElementToVDOM(element) {
  if (!element) return null;

  return {
    tag: element.tagName.toLowerCase(),
    attrs: Object.fromEntries([...element.attributes].map(attr => [attr.name, attr.value])),
    children: [...element.childNodes].map(child =>
      child.nodeType === Node.TEXT_NODE ? child.textContent : convertElementToVDOM(child)
    ),
  };
}
