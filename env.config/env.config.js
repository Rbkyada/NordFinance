const { spawn } = require('child_process');

const config = {
  stage: '.envStg',
  prod: '.envProd',
  test: '.envTest',
  dev: '.envDev',
};

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise(resolve => {
    spawned.stdout.on('data', data => {
      const response = data.toString();
      resolve(response);
    });

    spawned.stderr.on('data', data => {
      console.error('err', data.toString());
    });

    spawned.on('close', () => {
      resolve();
    });
  });
}

const main = async () => {
  const currentBranch = (
    await runCommand('git', ['branch', '--show-current'])
  ).trim();
  console.log(currentBranch);
  let env = config[currentBranch];
  if (!env) {
    env = config.dev;
  }
  const path = `./env.config/${env}`;
  await runCommand('cp', [path, './.env']);
};

main();
