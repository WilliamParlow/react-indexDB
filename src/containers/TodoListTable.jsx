import React, { Component } from 'react';
import Table from '../components/Table/Table';
import './TodoListTable.css';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';
import IndexDBService from '../services/IndexDBService';
import { DatabaseConstant, TodoListTableConstant } from '../data/DataConstants';

export class TodoListTable extends Component {

    constructor() {
        super();
        this.state = {
            task: '',
            todoItens: [],
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
        this.headitems = TodoListTableConstant.headitems;
        this.todoListDatabaseConfig = DatabaseConstant.databases.find(d => d.name === 'todo-list');
        this.todoListStoreConfig = this.todoListDatabaseConfig.stores.find(s => s.name === 'todo-iten');
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onButtonClearDatabaseClick = this.onButtonClearDatabaseClick.bind(this);

        this._dbService = new IndexDBService(this.todoListDatabaseConfig.name, 1);
        this._dbService.createNewStore(this.todoListStoreConfig.name, this.todoListStoreConfig.config, this.todoListStoreConfig.fields)
            .then(res => this._dbService.getAllFromStore(this.todoListStoreConfig.name)
            .then(data => this.setState({
                ...this.state, 
                todoItens: this.state.todoItens.concat(data.map(iten => {
                    delete iten.id; 
                    return iten
                }))
            }))
            .catch(error => console.log(error)));
    }

    onSubmit(event) {
        event.preventDefault();

        let status = 'Backlog';
        let task = event.target.task.value;

        this._dbService.addNewFieldValue(this.todoListStoreConfig.name, {
            task: task,
            status: status
        });

        this.setState({...this.state, todoItens: this.state.todoItens.concat({task: task, status: status})})
    }

    onChange(event) {
        this.setState({...this.state, [event.target.id]: event.target.value})
        this.inputs.filter(i => i.id === event.target.id)[0].value = event.target.value;
    }

    onButtonClearDatabaseClick() {
        this._dbService.clearStore(this.todoListStoreConfig.name);
        this.setState({...this.state, todoItens: []})
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
                    <Table caption="Todo itens" headitems={this.headitems} bodyitems={this.state.todoItens} />
                </div>
                <div className="table-content-wrapper" >
                    <Table caption="Done itens" headitems={this.headitems} bodyitems={this.state.doneItens} />
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
