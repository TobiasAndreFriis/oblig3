package com.example.oblig3;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettLagring {
    private final List<Billett> billetter = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreBilletter(Billett innBillett){
        billetter.add(innBillett);
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter(){
        return billetter;
    }

    @PostMapping("/tømListe")
    public void tomBillettListe(){
        billetter.clear();
    }
}
