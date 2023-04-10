package com.example.application.TrainingHistory.endpoint;
import com.example.application.TrainingHistory.entity.TrainingHistory;
import com.example.application.TrainingHistory.repository.trainingHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class trainingHistoryEndpointTest {

    @InjectMocks
    private trainingHistoryEndpoint endpoint;

    @Mock
    private trainingHistoryRepository repository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllHistories() {
        TrainingHistory history1 = new TrainingHistory(/* initialize with appropriate data */);
        TrainingHistory history2 = new TrainingHistory(/* initialize with appropriate data */);
        List<TrainingHistory> expectedHistories = Arrays.asList(history1, history2);

        when(repository.getAllHistories()).thenReturn(expectedHistories);

        List<TrainingHistory> actualHistories = endpoint.retrieveAllHistories();
        assertEquals(expectedHistories, actualHistories);
    }
}
