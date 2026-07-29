# MS-SQL scripts

scratch queries/procedures collected over time (mostly from the mVBRI project schema)

## Columns info

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

with a `label_mstr` join for the field label:

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

-- same, but with INNER JOIN on label_mstr
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

## Foreign keys of a table

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

lookup a field's label:

```sql
SELECT lb_fieldlabel as label from label_mstr where lb_fieldname='blk_name'
```

## Date / age queries

```sql
SELECT date(hol_date) from holiday_mstr
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, hol_date)) from holiday_mstr
SELECT * from holiday_mstr WHERE hol_date>='2019-10-28 00:00:00'

-- age
SELECT FLOOR(DATEDIFF(DAY, su_dob, getDate()) / 365.25) from serviceuser_mstr
SELECT (DATEDIFF(DAY, su_dob, getDate()) / 365.25) from serviceuser_mstr

-- to add one second
UPDATE  serviceuser_mstr 
set su_lastmodifieddt =DATEADD(s,1,su_lastmodifieddt)
WHERE  su_id ='0010I00002NXblhQAD'

-- date diff computed column
SELECT  CONVERT(varchar(12),
DATEADD(MINUTE, DATEDIFF(MINUTE, task_travelin_starttime, task_travelin_endtime), 0) +
DATEADD(MINUTE, DATEDIFF(MINUTE, task_travelout_starttime, task_travelout_endtime), 0),
114)
  FROM task_mstr;

-- get age
select DATEDIFF(year, GETDATE(), GETDATE())  FROM holiday_mstr
SELECT DATEDIFF(year, '2005-12-31 23:59:59.9999999', '2006-01-01 00:00:00.0000000');
```

## Audit trail & triggers

```sql
-- audit add procedure
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
   			(	@aud_id, @aud_recid, @aud_table, @aud_field,
   				@aud_oldvalue,@aud_newvalue,@aud_domain,@aud_createdby,getDate())

-- usage
 EXECUTE add_audit
 		@aud_id =ADE0323011192357167632,
		@aud_recid =CTE032301119222839639,
		@aud_table =atp_mstr,
		@aud_field =ctry_country,
		@aud_oldvalue =Eu,
		@aud_newvalue= Europe,
		@aud_domain =d001,
		@aud_createdby =U001

drop PROCEDURE add_audit

-- trigger example, ref https://stackoverflow.com/questions/3181305/trigger-insert-old-values-values-that-was-updated
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

-- another trigger example
create TRIGGER division_mstr_updated on division_mstr
	after UPDATE
As
SELECT d.div_id, d.div_name,dv.div_id, dv.div_name from deleted d, division_mstr dv where d.div_id=dv.div_id

drop TRIGGER division_mstr_updated

UPDATE division_mstr set div_name='mVBRI-4' WHERE div_id='DV003'

-- dynamic group-by count per value, for every column of a table
Declare @sql varchar(max) = ''
declare @tablename as varchar(255) = 'division_mstr'

select @sql = @sql + 'select [' + c.name + '],count(*) as ''' + c.name +  ''' from [' + t.name + '] group by [' + c.name + '] order by 2 desc; ' 
from sys.columns c
inner join sys.tables t on c.object_id = t.object_id
where t.name = @tablename

EXEC (@sql)
```

## Stored procedures (with variable / return value usage)

refs: https://stackoverflow.com/questions/17739480/storing-query-results-into-a-variable-and-modifying-it-inside-a-stored-procedure, https://www.c-sharpcorner.com/UploadFile/rohatash/stored-procedure-with-a-return-value-in-sql-server-2012/

```sql
-- only once execute ...this procedure...then db will store in it for next time
CREATE PROCEDURE calculate_attendies
		@pgm_id nvarchar(50)
 	AS
 		SELECT COUNT(*) FROM prgattendee_dtl WHERE pgat_prgid=@pgm_id and pgat_isActive='1'

-- usage
EXECUTE calculate_attendies @pgm_id = N'PGE032231019001948365'

-- drop procedure
DROP PROCEDURE calculate_attendies 

-- with variable, one way to do this without a procedure
DECLARE @Cnt int
SELECT @Cnt = COUNT(pgat_id) FROM prgattendee_dtl WHERE pgat_prgid='PGE032231019001948365' and pgat_isActive='1'
SELECT @Cnt

-- with return value
CREATE PROCEDURE get_attendies_count
		@pgm_id nvarchar(50)
 	AS
 	   DECLARE @Cnt int
 		SELECT @Cnt= COUNT(*) FROM prgattendee_dtl WHERE pgat_prgid=@pgm_id and pgat_isActive='1'
 	    RETURN @Cnt

-- usage
DECLARE  @attendies int  
EXECUTE @attendies= get_attendies_count @pgm_id = N'PGE032231019001948365'  
SELECT @attendies

-- set attendies
CREATE PROCEDURE set_attendies
   		@pgm_id nvarchar(50), @Cnt int
   AS
    	UPDATE program_mstr SET prg_noofparticipents=@Cnt where prg_id=@pgm_id

-- usage
EXECUTE set_attendies @pgm_id = N'PGE032231019001948365',@Cnt =3

-- using one procedure's return value in another
CREATE PROCEDURE update_attendies_count
		@pgm_id nvarchar(50)
 	AS
 		 DECLARE  @attendies int  
		 EXECUTE @attendies= get_attendies_count @pgm_id = @pgm_id  
		 EXECUTE set_attendies @pgm_id = @pgm_id,@Cnt =@attendies

-- usage
EXECUTE update_attendies_count @pgm_id='PGE032231019001948365'

CREATE PROCEDURE update_attendies_count_with_attendie_id
		@pgat_id nvarchar(50)
	AS
	DECLARE @pgm_id nvarchar(50)
	SELECT @pgm_id = pgat_prgid FROM prgattendee_dtl WHERE pgat_id=@pgat_id
	EXECUTE update_attendies_count @pgm_id=@pgm_id

-- update scr_nbr_children
CREATE PROCEDURE update_no_of_children
		@scr_id nvarchar(50)
 	AS
 		DECLARE @Cnt int
 		 SELECT @Cnt= COUNT(*) FROM screening_det WHERE scrd_src_id=@scr_id and scrd_isActive='1'
		 UPDATE screening_mstr SET scr_nbr_children=@Cnt where scr_id=@scr_id

-- usage
EXECUTE update_no_of_children @scr_id='SHA3720191209105114'

CREATE PROCEDURE update_no_of_children_with_scr_detail_id
 		@scrd_id nvarchar(50)
 	AS
 		DECLARE @scr_id nvarchar(50)
 		 SELECT @scr_id= scrd_src_id FROM screening_det WHERE scrd_id=@scrd_id
 		 EXECUTE update_no_of_children @scr_id=@scr_id

-- usage
EXECUTE update_no_of_children_with_scr_detail_id @scrd_id='SDA3720191209105482'
```

## Trigger: keep a derived count in sync

```sql
CREATE TRIGGER  attendie_watcher on prgattendee_dtl
 	after INSERT, UPDATE
 AS 
	DECLARE @pgm_id nvarchar(50)
	SELECT @pgm_id = pgat_prgid FROM INSERTED
	EXECUTE update_attendies_count @pgm_id=@pgm_id
```

list all triggers on a table:

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

## User info (with joined labels)

```sql
SELECT usr_id
      ,usr_username
      ,usr_firstname
      ,usr_lastname
      ,usr_profile      
      ,usr_name      
      ,usr_email      
      ,usr_country
	  ,ctry_country AS usr_country_name
      ,usr_city      
      ,usr_state
	  ,st_state AS usr_state_name      
      ,usr_role 
	  ,role_role AS usr_role_name
      ,usr_division
	  ,div_name AS usr_division_name
      ,usr_employee_id
      ,usr_revenue_block
	  ,blk_name AS usr_revenue_block_name
      ,usr_panchayat
	  ,pct_name AS usr_panchayat_name
      ,usr_village 
	  ,village_name AS usr_village_name
      ,usr_domain 
	  ,dom_domain AS usr_domain_name 
  FROM User_mstr
  left join profile_mstr pm  ON (usr_profile =pm. profile_ID) -- alias on join
  left join domain_mstr  ON (usr_domain = dom_id) 
  left join block_mstr  ON (usr_revenue_block = blk_id) 
  left join division_mstr  ON (usr_division = div_id) 
  left join village_mstr  ON (usr_village = village_id) 
  left join panchayat_mstr  ON (usr_panchayat = pct_id)   
  left join country_mstr  ON (usr_country = ctry_id) 
  left join state_mstr  ON (usr_state = st_id) 
  left join role_mstr  ON (usr_role = role_id) 
  where usr_id='0050I000007eRCvQAM'
```

similar, for questions:

```sql
SELECT qu_id
      ,qu_question
      ,qu_questionhead
      ,qu_orderno
      ,qu_qhorderno
      ,qu_questiontype
      ,qu_formtype
      ,qu_choice
      ,qu_depfieldname
      ,qu_depfieldvalue
      ,dom_domain AS qu_domain
      ,div_name AS qu_division
      ,creator.usr_name AS qu_createdby
      ,CONVERT(VARCHAR(20), qu_createddt, 113) AS qu_createddt
      ,modifier.usr_name AS qu_lastmodifiedby
      ,CONVERT(VARCHAR(20), qu_lastmodifieddt, 113) AS qu_lastmodifieddt
      ,qu_isactive
  FROM question_mstr
 left join User_mstr as creator ON (qu_createdby = creator.usr_id) 
 left join User_mstr as modifier ON (qu_lastmodifiedby = modifier.usr_id) 
  join domain_mstr  ON (qu_domain = dom_id) 
  join division_mstr  ON (qu_division = division_mstr.div_id) 
  where qu_isactive=1
```

## Split-string based lookups

using `fn_split_string` / `STRING_SPLIT` to match comma separated values:

```sql
SELECT  DISTINCT value   from formmap_mstr 
    CROSS APPLY STRING_SPLIT(fm_treatment,',')

-- service user problem specific specialists in his block
SELECT  usr_id,usr_revenue_block, fm_profile, fm_problem  from formmap_mstr 
    INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = 'B014' 
    where fm_problem in ('Physical Problem','Cognition Problem','Speech Problem','Vision Problem','Behavioural Problem')

-- same, matching against a split list instead of IN(...)
SELECT  usr_id,usr_revenue_block, fm_profile, fm_problem  from formmap_mstr 
    right join  fn_split_string('Physical Problem,Cognition Problem,Speech Problem,Vision Problem,Behavioural Problem',',') on Split_desc=fm_problem
    INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = 'B014' 

-- app-side usage (node template literal)
const query = `
   SELECT  top 1 usr_id, fm_profile,Split_desc  as fm_treatment  from formmap_mstr 
   CROSS APPLY fn_split_string(fm_treatment,',')
   INNER JOIN User_mstr ON usr_profile = fm_profile  and usr_isActive ='1'  and usr_revenue_block = '${block}' 
   where Split_desc='${treatmentClassification}'
```

## Evaluation scoring & percentage

```sql
-- classifications that need score recalculated
SELECT  DISTINCT  trevl_classification  from treatmentEvaluation_dtl  
where trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech') and trevl_id like '%TEA%'

-- evaluation with its record count and raw score percentage
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score 
 , ISNULL (score_records_count,0) as score_records_count  , ((trevl_score*100)/score_records_count) as score_percentage
from treatmentEvaluation_dtl  
left join ( 
    select trscr_treval,  count(trscr_treval) as score_records_count  from treatmentevaluationscore_dtl   
    where trscr_isActive ='1'
    GROUP BY trscr_treval
) as score_records
on score_records.trscr_treval =trevl_id
where 
    trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech') 
    and trevl_id like '%TEA%'  -- only new records
    and trevl_status='Completed'

-- selecting medical chart max_scale
SELECT DISTINCT  mc_classification ,mc_scale , Split_id, Split_desc  
from medicalchart_mstr 
cross apply fn_split_string(mc_scale,'-')
 where mc_scale <> '' 
 and Split_id <> '1' -- taking last one only

-- evaluation joined with its max_scale, no_of_records and computed percentage
SELECT  trevl_id ,  trevl_classification,trevl_status,trevl_score ,
  mc_data.Split_desc as max_scale, score_records.score_records_count as no_of_records,
  (mc_data.Split_desc*score_records.score_records_count) as max_score,
  cast( (trevl_score*100)/(mc_data.Split_desc*score_records.score_records_count) as decimal(10,2) ) as percentage
FROM  treatmentEvaluation_dtl 
left join (
    SELECT DISTINCT  mc_classification ,mc_scale , Split_id, Split_desc  
    from medicalchart_mstr 
    cross apply fn_split_string(mc_scale,'-')
    where mc_scale <> '' and Split_id <> '1'
) as mc_data on mc_data.mc_classification=trevl_classification
left join ( 
    select trscr_treval, count(trscr_treval) as score_records_count from treatmentevaluationscore_dtl   
    where trscr_isActive ='1'
    GROUP BY trscr_treval
) as score_records
on score_records.trscr_treval =trevl_id
where 
    trevl_classification not in ('Physiotherapy','Occupational Therapy','Speech') 
    and trevl_id like '%TEA%'
    and trevl_status='Completed'
```

### Ordering with ROW_NUMBER

```sql
SELECT  trevl_id , 
ROW_NUMBER() OVER( ORDER BY trevl_serviceuser ASC )  row_no,
trevl_serviceuser, trevl_classification,trevl_lastmodifieddt,  trevl_evalno 
from treatmentEvaluation_dtl  where trevl_isActive ='1'
ORDER  by trevl_serviceuser, trevl_classification,trevl_lastmodifieddt

-- partitioned by service user
SELECT  trevl_id , 
ROW_NUMBER() OVER( PARTITION BY trevl_serviceuser  ORDER BY trevl_serviceuser  )  row_no,
trevl_serviceuser, trevl_classification,trevl_lastmodifieddt,  trevl_evalno 
from treatmentEvaluation_dtl  where trevl_isActive ='1'

-- partitioned by service user + classification
SELECT  trevl_id , 
ROW_NUMBER() OVER(PARTITION BY trevl_serviceuser,trevl_classification  ORDER BY trevl_serviceuser,trevl_classification,trevl_createddt,trevl_evalno )  row_no,
trevl_serviceuser, trevl_classification,trevl_createddt,  trevl_evalno 
from treatmentEvaluation_dtl  where trevl_isActive ='1'

-- persist the row_no back with an update-join
UPDATE treatmentEvaluation_dtl  set  trevl_evalno =te.row_no, trevl_lastmodifieddt ='2021-01-14 00:00:00'
from treatmentEvaluation_dtl  join 
(
  SELECT  trevl_id t_id , 
  ROW_NUMBER() OVER(PARTITION BY trevl_serviceuser,trevl_classification  
  ORDER BY trevl_serviceuser,trevl_classification,trevl_createddt,trevl_evalno )  row_no,
  trevl_serviceuser t_serviceuser, trevl_classification t_classification,trevl_createddt t_createddt,  trevl_evalno t_evalno 
  from treatmentEvaluation_dtl  where trevl_isActive ='1'
)  as te on te.t_id=trevl_id
```

### CASE (if/else)

```sql
SELECT  
   case when 1=1 
       then 'true' 
       else 'false'
    end

-- nested case
SELECT  COUNT(task_id)  count, task_status,task_travelin_starttime,task_checkin_time,
    case when task_status='Open'
          then 
              case when (task_travelin_starttime is not null or task_checkin_time is not null)
                     then '1'
                     else '0'
               end      
          else '1'
     end as is_started    		
from task_mstr 
where task_owner ='00528000006PK4fAAG' and task_date ='2021-01-21'
GROUP  by task_status,task_travelin_starttime,task_checkin_time
```

## Misc queries & updates

```sql
-- service user status old -> new value migration (status names were renamed)
UPDATE  serviceuser_mstr  set su_status ='Created' where su_status in ('Created','Approved','Assigned For GA')
UPDATE  serviceuser_mstr  set su_status ='Waiting for approval' where su_status in ('Waiting for approval','GA Submitted')
UPDATE  serviceuser_mstr  set su_status ='Approved' where su_status='GA Reviewed' 
UPDATE  serviceuser_mstr  set su_status ='Assigned for Assessment' where su_status='Assigned for Special Assessment' 
UPDATE  serviceuser_mstr  set su_status ='Treatment Assigned & Submitted for Approval' where su_status in ('Treatment Resource Assigned','Waiting for Treatment plan Approval') 
UPDATE  serviceuser_mstr  set su_status ='Treatment Approved' where su_status='Treatment Plan Approved' 
UPDATE  serviceuser_mstr  set su_status ='Treatment Completed' where su_status='Actual Treatment Completed' 
UPDATE  serviceuser_mstr  set su_status ='Treatment Evaluation Assigned & Submitted' where su_status='under evaluation' 
UPDATE  serviceuser_mstr  set su_status ='Treatment Rejected' where su_status='Treatment plan Rejected' 
UPDATE  serviceuser_mstr  set su_status ='Treatment Evaluation Completed' where su_status='Evaluation completed'

-- timezone offset helpers
select TODATETIMEOFFSET(GETDATE(),'+02:00')
SELECT SYSDATETIMEOFFSET()
SELECT SWITCHOFFSET(SYSDATETIMEOFFSET(), '+05:30')

-- evaluations with no scored questions
SELECT  evl_id, qs_count  from (
    SELECT trevl_id evl_id, COUNT(trscr_treval) qs_count  from treatmentEvaluation_dtl 
    left join treatmentevaluationscore_dtl  on trscr_treval =trevl_id   
    GROUP  by trevl_id
) as res
where qs_count='0'

-- update using a join subquery
update treatmentEvaluation_dtl  set trevl_isActive ='0'
from treatmentEvaluation_dtl
JOIN (
    SELECT  evl_id, qs_count  from (
        SELECT trevl_id evl_id, trevl_treatment treatment ,COUNT(trscr_treval) qs_count  from treatmentEvaluation_dtl 
        left join treatmentevaluationscore_dtl  on trscr_treval =trevl_id   
        where trevl_id='TEA68181120121149746'
        GROUP  by trevl_id,trevl_treatment
    ) as res
    where qs_count='0'
 ) as evl on evl.evl_id=trevl_id
 where qs_count='0'

-- back-filling a derived FK from another table's join
UPDATE  atp_mstr  set atp_treatment =trAtp.tr_id 
from atp_mstr atp
join (
    SELECT  tr_id, tr_atp , atp_id , atp_treatment
    from treatment_mstr  
    join   atp_mstr  on  atp_id = tr_atp 
    where atp_treatment is NULL  
) as  trAtp on  atp.atp_id = trAtp.tr_atp 

UPDATE  task_mstr  set task_treatment =trAtpTask.tr_id
from task_mstr task
join (
    SELECT  tr_id, tr_atp , atp_id , atp_treatment, task_id  , task_atp,task_treatment
    from treatment_mstr  
    join   atp_mstr  on  atp_id = tr_atp 
    join task_mstr  on task_atp =atp_id
    where task_treatment is NULL 
) as trAtpTask on trAtpTask.atp_id= task.task_atp

-- computed percentage score update
UPDATE  treatmentEvaluation_dtl  
set
    trevl_dimscore =FORMAT (( scores.sum/(scores.count*cast ( SUBSTRING(scores.trscr_scale,3,1 ) as int   )) )*100,'N','en-us')+'%',
    trevl_score =FORMAT  (scores.sum/(scores.count*cast ( SUBSTRING(scores.trscr_scale,3,1 ) as int   )), 'N','en-us'),
    trevl_lastmodifieddt='2020-12-15 15:15:15'
from treatmentEvaluation_dtl 
join (
    SELECT  COUNT(trscr_id ) count, sum(trscr_evalscore ) sum, trscr_treval , trscr_scale  from treatmentevaluationscore_dtl  
    where trscr_treval ='a090I00001IV8aWQAT'
    GROUP  BY trscr_treval,trscr_scale
) as scores on scores.trscr_treval=trevl_id
where trevl_id='a090I00001IV8aWQAT'

-- clean up double-comma-separated values
UPDATE  serviceuser_mstr  set su_bl_typeofslfhlpgrp = replace(su_bl_typeofslfhlpgrp,', ',','), su_lastmodifieddt ='2020-12-16 16:16:16'
where su_bl_typeofslfhlpgrp like '%, %'
```

## Time summary formatting (seconds -> `H:M:S`)

```sql
-- today's totals
SELECT 
   SUBSTRING(cast(tsum_tot_travel_time as varchar(8)),1,2) + ' H :'+SUBSTRING(cast(tsum_tot_travel_time as varchar(8)),4,2)
   + ' M :'+SUBSTRING(cast(tsum_tot_travel_time as varchar(8)),7,2) + ' S ' as tsum_tot_travel_time ,
   SUBSTRING(cast(tsum_tot_task_time as varchar(8)),1,2) + ' H :'+ SUBSTRING(cast(tsum_tot_task_time as varchar(8)),4,2)
   + ' M :'+ SUBSTRING(cast(tsum_tot_task_time as varchar(8)),7,2) + ' S ' as tsum_tot_task_time
FROM task_summary where tsum_date = CAST(getdate() AS date)  
and tsum_owner = '${ReqData.user.usr_id}' and tsum_isActive = 1 and tsum_domian = '${ReqData.user.usr_domain}'

-- monthly totals, summing seconds across rows then re-formatting
SELECT tsum_owner,
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) / 3600),'00') as varchar(max)) + ' H : ' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) % 3600 / 60),'00') as varchar(max)) + ' M : ' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) % 3600 % 60),'00') as varchar(max)) + ' S' as tsum_tot_task_time
FROM task_summary where tsum_date between CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(getdate())-1),getdate()),101) and CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(DATEADD(mm,1,getdate()))), DATEADD(mm,1,getdate())),101)
and tsum_owner = '${ReqData.user.usr_id}' and tsum_isActive =1 and tsum_domian='${ReqData.user.usr_domain}' group by tsum_owner
```
