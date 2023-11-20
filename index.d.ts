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
