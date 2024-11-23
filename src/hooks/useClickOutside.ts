import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, cb: () => void) => {
  useEffect(() => {
    const onClick = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        cb();
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [cb]);
};

export default useClickOutside;
