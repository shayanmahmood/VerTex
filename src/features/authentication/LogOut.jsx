import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogOut } from "./hooks/useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function useLogOut() {
  const { logOut, isLoading } = useLogOut();

  return (
    <ButtonIcon onClick={logOut}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default useEmptyCart


