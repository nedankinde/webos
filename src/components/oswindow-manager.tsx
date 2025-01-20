import OSWindow from "./oswindow"; 
import useWMStore from "~/lib/store";

const OSWindowManager = () => {
  const windows = useWMStore(state => state.windows)

  return (
    <div>
      {windows().map(win => (
        <>
          <OSWindow appname={win.name} size={win.size} setSize={win.setSize} key={win.key} position={win.position} setPosition={win.setPosition} zIndex={win.zIndex} setZIndex={win.setZIndex}/>
        </>
      ))}
    </div>
  );
};

export default OSWindowManager;

