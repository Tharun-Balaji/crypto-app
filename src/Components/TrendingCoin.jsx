import {useNavigate} from 'react-router-dom'

export default function TrendingCoin({data}) {

    const navigate = useNavigate();

    function getCoinDetails(id){
        navigate(`/${id}`);
    }

  return (
    <div
     className="w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40"
     onClick={ () => {
        // console.log(data.id)
        getCoinDetails(data.id)
    } }
    >
      {data ? (
        <>
        <h3 className="txt-base flex items-center my-0.5">
          <span className="text-gray-100 capitalize ">name:&nbsp;</span>
          <span className="text-cyan">{data.name}</span>
          <img
            className="w-[1.5rem] h-[1.5rem] rounded-full"
            src={data.small}
            alt={data.name}
          />
        </h3>
        <h3 className="txt-base flex items-center my-0.5">
        <span className="text-gray-100 capitalize">
          market cap rank:&nbsp;
        </span>
        <span className="text-cyan">{data.market_cap_rank}</span>
      </h3>
      <h3 className="txt-base flex items-center my-0.5">
        <span className="text-gray-100 capitalize">
          price (in btc):&nbsp;
        </span>
        <span className="text-cyan">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "btc",
            maximumSignificantDigits: 5,
          }).format(data.price_btc)}
        </span>
      </h3>
      <img
            src={data.large}
            alt={data.name}
            className="w-[35%] h-auto rounded-full absolute top-2/4 -right-12 -translate-y-2/4"
          />
      </>   
      ) : null}
    </div>
  );
}
