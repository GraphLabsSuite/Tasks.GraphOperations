import * as React from 'react';
import {store} from "../..";
import styles from './StudentMark.module.scss';

export interface StudentMarkProps {}

interface State {
    mark: number;
    message: string;
}

export class StudentMark extends React.Component<StudentMarkProps, Partial<State>> {
    public state = {
        mark: store.getState().notifier.score,
        message: ''
    };
    public constructor(props: StudentMarkProps) {
        super(props);
        store.subscribe(() => {
            console.log(store.getState().notifier.score);
            if (store.getState().notifier.score !== this.state.mark) {
                this.setState({
                    mark: store.getState().notifier.score,
                });
            }
        });
    }

    public render() {
        return (<div style={{ textAlign: 'center' }}>
            <div className={styles.StudentMark}>
                <p className={this.getStyle()}>{this.state.mark} {this.state.message}</p>
            </div>
        </div>);
    }

    private getStyle(): string {
        if (this.state.mark > 100) { return ''; }
        if (this.state.mark > 75) { return styles.MarkPositive; }
        if (this.state.mark > 60) { return styles.MarkNeutral; }
        if (this.state.mark > 0) { return styles.MarkNegative; }
        return '';
    }
}
