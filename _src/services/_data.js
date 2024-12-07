export default {
  type: "service",
  layout: "layouts/service.vto",
  templateEngine: "vto,md",
  parentTitle: "Service",
};

export function url(page) {
  return `/services/${page.data.title}/`;
}
