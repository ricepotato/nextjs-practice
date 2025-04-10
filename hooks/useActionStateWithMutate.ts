import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";

export default function useActionStateWithMutate<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string
): [
  state: Awaited<State>,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
  setState: Dispatch<SetStateAction<Awaited<State>>>
] {
  console.log("useActionStateWithMutate");
  const [localState, setLocalState] = useState(initialState);
  const [state, dispatch, isPending] = useActionState(
    action,
    initialState,
    permalink
  );

  useEffect(() => {
    console.log("state", state);
    setLocalState(state);
  }, [state]);

  return [localState, dispatch, isPending, setLocalState];
}
