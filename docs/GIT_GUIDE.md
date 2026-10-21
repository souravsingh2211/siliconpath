# Git guide

## Daily flow
```sh
git checkout main
git pull
git checkout -b feature/short-name
# ...work...
git status
git add .
git commit -m "feat: add lesson checklist"
git push -u origin feature/short-name
```
Then open GitHub, click "Compare & pull request", fill the template, ask for review.

After merge:
```sh
git checkout main
git pull
git branch -d feature/short-name
```

## Branch and commit names
- Branches: `feature/...`, `fix/...`, `docs/...`
- Commits: `feat:`, `fix:`, `docs:`, `style:`, `test:`, `chore:`

## Update your branch with latest main
```sh
git checkout main && git pull
git checkout feature/short-name
git merge main
```
Conflict? Open the file in VS Code, choose Accept Current / Incoming / Both, save, then:
```sh
git add .
git commit
git push
```

## See a teammate's branch
```sh
git fetch
git checkout feature/their-branch
```

## Fixes
| Problem | Fix |
|---|---|
| Edited on main by mistake (not committed) | `git stash`, `git checkout -b feature/x`, `git stash pop` |
| Undo last commit, keep changes (not pushed) | `git reset --soft HEAD~1` |
| Throw away changes in one file | `git restore path/to/file` |
| Pushed a secret | Tell the lead immediately and change the key |

## Never
- Push directly to main
- Force push (`git push --force`)
- Commit .env or node_modules
