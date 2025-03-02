import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import inline from "lume/plugins/inline.ts";
import metas from "lume/plugins/metas.ts";
import sass from "lume/plugins/sass.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import svgo from "lume/plugins/svgo.ts";
import transform_images from "lume/plugins/transform_images.ts";
import decapCMS from "lume/plugins/decap_cms.ts";

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
      .filter("toWebp", (value) => {
        if (!value || typeof value !== "string") return value; // Als het geen string is, geef de originele waarde terug
        return value.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      })
      .use(date())
      .use(esbuild({ target: "es6" }))
      .use(inline())
      .use(metas())
      .use(sass())
      .use(svgo())
      .use(transform_images())
      .use(slugifyUrls({
        extensions: "*",
        lowercase: true,
      }))
      .use(decapCMS())
      
      .copy("js")
      .copy("static", ".");
  };
}
