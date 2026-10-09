/*
 * Community content for the home page.
 *
 * `posts` holds customer photos and social posts, shared with permission.
 * While it's empty the section shows an invitation instead of a grid.
 * `collaborations` lists announced partners; empty shows the open call.
 */

export type CommunityPost = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Handle or first name, as the person asked to be credited. */
  credit: string;
  href?: string;
};

export type Collaboration = {
  name: string;
  description: string;
  href?: string;
};

export const posts: CommunityPost[] = [];

export const collaborations: Collaboration[] = [];
