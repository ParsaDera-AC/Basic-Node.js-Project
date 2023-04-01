package com.example.application.FinancialReport.endpoint;
import java.util.List;

import com.example.application.FinancialReport.entity.FinancialReport;
import com.example.application.FinancialReport.repository.*;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class financialReportEndpoint  {

    private financialReportRepository financialReportRepo;

    public financialReportEndpoint(){
        financialReportRepo = new financialReportRepository();
    }

    public List<FinancialReport> retrieveAllReports(){
        return financialReportRepo.getAllReports();
    }

}
