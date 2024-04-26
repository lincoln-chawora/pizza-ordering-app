import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function SearchOrder() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!query) return;

        navigate(`/order/${query}`);
        setQuery("");
    }
    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input
                placeholder="Search order #"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
        </form>
    );
}