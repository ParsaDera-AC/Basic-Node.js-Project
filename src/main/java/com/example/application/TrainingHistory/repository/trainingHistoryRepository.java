package com.example.application.TrainingHistory.repository;
import java.util.ArrayList;
import java.util.List;
import com.example.application.TrainingHistory.entity.TrainingHistory;

public class trainingHistoryRepository {
    List<TrainingHistory> historyList = new ArrayList<TrainingHistory>(100);

    public trainingHistoryRepository(){
 
    }
    
    public List<TrainingHistory> getAllHistories() {
       return historyList;
    }
}
