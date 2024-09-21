import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { loader } from "../atoms"

import { postCode } from "../supabase"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostContent = () => {

    const [title , setTitle] = useState('')
    const [code , setCode] = useState('')
    const setLoading = useSetRecoilState(loader)

    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }
    const handleSubmit = async () => {
        setLoading(true)
        await postCode(title , code)
        setTitle('')
        setCode('')
        setLoading(false)
    }
    return (
        <div className="container mt-3">
            <h1>Post your code to share with everyone !</h1>
            <div className="mb-3">
                <input placeholder="Title" className="form-control" value={title} onChange={(e) => handleTitleChange(e)}/>
            </div>
            <div className="mb-3">
                <textarea placeholder="Your code here !" className="form-control" rows="10" value={code} onChange={(e) => handleCodeChange(e)}></textarea>
            </div>

            <button type="button" className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            <button type="button" className="btn btn-primary ms-3" onClick={() => navigate('/')}><ArrowBackIcon /> Go to dashboard</button>
        </div>
    )
}

export default PostContent