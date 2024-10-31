import React from 'react';
import classnames from 'classnames';

import './FormField.less';

interface IProps {
    title?: string;
    htmlFor?: string;
    error?: boolean;
    children: any;
}

const FormField = (props: IProps) => (
    <tr className={classnames({
        'form-field': true,
        'form-invalid': props.error,
    })}>
        <th
            className='form-field-row'
            scope='row'
        >
            <label htmlFor={props.htmlFor}>
                {props.title}
            </label>
        </th>
        <td>
            {props.children}
        </td>
    </tr>
);

export default FormField;
