import PostBox from 'components/PostBox';
import PostForm from 'components/PostForm';

import type { PostProps } from '../../..';
const posts: PostProps[] = [
  {
    id: '1',
    email: 'test1@email.com',
    content: 'content text',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID',
    profileUrl: '',
    likeCount: 1,
    likes: ['a'],
    comments: [],
  },
  {
    id: '2',
    email: 'test2@email.com',
    content: 'content text2',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID2',
    profileUrl: '',
    likeCount: 3,
    likes: ['a'],
    comments: ['a'],
  },
  {
    id: '3',
    email: 'test3@email.com',
    content: 'content tex3',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID3',
    profileUrl: '',
    likeCount: 3,
    likes: ['a', 'b', 'c'],
    comments: ['a', 'b'],
  },
  {
    id: '4',
    email: 'test1@email.com',
    content: 'content text',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID',
    profileUrl: '',
    likeCount: 1,
    likes: ['a'],
    comments: [],
  },
  {
    id: '5',
    email: 'test2@email.com',
    content: 'content text2',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID2',
    profileUrl: '',
    likeCount: 3,
    likes: ['a'],
    comments: ['a'],
  },
  {
    id: '6',
    email: 'test3@email.com',
    content: 'content tex3',
    createdAt: '2023-11-08 Tue',
    uid: 'unique ID3',
    profileUrl: '',
    likeCount: 3,
    likes: ['a', 'b', 'c'],
    comments: ['a', 'b'],
  },
];

function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab-active">For YOU</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts.map(el => (
          <PostBox post={el} key={el.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
