# @ninots/auth

Authentication for Bun with Laravel-like guards, providers, and unified auth utilities.

## Overview

`@ninots/auth` is the authentication package for the Ninots Framework: guards, user providers, hashing, JWT, OAuth helpers, and encryption.

**Session storage lives in [`@ninots/session`](https://www.npmjs.com/package/@ninots/session).** This package only defines a local `SessionInterface` / `AuthSessionStore` seam that the app injects (adapter). Zero `@ninots/*` cross-deps.

## Features

- **Guards**: `SessionGuard`, `TokenGuard`, `RequestGuard`
- **Providers**: `DatabaseUserProvider`
- **Hashers**: `BcryptHasher`, `ArgonHasher`
- **Session seam**: `SessionInterface` / `AuthSessionStore` (inject from app)
- **JWT**: Decoding, verification, JWKs support
- **Social**: OAuth providers (GitHub; future extract → `@ninots/social-auth`)
- **Encryption**: Web Crypto API encrypter

## Installation

```bash
bun add @ninots/auth
# Session drivers (file / cookie / database):
bun add @ninots/session
```

## Quick Start

### Basic Session Authentication

```typescript
import {
  SessionGuard,
  DatabaseUserProvider,
  BcryptHasher,
  type AuthSessionStore,
} from '@ninots/auth';

// App-owned adapter: wrap @ninots/session (or any store) as AuthSessionStore
const session: AuthSessionStore = appSessionAdapter; // from your bootstrap

const provider = new DatabaseUserProvider(connection, new BcryptHasher(), 'users');
const guard = new SessionGuard('web', provider, session);

const authenticated = await guard.attempt(
  { email: 'user@example.com', password: 'secret' },
  true, // remember me
);

if (authenticated) {
  const user = await guard.user();
  console.log(`Welcome, ${user?.getAuthIdentifier()}!`);
}
```

### Using AuthManager

```typescript
import { AuthManager, SessionGuard } from '@ninots/auth';

const auth = new AuthManager({ default: 'session' });
auth.extend('session', (name) => new SessionGuard(name, provider, session));

if (await auth.check()) {
  const user = await auth.user();
}
```

## API Reference

### Core Classes

| Class | Description |
|-------|-------------|
| `AuthManager` | Central auth manager and factory |
| `SessionGuard` | Session/cookie-based authentication |
| `TokenGuard` | Bearer token authentication |
| `RequestGuard` | Custom callback-based authentication |
| `DatabaseUserProvider` | SQL-based user provider |
| `BcryptHasher` | Bcrypt password hashing |
| `ArgonHasher` | Argon2 password hashing |

### Session seam (no drivers here)

| Type | Description |
|------|-------------|
| `SessionInterface` | Local store: get / put / forget / flush / regenerate |
| `AuthSessionStore` | Alias for `SessionInterface` |

Use `@ninots/session` for file, cookie, and database drivers.

### JWT

| Class | Description |
|-------|-------------|
| `JwtDecoder` | JWT decoding and verification |
| `JwksCache` | JWKs caching for OIDC |
| `JwtError` / `JwksError` | JWT-related errors |

### OAuth

| Class | Description |
|-------|-------------|
| `OAuthManager` | OAuth provider factory |
| `AbstractOAuthProvider` | Base class for OAuth providers |
| `GitHubProvider` | GitHub OAuth provider |
| `OAuthUser` | Normalized OAuth user data |

### Encryption

| Class | Description |
|-------|-------------|
| `WebEncrypter` | Web Crypto API encryption |
| `EncryptException` / `DecryptException` | Encryption errors |

### Middleware

| Function | Description |
|----------|-------------|
| `authenticate()` | Require authentication middleware |
| `guest()` | Require guest (not authenticated) middleware |

### Contracts

| Interface | Description |
|-----------|-------------|
| `Authenticatable` | User model interface |
| `Guard` / `StatefulGuard` | Authentication guard contracts |
| `UserProvider` | User retrieval contract |
| `Hasher` | Password hashing contract |
| `SessionInterface` / `AuthSessionStore` | Injected session store |
| `ConnectionInterface` | Database connection for user provider |

## Advanced Usage

### Remember Me Cookies

```typescript
import { SessionGuard } from '@ninots/auth';

const guard = new SessionGuard('web', provider, session);

const authenticated = await guard.attempt(credentials, true);

if (authenticated) {
  const rememberCookie = guard.getRememberCookie();
  if (rememberCookie) {
    response.headers.append('Set-Cookie', rememberCookie);
  }
}

const cookieHeader = request.headers.get('Cookie') ?? '';
const rememberValue = cookieHeader.match(/remember_web_web=([^;]+)/)?.[1];
const user = await guard.user(rememberValue);
```

### Custom User Provider

```typescript
import type { Authenticatable, UserProvider } from '@ninots/auth';

class CustomUserProvider implements UserProvider {
  async retrieveById(id: string | number): Promise<Authenticatable | null> {
    // Custom retrieval logic
    return null;
  }

  async retrieveByToken(id: string | number, token: string): Promise<Authenticatable | null> {
    return null;
  }

  async updateRememberToken(user: Authenticatable, token: string): Promise<void> {
    // Custom token update
  }

  async retrieveByCredentials(credentials: Record<string, unknown>): Promise<Authenticatable | null> {
    return null;
  }

  async validateCredentials(user: Authenticatable, credentials: Record<string, unknown>): Promise<boolean> {
    return false;
  }
}
```

## Testing

```bash
bun test
```

Guards are tested against an in-memory fake implementing `SessionInterface` (`tests/mocks/session.mock.ts`).

## Changelog highlights

### 0.2.0

- **Breaking (SemVer minor in `0.y.z`):** removed public session stack (`SessionManager`, `Session`, file/memory/database drivers). Use `@ninots/session` + app adapter into `AuthSessionStore` / `SessionInterface`.
- Added `AuthSessionStore` type alias for the injected seam.

## License

MIT License - See LICENSE file for details.
