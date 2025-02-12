import { client } from '@/sanity/lib/client';
import { SanityDocument } from 'next-sanity';
import { useEffect, useState } from 'react';
import { posts } from '@/sanity/schemaTypes/post';

// ...


export const usePreview = (query: string, params: object = {}) => {
    const [data, setData] = useState<SanityDocument<typeof posts> | null>(null);

  useEffect(() => {
    const subscription = client.listen(query, params)
      .subscribe((update) => {
        if(update.result !== undefined) {
            setData(update.result as SanityDocument<typeof posts> | null);
        }
      });
    return () => subscription.unsubscribe();
  }, [query, params]);

  return data;
};