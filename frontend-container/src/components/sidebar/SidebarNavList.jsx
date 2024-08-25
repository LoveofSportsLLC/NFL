import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { useLocation } from 'react-router-dom';
import reduceChildRoutes from './reduceChildRoutes';

const SidebarNavList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({
        items,
        page,
        currentRoute,
        depth,
        SidebarNavListComponent: SidebarNavList,
      }),
    [],
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

SidebarNavList.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object).isRequired, // Validate that `pages` is an array of objects
  depth: PropTypes.number.isRequired, // Validate that `depth` is a number
};

export default SidebarNavList;
