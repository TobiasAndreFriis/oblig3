package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBilletter(Billett innBillett){
        rep.lagreBillett(innBillett);
        System.out.println("Billetten er lagret!");
    }

    @PostMapping("/oppdatere")
    public void oppdatereBillett(Billett billett){
        System.out.println(rep.oppdaterBillett(billett));
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/hentBillett")
    public Billett hentBillett(Billett billett){
        return rep.hentBillett(billett);
    }

    @DeleteMapping("/tømListe")
    public void tomBillettListe(){
        rep.slettAlleBilletter();
        System.out.println("Billett tabellen er tømt!");
    }

    @DeleteMapping("/slettBillett")
    public void slettBillett(Billett billett){
        rep.slettBillett(billett);
    }
}
