import React, { Component } from 'react'
import './TodoCalendar.css'
import IndexDBService from '../../services/IndexDBService'
import Calendar from '../../components/Calendar/Calendar';
import { DatabaseConstant } from '../../data/DataConstants';

export class TodoCalendar extends Component {
    constructor() {
        super();

        this.state = {
            todoData: []
        }

        this.todoListDatabaseConfig = DatabaseConstant.databases.find(d => d.name === 'todo-list');
        this.todoListStoreConfig = this.todoListDatabaseConfig.stores.find(s => s.name === 'todo-item');

        this._dbService = new IndexDBService(this.todoListDatabaseConfig.name, 1);
        this._dbService.createNewStore(this.todoListStoreConfig.name, this.todoListStoreConfig.config, this.todoListStoreConfig.fields)
            .then(() =>
                this._dbService.getAllFromStore(this.todoListStoreConfig.name).then(todoListData => {
                    let newData = todoListData.filter(data => {
                        let nowDate = new Date();
                        let todoDate = new Date(data.date);
                        return (nowDate.getMonth()) === todoDate.getMonth();
                    })
                    this.setState({...this.state, todoData: newData});
                })).catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                <Calendar period={new Date()} todoData={this.state.todoData}/>
            </div>
        )
    }
}

export default TodoCalendar
