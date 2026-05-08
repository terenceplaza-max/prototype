# Butuan City Portal Security Specification

## 1. Data Invariants
- A report must have a valid category, title, description, and location.
- Only the author of a report or an admin can view the author's private details (if any).
- Reports are publicly readable (status/progress) but only writable by the author (creation) and admins (status updates/official responses).
- Users cannot change their own roles to 'admin'.
- Only admins can update the 'status', 'timeline', and 'officialResponse' fields of a report.
- Citizens can only update their own profile (excluding roles).

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)

1. **Identity Spoofing:** Creating a report with a different user's `authorId`.
2. **Privilege Escalation:** A citizen trying to set their role to `admin` in `users` collection.
3. **Ghost Field Injection:** Adding a `verified: true` field to a report payload.
4. **State Shortcutting:** A citizen trying to update the status of their report to `resolved`.
5. **Orphaned Write:** Creating a report with an invalid or non-existent `location` structure.
6. **Resource Poisoning:** Sending a 1MB string for report `title`.
7. **Identity Integrity Bypass:** Updating another user's profile.
8. **PII Leak:** An unauthenticated user trying to read user private info (not applicable here as PII is minimal, but good to check).
9. **Official Response Forgery:** A citizen trying to write into the `officialResponse` field.
10. **Timeline Tampering:** A citizen adding/modifying the `timeline` entries.
11. **Negative Spacing Attack:** Sending a report with empty strings for required fields (bypassing `.size() > 0`).
12. **Admin Lockdown:** Incorrect rules preventing a valid admin from updating status.

## 3. Preliminary Rules (Draft)
These will be implemented in `firestore.rules` (starting with `DRAFT_firestore.rules`).
