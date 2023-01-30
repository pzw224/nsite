import { getQuery } from "./until";

enum modalType {
  add,
  edit,
}

function commonPath(data: any) {
  if (!data || !data?.path) return "";
  const { lang } = getQuery();
  let path = "";
  switch (data?.path) {
    case "insights":
    case "articles":
    case "case-studies":
    case "podcasts":
    case "videos":
    case "whitepapers":
      path = "/" + data?.path + (lang ? "?lang=" + lang : "");
      break;
    case "home":
      path = "/" + (lang ? "?lang=" + lang : "");
      break;
    default:
      path =
        "/menu/" +
        data?.path +
        "?id=" +
        data?._id +
        (lang ? "&lang=" + lang : "");
      break;
  }
  return path;
}
export { modalType, commonPath };
