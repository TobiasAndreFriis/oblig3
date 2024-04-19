package com.example.oblig3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    class BillettRowMapper implements RowMapper< Billett > {
        @Override
        public Billett mapRow(ResultSet rs, int rowNum) throws SQLException {
            Billett billett = new Billett();
            billett.setId(rs.getLong("id"));
            billett.setFilm(rs.getString("film"));
            billett.setAntall(rs.getInt("antall"));
            billett.setFornavn(rs.getString("fornavn"));
            billett.setEtternavn(rs.getString("etternavn"));
            billett.setTelefonnr(rs.getString("telefonnr"));
            billett.setEpost(rs.getString("epost"));
            return billett;
        }
    }

    public void lagreBillett(Billett innBillett){
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(),
                innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost());
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        return db.query(sql, new BillettRowMapper());
    }

    public Billett hentBillett(Billett innId){
        String sql = "SELECT * FROM Billett WHERE id=?";
        List<Billett> enBillett = db.query(sql, new BillettRowMapper(), innId.getId());
        return enBillett.get(0);
    }

    public boolean oppdaterBillett(Billett billett){
        String sql = "UPDATE Billett SET film=?, antall=?, fornavn=?, etternavn=?, telefonnr=?, epost=? WHERE id=?";
        try{
           db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost(), billett.getId());
           return true;
        }
        catch(Exception e){
            logger.error("Feil i endre billetten: "+e);
            return false;
        }
    }

    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }

    public void slettBillett(Billett innId){
        System.out.println(innId.getId());
        String sql = "DELETE FROM Billett WHERE id=?";
        try{
            db.update(sql, innId.getId());
        }
        catch(Exception e){
            logger.error("Error med slett billett: "+e);
        }
    }

}
