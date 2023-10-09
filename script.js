window.onscroll = () => {
    progresso();
};

function progresso() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("barra-de-progresso").style.width = scrolled + "%";
};