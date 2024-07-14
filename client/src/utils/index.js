import { useEffect, useRef } from 'react'

export async function useOnMountUnsafe(effect) {
  const initialized = useRef(false);

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
