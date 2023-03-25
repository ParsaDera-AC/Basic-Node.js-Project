package com.example.application.data.repository;


import com.example.application.data.entity.EventManager;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventManagerRepository extends JpaRepository<EventManager, UUID> {

}