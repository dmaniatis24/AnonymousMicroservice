export function getEnvVar(v: string): string | undefined {
    return process.env[v];
}