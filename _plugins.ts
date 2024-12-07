import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import inline from "lume/plugins/inline.ts";
import metas from "lume/plugins/metas.ts";
import sass from "lume/plugins/sass.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import svgo from "lume/plugins/svgo.ts";
import transform_images from "lume/plugins/transform_images.ts";

const site = lume({ src: "_src" });

site.filter(
  "getRelatedPosts",
  (postsList, tags) =>
    postsList.filter((post) => {
      for (let tag of tags) {
        if (post.tags.includes(tag)) return post;
      }
    }),
);

site.use(date());
site.use(esbuild({ target: "es6" }));
site.use(inline());
site.use(metas());
site.use(sass());
site.use(slugify_urls());
site.use(svgo());
site.use(transform_images());

export default function () {
  return (site: Site) => {
    site
      .filter(
        "getRelatedPosts",
        (postsList, tags) =>
          postsList.filter((post) => {
            for (let tag of tags) {
              if (post.tags.includes(tag)) return post;
            }
          }),
      )
      .use(date())
      .use(esbuild({ target: "es6" }))
      .use(inline())
      .use(metas())
      .use(sass())
      .use(slugify_urls())
      .use(svgo())
      .use(transform_images())
      .copy("js")
      .copy("static", ".");
  };
}
