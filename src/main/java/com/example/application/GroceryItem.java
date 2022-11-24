package com.example.application;

import java.sql.Date;

import javax.validation.constraints.NotNull;

public class GroceryItem {

    

    private int id;

    private String client;

    private double cost;

    private String status;

    private Date startDate;

    private Date endDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public double getAmount() {
        return cost;
    }

    public void setAmount(double amount) {
        this.cost = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }


    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


   
}