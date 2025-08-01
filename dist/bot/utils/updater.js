import axios from "axios";
import logger from "./logger.js";
import inquirer from "inquirer";
import { spawn, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default async function update() {
    try {
        const rawFileUrl = "https://raw.githubusercontent.com/Hydradevx/Hydrion-S3LFB0T/refs/heads/main/package.json";
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
        };
        const response = await axios.get(rawFileUrl, { headers });
        if (!response.data || !response.data.version) {
            logger.warn("Failed to fetch latest version. Response is invalid.");
            return;
        }
        const ghVersion = response.data.version;
        const packageJsonPath = path.join(__dirname, "../../../package.json");
        const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
        const Json = JSON.parse(packageJsonContent);
        const version = Json.version;
        if (ghVersion > version) {
            logger.status(`New version available: ${ghVersion}`);
            logger.warn("Please backup your config.json and install the latest version to continue using Hydrion!! Thank you");
            const { update } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "update",
                    message: `Do you want to update now? ( v${version} -> v${ghVersion})`,
                },
            ]);
            if (update) {
                logger.info("Updating...");
                try {
                    execSync("git stash");
                    execSync("git pull");
                    execSync("git reset --hard");
                    logger.info("Update successful!");
                    restart();
                }
                catch (error) {
                    logger.warn(`Update failed! (Code: ${error.status})`);
                }
            }
        }
        else {
            logger.info(`You are running the latest version: ${version}`);
        }
    }
    catch (error) {
        logger.warn(`Error checking for updates: ${error.message}`);
    }
}
function restart() {
    logger.info("Restarting...");
    const child = spawn("cmd.exe", ["/K", "npm start"], {
        cwd: process.cwd(),
        shell: true,
        detached: true,
        stdio: "ignore",
    });
    child.unref();
    process.exit(0);
}
