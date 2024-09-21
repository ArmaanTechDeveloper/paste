import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xhnjumqeepoizrutuosu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhobmp1bXFlZXBvaXpydXR1b3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTY2MTYsImV4cCI6MjA0MjQ3MjYxNn0.3x938wrDu-7lzteppmmDI3bLWNFwkuKGpaiflvfyyuA"

const supabase = createClient(supabaseUrl, supabaseKey)

const fetchCodes = async (setSnippets , setLoading) => {
    setLoading(true)
    const {data , error} = await supabase.from("snippets").select("*").order("id" , {ascending: false})
    if(error){
        console.log('Error fetching the code snippets')
        setLoading(false);
        return
    }

    console.log('Fetching successfull' , data)
    setSnippets(data);
    setLoading(false);
    
}

const postCode = async (title , code) => {
    const {error} = await supabase.from("snippets").insert({title: title , snippet: code})

    if(error){
        console.log('Error posting to the table');
        return;
    }

    console.log('code posted successfully')
}

const deleteRow = async (id) => {
    const {error} = await supabase.from("snippets").delete().eq('id' , id)

    if(error) {
        console.log('Error deleting the row');
        return;
    }

    console.log('Deletion Successfull !!')

}

export {
    supabase,
    fetchCodes,
    postCode,
    deleteRow
}