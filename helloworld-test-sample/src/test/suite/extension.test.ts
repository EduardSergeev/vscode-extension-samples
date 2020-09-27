import { __promisify__ } from 'glob';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { promisify } from 'util';


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Activate extension', async () => {
		await vscode.commands.executeCommand('extension.helloWorld');
	});

	test('Try using git', async () => {
		await vscode.commands.executeCommand('workbench.scm.focus');
		await vscode.commands.executeCommand('git.showOutput');
		await promisify(setTimeout)(5000);
	});
});
