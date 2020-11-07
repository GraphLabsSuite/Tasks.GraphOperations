import { IEdgeView, IGraphView, IVertexView } from '../models/graph';

function getVertex(name: string, arr: IVertexView[]): IVertexView {
    return arr.filter(v => v.name === name)[0];
}

function serializeVertex(v: IVertexView): string {
    return `{"name":"${v.name}", "label": "${v.name}"},`;
}

function serializeEdge(e: IEdgeView, arr: IVertexView[]): string {
    return `{"vertexOne": ${serializeVertex(getVertex(e.vertexOne, arr))} "vertexTwo": ${
        serializeVertex(getVertex(e.vertexTwo, arr))} "isDirected": false},`;
}

export function graphSerializer(graph: IGraphView): string {
    let serializedGraph: string = '{"isUndirected": false, "weighted": false, "vertices": [';
    if (graph.vertices.length > 0) {
        graph.vertices.forEach(v => serializedGraph = serializedGraph + serializeVertex(v));
        serializedGraph = serializedGraph.substring(0, serializedGraph.length - 1);
    }
    serializedGraph = serializedGraph + `], "edges": [`;
    if (graph.edges.length > 0) {
        graph.edges.forEach(e => serializedGraph = serializedGraph + serializeEdge(e, graph.vertices));
        serializedGraph = serializedGraph.substring(0, serializedGraph.length - 1);
    }
    serializedGraph = serializedGraph + ']}';
    return serializedGraph;
}