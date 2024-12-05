import { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import  debounce  from "lodash.debounce"

function SearchInput({debounceFunction}) {
    const [searchText, setSearchText] = useState("");
    const {searchData,  setSearchData, setCoinSearch} = useContext(CryptoContext)
    
    function handleInput(e) {
      e.preventDefault();
      setSearchText(e.target.value);
      debounceFunction(e.target.value);
    }

    function selectCoin(coin){
        setCoinSearch(coin);
        setSearchData();
        setSearchText("");
    }

    function HandleSubmit(e){
      e.preventDefault();
      debounceFunction(searchText);
    }

    return (
      <>
        <form
          className="w-96 relative flex items-center ml-7 font-nunito"
          onSubmit={(e) => HandleSubmit(e)}
        >
          <input
            type="text"
            name="search"
            className="w-full  rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
            placeholder="Search Here.."
            value={searchText}
            onChange={(e) => handleInput(e)}
          />
          <button type="submit" className=" absolute right-1 cursor-pointer">
            <img src={searchIcon} alt="search" />
          </button>
        </form>
        {searchText.length > 0 ? (
          <ul
            className="absolute top-11 right-0 w-96 h-96 rounded
    overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 
    backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200
    "
          >
            {searchData ? (
              searchData.map((coin) => {
                return (
                  <li
                    className="flex items-center ml-4 my-2 cursor-pointer"
                    key={coin.id}
                    onClick={() => selectCoin(coin.id)}
                  >
                    <img
                      className="w-[1rem] h-[1rem] mx-1.5"
                      src={coin.thumb}
                      alt={coin.name}
                    />

                    <span>{coin.name}</span>
                  </li>
                );
              })
            ) : (
              <div
                className="w-full h-full flex justify-center items-center
                 "
              >
                <div
                  className="w-8 h-8 border-4 border-cyan rounded-full
                 border-b-gray-200 animate-spin"
                  role="status"
                />
                <span className="ml-2">Searching...</span>
              </div>
            )}
          </ul>
        ) : null}
      </>
    );
  }
export default function Search( ) {
 

  const { getSearchResult } = useContext(CryptoContext);

  const debounceFnc = debounce( function(query){
    getSearchResult(query);
  },2000 )

  return <div className=" relative" > <SearchInput debounceFunction= {debounceFnc} /></div>;
}
