import PostBox from 'components/PostBox';
import PostForm from 'components/PostForm';

import { PostsContext } from 'context/postsContext';
import { useContext } from 'react';

function HomePage() {
  const { posts } = useContext(PostsContext);

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab-active">For YOU</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts.length > 0 ? (
          posts.map(el => <PostBox post={el} key={el.id} />)
        ) : (
          <div className="post__no-post">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
