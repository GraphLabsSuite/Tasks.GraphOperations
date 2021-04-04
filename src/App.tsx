import React, {FormEvent} from 'react';
//import logo from './logo.svg';
import './App.css';
import {
    ToolButton,
    ToolButtonList,/* IGraphView, IMatrixView, INGraphsView, State, ToolButton*/
} from "graphlabs.core.template";
import { GraphVisualizer, Template, Toolbar, store, StudentMark, Console, graphActionCreators, adapter } from "graphlabs.core.template";
import {  /*Graph, SccBuilder, Vertex, Edge,*/ IGraph, IVertex, IEdge, GraphGenerator } from "graphlabs.core.graphs";
import styles from './Template.module.scss';
import 'graphlabs.core.template/dist/main.css';
import {WritableAdapter} from "graphlabs.core.visualizer";

import { /*Component,*/ SFC} from 'react';
import { init1, graphModel1, init2, graphModel2, initres, /*graphModelres,*/ init, graphModel } from './ForMyGraphModel';
import {message_0, message_0_changing, num_0, num_0_changing, message_1, message_1_changing, mark_0, mark_0_changing, T_s, T_s_changing, T_s_shawing} from './ForMeVars';
import { ChooseTask } from './Ops';
import { CheckingAnswer, StartDifficult, LastCheckingAnswer } from "./CheckAnswer";
import { GraphsInit } from "./GraphsInit"

class App extends Template {

    public state = {
        status: store.getState().app.status,
    };

    componentWillMount() {
        StartDifficult();
        mark_0_changing(0);
        GraphsInit();
        let timerId = setInterval(()=>{T_s_changing(T_s-1);this.forceUpdate();}, 1000);
        window.setTimeout(()=>{clearInterval(timerId);LastCheckingAnswer();},1000*45*60);
    }

    /*public constructor(props: {}) { // не совсем понимаю, почему овервайт этих функций происходит автоматически и без конструктора
        super(props);
        this.render = this.render.bind(this);
        this.getArea = this.getArea.bind(this);
        this.task = this.task.bind(this);
        this.getTaskToolbar = this.getTaskToolbar.bind(this);
    }*/

    /*public render():JSX.Element {
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
    }*/



    // 1) разобраться со store, dispatch и др


    protected getTaskToolbar() {
        //super.getTaskToolbar()

        Toolbar.prototype.getButtonList = () => {
            function beforeComplete(this: App):  Promise<{ success: boolean; fee: number }> {
                return new Promise((resolve => {
                    resolve(LastCheckingAnswer());
                }));
            }
            ToolButtonList.prototype.beforeComplete = beforeComplete.bind(this);
            ToolButtonList.prototype.help = () => `В данном задании вы должны построить результат операции, указанной в задании в правой части экрана. Для этого вы можете добавлять любое число вершин/рёбер. Также вы можете удалять любое число вершин, не инцидентных ни одному ребру или рёбер. Оценка зависит только от того, правильно ли вы построите граф.`;

            ToolButtonList.prototype.toolButtons = {
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='add_vertex.png')": () => {
                    const start = new Date().getTime();
                    adapter.addVertex();
                    const end = new Date().getTime();
                    T_s_changing(T_s - Math.round((end-start)/1000));
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='add_edge.png')": () => { //  Меняю имя всем рёбрам на адекватные - ужасный костыль
                    const start = new Date().getTime();
                    adapter.addEdge();
                    graphModel.edges.forEach((e:IEdge, i=0)=>{e.name = `${i++}`;});
                    const end = new Date().getTime();
                    T_s_changing(T_s - Math.round((end-start)/1000));
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='remove_vertex.png')": () => { //  Меняю имя всем рёбрам на адекватные - ужасный костыль
                    const start = new Date().getTime();
                    adapter.removeVertex();
                    const end = new Date().getTime();
                    T_s_changing(T_s - Math.round((end-start)/1000));
                },
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='remove_edge.png')": () => { //  Меняю имя всем рёбрам на адекватные - ужасный костыль
                    const start = new Date().getTime();
                    adapter.removeEdge();
                    const end = new Date().getTime();
                    T_s_changing(T_s - Math.round((end-start)/1000));
                }
            };
            return ToolButtonList;
        };
        Toolbar.prototype.render = () => {
            const Buttons = Toolbar.prototype.getButtonList();
            return (
                <div>
                    <div>Панель инструментов</div>
                    <Buttons/>
                    <button type={"button"} style={{border: '1px double black', background: 'white', margin: '4px'}} onClick={()=>{
                        CheckingAnswer();
                        num_0_changing(num_0+1);
                        GraphsInit();
                        this.forceUpdate();
                        if (num_0 === 7){  // удалить кнопку было бы хорошо
                            message_1_changing("Завершите выполнение теста.");
                            this.disable();
                        }
                    }}>{message_1}</button>
                    <div>Time left: {T_s_shawing()}</div>
                </div>);
        }
        return Toolbar;
    }

    protected disable(){
        let element = document.getElementsByTagName('button')[0];
        if (element != null) {
            element.setAttribute('disabled','disabled');
        }
    }

    protected getArea(): SFC<{}> {
        return () => <div>
            <p>
                <GraphVisualizer
                    graph={graphModel}
                    adapterType={'writable'}
                    namedEdges={false}
                    vertexNaming={true}
                    withoutDragging={true}
                    edgeNaming={false}
                    incidentEdges={false}
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
        return () =>
            <div>
                <p>
                    {message_0}
                </p>
                <div>
                    <p>
                        {num_0!==1?"1.":''}<GraphVisualizer
                            graph={graphModel1}
                            adapterType={'readable'}
                            namedEdges={false}
                            vertexNaming={false}
                            withoutDragging={true}
                            edgeNaming={false}
                            incidentEdges={false}
                        />
                        {num_0!==1?"2.":''}<GraphVisualizer
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
            </div>;
    }
}

export default App;
