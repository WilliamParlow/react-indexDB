import React, { Component } from 'react';
import DynamicTable from '../components/DynamicTable/DynamicTable';
import './TodoListTable.css';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';
import IndexDBService from '../services/IndexDBService';
import { DatabaseConstant, TodoListTableConstant, TodoListStatus } from '../data/DataConstants';

export class TodoListTable extends Component {

    constructor() {
        super();

        this.state = {
            task: '',
            todoItens: [],
            doingItens: [],
            doneItens: []
        }

        this.inputs = [
            {
                id: 'task',
                name: 'task',
                value: this.state.task,
                placeholder: 'Type your task',
                type: 'text'
            }
        ];

        this.todoListDatabaseConfig = DatabaseConstant.databases.find(d => d.name === 'todo-list');
        this.todoListStoreConfig = this.todoListDatabaseConfig.stores.find(s => s.name === 'todo-iten');
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onButtonClearDatabaseClick = this.onButtonClearDatabaseClick.bind(this);
        this.onRemoveTodoItem = this.onRemoveTodoItem.bind(this);
        this.changeStatusToDoing = this.changeStatusToDoing.bind(this);
        this.changeStatusToDone = this.changeStatusToDone.bind(this);
        this.changeStatusToTodo = this.changeStatusToTodo.bind(this);

        this._dbService = new IndexDBService(this.todoListDatabaseConfig.name, 1);
        this._dbService.createNewStore(this.todoListStoreConfig.name, this.todoListStoreConfig.config, this.todoListStoreConfig.fields)
            .then(() => this.updateTodoListState());
    }

    onSubmit(event) {
        event.preventDefault();

        let status = TodoListStatus.backlog;
        let task = event.target.task.value;

        this._dbService.addNewFieldValue(this.todoListStoreConfig.name, {
            task: task,
            status: status
        }).then(() => {
            this._dbService.getAllFromStore(this.todoListStoreConfig.name).then(itens => {
                this.setState({
                    ...this.state, 
                    todoItens: this.state.todoItens.concat(itens.filter(i => i.task === task))
                });
            })
        })
        .catch(err => {
            console.log(err);
            alert('You can\'t create a Task with same name you already created.');
        });
    }

    onChange(event) {
        this.setState({...this.state, [event.target.id]: event.target.value})
        this.inputs.filter(i => i.id === event.target.id)[0].value = event.target.value;
    }

    onButtonClearDatabaseClick() {
        this._dbService.clearStore(this.todoListStoreConfig.name)
            .then(() => this.updateTodoListState())
            .catch(err => console.log(err));
    }

    onRemoveTodoItem(iten) {
        this._dbService.removeItemFromStoreByKey(this.todoListStoreConfig.name, iten.id)
            .then(() => this.setState({...this.state, todoItens: this.state.todoItens.filter(i => i.id !== iten.id)}))
            .catch(err => console.log(err));
    }

    changeStatusToTodo(iten) {
        iten.status = TodoListStatus.backlog;
        this._dbService.updateStoreIten(this.todoListStoreConfig.name, iten, iten.id).then(() => {
            this.updateTodoListState();
        });
    }

    changeStatusToDoing(iten) {
        iten.status = TodoListStatus.doing;
        this._dbService.updateStoreIten(this.todoListStoreConfig.name, iten, iten.id).then(() => {
            this.updateTodoListState();
        });
    }
    
    changeStatusToDone(iten) {
        iten.status = TodoListStatus.done;
        this._dbService.updateStoreIten(this.todoListStoreConfig.name, iten).then(() => {
            this.updateTodoListState();
        });
    }

    updateTodoListState() {
        this._dbService.getAllFromStore(this.todoListStoreConfig.name).then(data => {
            this.setState({
                ...this.state,
                todoItens: data.filter(i => i.status === TodoListStatus.backlog),
                doingItens: data.filter(i => i.status === TodoListStatus.doing),
                doneItens: data.filter(i => i.status === TodoListStatus.done)
            });
        })
    }
    
    render() {
        return (
            <div>
                <div className="form-content-wrapper">
                    <Form formId='form-test' inputs={this.inputs} onSubmit={this.onSubmit} onChange={this.onChange} />
                    <div className="clear-button-wrapper">
                        <button onClick={this.onButtonClearDatabaseClick}>Clear</button>
                    </div>
                </div>

                <div className="table-content-wrapper" >
                    <DynamicTable caption="Todo itens" headitems={TodoListTableConstant.headitems} bodyitems={this.state.todoItens} 
                        onRemove={this.onRemoveTodoItem} changeStatusToDoing={this.changeStatusToDoing} />
                </div>

                <div className="table-content-wrapper" >
                    <DynamicTable caption="Doing itens" headitems={TodoListTableConstant.headitems} bodyitems={this.state.doingItens} 
                        onRemove={this.onRemoveTodoItem} changeStatusToDone={this.changeStatusToDone} 
                        changeStatusToTodo={this.changeStatusToTodo} />
                </div>

                <div className="table-content-wrapper" >
                    <DynamicTable caption="Done itens" headitems={TodoListTableConstant.headitems} bodyitems={this.state.doneItens} 
                        onRemove={this.onRemoveTodoItem} changeStatusToDoing={this.changeStatusToDoing} />
                </div>

                <div className="footer-content-wrapper" >
                    <Footer description="There is a React project by @Will to use like a model for comparision with 
                        another project using React and Redux"/>
                </div>
            </div>
        );
    }
}

export default TodoListTable
