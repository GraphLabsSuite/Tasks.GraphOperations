import * as React from 'react';
import {ReadableAdapter, WritableAdapter} from "graphlabs.core.visualizer";

import {CommonGraphAdapter} from "../..";
import { IGraph, IEdge, IVertex } from "graphlabs.core.graphs";

export interface GVProps {
    adapterType?: string;
    graph: IGraph<IVertex, IEdge>;
    namedEdges?: boolean;
    vertexNaming?: boolean;
    withoutDragging?: boolean;
    edgeNaming?: boolean;
    incidentEdges?: boolean;

    //allowMultipleEdges?: boolean;
}

let adapter: WritableAdapter;

export class GraphVisualizer extends React.Component<GVProps> {

   public render() {
        // console.log(this.props.graph);
        if (this.props.adapterType) {
            window.sessionStorage.setItem("adapterType", this.props.adapterType);
        }
        if (this.props.adapterType == 'writable') {
            return <WritableAdapter
                graph={this.props.graph}
                ref={(i: WritableAdapter) => adapter = i}
                namedEdges={this.props.namedEdges}
                vertexNaming={this.props.vertexNaming}
                withoutDragging={this.props.withoutDragging}
                edgeNaming={this.props.edgeNaming}
                incidentEdges={this.props.incidentEdges}

                //allowMultipleEdges={this.props.allowMultipleEdges}
            />;
        } else if (this.props.adapterType == 'readable' || this.props.adapterType == null) {
            return <ReadableAdapter
                graph={this.props.graph}
                namedEdges={this.props.namedEdges}
                vertexNaming={this.props.vertexNaming}
                withoutDragging={this.props.withoutDragging}
                edgeNaming={this.props.edgeNaming}
                incidentEdges={this.props.incidentEdges}

                //allowMultipleEdges={this.props.allowMultipleEdges}
            />;
            console.log(ReadableAdapter.prototype.props.graph);
        }
    }
}
/*
     public render() {

        return <CommonGraphAdapter
            graph = {this.props.graph}
        />
    }
} */
export {adapter};


