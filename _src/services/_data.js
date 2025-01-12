export default {
  type: "service",
  layout: "layouts/pages/service.vto",
  templateEngine: "vto,md",
  parentTitle: "Service",
  subtitle: "Dienst details",
};

export function url(page) {
  return `/services/${page.data.title}/`;
}
