import { useMemo } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { createStyles, cx } from "antd-style";
import sitemapUtil from "@/utils/sitemap.util";

const useStyle = createStyles(() => ({
  root: {
    margin: "1rem 1rem 0 1rem",
  },
  linkLabel: {
    marginLeft: "0.25rem",
  },
}));

const AdminLayoutBreadcrumb = () => {
  const { styles } = useStyle();
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const { sitemap, parents = [] } = sitemapUtil.getMatchSitemapAndParents(location.pathname) || {};

    return [
      {
        title: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
      },
      ...parents.map((parentSitemap) => {
        const link = parentSitemap.route?.path;

        let title = (
          <>
            {parentSitemap.icon}
            <span className={cx({ [styles.linkLabel]: !!link })}>{parentSitemap.label}</span>
          </>
        );

        if (link) {
          title = <Link to={link}>{title}</Link>;
        }

        return {
          title,
        };
      }),
      ...(sitemap ? [{ title: sitemap.label }] : []),
    ];
  }, [location.pathname, styles]);

  return <Breadcrumb items={breadcrumbItems} className={styles.root} />;
};

export default AdminLayoutBreadcrumb;
