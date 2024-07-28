import { useEffect, useRef } from 'react'

export function useOnMountUnsafe(effect: () => Promise<void> | void): Promise<void> | void {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    async function asyncUseEffect() {
      if (!initialized.current) {
        initialized.current = true;
        await effect();
      }
    }
    asyncUseEffect();
  }, []);
}
