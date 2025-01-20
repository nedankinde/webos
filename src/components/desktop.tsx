import { css } from "solid-styled";
import OSWindowManager from "./oswindow-manager";
import Dock from "./dock";

const Desktop = () => {

  css `
    #desktop {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
  `;
  
  return (
    <div id="desktop">
      <img src="/background.svg" class="absolute -z-50 top-0 left-0 w-full h-screen object-cover"/>
      <OSWindowManager/>
      <Dock/>
    </div>
  )
}

export default Desktop;
