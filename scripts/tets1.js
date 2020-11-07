import * as React from 'react';
import {GraphGenerator, IGraph, IVertex, IEdge} from 'graphlabs.core.graphs';
import 'bootstrap/dist/css/bootstrap.css';
import {init, graphModel, init1, graphModel1, init2, graphModel2, initres, graphModelres, CheckingAnswer} from '../..';


describe('CheckingAnswer_1 ', () => {
    test("same", ()=> {
        //let graph: IGraph<IVertex, IEdge>;
        let graph = GraphGenerator.generate(0);
        let v_1 = new IVertex("1");
        let v_2 = new IVertex("2");
        let v_3 = new IVertex("3");
        let e_1 = new IEdge(v_1, v_2, "1-2");
        let e_2 = new IEdge(v_1, v_3, "1-3");
        graph.addVertex(v_1);
        graph.addVertex(v_2);
        graph.addVertex(v_3);
        graph.addEdge(e_1);
        graph.addEdge(e_2);
        init(graph);
        initres(graph);
        let result = CheckingAnswer();
        expect(result).toBe(100);
    })});
