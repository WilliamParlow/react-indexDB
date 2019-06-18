export const DatabaseConstant = {
    databases: [{
        name: 'todo-list',
        version: 1,
        stores: [
            {
                name: 'todo-iten',
                config: {
                    keyPath: 'id', 
                    autoIncrement: true
                },
                fields: [
                    {
                        name: 'task',
                        keyPath: 'task',
                        config: { unique: false }
                    },
                    {
                        name: 'status',
                        keyPath: 'status',
                        config: { unique: false }
                    }
                ]
            }
        ]
    }],

}

export const TodoListTableConstant = {
    headitems: ['Task', 'Status']
}