import * as path from 'path';
import { env } from 'process';

import { downloadAndUnzipVSCode, resolveCliPathFromVSCodeExecutablePath, runTests } from 'vscode-test';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');
		const vscodeVersion = env['CODE_VERSION'];
		const vscodeExecutablePath = await downloadAndUnzipVSCode(vscodeVersion);
		const cliPath = resolveCliPathFromVSCodeExecutablePath(vscodeExecutablePath);
		const extensionsDir = path.resolve(path.dirname(cliPath), '..', 'extensions');
		const userDataDir = path.resolve(extensionsDir, '..', '..', 'udd');

		// Download VS Code, unzip it and run the integration test
		await runTests({
			vscodeExecutablePath,
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [
				'--verbose',
				'--new-window',
				'--disable-extension', 'vscode.git',
				'--disable-extension', 'vscode.github',
				'--extensions-dir', extensionsDir,
				'--user-data-dir', userDataDir,
				'--disable-updates',
				'--disable-restore-windows',
				'--disable-telemetry',
      ]});
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
