import {graphModel, graphModelres} from "./ForMyGraphModel";
import { IVertex } from 'graphlabs.core.graphs';
import { store } from 'graphlabs.core.template';

function CheckingAnswer(){// мое добавление для проверки оценки: процент одинаковости
    let markN = 100;
    graphModelres.vertices.forEach((v:any)=>{ // проверка на совпадения вершин
        if(graphModel.getVertex(v.name).length===1){
            //markN+=50/(graphModelres.vertices.length);
        }
        else{
            markN=0;
        }
    });
    graphModel.vertices.forEach((v:any)=>{ // проверка на лишние вершины
        if(graphModelres.getVertex(v.name).length===0){
            //markN-=50/(graphModelres.vertices.length);
            markN=0;
        }
    });

    let num = 0;
    graphModel.vertices.forEach((v1:IVertex)=>{
        graphModel.vertices.forEach((v2:IVertex)=>{
            graphModelres.vertices.forEach((u1:IVertex)=>{
                graphModelres.vertices.forEach((u2:IVertex)=>{
                    if( ( v1.name === u1.name && v2.name === u2.name ) || ( v1.name === u2.name && v2.name === u1.name ) ){
                        if( v1.name !== v2.name && u1.name !== u2.name ){
                            if( v1.isAdjacent(graphModel, v2) ){
                                if( u1.isAdjacent(graphModelres, u2) ) {
                                    num++;
                                }
                            }
                        }
                    }
                });
            });
        });
    });
    num/=2*2;
    if(num !== (graphModel.edges.length + graphModelres.edges.length)/2 ){
        markN = 0;
    }

    /*let num = 0;
    graphModelres.edges.forEach((e:any)=>{ // проверка на совпадения рёбер
        graphModel.edges.forEach(eN=>{
            if(e.name==eN.name)
                //markN+=50/(graphModelres.edges.length);
                num++;
        });
    });
    if(num != graphModelres.edges.length ){
        markN = 0;
    }
    num = 0;
    graphModel.edges.forEach(e=>{ // проверка на лишние рёбра
        //markN-=50/(graphModelres.edges.length);
        graphModelres.edges.forEach(eN=>{
            if(e.name==eN.name) {
                //markN += 50 / (graphModelres.edges.length);
                num++;
            }
        });
        if(num == 0 ){
            markN = 0;
        }
        num = 0;
    });*/

    if(markN===100){
        window.alert(`Вы верно выполнили задание`);
        markN=100;
    }

    if(markN<100){
        window.alert(`Вы неверно выполнили задание`);
        markN=0;
    }

    //markN=Math.round(markN);
    //console.log(`mark is ${markN}`);
    store.getState().notifier.score = markN; // здесь я меняю оценку.
    return Promise.resolve({success: markN === 100, fee: markN});
}

export {CheckingAnswer};