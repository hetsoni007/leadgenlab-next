import raw from "@/content/sim.json";

export type RoleKey = "general" | "sales" | "marketing" | "founder" | "developer" | "operations" | "educator" | "student";
export type LearningPath = {
  label: string; example: string; simple: string; technical: string;
  tasks: [string, string, string][];
};
const data = raw as unknown as {
  learningPaths: Record<RoleKey, LearningPath>;
  flowSteps: Record<string, [string, string][]>;
  roleLabels: Record<RoleKey, string>;
  pageSims: Record<string, { kind: string; task: string; title: string }>;
};

export const learningPaths = data.learningPaths;
export const flowSteps = data.flowSteps;
export const roleLabels = data.roleLabels;
export const roleKeys = Object.keys(roleLabels) as RoleKey[];
export const simFor = (path: string) => data.pageSims[path];
