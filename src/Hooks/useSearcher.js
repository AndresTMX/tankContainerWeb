import { useState } from "react";

function useSearcher(functionSearch, arraySearching, typeRegister) {

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
            setTimeout(() => {
                const resultsSearch = functionSearch(typeRegister, search, arraySearching);
                if (resultsSearch instanceof Error) {
                    setError(resultsSearch)
                    setLoading(false)
                } else {
                    setResults(resultsSearch)
                    setLoading(false)
                }

            }, 2000)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const searchingKey = (e) => {

        if (e.key === "Enter") {
            searching();
        }

        if (e.key === "Backspace" && search === "") {
            clearResults();
        }
    }

    const states = { search, results, loading, error }

    const functions = { searching, onChangueSearch, clearResults, searchingKey }


    return { states, functions }
}

export { useSearcher };