# Changelog

## 0.3.0

### Breaking (SemVer minor in `0.y.z`)

- Removed public OAuth exports: `OAuthManager`, `AbstractOAuthProvider`, `OAuthUser`, `GitHubProvider`.
- OAuth client lives in [`@ninots/social-auth`](https://www.npmjs.com/package/@ninots/social-auth) `@0.1.0`.

### Notes

- Zero `@ninots/*` package dependencies (no import of `@ninots/social-auth`).
- Compose OAuth in the app: `bun add @ninots/social-auth`.

## 0.2.0

### Breaking (SemVer minor in `0.y.z`)

- Removed public exports of the auth session stack: `SessionManager`, `Session`, `MemorySessionDriver`, `FileSessionDriver`, `DatabaseSessionDriver`.
- Session storage is canonical in `@ninots/session`. Apps inject an adapter implementing `SessionInterface` / `AuthSessionStore` into `SessionGuard`.

### Added

- `AuthSessionStore` type alias for the local session seam used by `SessionGuard`.

### Notes

- Zero `@ninots/*` package dependencies (no import of `@ninots/session`).
- OAuth naming ADR only in Sprint 17; extract shipped in Sprint 18 (`@ninots/social-auth@0.1.0`).
