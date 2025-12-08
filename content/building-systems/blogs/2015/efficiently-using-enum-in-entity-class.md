---
title: Efficiently using Enum in entity class
date: '2015-08-24'
draft: false
type: blogs
systems_tags:
- java
- code
- jpa
- database
- enum
- hibernate
author: Sakthi Priyan H
summary: to improve code maintainability and database performance.
aliases:
- /2015/08/24/efficiently-using-enum-in-entity-class.html
---

### Problems in using Enum in JPA
* JPA implementations stores the ordinal number of the enum.
* It is problematic in many ways,
    * We cannot rearrange the enum values.
    * We cannot remove unused enum value.
    * We can add new enum values only at the end.
* Alternatively, we can use the string representation of the enum.
    * It is too verbose, takes more space.
    * Comparing `varchar` in database is costly compared to `int`. Moreover, this field will be used to filter results often.

### How to do it right?
In this post we will see how to efficiently use Enum using a `int value` for each enum value.

* Create an enum with an int value.
* Create a class that implements AttributeConverter.
* Now, simply use the enum wherever required in entity class.

### Enum Status
`Status` has enum values such `ACTIVE`,`INACTIVE`, etc.,

    package com.sakthipriyan.example;

    import java.util.HashMap;
    import java.util.Map;

    public enum Status {

        // Add any enum values anywhere.
        // Make sure not to repeat same int value.
        // Changing values here, would require update in database as well.
        // Now values stored in database is made explicit in code.
        ACTIVE(1),
        INACTIVE(2),
        CREATED(3),
        SUBMITTED(4),
        ACCPETED(6),
        REJECTED(7);

        private final int value;

        private Status(int value) {
            this.value = value;
        }

        public int getValue() {
            return this.value;
        }

        // This is look up map to get Enum value from int value.
        private final static Map<Integer, Status> map = new HashMap<>();

        // In Enum, static block will be executed after creating all Enum values.
        static {
            for (Status status : Status.values()) {
                map.put(status.getValue(), status);
            }
        }

        public final static Status getStatus(int value) {
            return map.get(value);
        }

    }


### StatusConverter implements AttributeConverter
AttributeConverter can be implemented to override the default behavior. This implementation say that, `Status` should be stored as `Integer` and also provides method to get the `Status` object from `Integer` value of the database.

    package com.sakthipriyan.example;

    import javax.persistence.AttributeConverter;
    import javax.persistence.Converter;

    @Converter(autoApply = true)
    public class StatusConverter implements AttributeConverter<Status, Integer> {

        @Override
        public Integer convertToDatabaseColumn(Status status) {
            return status.getValue();
        }

        @Override
        public Status convertToEntityAttribute(Integer value) {
            return Status.getStatus(value);
        }
    }


### Enitity Langauge
Now, we can start using the enum `Status`.
Here, Langauge entity has a Status field in it.

    package com.sakthipriyan.example;

    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;

    @Entity
    public class Language {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private short id;

        @Column(nullable = false)
        private String language;

        @Column(nullable = false)
        private Status status;

        public Language(String language) {
            super();
            this.language = language;
            this.status = Status.ACTIVE;
        }

        public Language() {
            super();
        }

        public short getId() {
            return id;
        }

        public String getLanguage() {
            return language;
        }

        public Status getStatus() {
            return status;
        }

        public void deactivate() {
            this.status = Status.INACTIVE;
        }

        public void activate() {
            this.status = Status.ACTIVE;
        }
    }

### Result
Now, whenever the Language object is stored in the database. It will persist the Integer equivalent of the Status object rather than using Ordinal number or String representation of the Enum value.

### Further tuning
* Based on the usage, you can even use `Short` in place of `Integer` in `Status` and `StatusConverter`.
* Also, you can specify the column size in `@Column` definition.
* Alternatively, with minor variations we should be able to easily stores enum values as `char(n)` say `n=2` or `n=3`.