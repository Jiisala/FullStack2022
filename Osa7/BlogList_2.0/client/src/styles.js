import styled, { css, createGlobalStyle } from 'styled-components'
import pressStart from './fonts/press-start-2p.regular.ttf'

const FontStyle = createGlobalStyle`
@font-face {
        font-family: 'Press Start';
        src: local('Press Start'), url(${pressStart}) format('truetype');
        font-style: normal;
    }
`
const GlobaStyle = createGlobalStyle`
  body{
    background: black;
    font-family: Press Start, FreeMono, monospace;

  }
`
//TARKISTA MITKÄ NÄISTÄ KAIKISTA WRAPEISTA ON OLEELLISIA
const Page = styled.div`  
background: black;
padding: 15px;
color: lime;
justify-content: center;
align-items: center;
display: flex;
overflow-wrap: break-all;
word-wrap: break-all;
word-break: break-word;
`
const Button = styled.button`
  border-style: solid;
  border-color: yellow;
  padding:5px; 
  font-family: Press start, FreeMono, monospace;
  background: black;
  color: yellow;
  margin: 5px;
  &:hover{ 
    background: yellow;
    color: black}
  ${props => props.primary && css `
  background: blue
  color: white
  `}
`
const LogoutButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  word-wrap: keep-all;
  word-break: keep-all;

`
const Input = styled.input`
  background: black;
  font-family: Press start, FreeMono, monospace;
  color: yellow;
  margin: 5px;
  border: none;
  border-bottom: 1px solid yellow;
`

const StyledMessage = styled.div`

  color: green;
  position: fixed;
  top:0px;
  background: yellow;
  padding: 10px;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 10px;
`
const StyledErrorMessage = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  top: 0px;
  color: red;
  background: yellow;
  padding: 10px;
  border-style: solid;
`
const MessageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const HWrapper = styled.div`
text-align: center;
${props => props.primary && css `
text-align: left;
  
  `}
`
const BlogWrapper = styled.div`
   padding: 5px;    
   border-bottom : 2px dotted yellow;
   line-height: 200%
`
const Link = styled.a`
    color: yellow;
    &:hover{ 
    background: yellow;
    color: black}
`


export  { GlobaStyle,
  FontStyle,
  Page,
  Button,
  Input,
  HWrapper,
  BlogWrapper,
  Link,
  StyledMessage,
  StyledErrorMessage,
  MessageWrapper,
  LogoutButtonWrapper  }