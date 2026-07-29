# Changelog

## 0.2.0

### Breaking (SemVer minor in `0.y.z`)

- Removed public exports of the auth session stack: `SessionManager`, `Session`, `MemorySessionDriver`, `FileSessionDriver`, `DatabaseSessionDriver`.
- Session storage is canonical in `@ninots/session`. Apps inject an adapter implementing `SessionInterface` / `AuthSessionStore` into `SessionGuard`.

### Added

- `AuthSessionStore` type alias for the local session seam used by `SessionGuard`.

### Notes

- Zero `@ninots/*` package dependencies (no import of `@ninots/session`).
- OAuth remains in this package until a future `@ninots/social-auth` sprint (ADR naming only in Sprint 17).
