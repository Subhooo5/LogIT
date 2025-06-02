"use client"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { removeFromPastes } from "../redux/pasteSlice"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { FaFacebook, FaWhatsapp, FaTelegram, FaXTwitter, FaCopy} from "react-icons/fa6"
import { FaTimes, FaCalendarAlt } from "react-icons/fa"
import { TbEdit, TbTrash, TbShare, TbEye, TbClipboard } from "react-icons/tb"

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const [showShare, setShowShare] = useState(false)
  const [shareLink, setShareLink] = useState("")

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return `June ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <div className=" text-white min-h-screen p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-500 pb-4">All Pastes</h1>

      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          className="h-10 flex p-2 px-9 w-full md:min-w-[500px] mt-2 mb-6 whitespace-nowrap rounded-md text-sm font-medium focus:outline-none"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className="rounded-lg p-5 bg-[rgb(25,26,25)]" key={paste?._id}>
              <div className="flex flex-col">

                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-2xl font-bold">{paste.title}</h2>
                  <div className="flex gap-2 items-center justify-center">
                    <button className="p-2 w-7 h-7 flex items-center justify-center rounded-md " title="Edit">
                      <Link to={`/?pasteId=${paste?._id}`}>
                        <TbEdit className="w-5 h-5 text-[rgb(218,216,216)] hover:text-[rgb(255,68,68)]" />
                      </Link>
                    </button>
                    <button
                      className="p-1 w-7 h-7 flex items-center justify-center rounded-md "
                      title="Delete"
                      onClick={() => handleDelete(paste?._id)}
                    >
                      <TbTrash className="w-8 h-8 hover:text-[rgb(86,106,255)]" />
                    </button>
                    <button
                      className="p-1 w-7 h-7 flex items-center justify-center rounded-md "
                      title="Share"
                      onClick={() => {
                        setShowShare(true)
                        setShareLink(`http://localhost:5173/pastes/${paste._id}`)
                      }}
                    >
                      <TbShare className="w-5 h-5 hover:text-[rgb(255,196,78)]" />
                    </button>
                    <button className="p-2 w-7 h-7 flex items-center justify-center rounded-md " title="View">
                      <Link to={`/pastes/${paste?._id}`}>
                        <TbEye className="w-5 h-5 text-[rgb(218,216,216)] hover:text-[rgb(178,91,255)]" />
                      </Link>
                    </button>
                    <button
                      className="p-1 w-7 h-7 flex items-center justify-center rounded-md "
                      title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.value)
                        toast.success("Copied!")
                      }}
                    >
                      <TbClipboard className="w-5 h-5 hover:text-[rgb(61,255,67)]" />
                    </button>
                  </div>
                </div>

                <div className="text-gray-400 mb-4 overflow-hidden text-ellipsis break-words whitespace-pre-wrap max-w-[500px]">{paste.value}</div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-400">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(paste.createdAt)}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
      </div>

      {showShare && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-lg w-[90%] max-w-md text-white relative">
            <button
              id="closeBtn"
              className="bg-transparent absolute top-1 right-1 text-gray-400 hover:text-white text-xs p-1"
              onClick={() => setShowShare(false)}
              aria-label="Close"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-semibold mb-1">Share link</h3>
            <p className="text-sm text-gray-400 mb-3">Anyone with the link will be able to view this.</p>

            <div className="flex items-center bg-gray-800 rounded overflow-hidden mb-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-transparent px-3 py-2 outline-none text-white"
              />
              <button
                id="copyBtn"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                  toast.success("Link copied!")
                }}
                className="bg-transparent p-2"
              >
                <FaCopy className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4 justify-center text-xl mt-5">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 hover:scale-110" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-blue-500 hover:scale-110" />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="text-sky-400 hover:scale-110" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-white hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pastes
