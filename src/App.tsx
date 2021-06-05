import React, {FormEvent} from 'react';
import { Component } from 'react';

import {
    ToolButton,
    ToolButtonList,/* IGraphView, IMatrixView, INGraphsView, State, ToolButton*/
} from "graphlabs.core.template";
import { GraphVisualizer, Template, Toolbar, store, StudentMark, Console, graphActionCreators, adapter } from "graphlabs.core.template";
import {  /*Graph, SccBuilder, Vertex, Edge,*/
    IGraph,
    IVertex,
    IEdge,
    GraphGenerator,
    Vertex
} from "graphlabs.core.graphs";
import styles from './Template.module.scss';
import 'graphlabs.core.template/dist/main.css';
import {WritableAdapter} from "graphlabs.core.visualizer";

import './App.css';

import { /*Component,*/ SFC} from 'react';
import { init1, graphModel1, init2, graphModel2, initres, /*graphModelres,*/ init, graphModel, inithelp, graphModelhelp } from './ForMyGraphModel';
import {message_0, message_0_changing, num_0, num_0_changing, message_1, message_1_changing, mark_0, mark_0_changing, T_s, T_s_changing, T_s_shawing, need_render, need_render_changing } from './ForMeVars';
import { ChooseTask } from './Ops';
import { CheckingAnswer, StartDifficult, LastCheckingAnswer } from "./CheckAnswer";
import { GraphsInit } from "./GraphsInit"
import ReactDOM from "react-dom";
import {log} from "util";
import { MyVisualizer } from "./MyVisualizer";

class App extends Template {

    public state = {
        status: store.getState().app.status,
    };

    componentWillMount() {
        StartDifficult();
        mark_0_changing(0);
        GraphsInit();

        let timerId = setInterval(()=>{
            T_s_changing(T_s-1);
            ReactDOM.render(T_s_shawing(), document.getElementById("T_s"));
        }, 1000);
        window.setTimeout(()=>{clearInterval(timerId);LastCheckingAnswer();},1000*45*60);
    }

    componentDidMount() {
        let graph = GraphGenerator.generate(0);
        inithelp(graph);
        MyVisualizer(graphModel1,"graph-Model-1");
        MyVisualizer(graphModel2,"graph-Model-2");
        //this.render();
        //this.forceUpdate();
    }

    componentDidUpdate() {
        if(need_render) {
            MyVisualizer(graphModel1, "graph-Model-1");
            MyVisualizer(graphModel2,"graph-Model-2");
            need_render_changing(false);
        }
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

    // Проблема с огромным пробелом на сайте не в модуле, а в самом сайте, там проблема скорее не в flex

    // пустое пространство му графами в задании тем меньше, чем больше соотношение экрана.

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
            ToolButtonList.prototype.toolButtons = {};

                /*ToolButtonList.prototype.toolButtons = {
                "http://gl-backend.svtz.ru:5000/odata/downloadImage(name='add_vertex.png')": () => {
                    const start = new Date().getTime();
                    adapter.addVertex();
                    const end = new Date().getTime();
                    T_s_changing(T_s - Math.round((end-start)/1000));
                },
            };*/
            return ToolButtonList;
        };
        Toolbar.prototype.render = () => {
            const Buttons = Toolbar.prototype.getButtonList();
            return (
                <div style={{marginLeft:'4px'}}>
                    <p>Панель инструментов</p>
                    <Buttons/>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        //adapter.addVertex();
                        graphModel.addVertex(new Vertex(`${window.prompt("Добавте вершину, имя вершины должно состоять из последовательности цифр.", '0')}`));
                        this.forceUpdate();
                        need_render_changing(true);
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Добавить<br/>вершину</button>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.addEdge();
                        graphModel.edges.forEach((e:IEdge, i=0)=>{e.name = `${i++}`;});
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Добавить<br/>ребро</button>
                    <button style={{marginTop:'17px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.removeVertex();
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Удалить<br/>вершину</button>
                    <button style={{marginTop:'4px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=>{
                        const start = new Date().getTime();
                        adapter.removeEdge();
                        const end = new Date().getTime();
                        T_s_changing(T_s - Math.round((end-start)/1000));
                    }}>Удалить<br/>ребро</button>
                    <button type={"button"} style={{marginTop:'17px', border: '1px double black', borderRadius:'10px', background: 'white', width:'130px', height:'46px', textAlign: 'center', font:'13pt serif'}} onClick={()=> {
                        if(window.confirm("Вы уверены, что хотите перейти к новой операции?")){
                            CheckingAnswer();
                            num_0_changing(num_0 + 1);
                            GraphsInit();
                            this.forceUpdate();
                            need_render_changing(true);
                            if (num_0 === 7) {  // удалить кнопку было бы хорошо
                                message_1_changing("Завершите работу.");
                                this.disable();
                            }
                        }
                    }}>{message_1}</button>
                    <T_s_shawing/>
                </div>);
        };
        return Toolbar;
    }

    protected disable(){
        let element = document.getElementsByTagName('button')[0];
        if (element != null) {
            element.setAttribute('disabled','disabled');
        }
    }

    protected getArea(): SFC<{}> {
        return () =>
            <div style={{marginLeft:'4px', marginTop:'4px'}}>
                <p className={"help_for_casuals"} data-title="Рабочая область. В ней вы можете строить граф, являющийся результатом операции из области задания. Чтобы выделить ребро или вершину, нужно нажать на соответствующий элемент (который при выделении окрашивается в зелёный или красный соответственно)." >
                    <img src={"http://gl-backend.svtz.ru:5000/odata/downloadImage(name='Help.png')"}></img>
                </p>
                <GraphVisualizer
                    graph={graphModel}
                    adapterType={'writable'}
                    namedEdges={false}
                    vertexNaming={true}
                    withoutDragging={false}
                    edgeNaming={false}
                    incidentEdges={false}
                />
            </div>
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
            <div style={{marginLeft:'5px'}}>
                <p className={"help_for_casuals"} data-title="Область задания. Здесь представлено задание, которое нужно выполнить." >
                    <img src={"http://gl-backend.svtz.ru:5000/odata/downloadImage(name='Help.png')"}></img>
                </p>
                {message_0}
                <svg className={"graph-Model-1"}>
                </svg>
                <svg className={"graph-Model-2"}>
                </svg>
                <GraphVisualizer
                    graph={graphModelhelp}
                    adapterType={'readable'}
                    namedEdges={false}
                    vertexNaming={false}
                    withoutDragging={true}
                    edgeNaming={false}
                    incidentEdges={false}
                />

            </div>;
    }
}

export default App;
