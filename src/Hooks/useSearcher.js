import { useState } from "react";

function useSearcher() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null)

    const onChangueSearch = () => {
        setSearch(search)
    }

    const clearResults = () => {
        setResults([])
    }

    const searching = async (search) => {
        setLoading(true)
        try {
            const resultsSearch = callApi(search);
            setResults(resultsSearch)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
  
    const states = {search, results, loading, error }

    const functions = {searching}


    return {states, functions}
}

export {useSearcher};