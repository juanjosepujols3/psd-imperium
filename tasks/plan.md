# Implementation Plan: Customer Authentication — Imperium PSD

## Overview
Add a real customer registration and login system so buyers can create accounts, view their orders and download their purchased templates. Admin auth (env vars + cookie) stays untouched. Customer auth uses Supabase Auth (email + password).

## Architecture Decisions
- **Supabase Auth** for customers — handles sessions, email verification, password reset out of the box. No rolling our own crypto.
- **Admin auth stays separate** — cookie `admin_session` + env vars. No mixing.
- **Two separate login pages** — `/login` = admin only, `/account/login` = customers.
- **Middleware guards `/account/*`** — redirects unauthenticated customers to `/account/login`.
- **Orders stay mocked** for now — real orders require a payment system (Stripe), out of scope.
- **Server Components read session via `@supabase/ssr`** — no client-side fetching for auth state.

## Dependency Graph

```
Supabase project + env vars
        │
        ├── lib/supabase/client.ts   (browser client)
        ├── lib/supabase/server.ts   (server component client)
        │       │
        │       ├── middleware.ts (protect /account/*)
        │       ├── /account/login/page.tsx
        │       ├── /account/register/page.tsx
        │       └── /account/page.tsx (show real user email/name)
        │
        └── components/customer-logout-button.tsx
```

---

## Phase 1: Foundation

### Task 1: Install Supabase and configure env vars
**Description:** Install `@supabase/ssr` and `@supabase/supabase-js`. Create `lib/supabase/client.ts` and `lib/supabase/server.ts` helpers. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

**Acceptance criteria:**
- [ ] `@supabase/ssr` installed
- [ ] `lib/supabase/client.ts` exports `createBrowserClient()`
- [ ] `lib/supabase/server.ts` exports `createServerClient()` (reads cookies)
- [ ] `.env.local` has Supabase URL and anon key

**Files touched:** `package.json`, `.env.local`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`
**Scope:** S

---

### Task 2: Update middleware to protect /account/* routes
**Description:** Extend `middleware.ts` to redirect unauthenticated customers hitting `/account/*` to `/account/login`. Also refresh Supabase session cookie on each request.

**Acceptance criteria:**
- [ ] Visiting `/account` without session redirects to `/account/login?from=/account`
- [ ] Admin routes (`/dashboard`) still protected as before
- [ ] Authenticated customers pass through to `/account`

**Files touched:** `src/middleware.ts`
**Scope:** S
**Dependencies:** Task 1

---

### Checkpoint: Foundation
- [ ] App builds without errors (`npm run build`)
- [ ] `/account` redirects to `/account/login` when not logged in

---

## Phase 2: Register & Login

### Task 3: Customer register page (`/account/register`)
**Description:** New page with email + password + confirm password form. Calls `supabase.auth.signUp()`. On success shows a "Check your email" message. Link to login at the bottom.

**Acceptance criteria:**
- [ ] Form validates: email format, password min 6 chars, passwords match
- [ ] Successful signup shows confirmation message
- [ ] Duplicate email shows error "Email already in use"
- [ ] Link "Already have an account? Sign in" → `/account/login`

**Files touched:** `src/app/(auth)/account/register/page.tsx`
**Scope:** M
**Dependencies:** Task 1

---

### Task 4: Customer login page (`/account/login`)
**Description:** New page at `/account/login` with email + password form. Calls `supabase.auth.signInWithPassword()`. On success redirects to `/account` (or the `from` param). Link to register at the bottom.

**Acceptance criteria:**
- [ ] Correct credentials → redirect to `/account`
- [ ] Wrong credentials → error "Invalid email or password"
- [ ] `?from=` param respected after login
- [ ] Link "Don't have an account? Sign up" → `/account/register`

**Files touched:** `src/app/(auth)/account/login/page.tsx`
**Scope:** M
**Dependencies:** Task 1

---

### Checkpoint: Auth Flow
- [ ] Can register a new account
- [ ] Can log in with that account
- [ ] `/account` is accessible after login
- [ ] `/account` redirects to login when logged out

---

## Phase 3: Account & Logout

### Task 5: Account page shows real user data
**Description:** Replace hardcoded "Maria Garcia" with the actual Supabase user session data (email, created_at). Orders stay mocked but filtered to show a placeholder for now.

**Acceptance criteria:**
- [ ] Welcome message shows logged-in user's email
- [ ] Avatar initial uses first letter of email
- [ ] No hardcoded "maria@example.com" visible

**Files touched:** `src/app/(account)/account/page.tsx`
**Scope:** S
**Dependencies:** Task 1, Task 4

---

### Task 6: Customer logout button
**Description:** Replace/update `LogoutButton` to call `supabase.auth.signOut()` instead of (or in addition to) `logoutAdmin`. Customer logout clears Supabase session and redirects to home.

**Acceptance criteria:**
- [ ] "Sign out" button in account topbar signs out the Supabase session
- [ ] After logout, `/account` redirects to `/account/login`
- [ ] Admin logout (`/logout`) still works separately

**Files touched:** `src/components/customer-logout-button.tsx`, `src/app/(account)/layout.tsx`
**Scope:** S
**Dependencies:** Task 1, Task 4

---

### Task 7: Update navbar "My Account" link behavior
**Description:** In the marketing navbar, show "My Account" if user is logged in, or "Sign In" if not. Since the navbar is a Server Component, read session server-side.

**Acceptance criteria:**
- [ ] Logged-in customers see "My Account" → `/account`
- [ ] Guests see "Sign In" → `/account/login`

**Files touched:** `src/app/(marketing)/components/navbar.tsx`
**Scope:** S
**Dependencies:** Task 1, Task 4

---

### Checkpoint: Complete
- [ ] Full register → login → view account → logout flow works
- [ ] Navbar reflects auth state
- [ ] Admin login/dashboard unaffected
- [ ] Build passes with no TypeScript errors

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase project not created yet | High | Create via Supabase MCP before Task 1 |
| `middleware.ts` deprecated in Next 16 | Med | Rename to `proxy.ts` as part of Task 2 |
| Server/client Supabase client confusion | Med | Strict file naming: `client.ts` = browser, `server.ts` = RSC |
| Email confirmation blocks testing | Low | Disable email confirmation in Supabase dashboard for dev |

## Open Questions
- ¿Qué Supabase project usar? ¿Crear uno nuevo o usar uno existente?
- ¿Quieres verificación de email activada o desactivada en desarrollo?
