# Security Decisions (Last Updated: 2026-01-19)

## Dependency Security
- Critical: Fixed immediately (see npm audit history)
- Moderate: Documented and accepted for dev-only packages

## Webhook Security
- Stripe webhook signature verification: Implemented
- Metadata sanitization: Implemented

## Auth Boundary
- Protected routes: Guarded at layout level
- Ownership checks: Implemented for user resources

## Known Breakpoints Addressed
- Font subsets: Verified before use
- Provider exports: Verified imports
- AI SDK imports: Updated to @ai-sdk/react
