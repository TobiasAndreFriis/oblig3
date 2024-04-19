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
function toggleEndreBillettBoks(){
    var endreBoks = document.getElementById("endreBillettBoks");
    if (endreBoks.style.display === "none"){
        endreBoks.style.display = "block";
    }
    else{
        endreBoks.style.display = "none";
    }
}
function slettBillett(id){
    let idBillett = {id};
    $.ajax({
        url: "/slettBillett",
        type: "DELETE",
        data: idBillett,
        success: function (){
            hentBilletter()
            document.getElementById("endreBillettBoks").style.display = "none"
        }
    })
}
function endreBillett(){
    const billett = {
        id : $("#id").val(),
        film : document.getElementById("filmerEndre").value,
        antall : document.getElementById("antallEndre").value,
        fornavn : document.getElementById("fornavnEndre").value,
        etternavn : document.getElementById("etternavnEndre").value,
        telefonnr : document.getElementById("telefonnrEndre").value,
        epost : document.getElementById("epostEndre").value
    };
    console.log(billett);
    $.post("/oppdatere", billett, function (){
        hentBilletter()
        document.getElementById("endreBillettBoks").style.display = "none"
    })

}
function endreBillettBoks(id){
    toggleEndreBillettBoks();
    document.getElementById("id").value = id;
    let idBillett = {id};
    $.get("/hentBillett", idBillett, function (data) {
        document.getElementById("filmerEndre").value = data.film;
        document.getElementById("antallEndre").value = data.antall;
        document.getElementById("fornavnEndre").value = data.fornavn;
        document.getElementById("etternavnEndre").value = data.etternavn;
        document.getElementById("telefonnrEndre").value = data.telefonnr;
        document.getElementById("epostEndre").value = data.epost;
    })
}
function printBillett(billetter){
    let liste = document.getElementById("filmListe");
    liste.innerHTML = "";
    let printUt = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th></th><th></th></tr>";
    for (let print of billetter){

        printUt += "<tr><td>" + print.film + "</td><td>" + print.antall + "</td><td>" + print.fornavn + "</td>" +
            "<td>" + print.etternavn + "</td><td>" + print.telefonnr + "</td><td>" + print.epost + "</td>" +
            "<td> <button class='btn btn-primary' onclick='endreBillettBoks("+print.id+")'>Endre</button></td>"+
            "<td> <button class='btn btn-danger' onclick='slettBillett("+print.id+")'>Slett</button></td>"+
            "</tr>";
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
    $.ajax({
        url: "/tømListe",
        type: "DELETE",
        success: function (){
            fjernManglerInnhold();
            document.getElementById("filmListe").innerText = "";
            fjernInnhold();
        }
    })
}