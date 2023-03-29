package com.example.application.HumanResourcesHistory.repository;
import java.util.ArrayList;
import java.util.List;
import com.example.application.HumanResourcesHistory.entity.HumanResourcesHistory;


public class humanResourcesHistoryRepository {
    List<HumanResourcesHistory> historyList = new ArrayList<HumanResourcesHistory>(100);

    public humanResourcesHistoryRepository(){
 
    }
    
    public List<HumanResourcesHistory> getAllHistories() {
      HumanResourcesHistory newHistory = new HumanResourcesHistory();
       newHistory.setHireDate("3/2/2000");
       newHistory.setReason("COVID-19 Pandemic Layoff");
       newHistory.setLeaveDate("4/2/2020");
       return historyList;
    }
}
