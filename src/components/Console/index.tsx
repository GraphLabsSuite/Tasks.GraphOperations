import * as React from 'react';
import { IStudentAction } from 'graphlabs.core.notifier';
import { RootState, store } from '../..';
import {Component} from "react";
import styles from './Console.module.css';

export class Console extends Component {

    private _action!: Array<IStudentAction>;
    get actions(): Array<IStudentAction> {
        const state: RootState = store.getState();
        store.subscribe(() => {
            let flag = false;
            store.getState().notifier.studentActions.forEach((e: IStudentAction, i: number) => {
                if (this._action[i] !== e) {
                    flag = true;
                }
            });
            if (flag) {
                this._action = store.getState().notifier.studentActions;
                this.forceUpdate();
            }
        });
        this._action = [...state.notifier.studentActions];
        return this._action;
    }

    public render() {
        const actions = this.actions.map((i, index) => {
            const nData: number = i.datetime;
            const date = new Date(nData);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const message = i.message;
            const result = hours + ':' + minutes + ':' + seconds + '  : ' + message;
            return <div key={index}>{result}</div>;
        });
        // This is the rest of console
        return (
            <div className={styles.Console}>
                {actions}
            </div>);
    }

}
