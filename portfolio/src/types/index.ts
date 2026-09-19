export type ProjectCategory =
  | "ai"
  | "agentic-ai"
  | "full-stack"
  | "finance"
  | "developer-tools"
  | "web-apps"
  | "game";

export type ProjectStatus = "active" | "completed" | "experiment";

export interface Technology {
  name: string;
  icon?: string;
  category: TechCategory;
}

export type TechCategory =
  | "frontend"
  | "backend"
  | "ai-ml"
  | "database"
  | "cloud"
  | "tools"
  | "language"
  | "devops";

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description?: string;
  type: "user" | "frontend" | "backend" | "ai" | "database" | "external" | "service";
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  categories: ProjectCategory[];
  githubUrl: string;
  liveUrl?: string;
  technologies: Technology[];
  primaryLanguage: string;
  featured: boolean;
  status: ProjectStatus;
  features: Feature[];
  architecture?: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  createdAt: string;
  image?: string;
}

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  openIssues: number;
  description: string | null;
  topics: string[];
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
}

export interface ProfileInfo {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  education: string;
  university: string;
}

export interface TechGroup {
  category: TechCategory;
  label: string;
  items: Technology[];
}

export interface TerminalCommand {
  command: string;
  output: string | string[];
  isClickable?: boolean;
}

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  keywords?: string[];
}
