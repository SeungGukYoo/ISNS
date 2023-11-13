export interface Props {
  children: React.ReactNode;
}
export interface RouterProps {
  isAuthenticated: boolean;
}
export interface PostProps {
  id: string;
  email?: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string[];
  hashtags: string[];
}
