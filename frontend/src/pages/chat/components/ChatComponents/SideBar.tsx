import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-center items-center text-3xl gap-4 px-2 bg-black bg-opacity-25 rounded-l-3xl">
      <div>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </div>
  );
};
export default SideBar;
