import React, { Component } from 'react'
import Table from '../components/Table/Table';
import './TodoListTable.css';
import Form from '../components/Form/Form';
import Footer from '../components/Footer/Footer';

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
        this.headitems = ['Task', 'Status'];
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.task)
    }

    onChange(event) {
        this.setState({...this.state, [event.target.id]: event.target.value})
        this.inputs.filter(i => i.id === event.target.id)[0].value = event.target.value;
    }

    render() {
        return (
            <div>
                <div className="form-content-wrapper">
                    <Form formId='form-test' inputs={this.inputs} onSubmit={this.onSubmit} onChange={this.onChange} />
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
