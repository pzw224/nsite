async function getInitialData(query: any) {
  let data = await fetch(
    `/api/insightsList?lang=${query?.lang ?? "cn"}&page=${query?.pageIndex}`
  );
  return data.json();
}

async function insightsDetail(id: string) {
  let data = await fetch("/api/insightsDetail?id=" + id, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return data.json();
}

async function deleteInsight(id: string) {
  let data = await fetch("/api/deleteInsights", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  return data.json();
}

async function updateInsight(formData: any) {
  let data = await fetch("/api/updateInsights", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  });
  return data.json();
}

async function addInsight(body: any) {
  let data = await fetch("/api/addInsights", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data.json();
}

export {
  getInitialData,
  insightsDetail,
  deleteInsight,
  updateInsight,
  addInsight,
};
