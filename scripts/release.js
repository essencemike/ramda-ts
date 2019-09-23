/**
 * How to do a release:
 */

process.env.RAMDA_RELEASE = true;

const execa = require('execa');
const semver = require('semver');
const inquirer = require('inquirer');
const minimist = require('minimist');

const cliOptions = minimist(process.argv);
if (cliOptions['local-registry']) {
  inquirer.prompt = () => ({
    bump: 'minor',
    yes: true,
  });
}

const curVersion = require('../lerna.json').version;

const release = async () => {
  console.log(`Current version: ${curVersion}`);

  const bumps = ['patch', 'minor', 'major', 'prerelease'];
  const versions = {};
  bumps.forEach(b => { versions[b] = semver.inc(curVersion, b) });
  const bumpChoices = bumps.map(b => ({ name: `${b} (${versions[b]})`, value: b }));

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [
        ...bumpChoices,
        { name: 'custom', value: 'custom' },
      ],
    }, {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: answers => answers.bump === 'custom'
    }
  ]);

  const version = customVersion || versions[bump];

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `Confirm releasing ${version}?`,
    type: 'confirm',
  }]);

  if (yes) {
    // git commit
    try {
      await execa('git', ['add', '-A'], { stdio: 'inherit' });
      await execa('npm', ['run', 'commit', 'chore: pre release lint'], { stdio: 'inherit' });
    } catch (e) {
      console.error(e);
    }
  }

  const releaseType = semver.diff(curVersion, version);

  let distTag = 'latest';
  if (releaseType.startsWith('pre') && !cliOptions['local-registry']) {
    distTag = 'next';
  }

  const lernaArgs = [
    'publish',
    '--repo-version',
    version,
    '--dist-tag',
    distTag,
  ];

  // keep packages' minor version in sync
  if (releaseType !== 'patch') {
    lernaArgs.push('--force-publish');
    lernaArgs.push('*');
  }

  if (cliOptions['local-registry']) {
    lernaArgs.push('--no-git-tag-version', '--no-commit-hooks', '--no-push', '--yes');
  }

  await execa(require.resolve('lerna/bin/lerna'), lernaArgs, { stdio: 'inherit' });

  require('./genChangelog')(version);
};

release().catch(err => {
  console.error(err);
  process.exit(1);
});
