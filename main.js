const hoje = new Date();
const horas = hoje.getHours();
const minutos = hoje.getMinutes();
const chave = "4b88c746cb7f81999cf2c90b346a4b4e";
const input_cidade = document.querySelector("#city-input");
const formulario = document.querySelector("#search-form");
const clima = document.querySelector("#weather");
const alerta = document.querySelector("#alert_not_found");
const cidades_adicionadas = [];

async function API (cidade) {
    const consulta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chave}&lang=pt_br`);
    const consulta_convertida = await consulta.json();
    return consulta_convertida;
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let input = input_cidade.value;
    monta_clima(input);
});

async function monta_clima (cidade) {
    const cidade_recebida = await API(cidade);

    if (cidade_recebida.name && !cidades_adicionadas.includes(cidade_recebida.name)) {

        clima.style.display = "flex";
        let cidade_nome = cidade_recebida.name;
        let sensacao = cidade_recebida.main.feels_like;
        let temperatura = cidade_recebida.main.temp;
        let umidade = cidade_recebida.main.humidity;
        let ceus = cidade_recebida.weather[0].description;

        clima.innerHTML += `<div id="clima" class="teste">
        <h2>Previsão do Tempo para <strong><a target="_blank" href="https://www.climatempo.com.br/previsao-do-tempo/cidade/530/${cidade_nome}">${cidade_nome}</a></strong></h2>
        <div id="weather-info">
            <div id="current-weather">
                <h3>Hoje às <strong>${horas}:${minutos}</strong> no horário oficial de Brasília</h3>
                <p><img src="/assets/sensacao.png" alt="icon_fells_like"> Sensação: ${sensacao}</p>
                <p><img src="/assets/termometro.png" alt="icon_temp"> Temperatura: ${temperatura}°C</p>
                <p><img src="/assets/umidade.png" alt="icon_moisture"> Umidade: ${umidade}%</p>
                <p><img src="/assets/nuvem.png" alt="icon_cloud"> Céu: ${ceus}</p>
            </div>
        </div>
    </div>`;
    alerta.innerHTML = "";
    cidades_adicionadas.push(cidade_nome);

    } else if (cidades_adicionadas.includes(cidade_recebida.name)) {
        alerta.innerHTML = "Cidade já existente na lista";
    } else {
        alerta.innerHTML = "A cidade não pode ser encontrada...";
    }

    input_cidade.value = "";
    input_cidade.focus();
};
