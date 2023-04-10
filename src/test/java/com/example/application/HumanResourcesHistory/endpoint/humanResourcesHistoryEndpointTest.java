package com.example.application.HumanResourcesHistory.endpoint;
import com.example.application.HumanResourcesHistory.entity.HumanResourcesHistory;
import com.example.application.HumanResourcesHistory.repository.humanResourcesHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class humanResourcesHistoryEndpointTest {

    @InjectMocks
    private humanResourcesHistoryEndpoint endpoint;

    @Mock
    private humanResourcesHistoryRepository repository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllHistories() {
        HumanResourcesHistory history1 = new HumanResourcesHistory(/* initialize with appropriate data */);
        HumanResourcesHistory history2 = new HumanResourcesHistory(/* initialize with appropriate data */);
        List<HumanResourcesHistory> expectedHistories = Arrays.asList(history1, history2);

        when(repository.getAllHistories()).thenReturn(expectedHistories);

        List<HumanResourcesHistory> actualHistories = endpoint.retrieveAllHistories();
        assertEquals(expectedHistories, actualHistories);
    }
}
