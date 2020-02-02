export function deleteById(data: any[], id: string) {
  let result = [];

  for(let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length) {
      const newChildren = deleteById(data[i].children, id);
      if (newChildren.length) {
        data[i].children = newChildren;
      } else {
        delete data[i].children;
      }
    }
    if (data[i].id !== id) {
      result.push(data[i]);
    }
  }

  return result;
}
