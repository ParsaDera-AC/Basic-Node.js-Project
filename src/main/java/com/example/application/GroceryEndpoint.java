package com.example.application;

import java.util.ArrayList;
import java.util.List;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint 
@AnonymousAllowed 
public class GroceryEndpoint {

  private final List<GroceryItem> groceryList = new ArrayList<>();

  public @Nonnull List<@Nonnull GroceryItem> getGroceries() { 
    return groceryList;
  }

  public GroceryItem save(GroceryItem item) {
    groceryList.add(item);
    return item;
  }
}