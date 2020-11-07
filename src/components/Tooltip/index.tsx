import * as React from 'react';
import {Component, ReactNode} from 'react';

export interface TooltipProps {
    value: string;
    show: boolean;
    showTooltip: any;
    bound: HTMLDivElement|null;
}

class Tooltip extends Component<TooltipProps> {

    public tooltip!: HTMLElement;

    render(): ReactNode {
        const { value } = this.props;
        return (
            this.props.show && (
                <div
                    style={{
                        top: this.props.bound && this.props.bound.getBoundingClientRect().top || 0,
                        left: this.props.bound && this.props.bound.getBoundingClientRect().right || 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        position: 'fixed',
                        padding: 5,
                        margin: 5,
                        zIndex: 1001,
                        fontSize: '10pt',
                        whiteSpace: 'pre-line',
                        maxWidth: '400px',
                    }}
                    onClick={this.props.showTooltip}
                >
                    {value}
                </div>)
        );
    }
}

export default Tooltip;
