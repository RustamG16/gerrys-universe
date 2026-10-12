// Publishes dist/ to the gh-pages branch (GitHub Pages source). Run via `npm run deploy`.
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' });
const remote = execSync('git remote get-url origin').toString().trim();

writeFileSync('dist/.nojekyll', '');
run('git init -q -b gh-pages');
run('git add -A');
run('git -c user.name="deploy" -c user.email="deploy@local" commit -q -m "Deploy to GitHub Pages"');
run(`git push -q -f ${remote} gh-pages`);
console.log('Deployed dist/ to gh-pages');
