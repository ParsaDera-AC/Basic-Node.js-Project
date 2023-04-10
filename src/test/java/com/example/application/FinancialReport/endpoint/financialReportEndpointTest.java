package com.example.application.FinancialReport.endpoint;

import com.example.application.FinancialReport.entity.FinancialReport;
import com.example.application.FinancialReport.repository.financialReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class financialReportEndpointTest {

    @InjectMocks
    private financialReportEndpoint endpoint;

    @Mock
    private financialReportRepository repository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllReports() {
        FinancialReport report1 = new FinancialReport(/* initialize with appropriate data */);
        FinancialReport report2 = new FinancialReport(/* initialize with appropriate data */);
        List<FinancialReport> expectedReports = Arrays.asList(report1, report2);

        when(repository.getAllReports()).thenReturn(expectedReports);

        List<FinancialReport> actualReports = endpoint.retrieveAllReports();
        assertEquals(expectedReports, actualReports);
    }
}
