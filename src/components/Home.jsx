import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes } from '../redux/pasteSlice'
import { updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    const[title, setTitle] = useState('')
    const[value, setValue] = useState('')
    const[searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get('pasteId')
    const dispatch = useDispatch()
    const allPastes = useSelector((state) => state.paste.pastes)

    useEffect(() => { 
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId)
            setTitle(paste.title)
            setValue(paste.value)
        }
    }, [pasteId])

    function createPaste(){
        const paste = {
            title: title,
            value: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        if(pasteId){
            dispatch(updateToPastes(paste)) 
        }
        else{
            dispatch(addToPastes(paste))
        }
        setTitle('')
        setValue('')
        setSearchParams({})
    }

  return (
    <div>
      <div className="flex flex-row gap-4 items-center mt-10 ">
        <input
          className="h-10 px-4 w-[80%] whitespace-nowrap rounded-md text-sm font-medium focus:outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          id='createBtn'
          onClick={createPaste}
          className="h-10 px-4 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div class="mt-7 w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl dark:border border-[rgba(128,121,121,0.3) dark:bg-[#333] ">
        <div class="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2">
          <div class="w-full flex gap-x-[6px] items-center select-none group">
            <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]"></div>
            <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]"></div>
            <div class="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]"></div>
          </div>
        <button id='copyBtn'  class="absolute right-0 bg-transparent">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="lucide lucide-copy "
            >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
        </button>
        </div>
        <textarea
            className="min-w-[500px] pl-2 pr-2 pt-1 pb-1 m-0 resize-none rounded-b rounded-t text-sm font-medium bg-[rgb(25,26,25)] focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={20}
        />
      </div>
    </div>
  );
}

export default Home