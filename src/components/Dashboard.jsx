import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { codeSnippets } from '../atoms';
import { GETcode } from '../firebase';
import { useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { loader } from '../atoms';

const Dashboard = () => {

    const [snippets, setSnippets] = useRecoilState(codeSnippets)
    const setLoading = useSetRecoilState(loader)
    const navigate = useNavigate()

    useEffect(() => {
        GETcode(setSnippets , setLoading)
    }, [])

    const copyToClipboard = (snippet) => {
        navigator.clipboard.writeText(snippet.code)
        alert(`Copied to clipboard ${snippet.title}`)
    }
    
    return (
        <div className='container pt-3 pb-5'>
            {snippets.map((snippet, index) => (
                <div key={`${index}`}>
                    <div className='d-flex justify-content-between'>
                        <h1>{`${snippet.title}`}</h1>
                        <button type="button" className="btn btn-dark mb-1 float-right" onClick={() => copyToClipboard(snippet)}>Copy</button>
                    </div>
                    <SyntaxHighlighter language="c" style={atomOneDark}>
                        {snippet.code}
                    </SyntaxHighlighter>
                </div>
            ))}
            <button type="button" className="btn btn-dark" onClick={() => navigate('/post')}>Post Data</button>
        </div>
    )
}

export default Dashboard