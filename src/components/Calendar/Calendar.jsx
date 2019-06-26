import React from 'react'
import dateformat from 'dateformat'
import './Calendar.css'

const Calendar = props => {
    let date = new Date(props.period);
    let monthDays = getCalendarData(date, props.todoData);

    return (
        <div className="calendar-container">
            <div className="calendar-grid">
                <div className="calendar-header">
                    Calendar: {date.getFullYear()} - {date.getMonth() + 1}
                </div>
                {
                    monthDays.map(day =>
                        <div key={day.nowDay} className="calendar-item">
                            <div className="calendar-item-header">
                                {day.nowDay}{(day.todoData) ? ` - ${day.todoData.status}` : ''}
                            </div>
                            <div className={`calendar-item-data ${(day.todoData) ? day.todoData.status.toLowerCase() : ''}`}>
                                {(day.todoData) ? day.todoData.task : null}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export function getCalendarData(date, todoData) {

    let totalMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let calendarData = [];

    for (let i = 1; i <= totalMonthDays; i++) {
        calendarData.push({
            nowDay: i,
            todoData: todoData.find(d => parseInt(dateformat(d.date, 'd', false, false)) === i)
        });
    }

    return calendarData;
}

export default Calendar
