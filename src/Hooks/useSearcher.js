import { useState } from "react";

function useSearcher(functionSearch) {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null)

    const onChangueSearch = (e) => {
        setSearch(e.target.value)
    }

    const clearResults = () => {
        setResults([])
    }

    const searching = async () => {
        setLoading(true)
        try {
            const resultsSearch = await functionSearch(search);
            setResults(resultsSearch)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const searchingKey = (e) => {
        e.key
    }
  
    const states = {search, results, loading, error }

    const functions = {searching, onChangueSearch, clearResults}


    return {states, functions}
}

export {useSearcher};