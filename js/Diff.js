export function isChanged(newNode, oldNode) {
  if (!newNode || !oldNode) return true; // ✅ null 또는 undefined 방어

  if (typeof newNode !== typeof oldNode) return true;
  if (typeof newNode === "string" && newNode !== oldNode) return true;
  if (newNode.tag !== oldNode.tag) return true;

  const newAttrs = newNode.attrs || {};
  const oldAttrs = oldNode.attrs || {};
  if (Object.keys(newAttrs).length !== Object.keys(oldAttrs).length) return true;

  for (let key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) return true;
  }

  // ✅ children이 undefined일 경우 기본값을 빈 배열로 설정
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  if (newChildren.length !== oldChildren.length) return true;

  return newChildren.some((child, i) => isChanged(child, oldChildren[i]));
}
