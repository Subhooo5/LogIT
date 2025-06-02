import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const {id} = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.filter((p) => p._id === id)[0]

  return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
        <input className='p-2 mt-10 w-[100%] whitespace-nowrap rounded-md text-sm font-medium px-4'
            type='text'
            placeholder='Title'
            disabled
            value={paste.title}
            onChange={(e) => setTitle(e.target.value)}
        />
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
            className="min-w-[500px] pl-2 pr-2 pt-1 pb-1 m-0 resize-none rounded-b rounded-t text-sm bg-[rgb(25,26,25)]"
            value={paste.value}
            onChange={(e) => setValue(e.target.value)}
            rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
