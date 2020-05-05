import { makeStyles, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  return createStyles({
    listItem: {
      padding: 0,
    },

    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 2),
      width: '100%',
      textDecoration: 'none',
      transition: theme.transitions.create('all'),
      color: theme.palette.text.primary,

      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },

    navLinkActive: {
      backgroundColor: theme.palette.action.selected,
    },
  })
}, { name: 'DrawerItemLink' })
