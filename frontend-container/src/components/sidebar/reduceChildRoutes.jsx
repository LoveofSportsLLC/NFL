import React from 'react';
import { matchPath } from 'react-router-dom';
import SidebarNavListItem from './SidebarNavListItem';

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute, SidebarNavListComponent } = props;

  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute,
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={page.title}
        href={page.href}
      >
        <SidebarNavListComponent depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>,
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
      />,
    );
  }

  return items;
};

export default reduceChildRoutes;
