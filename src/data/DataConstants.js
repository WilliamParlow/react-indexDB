export const DatabaseConstant = {
    databases: [{
        name: 'todo-list',
        version: 1,
        stores: [
            {
                name: 'todo-item',
                config: {
                    keyPath: 'id', 
                    autoIncrement: true
                },
                fields: [
                    {
                        name: 'task',
                        keyPath: 'task',
                        config: { unique: true }
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

export const TodoListStatus = {
    backlog: 'Backlog',
    doing: 'Doing',
    done: 'Done'
}