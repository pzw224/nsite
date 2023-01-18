async function deleteModule(id: string) {
  let data = await fetch("/api/deleteModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  return data.json();
}

async function addModule(body: any) {
  let data = await fetch("/api/addModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data.json();
}

async function updateModule(formData: any) {
  let data = await fetch("/api/updateModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  });
  return data.json();
}

async function moduleDetail(id: string) {
  let data = await fetch("/api/moduleDetail?id=" + id, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return data.json();
}

async function getInitialData(query: any) {
  let queryString = "";
  if (query) {
    for (let key in query) {
      queryString += `&${key}=${query[key]}`;
    }
  }
  if (queryString) {
    queryString = queryString.substring(1);
  }
  
  let data = await fetch(`/api/moduleList?${queryString}`);
  return data.json();
}

async function deleteSubModule(id: string) {
  let data = await fetch("/api/deleteSubModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  return data.json();
}

async function addSubModule(body: any) {
  let data = await fetch("/api/addSubModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data.json();
}

async function updateSubModule(formData: any) {
  let data = await fetch("/api/updateSubModule", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  });
  return data.json();
}

async function moduleSubDetail(id: string) {
  let data = await fetch("/api/subModuleDetail?id=" + id, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return data.json();
}

async function getSubInitialData(query: any) {
  let queryString = "";
  if (query) {
    for (let key in query) {
      queryString += `&${key}=${query[key]}`;
    }
  }
  if (queryString) {
    queryString = queryString.substring(1);
  }

  let data = await fetch(`/api/subModuleList?${queryString}`);
  return data.json();
}

export {
  deleteModule,
  addModule,
  updateModule,
  getInitialData,
  moduleDetail,
  deleteSubModule,
  addSubModule,
  updateSubModule,
  getSubInitialData,
  moduleSubDetail,
};
