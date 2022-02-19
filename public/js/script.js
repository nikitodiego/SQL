
function render(data) {
    const html = data.map((elem) => {
        return(`<div>
            <strong>${elem.autor}</strong>
            <strong style="color: green;">${elem.date}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function renderLista(data) {
    const tabla = data.map(elem => {
        return(`<tr>
        <th scope="row">${elem.id}</th>
        <td>${elem.name}</td>
        <td>${elem.price}</td>
        <td><img style="width:40px; height: auto" src=${elem.thumbnail}></td>
      </tr>`)
    }).join(" ");
    document.getElementById('tbody').innerHTML = tabla;
}

function addMessage() {
    let a = document.getElementById('username').value;
    if (a.includes("@")) {
        const mensaje = {
            autor: document.getElementById('username').value,
            date: fecha.toISOString(),
            text: document.getElementById('texto').value
        };
        socket.emit('new-message', mensaje);
        console.log("New message sent");
        return false;
    } else (alert("Ingrese una dirección de e-mail válida"));
}

const socket = io.connect();
const fecha = new Date;
socket.on('messages', data => render(data));
socket.on('productos', data => renderLista(data));