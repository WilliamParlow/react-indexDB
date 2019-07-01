import React from 'react'
import dateFormat from 'dateformat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckCircle, faTasks, faListUl } from '@fortawesome/free-solid-svg-icons'
import './DynamicTable.scss'

const DynamicTable = props => (
    <div className="dynamic-table-wrapper">
        <table className={`dynamic-table ${(props.customClass) ? props.customClass : ''}`}>
            <caption>{props.caption}</caption>
            <thead>
                <tr>
                    {props.headitems.map((i, index) =>
                        <th key={index}>{i}</th>
                    )}
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.bodyitems.map((i, trIndex) =>
                    <tr key={trIndex}>
                        {Object.keys(i).map((key, tdIndex) => (key !== 'id')
                            ? (key === 'date')
                                ? <td key={tdIndex}>
                                    <input className="table-date-input" value={dateFormat(i[key], 'yyyy-mm-dd', true)} placeholder="Type a date" type="date" onKeyUp={e => props.onDateInputKeyUp(e, i[key])} onChange={e => props.onDateInputChange(e)}/>
                                </td>
                                : <td key={tdIndex}>
                                    {i[key]}
                                </td>
                            : null)}
                        <td>
                            {
                                (props.onRemove)
                                    ? <button className="btn btn-danger" onClick={() => props.onRemove(i)}><FontAwesomeIcon icon={faTrash} /></button>
                                    : null
                            }
                            {
                                (props.changeStatusToTodo)
                                    ? <button className="btn btn-default" onClick={() => props.changeStatusToTodo(i)}><FontAwesomeIcon icon={faListUl} /></button>
                                    : null
                            }
                            {
                                (props.changeStatusToDoing)
                                    ? <button className="btn btn-info" onClick={() => props.changeStatusToDoing(i)}><FontAwesomeIcon icon={faTasks} /></button>
                                    : null
                            }
                            {
                                (props.changeStatusToDone)
                                    ? <button className="btn btn-success" onClick={() => props.changeStatusToDone(i)}><FontAwesomeIcon icon={faCheckCircle} /></button>
                                    : null
                            }
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default DynamicTable