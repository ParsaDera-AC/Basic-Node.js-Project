package com.example.application.TrainingHistory.endpoint;

import com.example.application.TrainingHistory.repository.trainingHistoryRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;

import com.example.application.TrainingHistory.entity.TrainingHistory;

@Endpoint
@AnonymousAllowed
public class trainingHistoryEndpoint {

    private trainingHistoryRepository trainingHistoryRepo;

    public trainingHistoryEndpoint(){
        trainingHistoryRepo = new trainingHistoryRepository();
    }

    public List<TrainingHistory> retrieveAllHistories(){
        return trainingHistoryRepo.getAllHistories();
    }
}
