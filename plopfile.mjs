export default function (plop) {
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [
            {
            type: 'input',
            name: 'EntityName',
            message: 'insert entity name:'
            },
            {
                type: 'input',
                name: 'PrismaMapName',
                message: 'insert prisma map entity name:'
            },
        ],
        actions: [
            {
            type: 'add',
            path: 'src/controllers/{{EntityName}}Controller.ts',
            templateFile: 'plop-templates/controller.hbs'
            },
            {
                type: 'add',
                path: 'src/routes/{{EntityName}}Routes.ts',
                templateFile: 'plop-templates/router.hbs'
            },
        ]
    });
};