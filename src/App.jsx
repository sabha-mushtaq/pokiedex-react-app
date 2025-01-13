
import React, { useState } from "react";
import Search from "./components/search/search";
import CustomRoutes from "./routes/customroutes";

function App() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <Search onSearch={handleSearch} />
            <CustomRoutes searchQuery={searchQuery} />
        </>
    );
}

export default App;



