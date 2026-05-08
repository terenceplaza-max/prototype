import { Timestamp } from 'firebase/firestore';

export type ReportStatus = 'submitted' | 'under_review' | 'work_in_progress' | 'resolved';

export interface Location {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OfficialInfo {
  name: string;
  position: string;
  avatar: string;
}

export interface TimelineEvent {
  status: ReportStatus | string;
  timestamp: Timestamp;
  message?: string;
  type: 'status_update' | 'official_response';
  officialInfo?: OfficialInfo;
  image?: string;
}

export interface OfficialResponse {
  message: string;
  timestamp: Timestamp;
  officialInfo: OfficialInfo;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: Location;
  status: ReportStatus;
  authorId: string;
  authorName: string;
  evidenceImage?: string;
  timeline?: TimelineEvent[];
  officialResponse?: OfficialResponse;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'citizen' | 'admin';
  createdAt: Timestamp;
}
