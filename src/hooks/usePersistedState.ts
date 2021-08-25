import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export const usePersistedState = <T>(
  key: string,
  initialState: T,
): Response<T> => {
  const [state, setState] = useState(() => {
    const storagedState = localStorage.getItem(key);

    if (storagedState) {
      return JSON.parse(storagedState);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
