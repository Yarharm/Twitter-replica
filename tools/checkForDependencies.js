// Install dependencies for the Frontend and Backend

const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const utils = require("util");
const exists = utils.promisify(fs.exists);

const backendMockPath = `${process.cwd()}`;
const FRONTEND_DIR = `${backendMockPath}/twitter-replica-ui`;
const BACKEND_DIR = `${backendMockPath}/twitter-replica-backend`;
const NODE_MODULES_PATH = "node_modules";

async function frontendNodeModulesPresent() {
  return exists(path.join(FRONTEND_DIR, NODE_MODULES_PATH));
}

async function backendNodeModulesPresent() {
  return exists(path.join(BACKEND_DIR, NODE_MODULES_PATH));
}

async function getDependenciesIfAbsent() {
  const frontendNodeModulesDirExists = await frontendNodeModulesPresent();
  const backendNodeModulesDirExists = await backendNodeModulesPresent();

  if (!frontendNodeModulesDirExists) {
    const npmInstall = childProcess.spawn("npm", ["install"], {
      cwd: `${FRONTEND_DIR}`
    });

    npmInstall.on("error", err => {
      console.error("Failed to start subprocess.");
      process.exit(1);
    });

    npmInstall.stdout.on("close", () => process.exit(0));
  }

  if (!backendNodeModulesDirExists) {
    const npmInstall = childProcess.spawn("npm", ["install"], {
      cwd: `${BACKEND_DIR}`
    });

    npmInstall.on("error", err => {
      console.error("Failed to start subprocess.");
      process.exit(1);
    });
  }
}

(async function() {
  await getDependenciesIfAbsent();
})();
