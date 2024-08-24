import { atom } from "recoil";

export const codeSnippets = atom({
    key: 'codeSnippets',
    default: []
})

export const loader = atom({
    key: 'loader',
    default: false
})