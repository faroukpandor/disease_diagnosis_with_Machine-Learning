# Repository, Enterprise & Change-Authority Gate

## Mandatory pre-flight for every vibe-coding session

Before substantive implementation, the coding agent MUST inspect and record:

- GitHub repository owner/account
- whether this repository is a fork
- upstream/origin repository, if any
- license and material third-party/open-source components
- whether this is original work, a derivative, prototype, research asset, client project, collaborative project, archive, or uncertain
- underlying enterprise/product represented by this repository
- enterprise/product owner
- brand/IP owner where known
- domain/deployment/data controller where relevant
- who has authority to approve changes
- whether another repository is canonical or overlapping
- current implementation status
- current change-freeze/review status

### Critical distinction

**Repository access is not ownership.**  
**GitHub ownership is not necessarily enterprise ownership.**  
**Development responsibility is not necessarily change authority.**  
**Deployment access is not permission to change a client asset.**

If ownership, enterprise relationship, licensing, or change authority is uncertain, do not guess. Ask for clarification before substantive changes.

## Required status record

```text
REPOSITORY:
GITHUB OWNER:
FORK:
UPSTREAM:
LICENSE:
THIRD-PARTY COMPONENTS:

UNDERLYING ENTERPRISE/PRODUCT:
ENTERPRISE OWNER:
BRAND/IP OWNER:
DATA/DEPLOYMENT/DOMAIN CONTROL:

RELATIONSHIP:
PROJECT OWNERSHIP:
CHANGE AUTHORITY:
CURRENT STATUS:
CANONICAL/OVERLAPPING REPOSITORIES:
OWNERSHIP CONFIDENCE:

CONFIRMATION REQUIRED:
IMPLEMENTATION DECISION:
```

## Recommendation gate

For every material recommendation, the agent must:

1. Confirm that the recommendation belongs in this repository.
2. Check for an existing canonical or overlapping repository.
3. State the problem/opportunity addressed.
4. State expected user/customer/business value.
5. Identify technical complexity and maintenance burden.
6. Identify security, privacy, accessibility and licensing implications.
7. Identify recurring infrastructure/API/vendor costs and lock-in.
8. Identify whether the recommendation is reversible.
9. Identify evidence or assumptions behind the recommendation.
10. Distinguish recommendation from implementation instruction.
11. Prefer the smallest change that creates material value.
12. Preserve working functionality unless a change is justified and tested.

Use this sequence:

**Inspect → Confirm ownership/status → Map enterprise relationship → Check related repos → Recommend → Validate → Obtain required authority → Implement → Test → Document.**

## Portfolio principles

Prefer:

- canonical repositories over unnecessary fragmentation
- reusable modules over duplicated implementations
- deterministic logic before AI where practical
- free/low-cost infrastructure where it is fit for purpose
- provider abstraction and graceful degradation
- truthful product and commercial claims
- explicit provenance and source attribution
- privacy-by-design and data minimisation
- accessible interfaces
- secure-by-default implementation
- reversible/incremental agent changes
- recurring revenue from continuing value, not artificial dependency

Do not implement recommendations merely to make the portfolio look more consistent.

## Agent output before substantial work

Return a concise status and recommendation assessment, then proceed only when the authority model permits it.

## Repository-specific direction
Treat this as research/diagnostic technology. Require dataset provenance, population/label documentation, calibration and error analysis, distribution-shift evaluation and explicit research/prototype status. Do not make clinical-validation or autonomous-diagnosis claims without appropriate evidence and validation.

## Confirmation request
At the beginning of the next substantive vibe-coding session, explicitly report the repository/enterprise ownership classification and whether it is original, forked, derivative, client-owned or otherwise. If the classification is uncertain, ask Farouk before implementing material changes.
