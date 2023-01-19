package es.manolo.data.service;

import es.manolo.data.entity.Person;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, UUID> {

}