---
title: "Natural Language Data Processing"
date: "2025-11-13"
draft: true
layout: "slides"
type: "slides"
summary: "Prototype system that converts natural language into SQL and IR to drive dynamic DAG execution for Hetero Collate workloads."
js_tools:
  - viz
systems_tags:
  - SQL
  - AI Engineering
  - IR
  - DAG
  - ANTLR
---
<small>sakthipriyan.com/building-systems</small>

### Natural Language Data Processing
with a
### SQL Interface for DAG Execution
<br/>

#### Sakthi Priyan H & Chandramouli G
##### Nov 13, 2025

---

#### Contents

1. Hetero Collate
2. Prototype Goals
3. Architecture
4. Demo

---

### 1️⃣ Hetero Collate

> *Ultra efficient joins using cloud storage,*
> *compared to memory based ones like Spark*

- Can collate/join multiple datasets
  - But, can do only on single set of keys
  - To join multiple datasets using different set of keys 
    it requires **multiple jobs** to be built and run
- Job developed using YAML and/or Python
  - **SQL** interface **NOT** supported currently

---

### 2️⃣ Prototype Goals
- 🟢 Natural Language interface for building jobs
- 🟢 SQL interface for the job
- 🟢 DAG Driver to run a more dynamic DAG stages
  - 🟢 Build a minature Hetero Collate with 2 stages
    - 🟢 Split stage to bucket the data
    - 🟢 Merge stage to sort/merge for a bucket


---

### 3️⃣ Architecture

```dot
digraph NLtoExecution {
  rankdir=LR;
  bgcolor=transparent;
  node [shape=box, style="rounded,filled", fontname="Arial", fillcolor="white"];

  // === Nodes ===
  NaturalLanguage [label="Natural Language", fillcolor="#ffd6a5"];
  LLM [label="AI Agent", fillcolor="#fdffb6"];
  SQL [label="SQL", fillcolor="#caffbf"];
  Parser [label="Parser", fillcolor="#9bf6ff"];
  Grammar [label="Grammar (ANTLR)", fillcolor="#ffadad"];
  IR [label="IR", fillcolor="#a0c4ff"];
  DAG [label="DAG", fillcolor="#bdb2ff"];
  Execution [label="Execution", fillcolor="#ffc6ff"];

  // === Main Flow ===
  NaturalLanguage -> LLM -> SQL -> Parser -> IR -> DAG -> Execution;

  // === Shared Grammar Input ===
  Grammar -> LLM;
  Grammar -> Parser;

  // === Styling ===
  edge [color="#666666", penwidth=1.4, arrowsize=0.9];
  { rank = same; Grammar; Parser; }
}
```
--
#### 3️⃣ Architecture / Grammar (using ANTLR)
<pre><code data-line-numbers="" style="max-height:600px">grammar SimpleSQL;
query
    : selectStmt EOF
    ;
selectStmt
    : SELECT selectElements FROM tableSource (joinClause)*
    ;
selectElements
    : STAR
    | columnName (COMMA columnName)*
    ;
tableSource
    : tableName (alias=IDENTIFIER)?
    ;
joinClause
    : (INNER | LEFT | RIGHT)? JOIN tableSource ON booleanExpression
    ;
booleanExpression
    : predicate (AND predicate)*
    ;
predicate
    : fullColumnName EQ fullColumnName
    ;
fullColumnName
    : (tableName DOT)? columnName
    ;
tableName
    : IDENTIFIER
    ;
columnName
    : IDENTIFIER
    ;

// Keywords
SELECT : 'SELECT';
FROM   : 'FROM';
JOIN   : 'JOIN';
INNER  : 'INNER';
LEFT   : 'LEFT';
RIGHT  : 'RIGHT';
ON     : 'ON';
AND    : 'AND';
EQ     : '=';
STAR   : '*';
COMMA  : ',';
DOT    : '.';

// Identifiers and others
IDENTIFIER
    : [a-zA-Z_][a-zA-Z_0-9]*
    ;

WS
    : [ \t\r\n]+ -> skip
    ;
</code></pre>
--
### 3️⃣ Architecture / Query 
#### Natural Language
```txt
Retrieve all user, order and product information by joining 
users with orders on user ID, and orders with products on product ID.
```

#### SQL
```sql
SELECT * FROM users 
INNER JOIN orders ON users.id = orders.user_id 
INNER JOIN products ON orders.product_id = products.id;
```

#### Intermediate Representation
```
IR{
  Tables: [users, orders, products]
  Joins: [
    INNER JOIN orders ON users.id = orders.user_id,
    INNER JOIN products ON orders.product_id = products.id
  ]
  Select: [*]
}
```

--
#### 3️⃣ Architecture / DAG

```dot
digraph DAGStages {
  rankdir=TB;
  bgcolor=transparent;
  node [shape=box, style="rounded,filled", fontname="Arial", fillcolor="white"];

  // === Split Stages ===
  split_1_u [label="split_1_u", fillcolor="#fdffb6"];
  split_2_o [label="split_2_o", fillcolor="#fdffb6"];
  split_3_p [label="split_3_p", fillcolor="#fdffb6"];

  // === Merge Stages ===
  merge_1 [label="merge_1", fillcolor="#caffbf"];
  split_merge_1 [label="split_merge_1", fillcolor="#fdffb6"];
  merge_2 [label="merge_2", fillcolor="#caffbf"];

  // === Dependencies ===
  // merge_1 depends on split_1_u, split_2_o
  split_1_u -> merge_1;
  split_2_o -> merge_1;

  // split_merge_1 depends on merge_1
  merge_1 -> split_merge_1;

  // merge_2 depends on split_merge_1, split_3_p
  split_merge_1 -> merge_2;
  split_3_p -> merge_2;

  // === Rank hints ===
  { rank = same; split_1_u; split_2_o; split_3_p; }
}
```
--

#### 3️⃣ Architecture / DAG / Stages
#### 🧩 Split Stages

| Stage Name       | Dependencies | Partition Keys   |
| ---------------- | ------------ | ---------------- |
| split_1_users    | none         | [id]             |
| split_2_orders   | none         | [user_id]        |
| split_3_products | none         | [id]             |
| split_merge_1    | [merge_1]    | [product_id]     |

--
#### 3️⃣ Architecture / DAG / Stages
#### 🔗 Merge Stages

| Stage Nam  | Dependencies                      | Join Keys        | Inputs                            |
| ---------- | --------------------------------- | ---------------- | --------------------------------- |
| merge_1    | [split_1_users, split_2_orders]   | [id, user_id]    | [split_1_users, split_2_orders]   |
| merge_2    | [split_merge_1, split_3_products] | [product_id, id] | [split_merge_1, split_3_products] |

--

#### 3️⃣ Architecture / DAG / Execution
- Tables processed: 3  
- Join operations: 2  
- Bucket count: 12  
- DAG stages: 6  
- Output timestamp: 20251113121420  
- Output directory: `data/output/20251113121420`

---

### 4️⃣ Demo
