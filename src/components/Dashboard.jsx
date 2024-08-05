import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { codeSnippets } from '../atoms';
import { GETcode } from '../firebase';
import { useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Dashboard = () => {

    const [snippets, setSnippets] = useRecoilState(codeSnippets)
    const navigate = useNavigate()

    useEffect(() => {
        GETcode(setSnippets)
    }, [])

    return (
        <div className='container pt-3 pb-5'>
            {snippets.map((snippet, index) => (
                <div key={`${index}`}>
                    <h1>{snippet.title}</h1>
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