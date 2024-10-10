import React from 'react';

export function useLoading() {
  const [loading, setLoading] = React.useState<boolean>(false);

  const withLoading = async (callback: () => Promise<any>) => {
    setLoading(true);
    try {
      await callback();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
}
