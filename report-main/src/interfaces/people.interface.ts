import { PaginationProps } from './pagination.interface';

export interface People {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  businessName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  businessCategories: string[];
  emails: string[];
  professionalEmails: string[];
  primaryEmail: string;
  phoneNumbers: string[] | null;
  keys: string[];
  linkedinURL: string;
  sourceURLs: string[];
}

export interface PeopleResponse {
  status: boolean;
  data: People[];
  pagination: PaginationProps;
}

export interface PersonResponse {
  status: boolean;
  data: People;
}
