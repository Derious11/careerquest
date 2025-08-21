export type Gender = 'male' | 'female' | 'nonbinary' | 'unspecified'


export type PlayerProfile = {
displayName: string
gender: Gender
avatarId: number | null
}


export type Step = 'intro' | 'avatar' | 'map' | 'quiz' | 'result';

// src/types.ts
export type HeroKey =
  | "hardware_hero"
  | "cluster_commander"
  | "cloud_architect"
  | "model_launcher"
  | "data_master"
  | "network_weaver"
  | "security_guardian";
