function manglerInnhold(input){
    document.getElementById(input+"Info").innerHTML = "Må skrive noe inn i "+input;
}
function fjernManglerInnhold(){
    document.getElementById("filmerInfo").innerHTML = "";
    document.getElementById("antallInfo").innerHTML = "";
    document.getElementById("fornavnInfo").innerHTML = "";
    document.getElementById("etternavnInfo").innerHTML = "";
    document.getElementById("telefonnrInfo").innerHTML = "";
    document.getElementById("epostInfo").innerHTML = "";
}
function fjernInnhold(){
    document.getElementById("filmer").value = "";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";
}
function fornavnValidering(fornavn){
    const gyldigNavn = /^[a-zA-Z+æ+ø+å+Æ+Ø+Å]+$/;
    if (fornavn.match(gyldigNavn)){
        return true;
    }
    else{
        document.getElementById("fornavnInfo").innerHTML = "Vennligst skriv inn et gyldig navn!";
        return false;
    }
}
function etternavnValidering(etternavn){
    const gyldigNavn = /^[a-åA-Å+æ+ø+å+Æ+Ø+Å]+$/;
    if (etternavn.match(gyldigNavn)){
        return true;
    }
    else{
        document.getElementById("etternavnInfo").innerHTML = "Vennligst skriv inn et gyldig navn!";
        return false;
    }
}
function telefonnrValidering(telefonnr){
    const gyldigTelefonnr = /^[0-9]{8}$/im;
    if(telefonnr.match(gyldigTelefonnr)){
        return true;
    }
    else{
        document.getElementById("telefonnrInfo").innerHTML = "Vennligst skriv inn et gyldig telefonnr!";
        return false;
    }
}
function epostValidering(epost){
    const gyldigEpost = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(epost.match(gyldigEpost)){
        return true;
    }
    else{
        document.getElementById("epostInfo").innerHTML = "Vennligst skriv inn en gyldig e-postadresse!";
        return false;
    }
}
function innholdSjekk(film, antall, fornavn, etternavn, telefonnr, epost){
    let gyldig = true;
    if (film === ""){
        document.getElementById("filmerInfo").innerHTML = "Vennligst velg en film!";
        gyldig = false;
    }
    if (antall === ""){
        manglerInnhold("antall");
        gyldig = false;
    }
    if(fornavn === ""){
        manglerInnhold("fornavn");
        gyldig = false;
    }
    else if (fornavnValidering(fornavn) === false){
        gyldig = false;
    }
    if (etternavn === ""){
        manglerInnhold("etternavn");
        gyldig = false;
    }
    else if (etternavnValidering(etternavn) === false){
        gyldig = false;
    }
    if(telefonnr === ""){
        manglerInnhold("telefonnr");
        gyldig = false;
    }
    else if (telefonnrValidering(telefonnr) === false){
        gyldig = false;
    }
    if(epost === ""){
        manglerInnhold("epost");
        gyldig = false;
    }
    else if (epostValidering(epost) === false){
        gyldig = false;
    }
    return gyldig;
}
function printBillett(billetter){

    let liste = document.getElementById("filmListe");
    liste.innerHTML = "";
    let printUt = "<div class='col-xs-2'>Film</div>"+"<div class='col-xs-2'>Antall</div>"+"<div class='col-xs-2'>Fornavn</div>"+
        "<div class='col-xs-2'>Etternavn</div>"+"<div class='col-xs-2'>TelefonNr</div>"+"<div class='col-xs-2'>Epost</div><br><br>"

    for (let print of billetter){

        printUt += "<div class='row'><div class='col-xs-2'>"+print.film+"</div><div class='col-xs-2'>"+print.antall+"</div><div class='col-xs-2'>"+print.fornavn+"</div>"+
            "<div class='col-xs-2'>"+print.etternavn+"</div><div class='col-xs-2'>"+print.telefonnr+"</div><div class='col-xs-2'>"+print.epost+"</div></div><br>"

    }
    liste.innerHTML = printUt;
}
function hentBilletter(){
    $.get("/hentBilletter", function (data){
        console.log(data);
        printBillett(data);
    });
}
function kjopBillett(){
    fjernManglerInnhold();
    let film = document.getElementById("filmer").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;
    if (innholdSjekk(film, antall, fornavn, etternavn, telefonnr, epost) === false){
        return;
    }
    let bestilling = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost
    }
    $.post("/lagre", bestilling, function(){
        hentBilletter();
    });
    fjernInnhold();
}
function slettBilletter(){
    fjernManglerInnhold();
    $.get("/tømListe", function(){})
    document.getElementById("filmListe").innerText = "";
    fjernInnhold();
}