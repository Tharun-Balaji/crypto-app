import { useContext, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

function PerPage(){

    const {setPerPage} = useContext(CryptoContext);
    const inputRef = useRef(null);

    function handleSubmit(e){
        e.preventDefault();
        const val = inputRef.current.value;
        if (val !== 0) {
        setPerPage(val);
        inputRef.current.value = val;
        }
    }

    return (
        <form
        className=" relative flex items-center font-nunito mr-12"
        onSubmit={handleSubmit}
      >
        <label
          className=" relative flex justify-center items-center mr-2 font-bold"
          htmlFor="prePage"
        >
        prePage :
        </label>
        <input
          type="number"
          placeholder= "10"
          max={250}
          min={1}
          className=" w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required border border-transparent focus:border-cyan leading-4"
          name="prePage"
          ref={inputRef}
        />
        <button type="submit" className=" ml-1 cursor-pointer">
          <img src={submitIcon} alt="submit" className=" w-full h-auto" />
        </button>
      </form>
    );
}

export default function Pagination() {

   const {page, setPage, totalPages,perPage, CryptoData} = useContext(CryptoContext);

   const totalNumberOfPages = Math.ceil(totalPages/perPage);

   function Next() {
     if (page === totalNumberOfPages) return null;
     setPage(page + 1);
   }


   function Previous() {
     if (page === 1) return null;
     setPage(page - 1);
   }

   

  
    if ( CryptoData && CryptoData.length >= perPage ){
      return(
        <div className=" flex items-center">
        <PerPage/>
      <ul className=" flex items-center justify-end text-sm">
        <li className=" flex items-center">
          <button
            onClick={Previous}
            className=" outline-0 hover:text-cyan w-8 rotate-180"
          >
            <img className="w-full h-auto" src={paginationArrow} alt="left" />
          </button>
        </li>
        {page + 1 === totalNumberOfPages ||
        page === totalNumberOfPages ? (
          <li>
            <button className=" outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg">
              ...
            </button>
          </li>
        ) : null}
        {page - 1 !== 0 ? (
          <li>
            <button
              onClick={Previous}
              className=" outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5"
            >
              {page - 1}
            </button>
          </li>
        ) : null}
        <li>
          <button
            disabled
            className=" outline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
          >
            {page}
          </button>
        </li>
        {page + 1 !== totalNumberOfPages &&
        page !== totalNumberOfPages ? (
          <li>
            <button
              onClick={Next}
              className=" outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5"
            >
              {page + 1}
            </button>
          </li>
        ) : null}
        {page + 1 !== totalNumberOfPages &&
        page !== totalNumberOfPages ? (
          <li>
            <button className=" outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg">
              ...
            </button>
          </li>
        ) : null}
        {page !== totalNumberOfPages ? (
          <li>
            <button
              onClick={() => setPage(totalNumberOfPages)}
              className=" outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 mx-1.5"
            >
              {totalNumberOfPages}
            </button>
          </li>
        ) : null}
        <li>
          <button onClick={Next} className=" outline-0 hover:text-cyan w-8 ">
            <img className="w-full h-auto" src={paginationArrow} alt="right" />
          </button>
        </li>
      </ul>
    </div>
      );
    }else{
      return null;
    }
  
}
