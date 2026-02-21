# Issue Task Proposals

## 1) Typo fix task
**Task:** Correct misspelled copy in testimonial content (`"effecient"` -> `"efficient"` and `"Wil Be There"` -> `"Will Be There"`) in `frontend/src/utils/local-data.ts`.

**Why:** These are user-visible spelling errors that reduce product polish.

**Acceptance criteria:**
- Text strings are corrected in the source file.
- UI surfaces that consume this data show corrected text.

## 2) Bug fix task
**Task:** Fix email lookup logic in auth verification endpoints so users are fetched by `email` instead of `username` in `backend/src/Auth/views.py` (`Verify_account` and `resend_Verification_code`).

**Why:** The current code reads `User.objects.get(username=email)`, which fails when a user's username differs from their email and can incorrectly return 404 for valid accounts.

**Acceptance criteria:**
- Both endpoints use `User.objects.get(email=email)` (or equivalent robust lookup).
- Existing verification flows work for users whose username is not their email.
- Add/adjust tests to cover the username != email case.

## 3) Documentation discrepancy task
**Task:** Align `backend/readme.md` auth endpoint responses with actual API behavior in `backend/src/Auth/views.py`.

**Why:** The README states signup returns `200 OK` + token and login returns an "authorization token", while implementation returns `201` with message/user on signup and JWT `refresh`/`access` fields on login.

**Acceptance criteria:**
- Signup docs mention `201 Created` and correct response payload.
- Login docs mention JWT `access`/`refresh` fields.
- Any example payloads in README reflect current API output.

## 4) Test improvement task
**Task:** Improve login API tests in `backend/tests/test_Auth.py` to assert the real response contract (`access`, `refresh`, and `user`) instead of `token`, and add a regression test for verification-by-email lookup.

**Why:** Current test expectations are stale and can hide API regressions.

**Acceptance criteria:**
- `test_successful_login` validates `access` and `refresh` keys.
- A new test verifies account verification succeeds when `username != email`.
- Test suite passes after updates.
