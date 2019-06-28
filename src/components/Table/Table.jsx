import React from 'react'
import './Table.scss'

const Table = props => (
    <div className="simple-table-wrapper">
        <table className="simple-table">
            <caption>{props.caption}</caption>
            <thead>
                <tr>
                    {props.headitems.map((i, index) =>
                        <th key={index}>{i}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {props.bodyitems.map((i, trIndex) =>
                    <tr key={trIndex}>
                        {Object.keys(i).map((key, tdIndex) => <td key={tdIndex}>{i[key]}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default Table