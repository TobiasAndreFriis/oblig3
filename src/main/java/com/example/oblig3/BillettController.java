package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    //Sender billet fra klient til repository
    @PostMapping("/lagre")
    public void lagreBilletter(Billett innBillett){
        rep.lagreBillett(innBillett);
        System.out.println("Billetten er lagret!");
    }

    //Sender oppdatert billett data til repository
    @PostMapping("/oppdatere")
    public void oppdatereBillett(Billett billett){
        System.out.println(rep.oppdaterBillett(billett));
    }

    //Henter billetter fra repository og sender til klient
    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        return rep.hentAlleBilletter();
    }

    //Henter en billett fra repository og sender til klient
    @GetMapping("/hentBillett")
    public Billett hentBillett(Billett billett){
        return rep.hentBillett(billett);
    }

    //Kjører funksjon i repository som sletter alle billetter
    @DeleteMapping("/tømListe")
    public void tomBillettListe(){
        rep.slettAlleBilletter();
        System.out.println("Billett tabellen er tømt!");
    }

    //Kjører funksjon i repository som sletter en billett ved bruk av id
    @DeleteMapping("/slettBillett")
    public void slettBillett(Billett billett){
        rep.slettBillett(billett);
    }
}
