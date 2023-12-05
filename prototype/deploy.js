import { promisify } from "util";
import { exec } from "child_process";

const execPromise = promisify(exec);

function rsync() {
    return execPromise("./scripts/deploy-ssh.sh");
}

rsync();
