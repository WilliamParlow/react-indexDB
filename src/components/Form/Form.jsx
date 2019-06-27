import React from 'react'
import './Form.css'

const Form = props => (
    <div className="form-wrapper">
        <form className="form" id={props.formId} onSubmit={e => props.onSubmit(e)}>
            <div className="input-container">
                {props.inputs.map((input, index) =>
                    <div className="input-wrapper" key={index}>
                        <label htmlFor={input.id}>{input.name}</label>
                        <input id={input.id} name={input.name} value={input.value}
                            placeholder={input.placeholder} type={input.type} onChange={e => props.onChange(e)} />
                    </div>
                )}
            </div>
            <div className="form-buttons-wrapper">
                <div className="form-bottom">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
                <div className="form-bottom">
                    <button type="reset" onClick={e => props.onClick()} className="btn">Clear</button>
                </div>
            </div>
        </form>
    </div>
);


export default Form
