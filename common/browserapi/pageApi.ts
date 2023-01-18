async function deletePage(id: string) {
  let data = await fetch("/api/deletePage", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  return data.json();
}

async function addPage(body: any) {
  let data = await fetch("/api/addPage", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data.json();
}

async function updatePage(formData: any) {
  let data = await fetch("/api/updatePage", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  });
  return data.json();
}

async function pageDetail(id: string) {
  let data = await fetch("/api/pageDetail?id=" + id, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return data.json();
}

async function getInitialPage(query: any) {
  let queryString = "";
  if (query) {
    for (let key in query) {
      queryString += `&${key}=${query[key]}`;
    }
  }
  if (queryString) {
    queryString = queryString.substring(1);
  }

  let data = await fetch(`/api/pageList?${queryString}`);
  return data.json();
}

async function getPageInfo(query: any) {
  let queryString = "";
  if (query) {
    for (let key in query) {
      queryString += `&${key}=${query[key]}`;
    }
  }
  if (queryString) {
    queryString = queryString.substring(1);
  }
  let data = await fetch(`/api/pageInfo?${queryString}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return data.json();
}

export {
  deletePage,
  addPage,
  pageDetail,
  updatePage,
  getInitialPage,
  getPageInfo,
};
