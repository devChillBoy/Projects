import { useReducer, type Reducer } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

interface AppState {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
}

interface Action {
  type: string;
  payload?: { digit?: string; operation?: string };
}

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const initialState: AppState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const reducer: Reducer<AppState, Action> = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload?.digit || '',
          overwrite: false,
        };
      }

      if (payload?.digit === '0' && state.currentOperand === '0') return state;

      if (payload?.digit === '.' && state.currentOperand?.includes('.'))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload?.digit || ''}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload?.operation || null,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload?.operation || null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation || null,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return initialState;
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;

      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;

      return {
        ...state,
        currentOperand: evaluate(state),
        operation: null,
        previousOperand: null,
        overwrite: true,
      };
    default:
      return state;
  }
};

function evaluate({
  currentOperand,
  previousOperand,
  operation,
}: AppState): string {
  const prev = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null): string | null {
  if (operand == null) return null;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer, 10));
  return `${INTEGER_FORMATTER.format(parseInt(integer, 10))}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton
        operation="÷"
        dispatch={dispatch}
      />
      <DigitButton
        digit="1"
        dispatch={dispatch}
      />
      <DigitButton
        digit="2"
        dispatch={dispatch}
      />
      <DigitButton
        digit="3"
        dispatch={dispatch}
      />
      <OperationButton
        operation="*"
        dispatch={dispatch}
      />
      <DigitButton
        digit="4"
        dispatch={dispatch}
      />
      <DigitButton
        digit="5"
        dispatch={dispatch}
      />
      <DigitButton
        digit="6"
        dispatch={dispatch}
      />
      <OperationButton
        operation="+"
        dispatch={dispatch}
      />
      <DigitButton
        digit="7"
        dispatch={dispatch}
      />
      <DigitButton
        digit="8"
        dispatch={dispatch}
      />
      <DigitButton
        digit="9"
        dispatch={dispatch}
      />
      <OperationButton
        operation="-"
        dispatch={dispatch}
      />
      <DigitButton
        digit="."
        dispatch={dispatch}
      />
      <DigitButton
        digit="0"
        dispatch={dispatch}
      />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}
export default App;
