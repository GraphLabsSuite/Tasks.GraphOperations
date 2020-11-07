import { IEdgeView, IVertexView } from '..';
export interface IGraphActionVertex {
    type: string;
    vertex: IVertexView;
}

export interface IGraphActionEdge {
    type: string;
    edge: IEdgeView;
}

export type IGraphAction = IGraphActionEdge | IGraphActionVertex;

export const graphAction = 'graphAction';