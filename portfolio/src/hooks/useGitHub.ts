import { useState, useEffect, useCallback } from "react";
import type { GitHubRepoStats, GitHubProfile } from "@/types";
import {
  fetchRepoStats,
  fetchProfile,
  fallbackProfile,
  fallbackRepoStats,
} from "@/lib/github";

interface UseGitHubRepoResult {
  stats: GitHubRepoStats;
  loading: boolean;
  error: string | null;
}

export function useGitHubRepo(repoFullName: string): UseGitHubRepoResult {
  const [stats, setStats] = useState<GitHubRepoStats>(fallbackRepoStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRepoStats(repoFullName)
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch repo");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [repoFullName]);

  return { stats, loading, error };
}

interface UseGitHubProfileResult {
  profile: GitHubProfile;
  loading: boolean;
  error: string | null;
}

export function useGitHubProfile(): UseGitHubProfileResult {
  const [profile, setProfile] = useState<GitHubProfile>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProfile()
      .then((data) => {
        if (!cancelled) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch profile"
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, loading, error };
}

export function useGitHubRepoMap(
  repoNames: string[]
): Record<string, GitHubRepoStats> {
  const [statsMap, setStatsMap] = useState<Record<string, GitHubRepoStats>>({});

  const fetchAll = useCallback(async () => {
    const entries = await Promise.allSettled(
      repoNames.map(async (name) => {
        const stats = await fetchRepoStats(name);
        return [name, stats] as const;
      })
    );
    const map: Record<string, GitHubRepoStats> = {};
    for (const entry of entries) {
      if (entry.status === "fulfilled") {
        map[entry.value[0]] = entry.value[1];
      }
    }
    setStatsMap(map);
  }, [repoNames]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  return statsMap;
}
