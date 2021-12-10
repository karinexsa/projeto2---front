const boxes = document.querySelectorAll(".box");
let selected;
const form = document.querySelector("form");
const formElement = document.querySelector("#search-form");
const section = document.querySelector("main section");


boxes.forEach(function(box){
    box.addEventListener("mouseenter", function(){
        box.style.opacity=0.8;
    })
    box.addEventListener("mouseout", function(){
        box.style.opacity=1.0;
    })
    box.addEventListener("click", function(){
        if(selected) {
            selected.classList.remove("selected");
        }
        selected = box;
        box.style.backgroundColor="var(--laranja-claro)";
        box.classList.add("selected");
    });
});
form.addEventListener("submit", function(evt){//para que a pag nao recarregue quando enviar o formulario
    evt.preventDefault();

    const formData = new FormData(form);//armazenando os dados com formdata
    console.log(formData.getAll("book-title"));//exibindo no console o que foi digitado
    getData(formElement.value);
});

const fetchData = async () => {
    let result = await fetch("https://api-pw-books.herokuapp.com/livros/");
    const autores = await result.json();
    let result = await fetch("https://api-pw-books.herokuapp.com/autores");
    const livros = await result.json();

    livros.forEach((livros) =>{
        section.innerHTML += `
        <div class="card">
        <h2>${livros.nome}</h2>
        <p>${livros.descricao}</p>
        </div>`;
    });
    autores.forEach((autores) =>{
        section.innerHTML += `
        <div class="card">
        <h2>${autores.nome}</h2>
        </div>`;
    });
}
fetchData();