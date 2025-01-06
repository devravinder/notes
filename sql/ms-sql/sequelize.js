
  let data= await ScreeningDet.findAll({

    where:{
      [Op.and]:{
        scrd_src_id,
        scrd_isActive:true,
        [Op.or]:[
          {
             [Op.or]:[
                      { scrd_assessor_result:null},
                      {scrd_assessor_result:{ [Op.ne]:'Negative'}}

                    ]
             
          },
          {
//            scrd_createddt:sequelize.fn('date',sequelize.col('scrd_createddt')),
          scrd_createddt:{
              [Op.gte]:today
              },
            scrd_assessor_result:'Negative'
          }
          
        ]
    
      }
      
      
    },
    order:[["scrd_lastmodifieddt","desc"]]
  })


  //-----------------------

  // ScreeningDet is model ---> 

ScreeningDet.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'scrd_lastmodifiedby',as :'modifier' });
ScreeningDet.belongsTo(User, { targetKey: 'usr_id', foreignKey: 'scrd_createdby',as :'creator' });



let data= await ScreeningDet.findAll({
  where:{...conditions},
  order:[["scrd_lastmodifieddt","desc"]],
  include:[
    {model:User,attributes:["usr_id","usr_name"], as :'modifier'},
    {model:User,attributes:["usr_id","usr_name"], as :'creator'}
  ],
  raw:true
})




let SUbyBlock = await ServiceUser.findAll({
  where: options.conditions,
  include: [{
      model: Block,
      attributes: ["blk_id", "blk_name"]
  }],
  group: ["blk_id", "blk_name"],
  attributes: [
      [sequelize.fn("COUNT", "blk_name"), "BlockCount"]
  ]
});




const tsumTodaysQuery = ` 
select SUBSTRING (cast(tsum_tot_travel_time as varchar(8)),1,2) + ' H :'+SUBSTRING (cast(tsum_tot_travel_time as varchar(8)),4,2)
+ ' M :'+SUBSTRING (cast(tsum_tot_travel_time as varchar(8)),7,2) + ' S ' as tsum_tot_travel_time ,
SUBSTRING (cast(tsum_tot_task_time as varchar(8)),1,2) + ' H :'+ SUBSTRING (cast(tsum_tot_task_time as varchar(8)),4,2)
+ ' M :'+ SUBSTRING (cast(tsum_tot_task_time as varchar(8)),7,2) + ' S ' as tsum_tot_task_time ,
SUBSTRING (cast(tsum_tot_wrk_time as varchar(8)),1,2) + ' H :'+ SUBSTRING (cast(tsum_tot_wrk_time as varchar(8)),4,2)
+ ' M :'+ SUBSTRING (cast(tsum_tot_wrk_time as varchar(8)),7,2) + ' S ' as tsum_tot_wrk_time ,
SUBSTRING (cast(tsum_tot_unprod_wrk_time as varchar(8)),1,2) + ' H :'+ SUBSTRING (cast(tsum_tot_unprod_wrk_time as varchar(8)),4,2)
+ ' M :'+ SUBSTRING (cast(tsum_tot_unprod_wrk_time as varchar(8)),7,2) + ' S ' as tsum_tot_unprod_wrk_time ,
SUBSTRING (cast(tsum_tot_task_time as varchar(8)),1,2) + ' H :' + SUBSTRING (cast(tsum_tot_task_time as varchar(8)),4,2)
+ ' M :'+ SUBSTRING (cast(tsum_tot_task_time as varchar(8)),7,2) + ' S ' as tsum_tot_task_time
FROM task_summary where tsum_date = CAST(getdate() AS date)  
${tsumWhere} and tsum_isActive = 1 and tsum_domian = '${ReqData.user.usr_domain}'
`;

const tsumMonthlyQuery = `
SELECT 
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) / 3600),'00') as varchar(max)) + ' H : ' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) % 3600 / 60),'00') as varchar(max)) + ' M : ' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_task_time) + DATEPART("mi",tsum_tot_task_time) * 60 + DATEPART("hh",tsum_tot_task_time) * 3600)) % 3600 % 60),'00') as varchar(max)) + ' S' as tsum_tot_task_time

,CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_wrk_time) + DATEPART("mi",tsum_tot_wrk_time) * 60 + DATEPART("hh",tsum_tot_wrk_time) * 3600)) / 3600),'00') as varchar(max)) + ' H :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_wrk_time) + DATEPART("mi",tsum_tot_wrk_time) * 60 + DATEPART("hh",tsum_tot_wrk_time) * 3600)) % 3600 / 60),'00') as varchar(max)) + ' M :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_wrk_time) + DATEPART("mi",tsum_tot_wrk_time) * 60 + DATEPART("hh",tsum_tot_wrk_time) * 3600)) % 3600 % 60),'00') as varchar(max)) + ' S' as tsum_tot_wrk_time

,CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_travel_time) + DATEPART("mi",tsum_tot_travel_time) * 60 + DATEPART("hh",tsum_tot_travel_time) * 3600)) / 3600),'00') as varchar(max)) + ' H :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_travel_time) + DATEPART("mi",tsum_tot_travel_time) * 60 + DATEPART("hh",tsum_tot_travel_time) * 3600)) % 3600 / 60),'00') as varchar(max)) + ' M :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_travel_time) + DATEPART("mi",tsum_tot_travel_time) * 60 + DATEPART("hh",tsum_tot_travel_time) * 3600)) % 3600 % 60),'00') as varchar(max)) + ' S' as tsum_tot_travel_time

,CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_unprod_wrk_time) + DATEPART("mi",tsum_tot_unprod_wrk_time) * 60 + DATEPART("hh",tsum_tot_unprod_wrk_time) * 3600)) / 3600),'00') as varchar(max)) + ' H :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_unprod_wrk_time) + DATEPART("mi",tsum_tot_unprod_wrk_time) * 60 + DATEPART("hh",tsum_tot_unprod_wrk_time) * 3600)) % 3600 / 60),'00') as varchar(max)) + ' M :' +
CAST(FORMAT((SUM((DATEPART("ss",tsum_tot_unprod_wrk_time) + DATEPART("mi",tsum_tot_unprod_wrk_time) * 60 + DATEPART("hh",tsum_tot_unprod_wrk_time) * 3600)) % 3600 % 60),'00') as varchar(max)) + ' S' as tsum_tot_unprod_wrk_time

FROM task_summary where tsum_date between CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(getdate())-1),getdate()),101) and CONVERT(VARCHAR(25),DATEADD(dd,-(DAY(DATEADD(mm,1,getdate()))), DATEADD(mm,1,getdate())),101)
${tsumWhere} and tsum_isActive =1 and tsum_domian='${ReqData.user.usr_domain}' 
`;