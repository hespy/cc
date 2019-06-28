import { HttpErrorResponse } from '@angular/common/http';

export interface FoodHygieneState {
  name: string;
  loading: boolean;
  establishments?: Establishment[];
  error?: HttpErrorResponse;
}

export interface FoodHygiene {
  establishments: Establishment[];
  meta: Meta;
  links: Link[];
}

export interface Establishment {
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  PostCode: string;
  Phone: string;
  RatingValue: string;
  RatingKey: string;
  RatingDate: string;
  LocalAuthorityCode: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  LocalAuthorityEmailAddress: string;
  scores: Scores;
  SchemeType: string;
  geocode: Geocode;
  RightToReply: string;
  Distance?: any;
  NewRatingPending: boolean;
  meta: Meta;
  links: Link[];
}

interface Link {
  rel: string;
  href: string;
}

interface Meta {
  dataSource?: any;
  extractDate: string;
  itemCount: number;
  returncode?: any;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}

interface Geocode {
  longitude?: string;
  latitude?: string;
}

interface Scores {
  Hygiene?: number;
  Structural?: number;
  ConfidenceInManagement?: number;
}
