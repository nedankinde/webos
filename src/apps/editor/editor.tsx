import { createSignal } from "solid-js"

const Editor = () => {
  const [text, setText] = createSignal("")
  return <>
    <textarea id="editor" onChange={(e) => setText(e.target.value)} class="w-full h-[98%] resize-none focus:border-0 focus:ring-0 focus:outline-0 pt-3 px-2">
      {text()}
    </textarea>
  </>
}

export default Editor
