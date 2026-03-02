export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  color?: string;
}

export interface SocialItem {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  links: LinkItem[];
  socials: SocialItem[];
}
