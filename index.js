const inquirer = require('inquirer');
const shell = require('shelljs')
const path = process.cwd();
const workspaceID = '';
const repository = '';

const authBitbucket = [
    {
        type: 'input',
        name: 'username',
        message: "Enter your username",
    },
    {
        type: 'password',
        message: 'Enter your password',
        name: 'password',
    },
];
inquirer
    .prompt([
        {
            type: 'list',
            name: 'type',
            message: 'What do you want to do?',
            choices: [
                'Start Project',
                'Remove Project',
            ],
        },
        ...authBitbucket
    ])
    .then((answers) => {
        const { username, password } = answers;

        shell.cd(path)
        if (answers.type === 'Remove Project') {
            shell.exec(`rm -r ${repository}`);
        }
        if (answers.type === 'Start Project') {
            shell.exec(`git clone https://${username}:${password}@bitbucket.org/${workspaceID}/${repository}.git`);
        }
    });
