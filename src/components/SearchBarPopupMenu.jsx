import { useOutsideClick } from "../hooks/useOutsideClick";
import { Navigate, useNavigate } from "react-router-dom";

const SearchBarPopupMenu = ({ handleClick, setIsDropDown, data }) => {
  const navigate = useNavigate();
  const redirect = (id) => {
    navigate(`/location/${id}`);
  };

  const ref = useOutsideClick(handleClick);
  return (
    <div
      className="w-[20em] h-[13em] bg-white border-2 rounded-md absolute top-[3.5em] flex flex-col overflow-y-auto z-[2]"
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
    </div>
  );
};

export default SearchBarPopupMenu;
