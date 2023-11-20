import PostBox from 'components/post/PostBox';
import useSearch from 'hooks/useSearch';

function SearchPage() {
  const { posts, query, onChangeValue } = useSearch();
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            type="text"
            className="home__search"
            name="query"
            onChange={onChangeValue}
            value={query}
            placeholder="# 없이 입력하세요 ex) #Daily → Daily"
          />
        </div>
        <div className="post">
          {posts.length > 0 ? (
            posts.map(post => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-post">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>{' '}
      </div>
    </div>
  );
}

export default SearchPage;
