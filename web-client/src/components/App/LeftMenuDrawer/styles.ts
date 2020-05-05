import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  const drawerWidth = 300

  return createStyles({
    drawer: {
      width: drawerWidth,
    },

    drawerPaper: {
      width: drawerWidth,
    },

    drawerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
    },

    closeButton: {
      marginTop: -12,
      marginRight: -12,
    },
  })
}, { name: 'LeftMenuDrawer' })
