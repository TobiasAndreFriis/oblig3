package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        System.out.println(rep.hentAlleBilletter());
        return rep.hentAlleBilletter();
    }

    @GetMapping("/tømListe")
    public void tomBillettListe(){
        rep.slettAlleBilletter();
        System.out.println("Billett tabellen er tømt!");
    }
}
