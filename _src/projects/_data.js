export default {
  type: "project",
  layout: "layouts/pages/project.vto",
  templateEngine: "vto,md",
  parentTitle: "Project",
  subtitle: "Project details",
};

export function url(page) {
  return `/projects/${page.data.title}/`;
}
