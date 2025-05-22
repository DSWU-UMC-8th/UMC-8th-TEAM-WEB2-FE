export interface ReviewCardProps {
  rating: string;
  createdAt: string;
  studyPeriod: string;
  likeCount: number;
  content: string;
  imageUrl?: string | null;
  profileImage?: string | null;
  category?: string;
  level?: string;
  teacher?: string;
}
