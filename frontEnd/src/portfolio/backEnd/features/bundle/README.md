# Bundle (read-only)

One request that hydrates the **whole public site**.

## Endpoint
```
GET /api/public/bundle      ?lang=en|ru|hy
```
Returns every active record in a single payload:
`{ profile, stack, skills, projects, certifications, careers, testimonials, services, socials, contact, resumes, connections, mindmap }`.

## Why
Booting the frontend from one fetch (then caching) beats a dozen round-trips. The raw `connections` are included so the client can assemble any graph locally — or call the pre-assembled `/graph/:variant` instead.

Pure read; safe to cache aggressively (e.g. at the CDN). No model of its own.
