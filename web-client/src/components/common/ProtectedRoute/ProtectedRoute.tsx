import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

type OwnProps = {
  allow: boolean
  redirectTo: string
}

type Props = OwnProps & RouteProps

const ProtectedRouteCmp: React.FC<Props> = (props) => {
  const { allow, redirectTo, component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props) => {
        return allow
          ? <Component {...props}/>
          : <Redirect to={redirectTo}/>
      }}
    />
  )
}

export const ProtectedRoute = ProtectedRouteCmp
