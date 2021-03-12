import {init, init1, init2, initres} from "./ForMyGraphModel";
import {GraphGenerator, IEdge, IGraph, IVertex} from 'graphlabs.core.graphs';
import {ChooseTask, GetNewRandomGraph, GetNewRandomGraphForThatOne} from "./Ops";

function GraphsInit(){
    let graph: IGraph<IVertex, IEdge>;

    graph = GraphGenerator.generate(0);
    init(graph);

    let graph1: IGraph<IVertex, IEdge>;
    graph1 = GetNewRandomGraph(5);
    init1(graph1);

    let graph2: IGraph<IVertex, IEdge>;
    graph2 = GetNewRandomGraphForThatOne(5,graph1);
    init2(graph2);

    let graphres = ChooseTask();
    initres(graphres);
}

export {GraphsInit};