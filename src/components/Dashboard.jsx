import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { codeSnippets } from '../atoms';
import { useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { loader } from '../atoms';
import { fetchCodes , deleteRow } from '../supabase';
import Modal from './Modal';
import { modal as modalAtom } from '../atoms';

import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Dashboard = () => {

    const [snippets, setSnippets] = useRecoilState(codeSnippets)
    const [modal , setModal] = useRecoilState(modalAtom)

    const [password , setPassword] = useState("");
    const [openedId , setOpenedId] = useState(0);

    const setLoading = useSetRecoilState(loader)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCodes(setSnippets , setLoading)
    }, [])

    const copyToClipboard = (snippet) => {
        navigator.clipboard.writeText(snippet.snippet)
        alert(`Copied to clipboard ${snippet.title}`)
    }

    const openModal = (id) => {
        setModal(true)
        setOpenedId(id);
    }
    const handleDelete = async () => {
        // check password
        if(password === "planetearth"){
            // remove the row from the database
            await deleteRow(openedId)
            fetchCodes(setSnippets , setLoading)
        }
        else {
            console.log('password invalid')
        }
        setPassword("")
        setModal(false)
        
    }
    
    return (
        <>
        {modal && 
            <Modal>
                <div className='modal-container'>
                    <h1>Enter password to delete</h1>
                    <input type="text" className='modal-input' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleDelete}>Submit</button>
                </div>
            </Modal>
        }
        <div className='container pt-3 pb-5'>
            {snippets.map((snippet) => (
                <div key={`${snippet.id}`}>
                    <div className='d-flex justify-content-between'>
                        <h1>{`${snippet.title}`}</h1>
                        <div>
                            <button type="button" className="btn btn-danger mb-1 float-right mx-1" onClick={() => openModal(snippet.id)}><DeleteIcon/></button>
                            <button type="button" className="btn btn-dark mb-1 float-right" onClick={() => copyToClipboard(snippet)}><ContentPasteIcon /></button>
                        </div>
                    </div>
                    <SyntaxHighlighter language="c" style={atomOneDark}>
                        {snippet.snippet}
                    </SyntaxHighlighter>
                </div>
            ))}
            <button type="button" className="btn btn-dark" onClick={() => navigate('/post')}><ExitToAppIcon /> Post Data</button>
        </div>
        </>
    )
}

export default Dashboard