# MS-SQL Scripts

## Get Column Info

```sql
SELECT
    c.name 'column',
    t.Name 'dataType',
    c.max_length 'maxLength',
    c.is_nullable 'nullable',
    c.is_computed 'computed',
    ISNULL(i.is_primary_key, 0) 'primary',
    ISNULL(i.is_unique, 0) 'unique'
FROM
    sys.columns c
INNER JOIN
    sys.types t ON c.user_type_id = t.user_type_id
LEFT OUTER JOIN
    sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
LEFT OUTER JOIN
    sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
WHERE
    c.object_id = OBJECT_ID('holiday_mstr')
```

---

## Get Foreign Key Info

```sql
SELECT
     OBJECT_NAME(f.parent_object_id)  referencing_table,
     COL_NAME(fc.parent_object_id, fc.parent_column_id)  referencing_column,
     OBJECT_NAME (f.referenced_object_id)  referenced_table,
     COL_NAME(fc.referenced_object_id, fc.referenced_column_id)  referenced_column
FROM sys.foreign_keys AS f
INNER JOIN sys.foreign_key_columns AS fc
ON f.object_id = fc.constraint_object_id
WHERE OBJECT_NAME(f.parent_object_id)='division_mstr'
ORDER BY referencing_table
```

## Get Field Label

```sql
SELECT
    lb_fieldlabel as label
from label_mstr
where lb_fieldname='blk_name'
```

---

## Get Column Info with Labels

### With Left Join

```sql
SELECT
    c.name 'column',
    l.lb_fieldlabel 'label',
    t.Name 'dataType',
    c.max_length 'maxLength',
    c.is_nullable 'nullable',
    c.is_computed 'computed',
    ISNULL(i.is_primary_key, 0) 'primary',
    ISNULL(i.is_unique, 0) 'unique'
FROM
    sys.columns c
INNER JOIN
    sys.types t ON c.user_type_id = t.user_type_id
LEFT OUTER JOIN
    sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
LEFT OUTER JOIN
    sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
LEFT OUTER JOIN  label_mstr l on l.lb_fieldname=c.name
WHERE
    c.object_id = OBJECT_ID('division_mstr')
```

### With Inner Join

```sql
SELECT
    c.name 'column',
    l.lb_fieldlabel 'label',
    t.Name 'dataType',
    c.max_length 'maxLength',
    c.is_nullable 'nullable',
    c.is_computed 'computed',
    ISNULL(i.is_primary_key, 0) 'primary',
    ISNULL(i.is_unique, 0) 'unique'
FROM
    sys.columns c
INNER JOIN
    sys.types t ON c.user_type_id = t.user_type_id
LEFT OUTER JOIN
    sys.index_columns ic ON ic.object_id = c.object_id AND ic.column_id = c.column_id
LEFT OUTER JOIN
    sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
INNER join label_mstr l on l.lb_fieldname=c.name
WHERE
    c.object_id = OBJECT_ID('division_mstr')
```

---

## Date and Time Functions

### Get Date Part of a Datetime

```sql
SELECT date(hol_date) from holiday_mstr
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, hol_date)) from holiday_mstr
```

### Get Current Date and Time

```sql
SELECT getdate() -- Result: 2019-11-01 00:00:00
```

### Filter by Date

```sql
SELECT * from holiday_mstr WHERE hol_date>='2019-10-28 00:00:00'
```

---

## Age Calculation

```sql
--- Age in years
-- su_dob format: 2018-12-31 00:00:00
SELECT FLOOR(DATEDIFF(DAY, su_dob, getDate()) / 365.25) from serviceuser_mstr
SELECT (DATEDIFF(DAY, su_dob, getDate()) / 365.25) from serviceuser_mstr

--- Age in months
DECLARE @days int
SELECT FLOOR(DATEDIFF(DAY, su_dob, getDate())) from serviceuser_mstr
SELECT @days
SELECT FLOOR(DATEDIFF(DAY, su_dob, getDate())) from serviceuser_mstr
```

---

## Add One Second to a Datetime

```sql
UPDATE  serviceuser_mstr
set su_lastmodifieddt =DATEADD(s,1,su_lastmodifieddt)
WHERE  su_id ='0010I00002NXblhQAD'
```

---

## Audit Add Procedure

```sql
CREATE PROCEDURE add_audit
    @aud_id nvarchar(50),
    @aud_recid nvarchar(50),
    @aud_table nvarchar(50),
    @aud_field nvarchar(50),
    @aud_oldvalue nvarchar(MAX),
    @aud_newvalue nvarchar(MAX),
    @aud_domain nvarchar(50),
    @aud_createdby nvarchar(50)
AS
INSERT INTO audit_trail VALUES
    (@aud_id, @aud_recid, @aud_table, @aud_field,
    @aud_oldvalue, @aud_newvalue, @aud_domain, @aud_createdby, getDate())
```

### Usage

```sql
EXECUTE add_audit
    @aud_id = ADE0323011192357167632,
    @aud_recid = CTE032301119222839639,
    @aud_table = atp_mstr,
    @aud_field = ctry_country,
    @aud_oldvalue = Eu,
    @aud_newvalue = Europe,
    @aud_domain = d001,
    @aud_createdby = U001
```

### Drop Procedure

```sql
drop PROCEDURE add_audit
```

---

## Triggers

**Reference:** [Stack Overflow - Trigger Insert Old Values](https://stackoverflow.com/questions/3181305/trigger-insert-old-values-values-that-was-updated)

### Example

```sql
create table Employees (id int identity, Name varchar(50), Password varchar(50))
create table Log (id int identity, EmployeeId int, LogDate datetime, OldName varchar(50))
go

create trigger Employees_Trigger_Update on Employees
after update
as
insert into Log (EmployeeId, LogDate, OldName)
select id, getdate(), name
from deleted
go

insert into Employees (Name, Password) values ('Zaphoid', '6')
insert into Employees (Name, Password) values ('Beeblebox', '7')
update Employees set Name = 'Ford' where id = 1
select * from Log
```

### `division_mstr` Trigger

```sql
create TRIGGER division_mstr_updated on division_mstr
after UPDATE
As
SELECT d.div_id, d.div_name, dv.div_id, dv.div_name from deleted d, division_mstr dv where d.div_id=dv.div_id

drop TRIGGER division_mstr_updated

UPDATE division_mstr set div_name='mVBRI-4' WHERE div_id='DV003'
```

---

## Dynamic SQL

```sql
Declare @sql varchar(max) = ''
declare @tablename as varchar(255) = 'division_mstr'

select @sql = @sql + 'select [' + c.name + '],count(*) as ''' + c.name +  ''' from [' + t.name + '] group by [' + c.name + '] order by 2 desc; '
from sys.columns c
inner join sys.tables t on c.object_id = t.object_id
where t.name = @tablename

EXEC (@sql)
```

---

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

#### Get Attendies

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

#### Set Attendies

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

---

```sql
CREATE PROCEDURE update_attendies_count_with_attendie_id
    @pgat_id nvarchar(50)
AS
    DECLARE @pgm_id nvarchar(50)
    SELECT @pgm_id = pgat_prgid FROM prgattendee_dtl WHERE pgat_id=@pgat_id
    EXECUTE update_attendies_count @pgm_id=@pgm_id
```

---

### Update `scr_nbr_children`

```sql
CREATE PROCEDURE update_no_of_children
    @scr_id nvarchar(50)
AS
    DECLARE @Cnt int
    SELECT @Cnt= COUNT(*) FROM screening_det WHERE scrd_src_id=@scr_id and scrd_isActive='1'
    UPDATE screening_mstr SET scr_nbr_children=@Cnt where scr_id=@scr_id
```

**Usage:**

```sql
EXECUTE update_no_of_children @scr_id='SHA3720191209105114'
```

---

```sql
CREATE PROCEDURE update_no_of_children_with_scr_detail_id
    @scrd_id nvarchar(50)
AS
    DECLARE @scr_id nvarchar(50)
    SELECT @scr_id= scrd_src_id FROM screening_det WHERE scrd_id=@scrd_id
    EXECUTE update_no_of_children @scr_id=@scr_id
```

**Usage:**

```sql
EXECUTE update_no_of_children_with_scr_detail_id @scrd_id='SDA3720191209105482'
```

---

## Get User Details

```sql
SELECT usr_id,
       usr_username,
       usr_firstname,
       usr_lastname,
       usr_profile,
       usr_name,
       usr_email,
       usr_country,
       ctry_country AS usr_country_name,
       usr_city,
       usr_state,
       st_state AS usr_state_name,
       usr_role,
       role_role AS usr_role_name,
       usr_division,
       div_name AS usr_division_name,
       usr_employee_id,
       usr_revenue_block,
       blk_name AS usr_revenue_block_name,
       usr_panchayat,
       pct_name AS usr_panchayat_name,
       usr_village,
       village_name AS usr_village_name,
       usr_domain,
       dom_domain AS usr_domain_name
FROM User_mstr
LEFT JOIN profile_mstr pm ON (usr_profile = pm.profile_ID) --- alias on join
LEFT JOIN domain_mstr ON (usr_domain = dom_id)
LEFT JOIN block_mstr ON (usr_revenue_block = blk_id)
LEFT JOIN division_mstr ON (usr_division = div_id)
LEFT JOIN village_mstr ON (usr_village = village_id)
LEFT JOIN panchayat_mstr ON (usr_panchayat = pct_id)
LEFT JOIN country_mstr ON (usr_country = ctry_id)
LEFT JOIN state_mstr ON (usr_state = st_id)
LEFT JOIN role_mstr ON (usr_role = role_id)
WHERE usr_id = '0050I000007eRCvQAM'
```

---

## Date Difference Computed Column

```sql
SELECT  CONVERT(varchar(12),
DATEADD(MINUTE, DATEDIFF(MINUTE, task_travelin_starttime, task_travelin_endtime), 0) +
DATEADD(MINUTE, DATEDIFF(MINUTE, task_travelout_starttime, task_travelout_endtime), 0),
114)
FROM task_mstr;
```

## Get Age

```sql
select GETDATE()

select DATEDIFF(year, GETDATE(), GETDATE())  FROM holiday_mstr

SELECT DATEDIFF(year, '2005-12-31 23:59:59.9999999', '2006-01-01 00:00:00.0000000');
```

---

## Trigger to Update Attendee Count

```sql
CREATE TRIGGER  attendie_watcher on prgattendee_dtl
 	after INSERT, UPDATE
 AS
	DECLARE @pgm_id nvarchar(50)

	SELECT @pgm_id = pgat_prgid FROM INSERTED

	EXECUTE update_attendies_count @pgm_id=@pgm_id
```

---

## Get Trigger Information

```sql
SELECT
     sysobjects.name AS trigger_name
    ,USER_NAME(sysobjects.uid) AS trigger_owner
    ,s.name AS table_schema
    ,OBJECT_NAME(parent_obj) AS table_name
    ,OBJECTPROPERTY( id, 'ExecIsUpdateTrigger') AS isupdate
    ,OBJECTPROPERTY( id, 'ExecIsDeleteTrigger') AS isdelete
    ,OBJECTPROPERTY( id, 'ExecIsInsertTrigger') AS isinsert
    ,OBJECTPROPERTY( id, 'ExecIsAfterTrigger') AS isafter
    ,OBJECTPROPERTY( id, 'ExecIsInsteadOfTrigger') AS isinsteadof
    ,OBJECTPROPERTY(id, 'ExecIsTriggerDisabled') AS [disabled]
FROM sysobjects
INNER JOIN sysusers
    ON sysobjects.uid = sysusers.uid
INNER JOIN sys.tables t
    ON sysobjects.parent_obj = t.object_id
INNER JOIN sys.schemas s
    ON t.schema_id = s.schema_id
WHERE sysobjects.type = 'TR'
```

---

## Split String and Find Specialists

### Get Distinct Treatments

```sql
SELECT  DISTINCT value   from formmap_mstr
    CROSS APPLY STRING_SPLIT(fm_treatment,',')
```

### Find User by Treatment Classification

```sql
const query = `
    SELECT  top 1 usr_id, fm_profile,Split_desc  as fm_treatment  from formmap_mstr
    CROSS APPLY fn_split_string(fm_treatment,',')
     INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = '${block}'
   where Split_desc='${treatmentClassification}'
   `
```

### Find Service User Problem Specific Specialists in a Block

```sql
--- service user problem specific specialists in his block
SELECT  usr_id,usr_revenue_block, fm_profile, fm_problem  from formmap_mstr
    INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = 'B014'
    where fm_problem in ('Physical Problem','Cognition Problem','Speech Problem','Vision Problem','Behavioural Problem')
```

### Find Service User Problem Specific Specialists in a Block (Alternative)

```sql
--- service user problem specific specialists in his block
SELECT  usr_id,usr_revenue_block, fm_profile, fm_problem  from formmap_mstr
    right join  fn_split_string('Physical Problem,Cognition Problem,Speech Problem,Vision Problem,Behavioural Problem',',') on Split_desc=fm_problem
    INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = 'B014'
    ---where fm_problem in ('Physical Problem','Cognition Problem','Speech Problem','Vision Problem','Behavioural Problem')
```

---

## Treatment Evaluation Details

```sql
SELECT
    trevl_id,
    trevl_disability,
    trevl_classification,
    trevl_status,
    trevl_serviceuser SU_id,
    su_name Service_User,
    su_baselineno Baseline_No,
    su_patientno Patient_No,
    trevl_monthofeval,
    trevl_yearofeval,
    trevl_createddt,
    trevl_score,
    trevl_evaldt,
    usr_name Evaluated_by,
    blk_name Block
FROM treatmentEvaluation_dtl ted
LEFT JOIN serviceuser_mstr sm ON sm.su_id = ted.trevl_serviceuser
LEFT JOIN User_mstr um ON um.usr_id = ted.trevl_evalby
LEFT JOIN block_mstr bm ON sm.su_block = bm.blk_id
WHERE trevl_status IN ('Created', 'Completed', 'Submitted')
  AND (
    (trevl_monthofeval >= '7' AND trevl_yearofeval = '2019')
    OR (trevl_createddt >= '2019-07-01 00:00:00' AND trevl_createddt < '2020-01-01 00:00:00')
  )
ORDER BY trevl_monthofeval
```

---

## Update Service User Status

```sql
-- Created -> Created, Approved, Assigned For GA
UPDATE serviceuser_mstr
SET su_status = 'Created'
WHERE su_status IN ('Created', 'Approved', 'Assigned For GA');

-- Waiting for approval -> Waiting for approval, GA Submitted
UPDATE serviceuser_mstr
SET su_status = 'Waiting for approval'
WHERE su_status IN ('Waiting for approval', 'GA Submitted');

-- Approved -> GA Reviewed
UPDATE serviceuser_mstr
SET su_status = 'Approved'
WHERE su_status = 'GA Reviewed';

-- Rejected -> Rejected
UPDATE serviceuser_mstr
SET su_status = 'Rejected'
WHERE su_status = 'Rejected';

-- Assigned for Assessment -> Assigned for Special Assessment
UPDATE serviceuser_mstr
SET su_status = 'Assigned for Assessment'
WHERE su_status = 'Assigned for Special Assessment';

-- Assessment Completed -> Assessment Completed
UPDATE serviceuser_mstr
SET su_status = 'Assessment Completed'
WHERE su_status = 'Assessment Completed';

-- Treatment Created -> Treatment Created
UPDATE serviceuser_mstr
SET su_status = 'Treatment Created'
WHERE su_status = 'Treatment Created';

-- Treatment Assigned & Submitted for Approval -> Treatment Resource Assigned, Waiting for Treatment plan Approval
UPDATE serviceuser_mstr
SET su_status = 'reatment Assigned & Submitted for Approval'
WHERE su_status IN ('Treatment Resource Assigned', 'Waiting for Treatment plan Approval');

-- Treatment Approved -> Treatment Plan Approved
UPDATE serviceuser_mstr
SET su_status = 'Treatment Approved'
WHERE su_status = 'Treatment Plan Approved';

-- Treatment Completed -> Actual Treatment Completed
UPDATE serviceuser_mstr
SET su_status = 'Treatment Completed'
WHERE su_status = 'Actual Treatment Completed';

-- Treatment Evaluation Assigned & Submitted -> under evaluation
UPDATE serviceuser_mstr
SET su_status = 'Treatment Evaluation Assigned & Submitted'
WHERE su_status = 'under evaluation';

-- Treatment Rejected -> Treatment plan Rejected
UPDATE serviceuser_mstr
SET su_status = 'Treatment Rejected'
WHERE su_status = 'Treatment plan Rejected';

-- Treatment Evaluation Completed -> Evaluation completed
UPDATE serviceuser_mstr
SET su_status = 'Treatment Evaluation Completed'
WHERE su_status = 'Evaluation completed';
```

---

## Task Details

```sql
SELECT
  task_id,
  task_date,
  task_subject,
  task_status,
  owner.Usr_name as assigned_to,
  block.blk_name as Block,
  panchayat.pct_name as Panxhayat,
  village.village_name as Village,
  dateadd(mi, 330, task_travelin_starttime) task_travelin_starttime,
  task_travelin_endtime,
  task_travelin_end_loc,
  task_checkin_time,
  task_checkin_loc,
  task_checkout_time,
  task_checkout_loc,
  task_travelout_starttime,
  task_travelout_start_loc,
  task_travelout_endtime,
  task_travelout_end_loc,
  task_work_time
FROM task_mstr
LEFT JOIN User_mstr owner ON (task_owner = owner.usr_id)
LEFT JOIN block_mstr block ON (task_block = block.blk_id)
LEFT JOIN panchayat_mstr panchayat ON (task_panchayat = panchayat.pct_id)
LEFT JOIN village_mstr village ON (task_village = village.village_id)
WHERE MONTH(task_date) = '4' AND YEAR(task_date) = 2020 AND task_id = 'TAA0120200401090758';

select TODATETIMEOFFSET(GETDATE(), '+02:00');

SELECT SYSDATETIMEOFFSET();

SELECT SWITCHOFFSET(SYSDATETIMEOFFSET(), '+05:30');
```

---

## Screening Details

```sql
SELECT
  scr_id,
  scr_venue,
  dom_domain AS scr_domain,
  scr_date,
  scr_block,
  blk_name,
  scr_panchayat,
  pct_name,
  scr_village,
  village_name,
  scr_status,
  ISNULL(Num_scrd_src_id, 0) AS scr_nbr_children,
  creator.Usr_name AS scr_createdby,
  CONVERT(VARCHAR(20), scr_createddt, 113) AS scr_createddt,
  modifier.Usr_name AS scr_lastmodifiedby,
  CONVERT(VARCHAR(20), scr_lastmodifieddt, 113) AS scr_lastmodifieddt,
  scr_isActive,
  div_name AS scr_division
FROM screening_mstr
LEFT JOIN User_mstr creator ON (scr_createdby = creator.usr_id)
LEFT JOIN User_mstr modifier ON (scr_lastmodifiedby = modifier.usr_id)
LEFT JOIN block_mstr ON (scr_block = block_mstr.blk_id)
LEFT JOIN panchayat_mstr ON (scr_panchayat = panchayat_mstr.pct_id)
LEFT JOIN village_mstr ON (scr_village = village_mstr.village_id)
LEFT JOIN domain_mstr ON (scr_domain = domain_mstr.dom_id)
LEFT JOIN division_mstr ON (scr_division = division_mstr.div_id)
LEFT JOIN (
  SELECT
    scrd_src_id AS cnt_scrd_src_id,
    count(scrd_src_id) AS Num_scrd_src_id
  FROM screening_det
  WHERE scrd_isActive = '1'
  GROUP BY scrd_src_id
) AS Child_Cnt ON Child_Cnt.cnt_scrd_src_id = scr_id
WHERE scr_isActive = 1;
```

---

## Other Queries

```sql
SELECT DISTINCT
  su_id AS form_serviceuser,
  Split_id,
  Split_desc,
  su_bl_problem,
  fm_id,
  fm_formname,
  af_id,
  fm_problem,
  fm_profile,
  usr_profile,
  usr_revenue_block,
  su_block,
  af_formname AS form_type,
  su_category AS form_category,
  usr_id AS form_assignedto
FROM serviceuser_mstr
CROSS APPLY fn_split_string(su_bl_problem, ',')
INNER JOIN formmap_mstr ON (fm_problem = Split_desc)
INNER JOIN User_mstr ON usr_profile = fm_profile AND usr_revenue_block = su_block
INNER JOIN assform_mstr ON fm_formname = af_id
WHERE su_id = 'SUA7620200131114257';

SELECT TOP 1
  usr_id,
  fm_profile,
  Split_desc AS fm_treatment
FROM formmap_mstr
CROSS APPLY fn_split_string(fm_treatment, ',')
INNER JOIN User_mstr ON usr_profile = fm_profile AND usr_isActive = '1'
WHERE Split_desc = 'Speech';

SELECT
  trevl_id,
  trevl_disability,
  trevl_classification,
  trevl_createddt,
  trevl_serviceuser,
  trevl_monthofeval,
  trevl_yearofeval,
  trevl_score,
  trevl_evaldt,
  trevl_evalby
FROM treatmentEvaluation_dtl
WHERE trevl_yearofeval IN ('2020') AND trevl_status IN 'Submitted' AND trevl_monthofeval <= '1'
ORDER BY trevl_monthofeval;

SELECT COUNT(*)
FROM treatmentEvaluation_dtl ted
WHERE trevl_yearofeval IN ('2020') AND trevl_status = 'Submitted' AND trevl_monthofeval >= '1';

SELECT DISTINCT trevl_status
FROM treatmentEvaluation_dtl ted;

SELECT su_bl_bplno
FROM serviceuser_mstr sm;

SELECT um.usr_name
FROM User_mstr um;
```

---

## Update with Join

```sql
UPDATE treatmentEvaluation_dtl
SET trevl_isActive = '0'
FROM treatmentEvaluation_dtl
JOIN (
  SELECT
    evl_id,
    qs_count
  FROM (
    SELECT
      trevl_id evl_id,
      trevl_treatment treatment,
      COUNT(trscr_treval) qs_count
    FROM treatmentEvaluation_dtl
    LEFT JOIN treatmentevaluationscore_dtl ON trscr_treval = trevl_id
    WHERE trevl_id = 'TEA68181120121149746'
    GROUP BY
      trevl_id,
      trevl_treatment
  ) AS res
  WHERE qs_count = '0'
) AS evl ON evl.evl_id = trevl_id
WHERE qs_count = '0';

UPDATE atp_mstr
SET atp_treatment = trAtp.tr_id
FROM atp_mstr atp
JOIN (
  SELECT
    tr_id,
    tr_atp,
    atp_id,
    atp_treatment
  FROM treatment_mstr
  JOIN atp_mstr ON atp_id = tr_atp
  WHERE atp_treatment IS NULL
) AS trAtp ON atp.atp_id = trAtp.tr_atp;

UPDATE task_mstr
SET task_treatment = trAtpTask.tr_id
FROM task_mstr task
JOIN (
  SELECT
    tr_id,
    tr_atp,
    atp_id,
    atp_treatment,
    task_id,
    task_atp,
    task_treatment
  FROM treatment_mstr
  JOIN atp_mstr ON atp_id = tr_atp
  JOIN task_mstr ON task_atp = atp_id
  WHERE task_treatment IS NULL
) AS trAtpTask ON trAtpTask.atp_id = task.task_atp;

UPDATE treatmentEvaluation_dtl
SET
  trevl_dimscore = FORMAT((scores.sum / (scores.count * CAST(SUBSTRING(scores.trscr_scale, 3, 1) AS INT))) * 100, 'N', 'en-us') + '%',
  trevl_score = FORMAT(scores.sum / (scores.count * CAST(SUBSTRING(scores.trscr_scale, 3, 1) AS INT)), 'N', 'en-us'),
  trevl_lastmodifieddt = '2020-12-15 15:15:15'
FROM treatmentEvaluation_dtl
JOIN (
  SELECT
    COUNT(trscr_id) count,
    SUM(trscr_evalscore) sum,
    trscr_treval,
    trscr_scale
  FROM treatmentevaluationscore_dtl
  WHERE trscr_treval = 'a090I00001IV8aWQAT'
  GROUP BY
    trscr_treval,
    trscr_scale
) AS scores ON scores.trscr_treval = trevl_id
WHERE trevl_id = 'a090I00001IV8aWQAT';

UPDATE serviceuser_mstr
SET
  su_bl_typeofslfhlpgrp = REPLACE(su_bl_typeofslfhlpgrp, ', ', ','),
  su_lastmodifieddt = '2020-12-16 16:16:16'
WHERE su_bl_typeofslfhlpgrp LIKE '%, %';
```

---

## Complex SQL Queries

### Get Classifications That Need a Score Change

```sql
SELECT  DISTINCT  trevl_classification  from treatmentEvaluation_dtl
where trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech') and trevl_id like '%TEA%'
```

### Get Treatment Evaluation Details

```sql
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score
 , ISNULL (score_records_count,0) as score_records_count  , ((trevl_score*100)/score_records_count) as score_percentage
from treatmentEvaluation_dtl

left join (
				select    trscr_treval,  count(trscr_treval) as score_records_count  from treatmentevaluationscore_dtl
					where trscr_isActive ='1'
				  GROUP BY trscr_treval
				)   as score_records
				on score_records.trscr_treval =trevl_id
where
		trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech')
		and trevl_id like '%TEA%'  -- only new records
		and trevl_status='Completed'
```

---

## Scale

### Selecting the Evaluation Based on Conditions

```sql
SELECT  DISTINCT  trevl_classification  from treatmentEvaluation_dtl
where trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech')
and trevl_id like '%TEA%'
and trevl_status='Completed'
```

### Selecting Medical Chart Max Scale

```sql
SELECT DISTINCT  mc_classification ,mc_scale , Split_id, Split_desc
from medicalchart_mstr
cross apply   fn_split_string(mc_scale,'-')
 where mc_scale <> '' -- where mc_scale like '%-%'
 and Split_id <> '1' -- taking last one only
```

### Selecting Evaluation with its Max Score

```sql
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score ,
		  mc_data. Split_desc as max_scale
		 FROM  treatmentEvaluation_dtl

		 left join (

				 	SELECT DISTINCT  mc_classification ,mc_scale , Split_id, Split_desc
				from medicalchart_mstr
				cross apply   fn_split_string(mc_scale,'-')
				 where mc_scale <> '' -- where mc_scale like '%-%'
				 and Split_id <> '1' -- taking last one only

		 )  as mc_data on mc_data.mc_classification=trevl_classification

		 where
		trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech')
		and trevl_id like '%TEA%'  -- only new records
		and trevl_status='Completed'
```

### Per Evaluation Records Count

```sql
select    trscr_treval,  count(trscr_treval) as score_records_count  from treatmentevaluationscore_dtl
					where trscr_isActive ='1'
				  GROUP BY trscr_treval
```

### Per Evaluation with its Number of Records

```sql
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score
 , ISNULL (score_records_count,0) as score_records_count --- , ((trevl_score*100)/score_records_count) as score_percentage
from treatmentEvaluation_dtl

left join (
				select    trscr_treval,  count(trscr_treval) as score_records_count  from treatmentevaluationscore_dtl
					where trscr_isActive ='1'
				  GROUP BY trscr_treval
				)   as score_records
				on score_records.trscr_treval =trevl_id
where
		trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech')
		and trevl_id like '%TEA%'  -- only new records
		and trevl_status='Completed'
```

### Evaluation with Max Score, Total Score, and Percentage

```sql
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score ,
		  mc_data. Split_desc as max_scale, score_records.score_records_count as no_of_records,
		  (mc_data. Split_desc*score_records.score_records_count) as max_score,
		  cast(  (trevl_score*100)/(mc_data. Split_desc*score_records.score_records_count) as decimal(10,2)  )as percentage
		 FROM  treatmentEvaluation_dtl

		 ----
		 left join (

				 	SELECT DISTINCT  mc_classification ,mc_scale , Split_id, Split_desc
				from medicalchart_mstr
				cross apply   fn_split_string(mc_scale,'-')
				 where mc_scale <> '' -- where mc_scale like '%-%'
				 and Split_id <> '1' -- taking last one only

		 )  as mc_data on mc_data.mc_classification=trevl_classification
		 ---
		 left join (
				select    trscr_treval,  count(trscr_treval) as score_records_count  from treatmentevaluationscore_dtl
					where trscr_isActive ='1'
				  GROUP BY trscr_treval
				)   as score_records
				on score_records.trscr_treval =trevl_id

		-------------

		 where
		trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech')
		and trevl_id like '%TEA%'  -- only new records
		and trevl_status='Completed'
```

---

## Screening Master with Child Count

```sql
SELECT scr_id,scr_venue ,ISNULL (Num_scrd_src_id,0) AS scr_nbr_children
FROM screening_mstr
left join
	( select scrd_src_id AS cnt_scrd_src_id ,count(scrd_src_id)  AS Num_scrd_src_id
			from screening_det
			where scrd_isActive='1'
			group by scrd_src_id
 )
AS Child_Cnt ON Child_Cnt.cnt_scrd_src_id = scr_id
where scr_isActive=1
```

---

## Order No

```sql
SELECT  trevl_id ,
ROW_NUMBER() OVER(  ORDER BY trevl_serviceuser ASC )  row_no,
trevl_serviceuser, trevl_classification,trevl_lastmodifieddt,  trevl_evalno
from treatmentEvaluation_dtl  where trevl_isActive ='1'

ORDER  by trevl_serviceuser, trevl_classification,trevl_lastmodifieddt
```

```sql
SELECT  trevl_id ,
ROW_NUMBER() OVER( PARTITION BY trevl_serviceuser  ORDER BY trevl_serviceuser  )  row_no,
trevl_serviceuser, trevl_classification,trevl_lastmodifieddt,  trevl_evalno
from treatmentEvaluation_dtl  where trevl_isActive ='1'

ORDER  by trevl_serviceuser, trevl_classification,trevl_lastmodifieddt
```

```sql
SELECT  trevl_id ,
ROW_NUMBER() OVER(PARTITION BY trevl_serviceuser,trevl_classification  ORDER BY trevl_serviceuser,trevl_classification,trevl_createddt,trevl_evalno )  row_no,
trevl_serviceuser, trevl_classification,trevl_createddt,  trevl_evalno
from treatmentEvaluation_dtl  where trevl_isActive ='1'

ORDER  by trevl_serviceuser, trevl_classification,trevl_createddt,trevl_evalno
```

### Order with Update

```sql
UPDATE treatmentEvaluation_dtl  set  trevl_evalno =te.row_no, trevl_lastmodifieddt ='2021-01-14 00:00:00'

from treatmentEvaluation_dtl  join

(


SELECT  trevl_id t_id ,
ROW_NUMBER() OVER(PARTITION BY trevl_serviceuser,trevl_classification
ORDER BY trevl_serviceuser,trevl_classification,trevl_createddt,trevl_evalno )  row_no,
trevl_serviceuser t_serviceuser, trevl_classification t_classification,trevl_createddt t_createddt,  trevl_evalno t_evalno
from treatmentEvaluation_dtl  where trevl_isActive ='1'

---ORDER  by trevl_serviceuser, trevl_classification,trevl_createddt,trevl_evalno

)  as te on te.t_id=trevl_id
```

---

## Operators (if)

```sql
SELECT
           case when 1=1
               then 'true'
               else 'false'
            end
```

```sql
SELECT  COUNT(task_id)  count, task_status,task_travelin_starttime,task_checkin_time,

            case when task_status='Open'
                  		then
                  		            case when  (task_travelin_starttime is not null or task_checkin_time is not null)
                  		                   then '1'
                  		                   else '0'
                  		             end
                  		else '1'

             end

              as is_started

            from task_mstr

            where task_owner ='00528000006PK4fAAG' and task_date ='2021-01-21'

            GROUP  by task_status,task_travelin_starttime,task_checkin_time
```
