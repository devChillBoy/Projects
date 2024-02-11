import { ACTIONS } from '../App';

interface DigitButtonProps {
  operation: string;
  dispatch: ({
    type,
    payload,
  }: {
    type: string;
    payload: { operation: string };
  }) => void;
}

function DigitButton({ dispatch, operation }: DigitButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
export default DigitButton;
