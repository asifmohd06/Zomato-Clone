import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

const SearchBarPopupMenu = ({
  handleClick,
  setIsDropDown,
  data,
  isSmallScreen,
}) => {
  const navigate = useNavigate();
  const redirect = (id) => {
    navigate(`/location/${id}`);
  };
  const ref = useOutsideClick(handleClick);
  return (
    <div
      className={`w-[20em] h-[13em] bg-white border-2 rounded-md absolute ${
        isSmallScreen ? "mt-[28em]" : "top-[75px]"
      }  flex flex-col overflow-y-auto z-[2]`}
      ref={ref}
      onClick={() => setIsDropDown(false)}
    >
      {data &&
        data.data.locations.map((city, index) => [
          <div
            className=" border-b-2 tracking-wide text-gray-500 hover:bg-[#F8F8F8] cursor-pointer text-left px-6"
            onClick={() => redirect(city._id)}
            key={index}
          >
            <h2 className="py-4 ">{city.name}</h2>
          </div>,
        ])}
      {!data?.data?.locations.length && (
        <p className=" text-gray-500 mt-10 text-xl"> No results</p>
      )}
    </div>
  );
};

export default SearchBarPopupMenu;
