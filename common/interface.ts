enum modalType {
  add,
  edit,
}

function commonPath(data: any) {
  if (!data || !data?.path) return "";
  let path = "";
  switch (data?.path) {
    case "insights":
    case "articles":
    case "case-studies":
    case "podcasts":
    case "videos":
    case "whitepapers":
      path = "/" + data?.path;
      break;
    case "home":
      path = "/";
      break;
    default:
      path = "/menu/" + data?.path + "?id=" + data?._id;
      break;
  }
  return path;
}
export { modalType, commonPath };
