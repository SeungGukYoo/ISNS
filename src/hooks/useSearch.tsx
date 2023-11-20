import React, { useEffect, useState } from 'react';
import { PostProps } from '../..';
import { useAuthContext } from './useContextUtil';

const useSearch = () => {
  const { user, firebaseClient } = useAuthContext();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [query, setQuery] = useState('');
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'query') {
      setQuery(value);
    }
  };

  useEffect(() => {
    const searchHashtagPosts = (query: string) => {
      firebaseClient?.searchPost(query, setPosts);
    };

    if (user?.uid && query.length > 0) {
      searchHashtagPosts(query);
    }
  }, [user, query, firebaseClient]);
  return { posts, query, onChangeValue };
};

export default useSearch;
