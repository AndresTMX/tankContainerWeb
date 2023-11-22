import { useState } from "react";

function useSearcher(functionSearch, arraySearching) {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const onChangueSearch = (e) => {
        setSearch(e.target.value)
    }

    const clearResults = () => {
        setResults([])
        setError(false)
    }

    const searching = () => {
        try {
            setError(false)
            setLoading(true)
            setTimeout( () => {
            const resultsSearch = functionSearch(search, arraySearching);
            setResults(resultsSearch)
            setLoading(false)
            if(resultsSearch.length === 0){
                setError('No results')
            }
            }, 2000)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const searchingKey = (e) => {

       if( e.key === "Enter"){
        searching();
       } 

       if(e.key === "Backspace" && search === ""){
        clearResults();
       }
    }

    const states = { search, results, loading, error }

    const functions = { searching, onChangueSearch, clearResults, searchingKey }


    return { states, functions }
}

export { useSearcher };