import { JSX } from "solid-js/h/jsx-runtime";
import Editor from "./editor/editor";


const Get = (props: { appName?: string } ) => {
  const GetApp = () => {
    let app: JSX.Element;
    switch(props.appName) {
      case "editor":
        app = Editor
        break;
      default:
        app = <></>
    }
    return app
  }

  return <>
    {GetApp()}
  </>
}

export default Get
