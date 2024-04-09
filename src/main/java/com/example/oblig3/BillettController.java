package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
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
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        return rep.hentAlleBilletter();
    }

    @PostMapping("/tømListe")
    public void tomBillettListe(){
        rep.slettAlleBilletter();
    }
}
