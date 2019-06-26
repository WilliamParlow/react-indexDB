import React from 'react'
import './DynamicTable.css'

const DynamicTable = props => (
    <div className="simple-table-wrapper">
        <table className="simple-table">
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
                        {Object.keys(i).map((key, tdIndex) => (key !== 'id') ? <td key={tdIndex}>{i[key]}</td> : null)}
                        <td>
                            {
                                (props.onRemove)
                                    ? <button className="btn btn-danger" onClick={() => props.onRemove(i)}>Remove</button>
                                    : null
                            }
                            {
                                (props.changeStatusToDoing)
                                    ? <button className="btn btn-info" onClick={() => props.changeStatusToDoing(i)}>To Doing</button>
                                    : null
                            }
                            {
                                (props.changeStatusToDone)
                                    ? <button className="btn btn-success" onClick={() => props.changeStatusToDone(i)}>To Done</button>
                                    : null
                            }
                            {
                                (props.changeStatusToTodo)
                                    ? <button className="btn btn-default" onClick={() => props.changeStatusToTodo(i)}>To Todo</button>
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