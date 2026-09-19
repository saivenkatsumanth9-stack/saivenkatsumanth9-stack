import type { GitHubRepoStats, GitHubProfile } from "@/types";

const BASE_URL = "https://api.github.com";
const GITHUB_USERNAME = "saivenkatsumanth9-stack";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = (await response.json()) as T;
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

interface GitHubRepoResponse {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  open_issues_count: number;
  description: string | null;
  topics?: string[];
}

export async function fetchRepoStats(
  repoFullName: string
): Promise<GitHubRepoStats> {
  const data = await fetchWithCache<GitHubRepoResponse>(
    `${BASE_URL}/repos/${repoFullName}`
  );
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    updatedAt: data.updated_at,
    openIssues: data.open_issues_count,
    description: data.description,
    topics: data.topics ?? [],
  };
}

interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export async function fetchProfile(): Promise<GitHubProfile> {
  const data = await fetchWithCache<GitHubUserResponse>(
    `${BASE_URL}/users/${GITHUB_USERNAME}`
  );
  return {
    login: data.login,
    name: data.name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    htmlUrl: data.html_url,
  };
}

interface GitHubRepoListItem {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

export async function fetchRecentRepos(): Promise<GitHubRepoListItem[]> {
  return fetchWithCache<GitHubRepoListItem[]>(
    `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
  );
}

export const fallbackProfile: GitHubProfile = {
  login: GITHUB_USERNAME,
  name: "Peddi Sai Venkat Sumanth",
  avatarUrl: `https://github.com/${GITHUB_USERNAME}.png`,
  bio: "Developer • AI Builder • Full-Stack Engineer",
  publicRepos: 10,
  followers: 0,
  following: 0,
  htmlUrl: `https://github.com/${GITHUB_USERNAME}`,
};

export const fallbackRepoStats: GitHubRepoStats = {
  stars: 0,
  forks: 0,
  language: null,
  updatedAt: new Date().toISOString(),
  openIssues: 0,
  description: null,
  topics: [],
};
