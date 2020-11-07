import * as React from 'react';
import styles from './ToolButton.module.css';
import {Component} from 'react';
import classnames from 'classnames';

export interface ToolButtonProps {
    path: string;
    listener: () => void;
}

export class ToolButton extends Component<ToolButtonProps> {

    public constructor(props: ToolButtonProps) {
        super(props);
    }

    render() {
        return (
            <div className={classnames(styles.toolButton, 'btn btn-success')} onClick={this.props.listener}>
                <img src={this.props.path}/>
            </div>);
    }
}
