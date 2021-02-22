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
            cnv.width = body.clientWidth - 3;
            cnv.height = 800;
            let nodesDrawed = [];

            for (let i = 0; i < nodes.length; i++) {
                
                let node = {};
                node.id = nodes[i].Id;
                node.parent_id = nodes[i].Parent_id;
                node.w = 100;
                node.h = 50;
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
                    let n = nodes.filter(x => x.Parent_id == parent_id);
                    if (n.length == 1) {
                        let n1 = nodesDrawed.find(item => item.id == nodes[i].Parent_id);
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
                    if (n.length == 2) {
                        //let total_width = n.length * 100;
                        for (let j = 0; j < n.length; j++) {
                            let n1 = nodesDrawed.find(item => item.id == nodes[i].Parent_id);
                            let n2 = nodesDrawed.find(x => x.parent_id == n[j].Parent_id)
                            if (n2 != undefined) {
                                node.x = n2.x + 130;
                                node.y = n2.y;
                            }
                            else {
                                node.x = n1.x + 100;
                                node.y = n1.y + 70;
                            }
                            context.strokeRect(node.x, node.y, node.w, node.h)
                            context.strokeText(n[j].Name, node.x + 10, node.y + 10);
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
