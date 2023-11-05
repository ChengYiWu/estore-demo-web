import { matchPath } from "react-router-dom";
import { SitemapParentPathMap } from "@/layouts/sitemap";
import { RouteSitemap, Sitemap } from "@/layouts/sitemap.types";

const sitemapUtil = {
  // 取得符合 pathname 的 Route 資訊
  getMatchSitemapAndParents: (pathname: string): { sitemap: RouteSitemap; parents: Sitemap[] } | null => {
    const sitemapEntry = [...SitemapParentPathMap.entries()].find(([sitemap]) =>
      matchPath(pathname, sitemap.route.path),
    );
    return sitemapEntry ? { sitemap: sitemapEntry[0], parents: sitemapEntry[1] } : null;
  },
};

export default sitemapUtil;
