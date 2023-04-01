package com.example.application.HumanResourcesHistory.endpoint;
import java.util.List;

import com.example.application.HumanResourcesHistory.entity.HumanResourcesHistory;
import com.example.application.HumanResourcesHistory.repository.humanResourcesHistoryRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class humanResourcesHistoryEndpoint {

    private humanResourcesHistoryRepository humanResourcesHistoryRepo;

    public humanResourcesHistoryEndpoint(){
        humanResourcesHistoryRepo = new humanResourcesHistoryRepository();
    }

    public List<HumanResourcesHistory> retrieveAllHistories(){
        return humanResourcesHistoryRepo.getAllHistories();
    }
}
