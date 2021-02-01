import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import { IGraphView, ToolButtonList, IMatrixView, INGraphsView, graphActionCreators, State } from "graphlabs.core.template";
import { GraphVisualizer, Template, Toolbar, store, StudentMark, Console } from "graphlabs.core.template";
import {  /*Graph, SccBuilder, Vertex, Edge,*/ IGraph, IVertex, IEdge, GraphGenerator } from "graphlabs.core.graphs";
import styles from './Template.module.scss';
import 'graphlabs.core.template/dist/main.css';

import { /*Component,*/ SFC} from 'react';
import { init1, graphModel1, init2, graphModel2, initres, graphModelres, init, graphModel } from './ForMyGraphModel';
import { message_0, num_0 } from './ForMeVars';
import { GetNewRandomGraph, GetNewRandomGraphForThatOne, ChooseTask } from './Ops';

class App extends Template {

    public state = {
        status: store.getState().app.status,
    };

    componentWillMount() {
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
        //this.scc_count = SccBuilder.findComponents(graphres).length;
    }

    /*public constructor(props: {}) { // не совсем понимаю, почему овервайт этих функций происходит автоматически и без конструктора
        super(props);
        this.render = this.render.bind(this);
        this.getArea = this.getArea.bind(this);
        this.task = this.task.bind(this);
        this.getTaskToolbar = this.getTaskToolbar.bind(this);

        store.subscribe(() => {
            if (store.getState().app.status !== this.state.status) {
                this.setState({
                    status: store.getState().app.status,
                });
            }
        });
    }*/

    public render():JSX.Element {
        const Task: any = this.task();
        const Toolbar = this.getTaskToolbar();
        const Area = this.getArea51();
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

    protected getTaskToolbar() {
        return Toolbar;
    }

    protected getArea51(): SFC<{}> {
        return () => <div>
            <p>
                <GraphVisualizer
                    graph={graphModel}
                    adapterType={'writable'}
                    namedEdges={false}
                    vertexNaming={true}
                    withoutDragging={true}
                    edgeNaming={false}
                    incidentEdges={true}
                />
            </p>
        </div>;

        //return () =>
        //    <GraphVisualizer
        //        graph={graphModelres}
        //        adapterType={'readable'}
        //        namedEdges={false}
        //        vertexNaming={false}
        //        withoutDragging={false}
        //        edgeNaming={false}
        //        incidentEdges={false}
        //    />;
    }

    protected task(): SFC<{}> {
        graphModel.vertices.forEach(v => (console.log(`id = ${v.id}; label = ${v.label}; name = ${v.name}; wawe=${v.wave}.\n`)));
        return () =>
            <div>
                <p>
                    {message_0}
                </p>
                <div>
                    <p>
                        {num_0!==6?"1.":''}<GraphVisualizer
                            graph={graphModel1}
                            adapterType={'readable'}
                            namedEdges={false}
                            vertexNaming={false}
                            withoutDragging={true}
                            edgeNaming={false}
                            incidentEdges={true}
                        />
                    </p>
                    <p>
                        {num_0!==6?"2.":''}<GraphVisualizer
                            graph={graphModel2}
                            adapterType={'readable'}
                            namedEdges={false}
                            vertexNaming={false}
                            withoutDragging={true}
                            edgeNaming={false}
                            incidentEdges={true}
                        />
                    </p>
                </div>
            </div>;
    }
}

export default App;
