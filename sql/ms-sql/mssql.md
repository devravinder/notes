## Stored Procedures

**References:**

-   [Storing query results into a variable and modifying it inside a stored procedure](https://stackoverflow.com/questions/17739480/storing-query-results-into-a-variable-and-modifying-it-inside-a-stored-procedure)
-   [Stored Procedure with a Return Value in SQL Server 2012](https://www.c-sharpcorner.com/UploadFile/rohatash/stored-procedure-with-a-return-value-in-sql-server-2012/)

---

### Create Procedure

Execute this procedure only once. The database will store it for future use.

```sql
CREATE PROCEDURE calculate_attendies
    @pgm_id nvarchar(50)
AS
    SELECT COUNT(*) FROM prgattendee_dtl WHERE pgat_prgid=@pgm_id and pgat_isActive='1'
```

**Usage:**

```sql
EXECUTE calculate_attendies @pgm_id = N'PGE032231019001948365'
```

**Drop Procedure:**

```sql
DROP PROCEDURE calculate_attendies
```

---

### Advanced Usage with Variables

One way to do this:

```sql
DECLARE @Cnt int

SELECT @Cnt = COUNT(pgat_id) FROM prgattendee_dtl WHERE pgat_prgid='PGE032231019001948365' and pgat_isActive='1'

SELECT @Cnt
```

---

### With Return Value

```sql
CREATE PROCEDURE get_attendies_count
    @pgm_id nvarchar(50)
AS
    DECLARE @Cnt int
    SELECT @Cnt= COUNT(*) FROM prgattendee_dtl WHERE pgat_prgid=@pgm_id and pgat_isActive='1'
    RETURN @Cnt
```

**Usage:**

```sql
DECLARE  @attendies int
EXECUTE @attendies= get_attendies_count @pgm_id = N'PGE032231019001948365'
SELECT @attendies;
```

---

### Set Attendies

```sql
CREATE PROCEDURE set_attendies
    @pgm_id nvarchar(50), @Cnt int
AS
    UPDATE program_mstr SET prg_noofparticipents=@Cnt where prg_id=@pgm_id
```

**Usage:**

```sql
EXECUTE set_attendies @pgm_id = N'PGE032231019001948365',@Cnt =3
```

---

### Using One Procedure's Return Value in Another

```sql
CREATE PROCEDURE update_attendies_count
    @pgm_id nvarchar(50)
AS
    DECLARE  @attendies int
    EXECUTE @attendies= get_attendies_count @pgm_id = @pgm_id
    EXECUTE set_attendies @pgm_id = @pgm_id,@Cnt =@attendies
```

**Usage:**

```sql
EXECUTE update_attendies_count @pgm_id='PGE032231019001948365'
```
