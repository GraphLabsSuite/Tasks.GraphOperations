import {graphModel, graphModelres} from "./ForMyGraphModel";
import { IVertex } from 'graphlabs.core.graphs';
import { store } from 'graphlabs.core.template';
import {message_0, message_0_changing, num_0, num_0_changing, message_1, message_1_changing, mark_0, mark_0_changing, k_s, k_s_changing} from './ForMeVars';

function LastCheckingAnswer(){
    mark_0_changing(Math.round(mark_0*100/(8*9+k_s[0]+k_s[1]+k_s[2]+k_s[3]+k_s[4]+k_s[5]+k_s[6]+k_s[7])));
    window.alert(`Вы вполнили задания на оценку: ${mark_0}`);
    //window.alert(`k_s: ${k_s}`);
    store.getState().notifier.score = mark_0; // здесь я меняю оценку.
    return Promise.resolve({success: mark_0 === 100, fee: mark_0});
}

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

    if(markN===100){
        window.alert(`Вы верно выполнили предыдущее задание`);
        mark_0_changing(mark_0+9+k_s[num_0]);
    }

    if(markN<100){
        window.alert(`Вы неверно выполнили предыдущее задание`);
    }
}

function StartDifficult(){
    let new_k_s = [0,0,0,0,0,0,0,0];
    let all_num = 0;
    for (let i=0; i<8; i++){
        new_k_s = k_s;
        new_k_s[i]+=Math.round(Math.random()*99+1);
        all_num+=new_k_s[i];
    }
    let true_num=0;
    for (let i=0; i<8; i++){
        new_k_s[i]=Math.round(39*new_k_s[i]/all_num);
        true_num+=new_k_s[i];
    }
    let max_0=0;
    let min_0=0;
    let schetchick=true;
    while (true_num !==39){
        if(true_num>39){
            max_0 = Math.max(new_k_s[0], new_k_s[1], new_k_s[2], new_k_s[3], new_k_s[4], new_k_s[5], new_k_s[6], new_k_s[7]);
            for (let i=0; i<8; i++){
                if (schetchick && max_0 === new_k_s[i]){
                    new_k_s[i]--;
                    true_num--;
                    schetchick = false;
                }
            }
            schetchick = true;
        }
        else{
            min_0 = Math.min(new_k_s[0], new_k_s[1], new_k_s[2], new_k_s[3], new_k_s[4], new_k_s[5], new_k_s[6], new_k_s[7]);
            for (let i=0; i<8; i++){
                if (schetchick && min_0 === new_k_s[i]){
                    new_k_s[i]++;
                    true_num++;
                    schetchick = false;
                }
            }
            schetchick = true;
        }
    }
    k_s_changing(new_k_s);
}

export {CheckingAnswer, StartDifficult, LastCheckingAnswer};