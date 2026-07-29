/**
 * Minimal session-store contract for SessionGuard / auth flows.
 *
 * Apps inject an adapter (e.g. from `@ninots/session`) that satisfies this shape.
 * `@ninots/auth` does not import `@ninots/session` — zero cross-package deps.
 *
 * SemVer `0.2.0`: session drivers/manager were removed from the public API;
 * use `@ninots/session` for storage and wire via this contract.
 */
export interface SessionInterface {
    get<T = unknown>(key: string, defaultValue?: T): T;
    put(key: string, value: unknown): void;
    forget(key: string): void;
    flush(): void;
    regenerate(destroy?: boolean): Promise<boolean>;
}

/**
 * Alias matching Sprint 17 wording (`AuthSessionStore`).
 * Prefer this name in new app wiring; `SessionInterface` remains for compatibility.
 */
export type AuthSessionStore = SessionInterface;
