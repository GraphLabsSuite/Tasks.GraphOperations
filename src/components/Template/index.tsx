import * as React from 'react';
import {GraphVisualizer, GVProps} from '../GraphVisualizer';
import {Toolbar} from '../Toolbar';
import {Console} from '../Console';
import {GraphGenerator, IGraph, IVertex, IEdge, Graph, Vertex, Edge, SccBuilder} from 'graphlabs.core.graphs';
import {StudentMark} from '../StudentMark';
import {graphActionCreators, store} from '../..';
import {matrixActionCreators} from '../../redux/matrix';
import {IMatrixView} from '../../models';
import {Component, SFC} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Promise} from 'bluebird';
import styles from './Template.module.scss';
import {init, graphModel, init1, graphModel1, init2, graphModel2, initres, graphModelres/*, initList, graphModelList*/} from '../..';
import {nGraphsActionCreators} from '../../redux/ngraphs';
import {INGraphsView} from '../../models';

global.Promise = Promise;

interface State {
    status: boolean;
}


export class Template extends Component<{}, State> {
    
    public scc_count = 0;

    protected message_0 = "";
    protected num_0 = 0;

    public state = {
        status: store.getState().app.status,
    };

    componentWillMount() {
        const data = sessionStorage.getItem('variant');
        let graph: IGraph<IVertex, IEdge>;

        let matrix: IMatrixView;
        let ngraphs: INGraphsView;
        let objectData;
        try {
            objectData = JSON.parse(data || 'null');
        } catch (err) {
            console.log('Error while JSON parsing');
        }
        if (objectData && objectData.data[0] && objectData.data[0].type) {
            switch (objectData.data[0].type) {
                case 'matrix':
                    matrix = this.matrixManager(objectData.data[0].value);
                    graph = GraphGenerator.generate(0);
                    init(graph);
                    break;
                case 'graph':
                    graph = this.graphManager(objectData.data[0].value);
                    init(graph);
                    graph.vertices.forEach(v => this.dispatch(graphActionCreators.addVertex(v.name)));
                    graph.edges.forEach(e => this.dispatch(graphActionCreators.addEdge(e.vertexOne.name, e.vertexTwo.name)));
                    break;
                case 'n-graphs':
                    ngraphs = this.nGraphsManager(objectData.data[0].value);
                    graph = GraphGenerator.generate(0);
                    init(graph);
                    break;
                default:
                    break;
            }
        } else {
            /*graph = GraphGenerator.generate(5);
            graph.vertices.forEach(v => this.dispatch(graphActionCreators.addVertex(v.name)));
            graph.edges.forEach(e => this.dispatch(graphActionCreators.addEdge(e.vertexOne.name, e.vertexTwo.name)));
            init(graph);
            this.scc_count = SccBuilder.findComponents(graph).length;*/

            graph = GraphGenerator.generate(0);
            init(graph);

            let graph1: IGraph<IVertex, IEdge>;
            graph1 = this.GetNewRandomGraph(5);
            init1(graph1);

            let graph2: IGraph<IVertex, IEdge>;
            graph2 = this.GetNewRandomGraphForThatOne(5,graph1);
            init2(graph2);

            let graphres = this.ChooseTask();
            initres(graphres);
            this.scc_count = SccBuilder.findComponents(graphres).length;
        }
    }

    protected ChooseTask(){
        this.num_0 = 3;//Math.round(Math.random() * 100)%4;
        switch (this.num_0) {
            case 0:
                this.message_0 = "Постройте граф, являющийся результатом объединения двух графов.";
                return this.Uni(graphModel1,graphModel2);
            case 1:
                this.message_0 = "Постройте граф, являющийся результатом соединения двух графов.";
                return this.Joint(graphModel1,graphModel2);
            case 2:
                this.message_0 = "Постройте граф, являющийся результатом произведения двух графов.";
                return this.Product(graphModel1,graphModel2);
            case 3:
                this.message_0 = "Постройте граф, являющийся результатом композиции двух графов.";
                return this.Composition(graphModel1,graphModel2);
            default:
                this.message_0 = "Постройте граф, являющийся результатом объединения двух графов.";
                return this.Uni(graphModel1,graphModel2);
        }
    }

    protected GetNewRandomGraph (num:number){ // рандомный граф
        let graph: IGraph<IVertex, IEdge>;
        graph = GraphGenerator.generate(0);
        var arr = [];
        for(var i = 0; i<num; i++ ){
            arr.push(Math.round(Math.random()));
            if(arr[i]===1){
                let vert = new Vertex(`${i}`);
                graph.addVertex(vert);
            }
        }
        for(var i=0;i<num-1;i++){
            if(arr[i]===1) {
                for(var j = i+1;j<num;j++){
                    if(arr[j]===1 && Math.random()>0.45 ){ // 55% chance what is edge i+j
                        let edge = new Edge(graph.getVertex(`${i}`)[0],graph.getVertex(`${j}`)[0],`${i}+${j}`);
                        graph.addEdge(edge);
                    }
                }
            }
        }
        return graph;
    }

    protected GetNewRandomGraphForThatOne (num:number, graph1:IGraph<IVertex, IEdge>){ // рандомный, не имеющий общих вершин с первым
        let graph: IGraph<IVertex, IEdge>;
        graph = GraphGenerator.generate(0);
        var arr = [];
        let length = graph1.vertices.length+1;
        for(var i = 0; i<num; i++ ){
            arr.push(Math.round(Math.random()));
            if(arr[i]===1){
                let vert = new Vertex(`${i+length}`);
                graph.addVertex(vert);
            }
        }
        for(var i=0;i<num-1;i++){
            if(arr[i]===1) {
                for(var j = i+1;j<num;j++){
                    if(arr[j]===1 && Math.random()>0.45 ){ // 55% chance what is edge i+j
                        let edge = new Edge(graph.getVertex(`${i+length}`)[0],graph.getVertex(`${j+length}`)[0],`${i+length}+${j+length}`);
                        graph.addEdge(edge);
                    }
                }
            }
        }
        return graph;
    }



    protected Uni(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // объединение
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
        return graphres;
    }

    /*protected Operation2(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // соединение по  (это и есть простое соединение)
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

                graph1.vertices.forEach((v1:any)=>{ // дополнение к объединению
                    if(!(graphres.getEdge(v,v1).length>0)){
                        let e: IEdge;
                        e = new Edge(v,v1);
                        graphres.addEdge(e);
                    }
                });
            }
        });
        graph2.edges.forEach((e:any)=>{
            graphres.addEdge(e);
        });
        return graphres;
    }*/

    protected Joint(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // соединение !!!!! без пересечения вершин !!!!!
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

    protected Product(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Произведение !!!!! без пересечения вершин !!!!!
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
                        if(u1.name!=v1.name||u2.name!=v2.name){
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

    protected Composition(graph1: IGraph<IVertex, IEdge>,graph2: IGraph<IVertex, IEdge>){ // Композиция !!!!! без пересечения вершин !!!!!
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
                        if(u1.name!=v1.name || u2.name!=v2.name){
                            let e_0: IEdge;
                            e_0=new Edge(v1,v2)
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

    public constructor(props: {}) {
        super(props);
        store.subscribe(() => {
            if (store.getState().app.status !== this.state.status) {
                this.setState({
                    status: store.getState().app.status,
                });
            }
        });
        this.task = this.task.bind(this);
        this.getTaskToolbar = this.getTaskToolbar.bind(this);
    }

    public render() {
        const Task: any = this.task();
        const Toolbar = this.getTaskToolbar();
        const Area = this.getArea();
        return (
            <div className={styles.App} id="wrap">
                {this.state.status
                    ? <p>Задание выполнено. Ожидайте ответа от сервера...</p>
                    : (
                        <div>
                            <div className={styles.MainRow}>
                                <div className={styles.GraphCell}>
                                    <Area/>
                                </div>
                                <div className={styles.ToolCell}>
                                    <Toolbar/>
                                </div>
                                <div className={styles.TaskCell}>
                                    <p>Задание</p>
                                    <Task/>
                                </div>
                            </div>
                            <div className={styles.LeftBottom}>
                                <StudentMark/>
                            </div>
                            <div className={styles.LowRow}>
                                <Console/>
                            </div>
                        </div>)}
            </div>
        );
    }//<Task/>

    protected graphManager(data: any): IGraph<IVertex, IEdge> {
        // TODO: fix the types
        const graph: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
        if (data) {
            let vertices = data.vertices;
            let edges = data.edges;
            vertices.forEach((v: any) => {
                graph.addVertex(new Vertex(v));
            });
            edges.forEach((e: any) => {
                if (e.name) {
                    graph.addEdge(new Edge(graph.getVertex(e.source)[0], graph.getVertex(e.target)[0], e.name[0]));
                } else {
                    graph.addEdge(new Edge(graph.getVertex(e.source)[0], graph.getVertex(e.target)[0]));
                }
            });

        }
        return graph;
    }

    protected matrixManager(data: any) {
        let matrix = JSON.parse(data.matrix);
        store.dispatch(matrixActionCreators.fillMatrix(matrix));
        return matrix;
    }

    protected nGraphsManager(data: any) {
        const ngraphs: INGraphsView = [];
        if (data && data.count) {
            const numberOfGraphs = parseInt(data.count, 10);
            for (let i = 0; i < numberOfGraphs; i++) {
                if (data.graphs[i]) {
                    const graphCache: IGraph<IVertex, IEdge> = new Graph() as unknown as IGraph<IVertex, IEdge>;
                    const vertices = data.graphs[i].vertices;
                    const edges = data.graphs[i].edges;
                    vertices.forEach((v: string) => {
                        graphCache.addVertex(new Vertex(v));
                    });
                    edges.forEach((e: { source: string; target: string; }) => {
                        graphCache.addEdge(
                            new Edge(
                                graphCache.getVertex(e.source)[0],
                                graphCache.getVertex(e.target)[0],
                            )
                        );
                    });
                    ngraphs.push(graphCache);
                }
                store.dispatch(nGraphsActionCreators.fillnGraphs(ngraphs));
            }
        }
        return ngraphs;
    }

    protected getTaskToolbar() {
        return Toolbar;
    }

    protected getArea(): SFC<{}> {
       return () => <GraphVisualizer
            graph={graphModel}
            adapterType={'writable'}
            namedEdges={true}
            vertexNaming={true}
            withoutDragging={true}
            edgeNaming={false}
            incidentEdges={false}
        />;
        /*return () =>
            <GraphVisualizer
                graph={graphModelres}
                adapterType={'readable'}
                namedEdges={false}
                vertexNaming={false}
                withoutDragging={false}
                edgeNaming={false}
                incidentEdges={false}
            />*/
    }

    protected task(): SFC<{}> {
        graphModel.vertices.forEach(v=>(console.log(`id = ${v.id}; label = ${v.label}; name = ${v.name}; wawe=${v.wave}.\n`)));
        return () =>
            <div>
                <p>
                    {this.message_0}
                </p>
                <div>
                    <p>
                        <GraphVisualizer
                            graph={graphModel1}
                            adapterType={'readable'}
                            namedEdges={false}
                            vertexNaming={false}
                            withoutDragging={true}
                            edgeNaming={false}
                            incidentEdges={false}
                        />
                    </p>
                    <p>
                        <GraphVisualizer
                            graph={graphModel2}
                            adapterType={'readable'}
                            namedEdges={false}
                            vertexNaming={false}
                            withoutDragging={true}
                            edgeNaming={false}
                            incidentEdges={false}
                        />
                    </p>
                </div>
            </div>
    }

    private dispatch(action: any) {
        store.dispatch(action);
        return void 0;
    }
}

