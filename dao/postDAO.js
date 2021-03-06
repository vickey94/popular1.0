var db = require('../db');

module.exports = {
    
//获取一篇文章
getOneArticleById : async(id)=>{
 
  let sql = "SELECT * ,date_format(post_date,'%Y-%m-%d')as post_f_date,date_format(post_date,'%H:%i')as post_f_time "
+" FROM pop_posts as p,pop_users as u ,pop_terms as t "
+" WHERE p.post_id = '"+id+"'"
+" AND p.post_user_id = u.user_id"
+" AND p.post_term_id = t.term_id ";
 let article = await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
 
  return article;
},

//获取已发表文章数量
getArticleNum : async()=>{
    
    let sql = "SELECT COUNT(*) AS post_num FROM pop_posts WHERE post_status = '1' "
        +" AND post_order = '0' ";

    return  await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},

//获取一页文章
getArticlesByPage : async(page)=>{
   
    let i = page*4;
    let ii = i+4;

    let sql =  "SELECT p.* ,u.user_nickname , date_format(post_date,'%Y-%m-%d')as post_f_date,date_format(post_date,'%H:%i')as post_f_time "
              + " FROM pop_posts as p,pop_users as u "
              +" WHERE p.post_user_id = u.user_id"
              +" AND p.post_status = '1' "
              +" AND p.post_order = '0' "
              +" order by post_date DESC  limit "+ i+", "+ ii  ;
    
    return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
    
},

//获取发表和草稿文章
getEditArticlesByPage : async(page)=>{
   
    let i = page*4;
    let ii = i+4;

    let sql =  "SELECT p.* ,u.user_nickname , date_format(post_date,'%Y-%m-%d')as post_f_date,date_format(post_date,'%H:%i')as post_f_time "
              + " FROM pop_posts as p,pop_users as u "
              +" WHERE p.post_user_id = u.user_id"
              +" AND p.post_status = '1' or '0'  "
              +" order by post_date DESC  limit "+ i+", "+ ii  ;
    
    return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
    
},

//获取可编辑文章数量
getEditArticleNum : async()=>{
    
    let sql = "SELECT COUNT(*) AS post_num FROM pop_posts WHERE post_status = '1' or '0'";

    return  await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},


//获取回收站文章
getBinByPage : async(page)=>{
   
    let i = page*4;
    let ii = i+4;

    let sql =  "SELECT p.* ,u.user_nickname , date_format(post_date,'%Y-%m-%d')as post_f_date,date_format(post_date,'%H:%i')as post_f_time "
              + " FROM pop_posts as p,pop_users as u "
              +" WHERE p.post_user_id = u.user_id"
              +" AND p.post_status = '-1' "
              +" order by post_date DESC  limit "+ i+", "+ ii  ;
    
    return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
    
},
//获取回收站文章数量
getTermPageNum :  async(term_id)=>{
    
    let sql = "SELECT COUNT(*) AS post_num FROM pop_posts"
              +" WHERE post_status = '-1' ";
            
    return  await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},

//根据时间，获取前后文章标题，id
getPrePost : async(post_date)=>{

    let sql = "SELECT post_id,post_title FROM pop_posts "
              +" WHERE post_date <  '"+post_date+"' "
              +" AND post_status = '1' "
              +" order by post_date DESC  limit 1 ";

  return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},
getNextPost : async(post_date)=>{

    let sql = "SELECT post_id,post_title FROM pop_posts "
              +" WHERE post_date > '"+post_date+"' "
              +" AND post_status = '1' "
              +" order by post_date ASC  limit 1 ";

  return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},


//获取分类文章
getPageByTerm : async(term_id,page)=>{
    let i = page*4;
    let ii = i+4;

    let sql =  "SELECT p.* ,u.user_nickname , date_format(post_date,'%Y-%m-%d')as post_f_date,date_format(post_date,'%H:%i')as post_f_time "
              + " FROM pop_posts as p,pop_users as u "
              +" WHERE p.post_user_id = u.user_id"
              +" AND p.post_status = '1' "
              +" AND p.post_term_id = "+term_id
              +" AND p.post_order = '0' "
              +" order by post_date DESC  limit "+ i+", "+ ii  ;
    
    return await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});

},

//获取分类文章数量
getTermPageNum :  async(term_id)=>{
    
    let sql = "SELECT COUNT(*) AS post_num FROM pop_posts"
              +" WHERE post_status = '1' "
              +" AND post_order = '0' "
              +" AND post_term_id = " + term_id;

    return  await db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT});
},

//发布文章
postArticle : async(art)=>{

   return await db.pop_posts.create({
 
           post_user_id: art.post_user_id,
             post_date : art.post_date,
             post_title: art.post_title,
             post_content :art.post_content,
             post_excerpt : art.post_excerpt,
             post_term_id : art.post_term_id,
             post_status : art.post_status ,
             post_order : art.post_order ,
    });
},

}