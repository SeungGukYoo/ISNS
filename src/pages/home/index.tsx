import PostBox from 'components/post/PostBox';
import PostForm from 'components/post/PostForm';

import usePosts from 'hooks/usePosts';

function HomePage() {
  const { posts, tabType, changeTabType } = usePosts();

  return (
    <div className="home">
      <div className="home__tabs">
        <div
          className={`home__tab ${tabType === 'all' && 'home__tab-active'}`}
          onClick={() => changeTabType('all')}
        >
          ALL
        </div>
        <div
          className={`home__tab ${tabType === 'following' && 'home__tab-active'}`}
          onClick={() => changeTabType('following')}
        >
          Following
        </div>
      </div>
      <PostForm />
      <div className="post">
        {posts.length > 0 ? (
          posts.map(post => <PostBox post={post} key={post.id} />)
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
