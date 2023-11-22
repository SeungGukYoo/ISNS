export type LanguageType = 'ko' | 'en';
export interface Props {
  children: React.ReactNode;
}
export interface RouterProps {
  isAuthenticated: boolean;
}
export interface CommentProps {
  uid: string;
  createdAt: string;
  content: string;
  email: string;
  photoUrl: string | null;
}
export interface PostProps {
  id: string;
  email?: string;
  content: string;
  createdAt: string;
  uid: string;
  imageUrl: string;
  profileUrl?: string;
  likes?: string[];
  likeCount: number;
  comments?: CommentProps[];
  hashtags: string[];
}
export interface NotificationType {
  uid: string;
  email: string;
  photoUrl: string | null;
  createdAt: string;
  content: string;
  postId: string;
  read: boolean;
  url?: string;
  id: string;
}

export interface FirebaseClientType {
  gitHubProvider: GithubAuthProvider;
  googleProvider: GoogleAuthProvider;
  // authenticate
  getAuthData(): Auth;
  authChanged(callback: React.Dispatch<React.SetStateAction<User | null>>): void;
  createEmailUser(email: string, password: string): Promise<User>;
  loginEmail(email: string, password: string): Promise<User>;
  companyLogin(company: string): Promise<User | undefined>;
  loginGoogle(): Promise<User>;
  loginGithub(): Promise<User>;
  logoutUser(): Promise<void>;
  updateProfileData(downloadUrl: string, displayName: string): Promise<void>;

  // store
  getFollowingPost(userId: string): Pormise<unknown>;
  getDocData(): DocumentReference<DocumentData, DocumentData>;
  followObserver(
    callBack: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
    postId: string,
  ): void;
  getPostsObserver(callBack: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPostObserver(
    postId: string,
    callBack: React.Dispatch<React.SetStateAction<PostProps | null>>,
  ): void;
  getFollower(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void;
  getFollowing(callBack: React.Dispatch<React.SetStateAction<number>>, userId: string): void;
  getPost(pstId: string): Promise<DocumentSnapshot<DocumentData, DocumentData>>;
  addPost(data: Omit<PostProps, 'id'>): Promise<DocumentReference<DocumentData, DocumentData>>;
  updatePost(postId: string, postData: Omit<PostProps, 'id'>): Promise<unknown>;
  deletePost(postId: string): Promise<void>;
  searchPost(hashtag: string, callback: React.Dispatch<React.SetStateAction<PostProps[]>>): void;
  getPersonalPost(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>>;
  getLikePosts(uid: string): Promise<QuerySnapshot<DocumentData, DocumentData>>;
  likePost(postId: string, userUid: string, likesCount: number): Promise<void>;
  unLikePost(postId: string, userUid: string, likesCount: number): Promise<void>;
  addComment(commentInfo: CommentProps, postId: string): Promise<void>;
  deleteComment(userUid: CommentProps, postId: string): Promise<unknown>;
  followingUser(myId: string, postId: string): Promise<void>;
  followerUser(myId: string, postId: string): Promise<void>;
  unfollowingUser(myId: string, postId: string): Promise<void>;
  unfollowerUser(myId: string, postId: string): Promise<void>;
  addNotification(
    notificationInfo: NotificationType,
  ): Promise<DocumentReference<DocumentData, DocumentData>>;
  getNotification(
    userId: string,
    callBack: React.Dispatch<React.SetStateAction<NotificationType[] | null>>,
  ): void;
  updateNotification(postId: string): Promise<void>;
  // storage
  uploadImage(uuid: string, result: string): Promise<UploadResult>;
  downloadImge(snapshot: UploadResult): Promise<string>;
  deleteImage(uuid: string, imgUrl: string): Promise<void>;
}
