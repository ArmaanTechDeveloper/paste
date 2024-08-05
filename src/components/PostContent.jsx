import { useState } from "react"
import { POSTcode } from "../firebase"
import { useNavigate } from "react-router-dom"

const PostContent = () => {

    const [title , setTitle] = useState('')
    const [code , setCode] = useState('')
    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }
    const handleSubmit = async () => {
        await POSTcode(title , code)
        setTitle('')
        setCode('')
    }
    return (
        <div className="container">
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input className="form-control" value={title} onChange={(e) => handleTitleChange(e)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Code</label>
                <textarea className="form-control" rows="10" value={code} onChange={(e) => handleCodeChange(e)}></textarea>
            </div>

            <button type="button" className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            <button type="button" className="btn btn-primary ms-3" onClick={() => navigate('/')}>Go to /</button>
        </div>
    )
}

export default PostContent