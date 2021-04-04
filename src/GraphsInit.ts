import {init, init1, init2, initres} from "./ForMyGraphModel";
import {Edge, GraphGenerator, IEdge, IGraph, IVertex, Vertex} from 'graphlabs.core.graphs';
import {ChooseTask} from "./Ops";
import {message_0, message_0_changing, num_0, num_0_changing, message_1, message_1_changing, mark_0, mark_0_changing, k_s, k_s_changing} from './ForMeVars';

function GraphsInit(){
    let graph: IGraph<IVertex, IEdge>;
    let num_vert_plus_edg = num_0<=4?(9+k_s[num_0]):(Math.round((9+k_s[num_0])/2));

    graph = GraphGenerator.generate(0);
    init(graph);

    let graph1: IGraph<IVertex, IEdge>;
    graph1 = GetNewRandomGraph(num_vert_plus_edg);
    init1(graph1);

    let graph2: IGraph<IVertex, IEdge>;
    graph2 = num_0<=2?GetNewRandomGraph(num_vert_plus_edg):GetNewRandomGraphForThatOne(num_vert_plus_edg, graph1);
    init2(graph2);

    let graphres = ChooseTask();
    initres(graphres);
}

function GetNewRandomGraph (num:number){ // рандомный граф
    let graph: IGraph<IVertex, IEdge>;
    graph = GraphGenerator.generate(0);
    let edge_num = num - Math.round(num/2);//Math.round((Math.random()*0.15+0.85)*num/2);
    let vert_num = num - edge_num;
    let vert_num_help = vert_num;

    while (vert_num!==0){
        graph.addVertex(new Vertex(`${vert_num}`));
        vert_num--;
    }

    while (edge_num!==0){
        let v1 = graph.getVertex(`${Math.round(Math.random()*(vert_num_help-1)+1)}`)[0];
        let v2 = graph.getVertex(`${Math.round(Math.random()*(vert_num_help-1)+1)}`)[0];
        if(!v1.isAdjacent(graph,v2)){
            graph.addEdge(new Edge(v1,v2,`${v1.name}+${v2.name}`));
            edge_num--;
        }
    }

    return graph;
}

function GetNewRandomGraphForThatOne (num:number, graph1:IGraph<IVertex, IEdge>){
    let graph: IGraph<IVertex, IEdge>;
    graph = GraphGenerator.generate(0);
    let edge_num = num - Math.round(num/2);//Math.round((Math.random()*0.15+0.85)*num/2);
    let vert_num = num - edge_num;

    vert_num+=graph1.vertices.length;
    edge_num+=graph1.edges.length;
    let vert_num_help = vert_num;

    while (vert_num!==graph1.vertices.length){
        graph.addVertex(new Vertex(`${vert_num}`));
        vert_num--;
    }

    while (edge_num!==0){
        let v1 = graph.getVertex(`${Math.round(Math.random()*(vert_num_help-1)+graph1.vertices.length)}`)[0];
        let v2 = graph.getVertex(`${Math.round(Math.random()*(vert_num_help-1)+graph1.vertices.length)}`)[0];
        if(v1 && v2 && !v1.isAdjacent(graph,v2)){
            graph.addEdge(new Edge(v1,v2,`${v1.name}+${v2.name}`));
            edge_num--;
        }
    }

    return graph;
}

export {GraphsInit};