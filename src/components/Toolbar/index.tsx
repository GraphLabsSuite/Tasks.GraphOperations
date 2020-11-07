import * as React from 'react';
import { ToolButtonList } from '../ToolButtonList';
import styles from './Toolbar.module.css';

export class Toolbar extends React.Component {
    public render() {
        const Buttons = this.getButtonList();
        return (
            <div>
                <div className={styles.Title}>Панель инструментов</div>
                <Buttons />
            </div>);
    }

    public getButtonList() {
        return ToolButtonList;
    }
}
