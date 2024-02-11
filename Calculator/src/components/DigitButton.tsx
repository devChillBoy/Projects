import { ACTIONS } from '../App';

interface DigitButtonProps {
  digit: string;
  dispatch: ({
    type,
    payload,
  }: {
    type: string;
    payload: { digit: string };
  }) => void;
}

function DigitButton({ dispatch, digit }: DigitButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
export default DigitButton;
