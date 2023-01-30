function getQuery() {
  let arr = window.location.href.split("?")?.[1]?.split("&");
  let obj: any = {};
  if (arr && arr?.length > 0) {
    for (let i of arr) {
      obj[i?.split("=")[0]] = i.split("=")[1];
    }
  }
  return obj;
}

export { getQuery };
