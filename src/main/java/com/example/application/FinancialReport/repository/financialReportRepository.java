package com.example.application.FinancialReport.repository;

import java.util.ArrayList;
import java.util.List;
import com.example.application.FinancialReport.entity.FinancialReport;

public class financialReportRepository {
    List<FinancialReport> reportList = new ArrayList<FinancialReport>(100);

    public financialReportRepository(){
 
    }
    
    public List<FinancialReport> getAllReports() {
        FinancialReport newReport = new FinancialReport();
        newReport.setDate("3/28/2022");
        newReport.setTitle("2022 T4");
        newReport.setType("T4");
        newReport.setIncome(2000);
        newReport.setNetTotal(1000);
        newReport.setTotalSpent(1000);
        reportList.add(newReport);
       return reportList;
    }
}
