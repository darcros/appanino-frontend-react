import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import Box from '@material-ui/core/Box';
import MaterialBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Home, Restaurant, AccountCircle } from '@material-ui/icons/';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

import { BreadcrumbsItem } from './BreadcrumbsItem';

// Literals are enabled in this block because they actually are translation keys
/* eslint-disable i18next/no-literal-string */
const breadcrumbsMap: { [key: string]: { icon: React.ComponentType<SvgIconProps>; titleKey: string } } = {
  // TODO: add other pages when I create them
  '/shop': {
    titleKey: 'page.shop.breadcrumb',
    icon: Restaurant,
  },
  '/user': {
    titleKey: 'page.user-settings.breadcrumb',
    icon: AccountCircle,
  },
};
/* eslint-enable i18next/no-literal-string */

export const Breadcrumbs = withRouter(({ location }) => {
  const { t } = useTranslation();
  const pathNames = location.pathname.split('/').filter(x => x);

  return (
    <Box mt={4}>
      <MaterialBreadcrumbs aria-label={t('component.breadcrumbs.aria-label')}>
        <BreadcrumbsItem href="/" icon={Home} title={t('page.home.breadcrumb')} />
        {pathNames.map((_item, i) => {
          const last = i === pathNames.length - 1;
          const to = `/${pathNames.slice(0, i + 1).join('/')}`;
          const { icon, titleKey } = breadcrumbsMap[to];

          return <BreadcrumbsItem key={i} href={last ? undefined : to} icon={icon} title={t(titleKey)} />;
        })}
      </MaterialBreadcrumbs>
    </Box>
  );
});
