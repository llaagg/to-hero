# I18N:
* https://github.com/Microsoft/vscode-nls
* [I18n](https://github.com/microsoft/vscode-extension-samples/tree/main/i18n-sample)
* [vscode-nls-dev](https://www.npmjs.com/package/vscode-nls-dev)

# docs:
* Views: https://code.visualstudio.com/api/references/contribution-points#contributes.views
* When: https://code.visualstudio.com/api/references/when-clause-contexts
* VS Code: https://code.visualstudio.com/api/get-started/your-first-extension
* TS: https://www.typescriptlang.org/docs/handbook/classes.html
* Examples: https://github.com/microsoft/vscode-extension-samples
* Built-in commands: https://code.visualstudio.com/api/references/commands

# SDK
choco install nvm
nvm install latest
nvm use 18.2.0
npm install -g typescript
npm install -g vsce
npm install --global gulp-cli

# Release steps:
1. change version in package.json
2. git commit -a -m "new version"
3. git tag v0.9.5
5. git push
4. git push --tags

