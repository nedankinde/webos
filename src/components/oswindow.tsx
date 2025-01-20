import { Accessor, createSignal } from 'solid-js';
import { css } from 'solid-styled';
import useWMStore from '~/lib/store';
import Get from "~/apps/get";

type OSWindowProps = {
  key: number
  appname?: string
  size: Accessor<{ x: number, y: number }>
  setSize: (old: any) => void
  position: Accessor<{ x: number, y: number }>
  setPosition: (old: any) => void
  zIndex: Accessor<number>
  setZIndex: (old: any) => void
}

const OSWindow = (props: OSWindowProps) => {
  const [offset, setOffset] = createSignal({ x: 0, y: 0 });
  
  const [dragging, setDragging] = createSignal(false);
  const [resizing, setResizing] = createSignal(false);
  
  const bringToFront = useWMStore(state => state.bringToFront)
  const remove = useWMStore(state => state.remove)
  const minimize = useWMStore(state => state.minimize)
  
  const [closing, setClosing] = createSignal(false);
  
  css`
    #window {
      position: absolute;
      z-index: ${'' + props.zIndex() };
      left: ${'' + props.position().x + 'px'};
      top: ${'' + props.position().y + 'px'};
      width: ${'' + props.size().x + 'px'};
      height: ${'' + props.size().y + 'px'};
      user-select: none;
      overflow: clip;
      text-wrap: none;
      backdrop-filter: blur(14px);
      scale: ${ closing() ? '0' : '1' };
      opacity: ${ closing() ? '0.9' : '1' };

      transition: opacity 0.1s, scale 0.2s;
    }
    #window-content {
      opacity: ${ dragging() ? '0.5' : '1' };
      transition: opacity 0.1s;
    }
    #window-header {
      text-wrap: nowrap;
      opacity: ${ dragging() ? '0.9' : '1' };

      transition: opacity 0.1s;
    }
  `;

  const maximize = () => {
    props.setPosition({
      x: 0,
      y: 0,
    })

    setOffset({
      x: 0,
      y: 0,
    })

    props.setSize({
      x: window.innerWidth,
      y: window.innerHeight
    })
  }

  const onDragStart = (e: PointerEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - props.position().x,
      y: e.clientY - props.position().y,
    });

    (e.target as any).setPointerCapture(e.pointerId)

    e.preventDefault();
  }

  const onDragEnd = (e: PointerEvent) => { 
    setDragging(false)
    
    e.preventDefault();
  }

  const onDrag = (e: PointerEvent) => {
    if (!dragging()) return;

    props.setPosition({
      x: Math.min(e.clientX - offset().x, window.innerWidth - props.size().x),
      y: Math.min(e.clientY - offset().y, window.innerHeight - props.size().y),
    });

    e.preventDefault();
  }
  
  const onResizeStart = (e: PointerEvent) => {
    setResizing(true);

    (e.target as any).setPointerCapture(e.pointerId)

    e.preventDefault();
  }

  const onResizeEnd = (e: PointerEvent) => { 
    setResizing(false)
    
    e.preventDefault();
  }

  const onResize = (e: PointerEvent) => {
    if (!resizing()) return;

    props.setSize((old: {x: number, y: number}) => {
      return {
        x: Math.max(100, old.x + e.movementX),
        y: Math.max(100, old.y + e.movementY)
      }
    });

    e.preventDefault();
  }

  const onRemove = () => {
    setClosing(true)
    setTimeout(() => {
      remove(props.key)
    }, 300)
  }

  return <div id="window" class="flex flex-col relative rounded-md shadow-xl" onPointerDown={() => bringToFront(props.key)}>

    <div class="absolute -z-10 w-full h-full bg-white opacity-85"/>
    <div id="window-header" class="bg-gray-100 py-1 px-4 flex gap-2 items-center shadow-sm" onPointerMove={onDrag} onPointerDown={onDragStart} onPointerUp={onDragEnd} onPointerLeave={onDragEnd}>
      <div class="flex gap-2">
        <div class="w-[14px] h-[14px] rounded-full bg-red-400 cursor-pointer" onClick={onRemove}/>
        <div class="w-[14px] h-[14px] rounded-full bg-green-400 cursor-pointer" onClick={maximize}/>
        <div class="w-[14px] h-[14px] rounded-full bg-yellow-400 cursor-pointer" onClick={() => minimize(props.key)}/>
      </div>
      <div class="text-sm font-medium text-center flex-grow">
        {props.appname}
      </div>
      <div class="w-6"/>
    </div>

    <div id="window-content" class="flex-grow overflow-auto">
      <Get appName={props.appname}/> 
    </div>

    <div id="window-footer" class="flex justify-end cursor-nwse-resize">
      <div onPointerMove={onResize} onPointerDown={onResizeStart} onPointerUp={onResizeEnd} onPointerLeave={onResizeEnd}>
        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 15L15 21M21 8L8 21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div>
    </div>
  </div>
}


export default OSWindow;
