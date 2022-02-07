export const resources = [
    {
        label: 'Roles',
        name: 'roles',        
        description: '',
        permissions: [
            { name: 'create:any', description: 'User can create roles'},
            { name: 'read:any', description: 'User can see roles'},
            { name: 'update:any', description: 'User can update roles'},
            { name: 'delete:any', description: 'User can remove roles'},
        ]
    },
    {
        label: 'Users',
        name: 'users',
        description: '',
        permissions: [
            { name: 'create:any', description: 'User can create new users'},
            { name: 'read:any', description: 'User can see users'},
            { name: 'update:any', description: 'User can update any user'},
            { name: 'delete:any', description: 'User can remove any user'},
        ]
    },
    {
        label: 'Subjects',
        name: 'subjects',
        description: '',
        permissions: [
            { name: 'create:own', description: 'User can create new subjects'},
            { name: 'read:any', description: 'User can see all subjects'},
            { name: 'read:own', description: 'User can only see assigned subjects'},
            { name: 'update:any', description: 'User can update any subject'},
            { name: 'update:own', description: 'User can update assigned subjects'},
            { name: 'delete:any', description: 'User can remove any subject'},
            { name: 'delete:own', description: 'User can remove own subjects'},
        ]
    },
    {
        label: 'Questions Bank',
        name: 'questions',
        description: '',
        permissions: [
            { name: 'create:own', description: 'User can create new questions'},
            { name: 'read:any', description: 'User can see all questions'},
            { name: 'read:own', description: 'User can only see own questions'},
            { name: 'update:any', description: 'User can update any questions'},
            { name: 'update:own', description: 'User can update own questions'},
            { name: 'delete:any', description: 'User can remove any question'},
            { name: 'delete:own', description: 'User can remove own questions'},
        ]
    },
    {
        label: 'Reports',
        name: 'reports',
        description: '',
        permissions: [
            { name: 'read:any', description: 'User can see all reports'},
            { name: 'read:own', description: 'User can only see own reports'},
        ]
    }
]