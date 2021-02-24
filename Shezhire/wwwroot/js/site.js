// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
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
            cnv.width = body.clientWidth - 150;
            cnv.height = 800;
            context.fillStyle = "#fbf3dc";
            context.fillRect(0, 0, cnv.width, cnv.height);
            let nodesDrawed = [];
            let nodeWidth = 75;
            let nodeHeight = 30;

            for (let i = 0; i < nodes.length; i++) {

                //Ищем, не рисовали ли его раньше
                let drawed = nodesDrawed.find(x => x.Id == nodes[i].Id);
                if (drawed == undefined) {

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
                            node.y = n1.y + 50;
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
                                let n2 = nodesDrawed.filter(x => x.Parent_id == n[j].Parent_id);
                                //Если потомок для рисования - первый
                                if (n2.length == 0) {
                                    node2.x = n1.x - 50;
                                    node2.y = n1.y + 50;
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
                                    //Ищем самого правого нарисованного
                                    let max = 0;
                                    let n3 = {};
                                    for (let k = 0; k < n2.length; k++) {
                                        if (n2[k].x > max) {
                                            max = n2[k].x;
                                            n3 = n2[k];
                                        }
                                    }
                                    //let n3 = n2.find(x => x.x == Math.max(x.x));

                                    let n4 = {};
                                    n4 = n[j];
                                    n4.x = n3.x + 110;
                                    n4.y = n3.y;
                                    context.strokeRect(n4.x, n4.y, n4.w, n4.h);
                                    context.strokeText(n4.Name, n4.x + 10, n4.y + 10);
                                    //node2.x = n2.x + 130;
                                    //node2.y = n2.y;
                                    //context.strokeRect(node2.x, node2.y, node2.w, node2.h)
                                    //context.strokeText(n[j].Name, node2.x + 10, node2.y + 10);
                                    let birthDate = new Date(n[j].Birthdate);
                                    if (birthDate.getTime() !== -62135618500000) {
                                        n4.Birthdate = 'д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear();
                                    }
                                    else {
                                        n4.Birthdate = 'д.р.';
                                    }
                                    context.strokeText(n4.Birthdate, n4.x + 10, n4.y + 20);
                                    //Нарисованного потомка добавляем в отдельный массив
                                    nodesDrawed.push(n4);
                                }

                            }
                            //i = i + 1;
                        }
                    }
                }
            }
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
