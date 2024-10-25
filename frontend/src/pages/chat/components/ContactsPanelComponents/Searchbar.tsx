import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbar = () => {
  return (
    <div className="flex justify-between items-center w-full p-2">
      <input
        type="text"
        placeholder="Search"
        className=" bg-white bg-opacity-5 p-2 pl-10 focus:outline-none focus:ring-0 focus:border-gray-300 flex-1"
      />
      <FontAwesomeIcon icon={faSearch} className="px-2" />
    </div>
  );
};
export default Searchbar;
