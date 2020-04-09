import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

import styles from './PageAppBar.scss'

import { AccountMenuButton } from './AccountMenuButton/AccountMenuButton'

type OwnProps = {
  className?: string
}

type Props = OwnProps

const PageAppBarCmp: React.FC<Props> = (props) => {
  return (
    <AppBar position='static' className={props.className}>
      <Toolbar>
        <Typography variant='h6'>
          Medlightweight
        </Typography>
        <Box className={styles.rightContent}>
          <AccountMenuButton/>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export const PageAppBar = PageAppBarCmp
