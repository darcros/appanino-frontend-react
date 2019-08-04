import React from 'react';
import { ListSubheader, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categoryUl: {
      padding: 0,
      listStyle: 'none',
    },
    subheader: {
      paddingTop: theme.spacing(2),
    },
  }),
);

interface CategoryProps {
  title: string;
}

export const ProductCategory: React.FC<CategoryProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <li>
      <ul className={classes.categoryUl}>
        <ListSubheader className={classes.subheader}>
          <Typography color="textPrimary" variant="h5">
            {title}
          </Typography>
        </ListSubheader>
        {children}
      </ul>
    </li>
  );
};
