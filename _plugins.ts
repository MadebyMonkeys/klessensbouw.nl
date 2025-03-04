import date from "lume/plugins/date.ts";
import decap_cms from "lume/plugins/decap_cms.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import purgecss from "lume/plugins/purgecss.ts";
import robots from "lume/plugins/robots.ts";
import sass from "lume/plugins/sass.ts";
import inline from "lume/plugins/inline.ts";
import svgo from "lume/plugins/svgo.ts";
import transform_images from "lume/plugins/transform_images.ts";

export default function () {
    return (site: Site) => {
        /** 🔹 Filters */
        site
            .filter("getRelatedPosts", (postList, tags) =>
                postList.filter((post) =>
                    tags.some((tag) => post.tags.includes(tag))
                )
            )

            .filter("toWebp", (value) => {
                if (typeof value !== "string") return value;
                return value.replace(/\.(jpg|jpeg|png)$/i, ".webp");
            });

        /** 🔹 Plugins */
        site
            .use(date())
            //.use(decap_cms())
            .use(favicon({
                input: "/static/favicon/android-icon-48x48.png",
            }))
            .use(metas())
            .use(sass())
            .use(postcss())
            .use(purgecss())
            .use(robots())
            .use(inline())
            .use(svgo())
            .use(transform_images({
                extensions: [".jpg", ".jpeg", ".png"],
                format: "webp",
                quality: 80,
            }));

        /** 🔹 Bestanden kopiëren */
        site
            .copy("js")
            .copy("static", ".");
    }
}
