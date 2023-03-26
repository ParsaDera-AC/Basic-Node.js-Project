package com.example.application.events.entity;

 import java.util.Objects;
 import com.fasterxml.jackson.annotation.JsonProperty;
 import io.swagger.v3.oas.annotations.media.Schema;
 /**
  * Events
  */
 @javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaJerseyServerCodegen", date = "2023-03-23T01:02:22.466756794Z[GMT]")public class Events   {
   @JsonProperty("id")
   private Integer id = null;
 
   @JsonProperty("name")
   private String name = null;
 
   @JsonProperty("event")
   private String event = null;
 
   @JsonProperty("location")
   private String location = null;
 
   @JsonProperty("email")
   private String email = null;
 
   @JsonProperty("time")
   private String time = null;
 
   @JsonProperty("date")
   private String date = null;
 
   public Events id(Integer id) {
     this.id = id;
     return this;
   }
 
   /**
    * Get id
    * @return id
    **/
   @JsonProperty("id")
   @Schema(example = "1", description = "")
   public Integer getId() {
     return id;
   }
 
   public void setId(Integer id) {
     this.id = id;
   }
 
   public Events name(String name) {
     this.name = name;
     return this;
   }
 
   /**
    * Get name
    * @return name
    **/
   @JsonProperty("name")
   @Schema(description = "")
   public String getName() {
     return name;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public Events event(String event) {
     this.event = event;
     return this;
   }
 
   /**
    * Get event
    * @return event
    **/
   @JsonProperty("event")
   @Schema(description = "")
   public String getEvent() {
     return event;
   }
 
   public void setEvent(String event) {
     this.event = event;
   }
 
   public Events location(String location) {
     this.location = location;
     return this;
   }
 
   /**
    * Get location
    * @return location
    **/
   @JsonProperty("location")
   @Schema(description = "")
   public String getLocation() {
     return location;
   }
 
   public void setLocation(String location) {
     this.location = location;
   }
 
   public Events email(String email) {
     this.email = email;
     return this;
   }
 
   /**
    * Get email
    * @return email
    **/
   @JsonProperty("email")
   @Schema(description = "")
   public String getEmail() {
     return email;
   }
 
   public void setEmail(String email) {
     this.email = email;
   }
 
   public Events time(String time) {
     this.time = time;
     return this;
   }
 
   /**
    * Get time
    * @return time
    **/
   @JsonProperty("time")
   @Schema(description = "")
   public String getTime() {
     return time;
   }
 
   public void setTime(String time) {
     this.time = time;
   }
 
   public Events date(String date) {
     this.date = date;
     return this;
   }
 
   /**
    * Get date
    * @return date
    **/
   @JsonProperty("date")
   @Schema(description = "")
   public String getDate() {
     return date;
   }
 
   public void setDate(String date) {
     this.date = date;
   }
 
 
   @Override
   public boolean equals(java.lang.Object o) {
     if (this == o) {
       return true;
     }
     if (o == null || getClass() != o.getClass()) {
       return false;
     }
     Events events = (Events) o;
     return Objects.equals(this.id, events.id) &&
         Objects.equals(this.name, events.name) &&
         Objects.equals(this.event, events.event) &&
         Objects.equals(this.location, events.location) &&
         Objects.equals(this.email, events.email) &&
         Objects.equals(this.time, events.time) &&
         Objects.equals(this.date, events.date);
   }
 
   @Override
   public int hashCode() {
     return Objects.hash(id, name, event, location, email, time, date);
   }
 
 
   @Override
   public String toString() {
     StringBuilder sb = new StringBuilder();
     sb.append("class Events {\n");
     
     sb.append("    id: ").append(toIndentedString(id)).append("\n");
     sb.append("    name: ").append(toIndentedString(name)).append("\n");
     sb.append("    event: ").append(toIndentedString(event)).append("\n");
     sb.append("    location: ").append(toIndentedString(location)).append("\n");
     sb.append("    email: ").append(toIndentedString(email)).append("\n");
     sb.append("    time: ").append(toIndentedString(time)).append("\n");
     sb.append("    date: ").append(toIndentedString(date)).append("\n");
     sb.append("}");
     return sb.toString();
   }
 
   /**
    * Convert the given object to string with each line indented by 4 spaces
    * (except the first line).
    */
   private String toIndentedString(java.lang.Object o) {
     if (o == null) {
       return "null";
     }
     return o.toString().replace("\n", "\n    ");
   }
 }
 