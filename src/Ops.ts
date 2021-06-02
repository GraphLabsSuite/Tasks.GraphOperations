import './App.css';
import {  IGraph, IVertex, IEdge, Vertex, Edge, GraphGenerator } from "graphlabs.core.graphs";
import 'graphlabs.core.template/dist/main.css';

import { /*initres, graphModelres, init, graphModel, init1,*/ graphModel1, init2, graphModel2 } from './ForMyGraphModel';
import { num_0, num_0_changing, message_0_changing } from './ForMeVars';

function ChooseTask(){
    switch (num_0) {
        case 0:
            message_0_changing("Постройте граф, являющийся результатом пересечения двух графов.");// вершины пересекаются
            return Cross(graphModel1,graphModel2);
        case 1:
            message_0_changing("Постройте граф, являющийся дополнением графа."); // один граф
            return Addition(graphModel1);
        case 2:
            message_0_changing("Постройте граф, являющийся результатом объединения двух графов."); // вершины пересекаются
            return Uni(graphModel1,graphModel2);
        case 3:
            message_0_changing("Постройте граф, являющийся результатом соединения двух графов с неперсекающимися вершинами."); // вершины пока не пересекаются
            return Joint(graphModel1,graphModel2);
        case 4:
            message_0_changing("Постройте граф, являющийся результатом соединения двух графов с персекающимися вершинами."); // вершины пересекаются
            return Joint_Z(graphModel1,graphModel2);
        case 5:
            message_0_changing("Постройте граф, являющийся результатом произведения двух графов."); // вершины пока не пересекаются
            return Product(graphModel1,graphModel2);
        case 6:
            message_0_changing("Постройте граф, являющийся результатом композиции двух графов."); // вершины пока не пересекаются
            return Composition(graphModel1,graphModel2);
        case 7:
            message_0_changing("Постройте граф, являющийся результатом декартового произведения двух графов."); // вершины пока не пересекаются
            return Cartesian_Product(graphModel1,graphModel2);
        default:
            message_0_changing("Постройте граф, являющийся результатом объединения двух графов.");
            return Uni(graphModel1,graphModel2);
    }
}

function Addition(graph1: IGraph<IVertex, IEdge>){ // Дополнение
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);

    graph1.vertices.forEach(v1=>{
        let v_res: IVertex;
        v_res = new Vertex(`${v1.name}`);
        graphres.addVertex(v_res);
    });

    graph1.vertices.forEach(v1=>{
        graph1.vertices.forEach(v2=>{
            let vv1 = v1.name;
            let vv2 = v2.name;
            if (v1.name !== v2.name && !(v1.isAdjacent(graph1,v2)) && !(graphres.getVertex(v1.name)[0].isAdjacent(graphres,graphres.getVertex(v2.name)[0]))){
                let v1 = graphres.getVertex(`${vv1}`);
                let v2 = graphres.getVertex(`${vv2}`);

                let e: IEdge;
                e = new Edge(v1[0],v2[0]);
                graphres.addEdge(e);
            }
        });
    });

    let graph2: IGraph<IVertex, IEdge>;
    graph2 = GraphGenerator.generate(0);
    init2(graph2);


    return graphres;
}

function Cross(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Пересечение
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);

    graph1.vertices.forEach(v1=>{
        graph2.vertices.forEach(v2=>{
            if (v1.name === v2.name){
                let v_res: IVertex;
                v_res = new Vertex(`${v1.name}`);
                graphres.addVertex(v_res);
            }
        });
    });

    graph1.edges.forEach(u1=>{
        graph2.edges.forEach(u2=>{
            if ((u1.vertexOne.name === u2.vertexOne.name && u1.vertexTwo.name === u2.vertexTwo.name) || (u1.vertexOne.name === u2.vertexTwo.name && u1.vertexTwo.name === u2.vertexOne.name)){
                let v1 = graphres.getVertex(`${u1.vertexOne.name}`);
                let v2 = graphres.getVertex(`${u1.vertexTwo.name}`);

                let e: IEdge;
                e = new Edge(v1[0],v2[0]);
                graphres.addEdge(e);
            }
        });
    });

    return graphres;
}

function Uni(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // объединение
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);
    graph1.vertices.forEach((v:any)=>{
        graphres.addVertex(v);
    });
    graph1.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    graph2.vertices.forEach((v: any)=>{
        if(!(graphres.getVertex(`${v.name}`).length>0)){ // если нет таких же по имени вершин
            graphres.addVertex(v);
        }
    });
    graph2.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    graph1.edges.forEach((e: any)=> {
        let vv1 = graphres.getVertex(`${e.vertexOne.name}`)[0];
        let vv2 = graphres.getVertex(`${e.vertexTwo.name}`)[0];

        let e_new: IEdge;
        e_new = new Edge(vv1,vv2);
        graphres.addEdge(e_new);
    });
    graph2.edges.forEach((e: any)=> {
        let vv1 = graphres.getVertex(`${e.vertexOne.name}`)[0];
        let vv2 = graphres.getVertex(`${e.vertexTwo.name}`)[0];

        let e_new: IEdge;
        e_new = new Edge(vv1,vv2);
        graphres.addEdge(e_new);
    });
    return graphres;
}

function Joint_Z(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // объединение с пересекающимися вершинами
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);
    graph1.vertices.forEach((v:any)=>{
        graphres.addVertex(v);
    });
    graph1.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    graph2.vertices.forEach((v: any)=>{
        if(!(graphres.getVertex(`${v.name}`).length>0)){ // если нет таких же по имени вершин
            graphres.addVertex(v);
        }
    });
    graph2.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    graph1.vertices.forEach((v1: any)=> {
        graph2.vertices.forEach((v2: any)=> {
            if (!(graphres.getVertex(v1.name)[0].isAdjacent(graphres,graphres.getVertex(v2.name)[0]))){
                let vv1 = graphres.getVertex(`${v1.name}`)[0];
                let vv2 = graphres.getVertex(`${v2.name}`)[0];

                let e: IEdge;
                e = new Edge(vv1,vv2);
                graphres.addEdge(e);
            }
        });
    });
    return graphres;
}

function Joint(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // соединение !!!!! без пересечения вершин !!!!!
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);
    graph1.vertices.forEach(v=>{
        graphres.addVertex(v);
        graph2.vertices.forEach(v1=>{
            if(!(graphres.getVertex(`${v1.name}`).length>0))
                graphres.addVertex(v1);
            let e: IEdge;
            e = new Edge(v,v1);
            graphres.addEdge(e);
        });
    });
    graph1.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    graph2.edges.forEach((e:any)=>{
        graphres.addEdge(e);
    });
    return graphres;
}

function Product(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Произведение !!!!! без пересечения вершин !!!!!
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);

    graph1.vertices.forEach(v=>{
        graph2.vertices.forEach(v1=>{
            let v_res: IVertex;
            v_res = new Vertex(`${v.name}${v1.name}`); // ???????????????
            graphres.addVertex(v_res);
            //v_res = new Vertex(`${v.name},${v1.name}`,graphres); // ???????????????
            //graphres.addVertex(v_res);

        });
    });

    graph1.vertices.forEach(v1=>{
        graph2.vertices.forEach(v2=>{
            graph1.vertices.forEach(u1=>{
                graph2.vertices.forEach(u2=>{
                    if(u1.name!==v1.name||u2.name!==v2.name){
                        if((u1.name===v1.name)&&(v2.isAdjacent(graph2,u2))){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }

                        else if((u2.name===v2.name)&&(v1.isAdjacent(graph1,u1))){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }
                    }

                });
            });
        });
    });

    return graphres;
}

function Composition(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Композиция !!!!! без пересечения вершин !!!!!
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);

    graph1.vertices.forEach(v=>{
        graph2.vertices.forEach(v1=>{
            let v_res: IVertex;
            v_res = new Vertex(`${v.name}${v1.name}`); // ???????????????
            graphres.addVertex(v_res);
            //v_res = new Vertex(`${v.name},${v1.name}`,graphres); // ???????????????
            //graphres.addVertex(v_res);

        });
    });

    graph1.vertices.forEach(v1=>{
        graph2.vertices.forEach(v2=>{
            graph1.vertices.forEach(u1=>{
                graph2.vertices.forEach(u2=>{
                    if(u1.name!==v1.name || u2.name!==v2.name){
                        //let e_0: IEdge;
                        //e_0=new Edge(v1,v2)
                        if((u1.name===v1.name) && v2.isAdjacent(graph2,u2)){//graph2.getEdge(v2,u2).length>0 ){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }

                        else if(v1.isAdjacent(graph1,u1)){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }
                    }

                });
            });
        });
    });

    return graphres;
}

function Cartesian_Product(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Декартово произведение !!!!! без пересечения вершин !!!!!
    let graphres: IGraph<IVertex, IEdge>;
    graphres = GraphGenerator.generate(0);

    graph1.vertices.forEach(v=>{
        graph2.vertices.forEach(v1=>{
            let v_res: IVertex;
            v_res = new Vertex(`${v.name}${v1.name}`); // ???????????????
            graphres.addVertex(v_res);
            //v_res = new Vertex(`${v.name},${v1.name}`,graphres); // ???????????????
            //graphres.addVertex(v_res);

        });
    });

    graph1.vertices.forEach(v1=>{
        graph2.vertices.forEach(v2=>{
            graph1.vertices.forEach(u1=>{
                graph2.vertices.forEach(u2=>{
                    if(u1.name!==v1.name || u2.name!==v2.name){
                        //let e_0: IEdge;
                        //e_0=new Edge(v1,v2)
                        if((u1.name===v1.name) && v2.isAdjacent(graph2,u2)){//graph2.getEdge(v2,u2).length>0 ){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }

                        else if(v1.isAdjacent(graph1,u1)){
                            let vv1 = graphres.getVertex(`${v1.name}${v2.name}`);
                            let vv2 = graphres.getVertex(`${u1.name}${u2.name}`);

                            let e: IEdge;
                            e = new Edge(vv1[0],vv2[0]);
                            graphres.addEdge(e);
                        }
                    }

                });
            });
        });
    });

    return graphres;
}

export { ChooseTask };