function throttle (fn, interval) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    let timer = setInterval(() => {
      clearInterval(timer);
      fn.apply(this, arguments);
      canRun = true;
    }, interval)
  }
}

function renderTree (node) {
  if (!node) return [];
  if (node.length <= 1) return node;
  let nodeName = node[0].nodeName;
  node[0]._parent = null;
  node[0]._children = [];
  node.reduce((prev, curr, index, arr) => {
    curr._children = [];
    if (curr.nodeName !== nodeName) {
      curr._break = true;
      if (prev.nodeName.slice(1) < curr.nodeName.slice(1)) {
        prev._children.push(curr);
        curr._parent = prev;
      } else if (prev.nodeName.slice(1) > curr.nodeName.slice(1)) {
        let i = index - 1;
        while(i > 0) {
          if (arr[i].nodeName === curr.nodeName) {
            curr._parent = arr[i]._parent;
            arr[i]._parent._children.push(curr);
            break;
          }
          i--;
        }
      } else {
        curr._parent = prev._parent;
        prev._parent._children.push(curr);
      }
    } else {
      curr._parent = null;
    }
    return curr;
  })
  return node;
}

export { throttle, renderTree };
