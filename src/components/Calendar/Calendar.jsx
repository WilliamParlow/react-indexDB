import React from 'react'
import dateformat from 'dateformat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCheckCircle, faTasks, faListUl } from '@fortawesome/free-solid-svg-icons'
import './Calendar.scss'

const Calendar = props => {
    let date = new Date(props.period);
    let monthDays = getCalendarData(date, props.todoData);

    return (
        <div className="calendar-container">
            <div className="calendar-grid">
                <div className="calendar-header">
                    <div className="calendar-header-item">
                        <button className="btn" onClick={e => props.onCalendarPagination(e, 'left')}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                    </div>
                    <div className="calendar-header-item">
                        Calendar: {date.getFullYear()} - {date.toString().substring(4, 7)}
                    </div>
                    <div className="calendar-header-item">
                        <button className="btn" onClick={e => props.onCalendarPagination(e, 'right')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
                {
                    monthDays.map(day =>
                        <div key={day.nowDay} className="calendar-item">
                            <div className="calendar-item-header">
                                {day.nowDay}
                            </div>
                            <div className={"calendar-item-data"}>
                                {day.todoData.sort((d1, d2) => (d1.status > d2.status) ? 1 : -1).map(d =>
                                    <div key={d.task} className={`todo-item ${(d.status) ? d.status.toLowerCase() : ''}`}>
                                        <span>
                                            {
                                                (d.status === 'Backlog') ? <FontAwesomeIcon icon={faListUl} /> : null
                                            }
                                            {
                                                (d.status === 'Doing') ? <FontAwesomeIcon icon={faTasks} /> : null
                                            }
                                            {
                                                (d.status === 'Done') ? <FontAwesomeIcon icon={faCheckCircle} /> : null
                                            }
                                        </span>
                                        {(d) ? d.task : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

function getCalendarData(date, todoData) {

    let totalMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let calendarData = [];

    for (let i = 1; i <= totalMonthDays; i++) {
        calendarData.push({
            nowDay: i,
            todoData: todoData.filter(d => parseInt(dateformat(d.date, 'd', true)) === i
                && parseInt(dateformat(d.date, 'm', true)) === (date.getMonth() + 1)
                && parseInt(dateformat(d.date, 'yyyy', true)) === date.getFullYear())
        });
    }
    return calendarData;
}

export default Calendar
