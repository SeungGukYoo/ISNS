import PostBox from 'components/PostBox';
import PostForm from 'components/PostForm';
import { usePostContext } from 'hooks/useContextUtil';

function HomePage() {
  const { posts } = usePostContext();

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
