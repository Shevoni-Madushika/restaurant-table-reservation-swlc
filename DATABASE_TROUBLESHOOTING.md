# 🔧 Database Connection Troubleshooting

## ❌ **Current Issue**
```
Unable to open JDBC Connection for DDL execution [Access denied for user 'root'@'175.157.138.237'
```

## 🔍 **Problem Analysis**
The error shows it's trying to connect as 'root' user, but your configuration specifies 'sentura'. This indicates:

1. **Environment variable override** - Spring might be picking up old environment variables
2. **Configuration caching** - Previous configuration might be cached
3. **Profile mismatch** - Wrong Spring profile might be active

## ✅ **Solutions**

### **Solution 1: Use Direct Configuration (Immediate Fix)**
I've updated your `application.yml` to use direct values instead of environment variables:

```yaml
datasource:
  url: jdbc:mysql://103.125.216.56:3306/tabletop_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
  driver-class-name: com.mysql.cj.jdbc.Driver
  username: sentura
  password: '{*qp8j{J+w96[m_2}'
```

### **Solution 2: Use Startup Scripts**
I've created startup scripts that set the correct environment variables:

**Windows:**
```bash
cd backend
start-with-mysql.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x start-with-mysql.sh
./start-with-mysql.sh
```

### **Solution 3: Manual Environment Variables**
Set these environment variables before starting:

**Windows (Command Prompt):**
```cmd
set DB_USERNAME=sentura
set DB_PASSWORD={*qp8j{J+w96[m_2}
set SPRING_PROFILES_ACTIVE=prod
mvn spring-boot:run
```

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="sentura"
$env:DB_PASSWORD="{*qp8j{J+w96[m_2}"
$env:SPRING_PROFILES_ACTIVE="prod"
mvn spring-boot:run
```

**Linux/Mac:**
```bash
export DB_USERNAME=sentura
export DB_PASSWORD='{*qp8j{J+w96[m_2}'
export SPRING_PROFILES_ACTIVE=prod
mvn spring-boot:run
```

## 🗄️ **Database Setup Required**

Before running the application, make sure your MySQL database is set up:

### **1. Create Database (if not exists)**
```sql
CREATE DATABASE IF NOT EXISTS tabletop_db;
```

### **2. Grant Permissions**
```sql
-- Connect to your MySQL server and run:
GRANT ALL PRIVILEGES ON tabletop_db.* TO 'sentura'@'%';
FLUSH PRIVILEGES;
```

### **3. Test Connection**
Test the connection from your machine:
```bash
mysql -h 103.125.216.56 -P 3306 -u sentura -p tabletop_db
```

## 🔄 **Alternative: Use Development Profile**

If you want to test locally first, use the H2 database:

```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=dev
```

This will use the in-memory H2 database instead of MySQL.

## 🚀 **Quick Start Commands**

### **Option A: Direct Configuration (Recommended)**
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

### **Option B: With Environment Variables**
```bash
cd backend
export DB_USERNAME=sentura
export DB_PASSWORD='{*qp8j{J+w96[m_2}'
mvn spring-boot:run
```

### **Option C: Development Mode**
```bash
cd backend
mvn spring-boot:run -Dspring.profiles.active=dev
```

## 🔍 **Debug Steps**

1. **Check your IP**: The error shows IP `175.157.138.237` - make sure this is your current IP
2. **Verify credentials**: Double-check username and password
3. **Check firewall**: Ensure port 3306 is accessible
4. **Test connection**: Try connecting with MySQL client first

## 📞 **If Still Having Issues**

1. **Check MySQL server logs** for connection attempts
2. **Verify user permissions** in MySQL:
   ```sql
   SELECT user, host FROM mysql.user WHERE user = 'sentura';
   SHOW GRANTS FOR 'sentura'@'%';
   ```
3. **Try different connection parameters**:
   ```yaml
   url: jdbc:mysql://103.125.216.56:3306/tabletop_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
   ```

The application should now connect successfully with the updated configuration!
