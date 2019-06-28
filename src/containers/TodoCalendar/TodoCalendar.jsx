import React, { Component } from 'react'
import IndexDBService from '../../services/IndexDBService'
import Calendar from '../../components/Calendar/Calendar';
import { DatabaseConstant } from '../../data/DataConstants';
import dateformat from 'dateformat'
import './TodoCalendar.css'

export class TodoCalendar extends Component {
    constructor() {
        super();

        this.state = {
            todoData: [],
            calendarDate: new Date()
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
                    this.setState({ ...this.state, todoData: newData });
                })).catch(e => console.log(e));

        this.onCalendarPagination = this.onCalendarPagination.bind(this);
    }

    onCalendarPagination(event, pagination) {

        const date = (pagination === 'left')
            ? new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth() - 1, this.state.calendarDate.getDate())
            : new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth() + 1, this.state.calendarDate.getDate());

        this._dbService.getAllFromStore(this.todoListStoreConfig.name).then(todoListData => {
            let newData = todoListData.filter(data => {
                return parseInt(dateformat(data.date, 'm', true)) === (date.getMonth() + 1)
                    && parseInt(dateformat(data.date, 'yyyy', true)) === date.getFullYear();
            })
            this.setState({
                ...this.state,
                todoData: newData,
                calendarDate: date
            });
        })
    }

    render() {
        return (
            <div>
                <Calendar period={this.state.calendarDate} todoData={this.state.todoData} onCalendarPagination={this.onCalendarPagination} />
            </div>
        )
    }
}

export default TodoCalendar
