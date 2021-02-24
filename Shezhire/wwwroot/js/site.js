﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    $.ajax({
        url: '/Home/GetNodes',
        success: function (data) {
            let nodes = JSON.parse(data);
            console.log(nodes);
            let cnv = document.getElementById('cnv');
            let context = cnv.getContext('2d');
            let body = document.querySelector('body');
            cnv.width = body.clientWidth - 3;
            cnv.height = 800;
            context.fillStyle = "#fbf3dc";
            context.fillRect(0, 0, cnv.width, cnv.height);
            let nodesDrawed = [];
            let nodeWidth = 100;
            let nodeHeight = 50;

            for (let i = 0; i < nodes.length; i++) {

                let node = {};
                node.Id = nodes[i].Id;
                node.Parent_id = nodes[i].Parent_id;
                node.w = nodeWidth;
                node.h = nodeHeight;
                context.lineWidth = 1;
                if (nodes[i].Parent_id == 0) {
                    node.x = 300;
                    node.y = 50;
                    context.strokeRect(node.x, node.y, node.w, node.h)
                    context.strokeText(nodes[i].Name, node.x + 10, node.y + 10);
                    let birthDate = new Date(nodes[i].Birthdate);
                    if (birthDate.getTime() !== -62135618500000) {
                        node.Birthdate = 'д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear();
                    }
                    else {
                        node.Birthdate = 'д.р.';
                    }
                    context.strokeText(node.Birthdate, node.x + 10, node.y + 20);
                    nodesDrawed.push(node);
                }
                else {
                    let parent_id = nodes[i].Parent_id;
                    //n-количество потомков
                    let n = nodes.filter(x => x.Parent_id == parent_id);
                    //Если потомок один
                    if (n.length == 1) {
                        //Ищем нарисованного родителя
                        let n1 = nodesDrawed.find(item => item.Id == nodes[i].Parent_id);
                        node.x = n1.x;
                        node.y = n1.y + 70;
                        context.strokeRect(node.x, node.y, node.w, node.h)
                        context.strokeText(nodes[i].Name, node.x + 10, node.y + 10);
                        let birthDate = new Date(nodes[i].Birthdate);
                        if (birthDate.getTime() !== -62135618500000) {
                            node.Birthdate = 'д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear();
                        }
                        else {
                            node.Birthdate = 'д.р.';
                        }
                        context.strokeText(node.Birthdate, node.x + 10, node.y + 20);
                        nodesDrawed.push(node);
                    }
                    //Если потомков два и более
                    if (n.length > 1) {
                        //let total_width = n.length * 100;
                        for (let j = 0; j < n.length; j++) {
                            let node2 = n[j];
                            node2.w = nodeWidth;
                            node2.h = nodeHeight;
                            //Ищем уже нарисованного родителя
                            let n1 = nodesDrawed.find(item => item.Id == nodes[i].Parent_id);
                            //Ищем нарисованных братьев/сестер
                            let n2 = nodesDrawed.filter(x => x.Parent_id == n[j].Parent_id)
                            //Если потомок для рисования - первый
                            if (n2.length == 0) {
                                node2.x = n1.x - 50;
                                node2.y = n1.y + 70;
                                context.strokeRect(node2.x, node2.y, node2.w, node2.h)
                                context.strokeText(n[j].Name, node2.x + 10, node2.y + 10);
                                let birthDate = new Date(n[j].Birthdate);
                                if (birthDate.getTime() !== -62135618500000) {
                                    node2.Birthdate = 'д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear();
                                }
                                else {
                                    node2.Birthdate = 'д.р.';
                                }
                                context.strokeText(node2.Birthdate, node2.x + 10, node2.y + 20);
                                //Нарисованного потомка добавляем в отдельный массив
                                nodesDrawed.push(node2);
                            }
                            //Если потомок уже был нарисован
                            else {
                                for (let k = 0; k < n2.length; k++) {
                                    let n3 = {};
                                    n3 = node2;
                                    n3.x = n2[k].x + 130;
                                    n3.y = n2[k].y;
                                    context.strokeRect(n3.x, n3.y, n3.w, n3.h);
                                    context.strokeText(n[j].Name, n3.x + 10, n3.y + 10);
                                    //node2.x = n2.x + 130;
                                    //node2.y = n2.y;
                                    //context.strokeRect(node2.x, node2.y, node2.w, node2.h)
                                    //context.strokeText(n[j].Name, node2.x + 10, node2.y + 10);
                                    let birthDate = new Date(n[j].Birthdate);
                                    if (birthDate.getTime() !== -62135618500000) {
                                        n3.Birthdate = 'д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear();
                                    }
                                    else {
                                        n3.Birthdate = 'д.р.';
                                    }
                                    //context.strokeText(node2.Birthdate, node2.x + 10, node2.y + 20);
                                    context.strokeText(n3.Birthdate, n3.x + 10, n3.y + 20);
                                    //Нарисованного потомка добавляем в отдельный массив
                                    nodesDrawed.push(n3);
                                }
                            }

                        }
                        i = i + 1;
                    }
                }

                
                //context.fillStyle = 'red';

               
                //var time;
                //let x = 30;
                //let x2 = 50;
                //let y = 0;
                //let y2 = -30;
                //let y3 = -10;
                //function step() {
                //    requestAnimationFrame(step);
                //    var now = new Date().getTime(),
                //        dt = now - (time || now);

                //    time = now;

                //    // для примера сдвиг по оси х
                //    //this.x += 10 * dt; // Увеличивать х на десять единиц в секунду

                //    //x = x + 1;
                //    y++;
                //    y2++;
                //    y3++;
                //    if (y % 2 == 0) {
                //        context.fillStyle = '#9dd39f';
                //        context.fillRect(0, 0, canv.width, canv.height);

                //        context.fillStyle = '#fff960';
                //        context.fillRect(x, y, 10, 20);
                //        context.fillRect(x2, y2, 10, 20);

                //        drawStar(100, y3, 5, 30, 15);
                //        drawStar(350, y3, 5, 30, 15);
                //    }

                //    if (y >= canv.height) {
                //        y = 0;
                //    }
                //    if (y2 >= canv.height) {
                //        y2 = 0;
                //    }
                //    if (y3 >= canv.height)
                //        y3 = 0;

                //    context.beginPath();
                //    context.font = "20px Arial";

                //    //context.fillText("Hello World", 10, 50);
                //    //context.fillStyle = "red";
                //    context.strokeStyle = "red";
                //    context.textAlign = "center";
                //    context.lineWidth = 1;
                //    context.strokeText("Вы достигли 10 уровня и получаете 100 кристаллов!", canv.width / 2, 200);
                    //context.en
                //}

                

                //let birthDate = new Date(nodes[i].Birthdate);

                //if (birthDate.getTime() !== -62135618500000) {
                //    //$('.nodes').append('<p>д.р. ' + FormatDate(birthDate) + '</p>');
                //    node.Birthdate = $('<p>д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear() + '</p>');
                //}
                //else {
                //    node.Birthdate = $('<p>д.р.</p>');
                //}
                //if (nodes[i].Parent_id == 0) {
                //    node.Element.append(node.Birthdate);
                //}
                //else {
                //    //$('#' + nodes[i].Parent_id).next().after(node.Birthdate);
                //    node.Element.append(node.Birthdate)
                //}

                //if (nodes[i].Parent_id != 0) {
                //    if ($('.node[data-parent-id="' + nodes[i].Parent_id + '"]').length > 1) {

                //        $('.nodes > .node[data-parent-id="' + nodes[i].Parent_id + '"]').wrapAll('<div class="row"></div>');
                //    }
                //}
            }

            //for (let i = 0; i < nodes.length; i++) {
                
            //}
        }
    });
});

function FormatDate(date) {
    let value = date.split(' ');
    if (value.length == 1) {
        let dateFormat = value[0].split('.').reverse().join('-');
        return dateFormat;
    }
    else {
        let dateFormat = value[0].split('.').reverse().join('-');
        if (value[0] == '01.01.0001')
            return null;
        let timeFormat = value[1].split(':')
        return dateFormat + 'T' + timeFormat[0] + ':' + timeFormat[1];
    }
}
