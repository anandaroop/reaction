import React from "react"
// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"
import Icon from "../Icon"
import Button, { ButtonProps } from "./Default"

const FacebookButton = (props: ButtonProps) => {
  const icon = <Icon name="facebook" color="white" />
  return (
    <Button {...props} icon={icon}>
      {props.children || "Log in with Facebook"}
    </Button>
  )
}

export default styled(FacebookButton)`
  background: #39439c;
  color: white;
  height: 40px;
  padding: 0 30px;
  margin: 10px auto 2px;
  flex-direction: row;

  &:hover:not(:disabled) {
    background: #252c68;
  }
`
