import { useEffect, useRef } from 'react'

export async function useOnMountUnsafe(effect: () => Promise<void>): Promise<void> {
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
